#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), 'docs')
const MAX_LINES = 24
const offenders = []

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text
  const match = text.match(/^---\n[\s\S]*?\n---\n?/m)
  if (!match) return text
  return text.slice(match[0].length)
}

function head24(text) {
  const body = stripFrontmatter(text)
  return body.split('\n').slice(0, MAX_LINES).join('\n')
}

function hasMarkdownCTA(head) {
  const links = head.match(/\[[^\]]+\]\([^)]+\)/g) || []
  return links.length >= 2
}

function hasHtmlCTA(head) {
  const primary = /<a[^>]*\bdata-primary-action\b[^>]*>/i.test(head)
  const secondary = /<a[^>]*\bdata-secondary-action\b[^>]*>/i.test(head)
  return primary && secondary
}

function shouldSkip(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/m)
  if (!match) return { skip: false, text: raw }
  const frontmatter = match[1]
  const skip = /layout:\s*home/.test(frontmatter) || /skip_cta:\s*true/.test(frontmatter)
  return { skip, text: raw }
}

function scan(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '.vitepress' || entry.name === 'public') continue
      scan(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const { skip, text } = shouldSkip(fullPath)
      if (skip) continue
      const head = head24(text)
      if (!(hasMarkdownCTA(head) || hasHtmlCTA(head))) {
        offenders.push(path.relative(process.cwd(), fullPath))
      }
    }
  }
}

scan(ROOT)

if (offenders.length) {
  console.error('Primary action not found in content:')
  for (const file of offenders) {
    console.error(` - ${file}`)
  }
  process.exit(1)
} else {
  console.log('CTA verifier OK')
}
