#!/usr/bin/env node
// Dịch toàn bộ docs/zh-cn/**/*.md sang docs/vi-vn/ qua `claude -p` (Haiku).
// Bảo toàn frontmatter, code blocks, ảnh. Đổi link /zh-cn/ -> /vi-vn/.

import { readdir, readFile, writeFile, mkdir, stat, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const ROOT = path.resolve(process.cwd(), 'docs')
const SRC = path.join(ROOT, 'zh-cn')
const DST = path.join(ROOT, 'vi-vn')
const CONCURRENCY = Number(process.env.CONCURRENCY || 6)
const MODEL = process.env.MODEL || 'haiku'
const FORCE = process.env.FORCE === '1'

const SYSTEM_PROMPT = `You are a deterministic Chinese-to-Vietnamese markdown translator. You NEVER ask questions, NEVER explain, NEVER add commentary. You output ONLY the translated markdown.

Rules:
1. Preserve EXACTLY: YAML frontmatter keys, code fences (\`\`\`...\`\`\`), inline code (\`...\`), URLs, file paths, image syntax ![](...), HTML/Vue tags and props.
2. In YAML frontmatter, translate ONLY the string VALUES of: title, description, text, tagline, name. Keep keys unchanged.
3. Inside code blocks: do NOT translate code. Only translate Chinese comments inside code.
4. Rewrite every internal link "/zh-cn/" -> "/vi-vn/" (both in markdown links and Vue component href/link props).
5. Keep common English tech terms untouched: AI, IDE, prompt, agent, API, frontend, backend, framework, repo, commit, pull request, vibe coding, etc. Keep product names untouched: Claude, Cursor, VS Code, Supabase, Stripe, Figma, GitHub, MCP, etc.
6. Tone: natural educational Vietnamese, use "bạn" addressing the learner.
7. Output the TRANSLATED markdown only — no preface, no closing remark, no surrounding fence.

If the user message starts with <SOURCE> and ends with </SOURCE>, translate the markdown between those tags and output ONLY the translated body (without the tags).`

async function walkMd(dir, out = []) {
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) }
  catch { return out }
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await walkMd(p, out)
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p)
  }
  return out
}

async function exists(p) {
  try { await access(p, constants.F_OK); return true } catch { return false }
}

const USER_INSTRUCTION = 'Translate the markdown inside <SOURCE>...</SOURCE> from Chinese to Vietnamese per the system rules. Output the translated body ONLY (no tags, no preface, no closing remark).'

function translateChunk(content) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', [
      '-p', USER_INSTRUCTION,
      '--model', MODEL,
      '--append-system-prompt', SYSTEM_PROMPT,
      '--output-format', 'text'
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      windowsHide: true
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', d => { stdout += d.toString('utf8') })
    child.stderr.on('data', d => { stderr += d.toString('utf8') })
    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) resolve(stdout)
      else reject(new Error(`claude exited ${code}: ${stderr.slice(0, 500)}`))
    })
    child.stdin.write(`<SOURCE>\n${content}\n</SOURCE>\n`, 'utf8')
    child.stdin.end()
  })
}

async function translateFile(src) {
  const rel = path.relative(SRC, src)
  const dst = path.join(DST, rel)
  if (!FORCE && await exists(dst)) {
    return { src, dst, status: 'skipped' }
  }
  const content = await readFile(src, 'utf8')
  if (!content.trim()) {
    await mkdir(path.dirname(dst), { recursive: true })
    await writeFile(dst, content, 'utf8')
    return { src, dst, status: 'empty' }
  }
  const started = Date.now()
  let translated
  try {
    translated = await translateChunk(content)
  } catch (e) {
    return { src, dst, status: 'error', error: e.message }
  }
  // Cleanup: strip wrapping markdown fence if model added one
  translated = translated.replace(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$/m, '$1')
  // Belt-and-suspenders link rewrite (in case model missed any)
  translated = translated.replace(/\/zh-cn\//g, '/vi-vn/')
  await mkdir(path.dirname(dst), { recursive: true })
  await writeFile(dst, translated, 'utf8')
  return { src, dst, status: 'ok', ms: Date.now() - started }
}

async function runPool(items, worker, concurrency) {
  const queue = [...items]
  let done = 0
  let ok = 0, skipped = 0, errors = 0
  const total = queue.length
  const startedAt = Date.now()
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift()
      if (!item) break
      const r = await worker(item)
      done++
      if (r.status === 'ok') ok++
      else if (r.status === 'skipped') skipped++
      else if (r.status === 'error') errors++
      const rel = path.relative(SRC, r.src)
      const tag = r.status === 'ok' ? `OK ${r.ms}ms`
        : r.status === 'skipped' ? 'SKIP (exists)'
        : r.status === 'empty' ? 'EMPTY'
        : `ERR ${r.error || ''}`
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0)
      console.log(`[${done}/${total} ${elapsed}s] ${tag}  ${rel}`)
    }
  })
  await Promise.all(workers)
  return { total, ok, skipped, errors }
}

async function main() {
  const files = await walkMd(SRC)
  console.log(`Found ${files.length} .md files in ${SRC}`)
  console.log(`Concurrency=${CONCURRENCY} Model=${MODEL} Force=${FORCE}`)
  const summary = await runPool(files, translateFile, CONCURRENCY)
  console.log('\n=== SUMMARY ===')
  console.log(JSON.stringify(summary, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
