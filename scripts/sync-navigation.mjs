#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import prettier from 'prettier'

const repoRoot = process.cwd()
const docsDir = path.join(repoRoot, 'docs')
const draftsDir = path.join(docsDir, 'drafts')
const gatedListPath = path.join(draftsDir, 'gated.generated.md')
const outputPath = path.join(docsDir, '.vitepress', 'navigation.generated.ts')
const REQUIRED_FIELDS = [
  'bucket',
  'north_star_id',
  'guardrail_id',
  'owner',
  'band',
  'date',
  'cta_primary_label',
  'cta_secondary_label',
  'leading_metric',
  'lagging_metric'
]
const FIXED_NAV = [
  { text: 'Start here', link: '/start-here/' },
  { text: 'Navigate', link: '/navigate/' },
  { text: 'Operate', link: '/operate/' },
  { text: 'Learn', link: '/learn/' },
  { text: 'Mitigate', link: '/mitigate/' }
]
const SIDEBAR_BLUEPRINT = [
  {
    text: 'Navigate',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/navigate/' },
      { text: 'Wayfinding shortcuts', link: '/navigate/find' },
      { text: 'State', link: '/navigate/state-ledger' },
      { text: 'Monthly cadence', link: '/navigate/monthly-release' },
      { text: 'Band A guardrails', link: '/navigate/band-a' }
    ]
  },
  {
    text: 'Operate',
    collapsed: false,
    items: [
      { text: 'Versioning & releases', link: '/operate/versioning-and-releases/' },
      { text: 'Sanitization checklist', link: '/operate/sanitization' },
      { text: 'Link integrity', link: '/operate/link-integrity' },
      { text: 'Verify-in-10 guide', link: '/operate/verify-in-10' },
      { text: 'Decision spine', link: '/operate/decision-spine' },
      { text: 'Playbook canon', link: '/operate/' },
      { text: 'Signal registry', link: '/operate/signal-registry' },
      { text: 'Guardrail index', link: '/operate/guardrail-index' },
      { text: 'Cloudflare analytics', link: '/operate/cloudflare-analytics' }
    ]
  },
  {
    text: 'Learn',
    collapsed: false,
    items: [{ text: 'Receipts & dashboards', link: '/learn/receipts' }]
  },
  {
    text: 'Mitigate',
    collapsed: false,
    items: [
      { text: 'Fix: Interrupt flows', link: '/support/' },
      { text: 'Fix: Teams notifications', link: '/support/teams-notifications' },
      { text: 'Fix: Repo & pipeline access', link: '/support/access-repo-pipeline' }
    ]
  }
]

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function collectMarkdownFiles(dir) {
  const results = []

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      if (entry.name === 'node_modules') continue
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results
}

function routeFromFile(filePath) {
  const relative = path.relative(docsDir, filePath).replace(/\\/g, '/')
  if (relative === 'index.md') return '/'
  if (relative.endsWith('/index.md')) {
    return `/${relative.slice(0, -'index.md'.length)}`
  }
  return `/${relative.replace(/\.md$/, '')}`
}

function isDraftPath(filePath) {
  const relative = path.relative(docsDir, filePath)
  return relative.split(path.sep).includes('drafts')
}

function hasOpener(content) {
  const snippet = content.split('\n').filter(Boolean).slice(0, 40).join('\n').toLowerCase()
  if (!/exit metric/.test(snippet)) return false
  const linkMatches = content.match(/\[[^\]]+\]\([^)]+\)/g) || []
  return linkMatches.length >= 2
}

function isPublishable(frontmatter, content) {
  if (!frontmatter) return { ok: false, reason: 'missing frontmatter' }
  const missing = REQUIRED_FIELDS.filter(key => !frontmatter[key])
  if (missing.length) {
    return { ok: false, reason: `missing frontmatter: ${missing.join(', ')}` }
  }
  if (!hasOpener(content)) {
    return { ok: false, reason: 'opener missing exit metric or two CTAs' }
  }
  return { ok: true }
}

