#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const releasesDir = path.join(repoRoot, 'ops', 'releases')
const requiredFrontmatter = ['title', 'owner', 'date', 'guardrail_mapping', 'release_tag']

const errors = []

if (!fs.existsSync(releasesDir)) {
  console.log('Release directory ops/releases/ not found; skipping check.')
  process.exit(0)
}

const releaseDirs = fs
  .readdirSync(releasesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())

if (!releaseDirs.length) {
  console.log('No release folders found under ops/releases/.')
  process.exit(0)
}

for (const entry of releaseDirs) {
  const name = entry.name
  if (!/^\d{4}-\d{2}$/.test(name)) {
    errors.push(`Release folder "${name}" must follow YYYY-MM naming.`)
    continue
  }

  const dirPath = path.join(releasesDir, name)
  const indexPath = path.join(dirPath, 'index.md')
  if (!fs.existsSync(indexPath)) {
    errors.push(`Release folder "${name}" is missing index.md.`)
    continue
  }

  const raw = fs.readFileSync(indexPath, 'utf8')
  const { data, content } = matter(raw)

  for (const field of requiredFrontmatter) {
    if (!data[field]) {
      errors.push(`ops/releases/${name}/index.md missing "${field}" in frontmatter.`)
    }
  }

  const expectedTag = `site-v${name.replace('-', '.')}`
  if (data.release_tag && data.release_tag !== expectedTag) {
    errors.push(
      `ops/releases/${name}/index.md release_tag "${data.release_tag}" should be "${expectedTag}".`
    )
  }

  const requiredSections = ['Decisions', 'Signals', 'Receipts']
  for (const section of requiredSections) {
    const headingRegex = new RegExp(`^##\\s+${section}`, 'm')
    if (!headingRegex.test(content)) {
      errors.push(`ops/releases/${name}/index.md missing "## ${section}" section.`)
    }
  }
}

if (errors.length) {
  console.error('Release folder check failed:')
  for (const err of errors) {
    console.error(` - ${err}`)
  }
  process.exit(1)
}

console.log('✅ Release folders look good.')
