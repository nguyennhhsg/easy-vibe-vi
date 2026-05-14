// Trích xuất tất cả text label trong sidebar zh-cn của VitePress config.
// Output: docs/vi-vn-sidebar-labels.json với key là chuỗi gốc, value tạm bằng key.
// Script dịch sẽ điền value sau.

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Import config dynamically. Set VERCEL flag so base path matches deploy.
process.env.VERCEL = '1'
const configUrl = pathToFileURL(path.join(ROOT, 'docs/.vitepress/config.mjs')).href
const configMod = await import(configUrl)
const config = configMod.default

const texts = new Set()

function collect(node) {
  if (!node) return
  if (Array.isArray(node)) {
    node.forEach(collect)
    return
  }
  if (typeof node === 'object') {
    if (typeof node.text === 'string' && node.text.trim()) texts.add(node.text)
    if (node.items) collect(node.items)
  }
}

// Walk zh-cn sidebar + nav (we'll translate both)
const zh = config.locales['zh-cn'].themeConfig
for (const v of Object.values(zh.sidebar || {})) collect(v)
collect(zh.nav || [])

// Also walk the existing vi-vn nav (which may still have Chinese pieces)
const vi = config.locales['vi-vn'].themeConfig
collect(vi.nav || [])

const out = {}
for (const t of [...texts].sort()) out[t] = null

const outPath = path.join(ROOT, 'scripts/sidebar-labels-zh-to-vi.json')
await writeFile(outPath, JSON.stringify(out, null, 2), 'utf8')
console.log(`Extracted ${texts.size} unique label strings to ${outPath}`)
