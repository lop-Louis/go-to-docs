#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

function ensureFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  if (/^---\s*\n/.test(text)) return false
  const title = path
    .basename(filePath)
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())

  const fm = [
    '---',
    `title: ${title}`,
    'band: A',
    "owner: '@lop'",
    'change_type: patch',
    'refresh_after_days: 60',
    'status: live',
    '---',
    ''
  ].join('\n')

  fs.writeFileSync(filePath, fm + '\n' + text)
  return true
}

function walk(dir) {
  if (!fs.existsSync(dir)) return 0
  let added = 0
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
      added += walk(fullPath)
    } else if (stats.isFile() && entry.endsWith('.md')) {
      if (ensureFrontmatter(fullPath)) added++
    }
  }
  return added
}

const total = walk('docs')
console.log(`Frontmatter ensured on ${total} file(s).`)
