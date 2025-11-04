#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DOCS = 'docs'
const today = new Date().toISOString().slice(0, 10)
let updated = 0

function processFile(p) {
  const raw = fs.readFileSync(p, 'utf8')
  const parsed = matter(raw)
  if (p.includes('.vitepress')) return
  if (!parsed.data) return
  parsed.data.last_reviewed = today
  const out = matter.stringify(parsed.content, parsed.data)
  if (out !== raw) {
    fs.writeFileSync(p, out, 'utf8')
    updated++
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    const s = fs.statSync(p)
    if (s.isDirectory()) walk(p)
    else if (p.endsWith('.md')) processFile(p)
  }
}

if (!fs.existsSync(DOCS)) {
  console.error('Docs directory not found')
  process.exit(1)
}

walk(DOCS)
console.log(`last_reviewed field set to ${today} on ${updated} file(s).`)
