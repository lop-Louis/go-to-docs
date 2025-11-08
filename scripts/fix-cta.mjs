#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const REPORT_PATH = path.join('reports', 'yellow-flags.json')
const CTA_SNIPPET_MD =
  'Need to fix this fast? [Run the Ops Quick-Run](../ops/quick-run) · [Try the 10-minute lab](../labs/link-drift)'
const CTA_SNIPPET_HTML =
  '<a href="../ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="../labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.'

if (!fs.existsSync(REPORT_PATH)) {
  console.error(`Missing ${REPORT_PATH}. Run "pnpm guard" first.`)
  process.exit(1)
}

const flags = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'))

function hasMarkdownCta(text) {
  const lines = text.split(/\r?\n/)
  const head = lines.slice(0, 24).join('\n')
  const matches = head.match(/\[[^\]]+\]\([^)]+\)/g) || []
  return matches.length >= 2
}

const targets = new Set(
  flags
    .filter(flag => flag.reason && flag.reason.includes('missing human CTA pair'))
    .map(flag => flag.file)
)

if (!targets.size) {
  console.log('No CTA-related yellow flags detected. Nothing to fix.')
  process.exit(0)
}

let updated = 0

for (const relativePath of targets) {
  const filePath = path.resolve(relativePath)
  if (!fs.existsSync(filePath)) continue
  const original = fs.readFileSync(filePath, 'utf8')

  if (hasMarkdownCta(original)) {
    continue
  }

  const eol = original.includes('\r\n') ? '\r\n' : '\n'
  const snippet = `${CTA_SNIPPET_MD}${eol}${CTA_SNIPPET_HTML}${eol}${eol}`

  const frontmatterMatch = original.match(/^---\s*[\s\S]*?\n---\s*\n?/m)
  const insertIndex = frontmatterMatch ? frontmatterMatch[0].length : 0

  const before = original.slice(0, insertIndex)
  const after = original.slice(insertIndex)
  const needsNewline = after.startsWith(eol) || after.startsWith('\n') ? '' : eol
  const updatedContent = `${before}${snippet}${needsNewline}${after}`
  fs.writeFileSync(filePath, updatedContent)
  console.log(`Inserted CTA snippet into ${relativePath}`)
  updated++
}

console.log(`CTA snippet inserted in ${updated} file(s).`)
