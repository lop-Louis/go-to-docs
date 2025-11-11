#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import prettier from 'prettier'

const args = process.argv.slice(2)
const CHECK_MODE = args.includes('--check')

const repoRoot = process.cwd()
const releasesDir = path.join(repoRoot, 'ops', 'releases')
const stateDir = path.join(repoRoot, 'docs', 'navigate')
const stateFile = path.join(stateDir, 'state-ledger.md')
const mismatches = []

async function formatMarkdown(content, filePath) {
  const resolvedConfig = (await prettier.resolveConfig(filePath, { editorconfig: true })) ?? {}
  return prettier.format(content, {
    ...resolvedConfig,
    parser: 'markdown',
    filepath: filePath
  })
}

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function resolveLink(fromFile, target) {
  if (!target) return null
  if (/^https?:\/\//i.test(target)) return target
  let filePart = target
  let anchor = ''
  if (target.includes('#')) {
    const [pathPart, anchorPart] = target.split('#')
    filePart = pathPart
    anchor = anchorPart
  }

  const absolute = path.resolve(repoRoot, filePart)
  if (!fs.existsSync(absolute)) {
    console.warn(
      `Warning: ${target} referenced from ${path.relative(repoRoot, fromFile)} does not exist.`
    )
  }
  let relative = path.relative(path.dirname(fromFile), absolute).split(path.sep).join('/')
  if (!relative.startsWith('.')) relative = `./${relative}`
  if (anchor) relative = `${relative}#${anchor}`
  return relative
}

async function buildReleaseIndexContent(manifest, releaseName, releaseDir) {
  const summary =
    manifest.summary || `Release bundle for ${releaseName}. Generated from ops metadata.`

  const decisions = Array.isArray(manifest.decisions) ? manifest.decisions : []
  const signals = Array.isArray(manifest.signals) ? manifest.signals : []
  const receipts = Array.isArray(manifest.receipts) ? manifest.receipts : []

  const indexPath = path.join(releaseDir, 'index.md')

  const section = (title, items) => {
    if (!items.length) return `## ${title}\n\n- _None_\n`
    const list = items
      .map(item => {
        const link = resolveLink(indexPath, item.path) || item.path
        const note = item.note ? ` — ${item.note}` : ''
        return `- [${item.title}](${link})${note}`
      })
      .join('\n')
    return `## ${title}\n\n${list}\n`
  }

  const highlights = manifest.metrics
    ? `## Highlights

- **Adoption** — ${manifest.metrics.adoption || '_Not provided_'}
- **Quality** — ${manifest.metrics.quality || '_Not provided_'}
- **Credibility** — ${manifest.metrics.credibility || '_Not provided_'}
`
    : ''

  const body = `# ${manifest.title}

${summary}

${highlights}
${section('Decisions', decisions)}
${section('Signals', signals)}
${section('Receipts', receipts)}
`

  const frontmatter = {
    title: manifest.title || `Release bundle ${releaseName}`,
    owner: manifest.owner || '@lop',
    date: manifest.date || new Date().toISOString().slice(0, 10),
    guardrail_mapping: manifest.guardrail_mapping || 'governance-state',
    release_tag: manifest.release_tag || `site-v${releaseName.replace('-', '.')}`,
    status: manifest.status || 'live'
  }

  const raw = matter.stringify(body.trim() + '\n', frontmatter)
  return await formatMarkdown(raw, indexPath)
}

function relativeFromState(targetPath) {
  return path.relative(path.dirname(stateFile), targetPath).split(path.sep).join('/')
}

async function buildStatePage(releases) {
  const sections = releases
    .map(rel => {
      const manifest = rel.manifest
      const releaseTag = manifest.release_tag || `site-v${rel.name.replace('-', '.')}`
      const link = `[Release bundle](${relativeFromState(path.join(rel.dir, 'index.md'))})`

      const listSection = (title, items) => {
        if (!items.length) return `- _${title}: None_`
        const formatted = items
          .map(item => {
            const resolved = resolveLink(stateFile, item.path) || item.path
            return `[${item.title}](${resolved})`
          })
          .join(', ')
        return `- ${title}: ${formatted}`
      }

      const metricsLines = manifest.metrics
        ? `- Adoption: ${manifest.metrics.adoption || 'n/a'}
- Quality: ${manifest.metrics.quality || 'n/a'}
- Credibility: ${manifest.metrics.credibility || 'n/a'}`
        : '- Metrics: _Not provided_'

      return `## ${releaseTag} (${rel.name})

- Owner: ${manifest.owner || '@lop'}
- ${link}
${listSection('Decisions', manifest.decisions || [])}
${listSection('Signals', manifest.signals || [])}
${listSection('Receipts', manifest.receipts || [])}
${metricsLines}
`
    })
    .join('\n')

  const latest = releases[0]
  const latestTag = latest
    ? latest.manifest.release_tag || `site-v${latest.name.replace('-', '.')}`
    : 'latest release'
  const latestLink = latest ? relativeFromState(path.join(latest.dir, 'index.md')) : '#'
  const runbookPath = path.join(repoRoot, 'docs', 'operate', 'state-visibility.md')
  const runbookLink = fs.existsSync(runbookPath) ? relativeFromState(runbookPath) : '#'

  const body = `# Release state ledger

Keep the monthly state bundle predictable. [Open ${latestTag}](${latestLink}) or [Browse the State runbook](${runbookLink}).
Exit metric: readers act via the CTA pair within 60 seconds.

${sections}
`

  const frontmatter = {
    title: 'State',
    band: 'A',
    owner: '@lop',
    change_type: 'patch',
    status: 'live',
    refresh_after_days: 30,
    nav_group: 'Navigate',
    nav_order: 15,
    nav_label: 'State',
    nav: ['sidebar'],
    bucket: 'navigate',
    north_star_id: 'ns-001',
    guardrail_id: 'gr-101',
    cta_primary_label: 'Try the Navigate path',
    cta_secondary_label: 'See example route',
    leading_metric: 'm-nav-open',
    lagging_metric: 'm-time-to-answer',
    decision_link: '/decisions/dec-2025-11-ia-overhaul.md',
    date:
      (latest && latest.manifest && latest.manifest.date) || new Date().toISOString().slice(0, 10)
  }

  const raw = matter.stringify(body.trim() + '\n', frontmatter)
  return await formatMarkdown(raw, stateFile)
}

async function main() {
  if (!fs.existsSync(releasesDir)) {
    console.warn('No ops/releases directory found. Skipping state generation.')
    process.exit(0)
  }

  const releaseDirs = fs
    .readdirSync(releasesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}$/.test(entry.name))
    .map(entry => ({
      name: entry.name,
      dir: path.join(releasesDir, entry.name),
      manifestPath: path.join(releasesDir, entry.name, 'manifest.json')
    }))
    .filter(entry => {
      if (!fs.existsSync(entry.manifestPath)) {
        console.warn(`Skipping ${entry.name}: missing manifest.json`)
        return false
      }
      return true
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  if (!releaseDirs.length) {
    console.warn('No release manifests found. Skipping state generation.')
    process.exit(0)
  }

  const releases = []
  for (const entry of releaseDirs) {
    const manifest = readJSON(entry.manifestPath)
    const indexContent = await buildReleaseIndexContent(manifest, entry.name, entry.dir)
    const indexPath = path.join(entry.dir, 'index.md')
    if (CHECK_MODE) {
      const existing = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : ''
      if (existing !== indexContent) {
        mismatches.push(path.relative(repoRoot, indexPath))
      }
    } else {
      fs.writeFileSync(indexPath, indexContent)
    }
    releases.push({ ...entry, manifest })
  }

  ensureDir(stateDir)
  const stateContent = await buildStatePage(releases.slice().reverse())
  if (CHECK_MODE) {
    const existing = fs.existsSync(stateFile) ? fs.readFileSync(stateFile, 'utf8') : ''
    if (existing !== stateContent) {
      mismatches.push(path.relative(repoRoot, stateFile))
    }
  } else {
    fs.writeFileSync(stateFile, stateContent)
    console.log(
      `State page written to ${path.relative(repoRoot, stateFile)} (releases: ${releases.length})`
    )
  }

  if (CHECK_MODE) {
    if (mismatches.length) {
      console.error('State generation check failed for:')
      mismatches.forEach(file => console.error(` - ${file}`))
      process.exit(1)
    } else {
      console.log('State generation matches committed files.')
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
