// Fix JSON từ Sonnet có inner double-quotes không escape (cả ở key và value).
// Heuristic: file là flat object, 1 entry/line, format `  "K": "V",` hoặc cuối `  "K": "V"`.

import { readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import nodepath from 'node:path'

const path = nodepath.join(os.tmpdir(), 'sidebar-trans.json')
const out = 'scripts/sidebar-labels-zh-to-vi.json'

let txt = await readFile(path, 'utf8')
txt = txt.replace(/^```json\s*\n/, '').replace(/^```\s*\n/, '').replace(/\n```\s*$/, '')

const escapeInnerQuotes = (s) => s.replace(/(?<!\\)"/g, '\\"')

const lines = txt.split('\n')
const fixed = []
for (const line of lines) {
  // Skip non-entry lines (brackets, blank)
  if (!line.trim() || line.trim() === '{' || line.trim() === '}') {
    fixed.push(line)
    continue
  }
  // Determine trailing comma
  let body = line
  let trailing = ''
  if (body.endsWith(',')) {
    body = body.slice(0, -1)
    trailing = ','
  }
  // Body must start with indent then `"`, end with `"`
  const m = body.match(/^(\s*)"(.*)"\s*$/s)
  if (!m) {
    fixed.push(line)
    continue
  }
  const indent = m[1]
  const inner = m[2]
  // Inside `inner`, find the FIRST `": "` separator that matches K -> V boundary.
  // The boundary is `": "` with valid surrounding context. Use first occurrence as split.
  const sepIdx = inner.indexOf('": "')
  if (sepIdx === -1) {
    fixed.push(line)
    continue
  }
  const rawKey = inner.slice(0, sepIdx)
  const rawVal = inner.slice(sepIdx + 4)
  const key = escapeInnerQuotes(rawKey)
  const val = escapeInnerQuotes(rawVal)
  fixed.push(`${indent}"${key}": "${val}"${trailing}`)
}

const result = fixed.join('\n')
try {
  JSON.parse(result)
} catch (e) {
  console.error('Still invalid:', e.message)
  const pos = e.message.match(/position (\d+)/)?.[1]
  if (pos) {
    const around = result.slice(Math.max(0, pos - 100), Number(pos) + 100)
    console.error('Around:', around)
  }
  process.exit(1)
}
await writeFile(out, result, 'utf8')

const obj = JSON.parse(result)
const total = Object.keys(obj).length
const translated = Object.values(obj).filter(v => v && typeof v === 'string').length
console.log(`Total: ${total} Translated: ${translated}`)
