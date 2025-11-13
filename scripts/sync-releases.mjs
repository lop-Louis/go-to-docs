#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const docsDir = path.join(repoRoot, 'docs')
const targetDirs = ['operate', 'navigate', 'learn', 'mitigate', 'decisions']
const outputDir = path.join(docsDir, '.vitepress', 'ops')
const outputPath = path.join(outputDir, 'releases.generated.json')

async function collectMarkdownFiles(dir) {
  const files = []

  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      if (entry.name === 'node_modules') continue
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }

  await walk(dir)
  return files
}

function toRoute(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/')
  if (normalized.endsWith('index.md')) {
    const withoutIndex = normalized.slice(0, -'index.md'.length)
    return `/${withoutIndex}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
  }
  const withoutExt = normalized.replace(/\.md$/, '')
  return `/${withoutExt}`.replace(/\/+/g, '/')
}

function buildEntry(relativePath, frontmatter) {
  return {
    title: frontmatter.title ?? deriveTitle(relativePath),
    path: toRoute(relativePath),
    bucket: frontmatter.bucket ?? null,
    owner: frontmatter.owner ?? null,
    status: frontmatter.status ?? null,
    decision_id: frontmatter.decision_id ?? null,
    leading_metric: frontmatter.leading_metric ?? null,
    lagging_metric: frontmatter.lagging_metric ?? null
  }
}

function deriveTitle(relativePath) {
  const fileName = path.basename(relativePath, '.md')
  return fileName
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function isDecision(relativePath) {
  return relativePath.replace(/\\/g, '/').split('/').includes('decisions')
}

async function main() {
  const releaseMap = {}

  for (const dir of targetDirs) {
    const absoluteDir = path.join(docsDir, dir)
    let files = []
    try {
      files = await collectMarkdownFiles(absoluteDir)
    } catch (error) {
      if (error.code === 'ENOENT') continue
      throw error
    }

    for (const filePath of files) {
      const raw = await fs.readFile(filePath, 'utf8')
      const { data: frontmatter } = matter(raw)
      const releaseTag = frontmatter.release_tag
      if (!releaseTag) continue
      const relativePath = path.relative(docsDir, filePath)
      const entry = buildEntry(relativePath, frontmatter)
      const bucket = isDecision(relativePath) ? 'decisions' : 'pages'
      if (!releaseMap[releaseTag]) {
        releaseMap[releaseTag] = { pages: [], decisions: [] }
      }
      releaseMap[releaseTag][bucket].push(entry)
    }
  }

  for (const tag of Object.keys(releaseMap)) {
    releaseMap[tag].pages.sort(sortByTitle)
    releaseMap[tag].decisions.sort(sortByTitle)
  }

  await fs.mkdir(outputDir, { recursive: true })
  const payload = {
    generatedAt: new Date().toISOString(),
    releases: releaseMap
  }
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${outputPath} with ${Object.keys(releaseMap).length} release tag(s).`)
}

function sortByTitle(a, b) {
  return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
}

main().catch(error => {
  console.error('[sync-releases] failed:', error)
  process.exitCode = 1
})
