#!/usr/bin/env node
/**
 * changelog.mjs
 * Simple changelog generator that:
 * 1. Reads CHANGELOG.md
 * 2. Inserts a new unreleased section or finalizes a monthly release tag (site-vYYYY.MM)
 * 3. Gathers merged PR titles since last tag via `git log` parsing (local heuristic)
 * 4. Appends them under categorized buckets (Docs, Policy, Infra, Fixes, Other)
 *
 * Usage:
 *   node scripts/changelog.mjs preview        # show proposed changes
 *   node scripts/changelog.mjs finalize       # finalize current month release tag
 *   node scripts/changelog.mjs add "Item" "Docs"  # add manual line to Unreleased bucket
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'

const CHANGELOG_PATH = 'CHANGELOG.md'

function nowParts() {
  const d = new Date()
  return { year: d.getUTCFullYear(), month: String(d.getUTCMonth() + 1).padStart(2, '0') }
}

function getLastTag() {
  try {
    const tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim()
    return tag.startsWith('site-v') ? tag : null
  } catch {
    // No tags found
    return null
  }
}

function collectMergedPRs(sinceTag) {
  let range = sinceTag ? `${sinceTag}..HEAD` : ''
  const format = '%s'
  const raw = execSync(`git log --pretty=format:${format} ${range}`, { encoding: 'utf8' })
  const lines = raw.split('\n')
  // Heuristic: PR merge commits often contain (#123)
  return lines.filter(l => /(\(#\d+\))/.test(l))
}

function categorize(title) {
  const lower = title.toLowerCase()
  if (/(doc|content|page|vitepress)/.test(lower)) return 'Docs'
  if (/(governance|policy|band|sanitization|release)/.test(lower)) return 'Policy'
  if (/(ci|workflow|script|infra|guard|stale|automation)/.test(lower)) return 'Infra'
  if (/(fix|bug|correct|repair)/.test(lower)) return 'Fixes'
  return 'Other'
}

function ensureUnreleased(text) {
  if (/## \[Unreleased\]/.test(text)) return text
  return text.replace(
    /(## \[site-v\d{4}\.\d{2}\].*[\r\n]+)/,
    '$1\n## [Unreleased]\n\n### Docs\n- (placeholder)\n\n### Policy\n- (placeholder)\n\n### Infra\n- (placeholder)\n\n### Fixes\n- (placeholder)\n\n### Other\n- (placeholder)\n'
  )
}

function injectItems(text, items) {
  // For each category, find section under Unreleased and insert before placeholder.
  for (const [cat, titles] of Object.entries(items)) {
    if (!titles.length) continue
    const regex = new RegExp(`(## \[Unreleased\][\s\S]*?### ${cat}\n)(- \(placeholder\))`)
    text = text.replace(regex, (m, head, placeholder) => {
      const body = titles.map(t => `- ${t}`).join('\n')
      return `${head}${body}\n${placeholder}`
    })
  }
  return text
}

function finalizeRelease(text) {
  const { year, month } = nowParts()
  const tag = `site-v${year}.${month}`
  if (new RegExp(`## \[${tag}\]`).test(text)) {
    console.error('Tag already exists in CHANGELOG')
    process.exit(1)
  }
  // Move Unreleased to new tag
  const unreleasedSectionMatch = text.match(/## \[Unreleased\]([\s\S]*?)(?=## \[site-v|$)/)
  if (!unreleasedSectionMatch) {
    console.error('No Unreleased section found')
    process.exit(1)
  }
  const unreleasedContent = unreleasedSectionMatch[1].trim()
  const newTagBlock = `## [${tag}] - ${year}-${month}-01\n${unreleasedContent}\n`
  // Insert new tag block after first heading line
  text = text.replace(/(## \[Unreleased\][\s\S]*?)(?=## \[site-v|$)/, '')
  // Append new tag block at top after Unreleased heading (which we keep and reset)
  text = text.replace(
    /## \[Unreleased\].*/,
    `## [Unreleased]\n\n### Docs\n- (placeholder)\n\n### Policy\n- (placeholder)\n\n### Infra\n- (placeholder)\n\n### Fixes\n- (placeholder)\n\n### Other\n- (placeholder)\n\n${newTagBlock}`
  )
  return text
}

function addManualLine(text, line, category = 'Other') {
  const cat = category.charAt(0).toUpperCase() + category.slice(1)
  const regex = new RegExp(`(## \[Unreleased\][\s\S]*?### ${cat}\n)(- \(placeholder\))`)
  if (!regex.test(text)) {
    console.error(`Category ${cat} not found under Unreleased.`)
    process.exit(1)
  }
  return text.replace(regex, (m, head, placeholder) => `${head}- ${line}\n${placeholder}`)
}

function main() {
  const mode = process.argv[2]
  if (!existsSync(CHANGELOG_PATH)) {
    console.error('CHANGELOG.md missing')
    process.exit(1)
  }
  let text = readFileSync(CHANGELOG_PATH, 'utf8')
  text = ensureUnreleased(text)

  if (mode === 'preview' || mode === 'finalize') {
    const lastTag = getLastTag()
    const prs = collectMergedPRs(lastTag)
    const categorized = {}
    for (const t of prs) {
      const cat = categorize(t)
      categorized[cat] = categorized[cat] || []
      categorized[cat].push(t)
    }
    text = injectItems(text, categorized)
    if (mode === 'finalize') {
      text = finalizeRelease(text)
    }
    if (mode === 'preview') {
      console.log(text)
      return
    }
    writeFileSync(CHANGELOG_PATH, text)
    console.log('CHANGELOG updated. Run git diff to inspect.')
    return
  } else if (mode === 'add') {
    const line = process.argv[3]
    const cat = process.argv[4] || 'Other'
    if (!line) {
      console.error('Provide line text')
      process.exit(1)
    }
    text = addManualLine(text, line, cat)
    writeFileSync(CHANGELOG_PATH, text)
    console.log('Manual line added.')
    return
  } else {
    console.log('Usage: node scripts/changelog.mjs <preview|finalize|add "Item" [Category]>')
  }
}

main()