function writeGatedList(entries) {
  ensureDir(draftsDir)
  const listBody = entries.length
    ? entries
        .sort((a, b) => a.route.localeCompare(b.route))
        .map(entry => `- \`${entry.route}\` — ${entry.reason}`)
        .join('\n')
    : '- _None_'

  const fm = {
    title: 'Gated pages',
    band: 'A',
    owner: '@lop',
    refresh_after_days: 30,
    change_type: 'patch',
    status: 'live',
    nav: ['none'],
    search: false,
    bucket: 'operate',
    north_star_id: 'ns-001',
    guardrail_id: 'gr-104',
    cta_primary_label: 'Use this guardrail',
    cta_secondary_label: 'See example runbook',
    leading_metric: 'm-nav-open',
    lagging_metric: 'm-time-to-answer',
    decision_link: '/decisions/dec-2025-11-proof-or-private.md',
    date: new Date().toISOString().slice(0, 10)
  }
  const intro = `Keep unfinished pages out of nav until they meet the opener contract. [Return to the drafts hub](./index.md) or [Fix the opener contract](../operate/north-star-guardrails.md#ui-delivery-checks).
Exit metric: gated pages either ship or leave the repo within 30 days.

`
  const body = `${intro}# Gated pages (auto-generated)

${listBody}

_Last updated: ${new Date().toISOString()}_
`
  const output = matter.stringify(body.trim() + '\n', fm)
  fs.writeFileSync(gatedListPath, output)
}

function normalizeRoute(link) {
  if (link === '/') return '/'
  return link
}

function buildNavigation() {
  const files = collectMarkdownFiles(docsDir)
  const publishableRoutes = new Set()
  const gatedPages = []

  for (const file of files) {
    if (file.includes(`${path.sep}.vitepress${path.sep}`)) continue
    if (isDraftPath(file)) continue

    const raw = fs.readFileSync(file, 'utf8')
    const { data, content } = matter(raw)
    const route = routeFromFile(file)
    const result = isPublishable(data, content)

    if (result.ok) {
      publishableRoutes.add(route)
    } else {
      gatedPages.push({ route, reason: result.reason })
    }
  }

  writeGatedList(gatedPages)

  const nav = FIXED_NAV.map(item => {
    const normalized = normalizeRoute(item.link)
    if (!publishableRoutes.has(normalized)) {
      throw new Error(`Nav entry ${normalized} is missing or not publishable`)
    }
    return item
  })

  const missingSidebar = new Set()
  const sidebar = SIDEBAR_BLUEPRINT.map(group => {
    const items = group.items.filter(item => {
      const normalized = normalizeRoute(item.link)
      if (publishableRoutes.has(normalized)) {
        return true
      }
      missingSidebar.add(normalized)
      return false
    })
    if (!items.length) return null
    return { text: group.text, collapsed: group.collapsed, items }
  }).filter(Boolean)

  if (missingSidebar.size) {
    console.warn(
      'Sidebar items skipped (await opener/frontmatter fixes):',
      Array.from(missingSidebar).join(', ')
    )
  }

  return { nav, sidebar }
}

async function writeNavigation(nav, sidebar) {
  const banner = `import { DefaultTheme } from 'vitepress';\n\n// Auto-generated by scripts/sync-navigation.mjs\n// Do not edit manually.\n`
  const content = `${banner}export const generatedNav = ${JSON.stringify(
    nav,
    null,
    2
  )} as DefaultTheme.NavItem[];\n\nexport const generatedSidebar = ${JSON.stringify(
    sidebar,
    null,
    2
  )} as DefaultTheme.Sidebar;\n`
  const formatted = await prettier.format(content, {
    parser: 'typescript',
    singleQuote: true,
    semi: false,
    trailingComma: 'none'
  })
  fs.writeFileSync(outputPath, formatted)
  console.log(`Navigation synced -> ${path.relative(repoRoot, outputPath)}`)
}

const { nav, sidebar } = buildNavigation()
await writeNavigation(nav, sidebar)
