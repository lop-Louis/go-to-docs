#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const REQUIRED = ['title', 'band', 'owner', 'refresh_after_days', 'status']
const OPS_SECTIONS = [/^##\s*Trigger/im, /^##\s*Action/im, /^##\s*Receipt/im, /^##\s*Stop rule/im]

let flags = []

function fmok(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return { ok: false, missing: ['frontmatter'] }
  const block = m[1]
  const missing = REQUIRED.filter(k => !new RegExp(`^${k}:\\s*.+$`, 'm').test(block))
  return { ok: missing.length === 0, missing }
}

function stripFrontmatterBlock(text) {
  if (!text.startsWith('---')) return text
  const match = text.match(/^---\s*[\s\S]*?\n---\s*\n?/)
  if (!match) return text
  return text.slice(match[0].length)
}

function ctaok(text) {
  const body = stripFrontmatterBlock(text)
  const head = body.split('\n').slice(0, 24).join('\n')
  const links = (head.match(/\[[^\]]+\]\([^)]+\)/g) || []).length
  return links >= 2
}

function qrunOk(fp, text) {
  if (!fp.startsWith('ops/')) return { ok: true, misses: [] }
  const misses = OPS_SECTIONS.filter(rx => !rx.test(text)).map(rx => rx.source)
  return { ok: misses.length === 0, misses }
}

function scan(dir) {
  if (!fs.existsSync(dir)) return
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    const s = fs.statSync(p)
    if (s.isDirectory()) {
      scan(p)
    } else if (p.endsWith('.md')) {
      const t = fs.readFileSync(p, 'utf8')
      const fm = fmok(t)
      if (!fm.ok) {
        flags.push({ file: p, reason: `missing frontmatter: ${fm.missing.join(', ')}` })
      }
      if (!ctaok(t)) {
        flags.push({ file: p, reason: 'missing human CTA pair near top' })
      }
      const qr = qrunOk(p.replace(process.cwd() + '/', ''), t)
      if (!qr.ok) {
        flags.push({ file: p, reason: 'ops Quick-Run sections missing' })
      }
    }
  }
}

scan('docs')
scan('ops')

fs.mkdirSync('reports', { recursive: true })
fs.writeFileSync('reports/yellow-flags.json', JSON.stringify(flags, null, 2))
console.log(`Yellow flags: ${flags.length}`)
process.exit(0)
