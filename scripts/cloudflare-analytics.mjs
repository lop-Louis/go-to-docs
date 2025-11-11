#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)

function getArg(flag, fallback) {
  const index = args.indexOf(flag)
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1]
  }
  return fallback
}

const repoRoot = process.cwd()
const inputPath = path.resolve(getArg('--input', 'reports/cloudflare-export.json'))
const labsPath = path.resolve(getArg('--labs', 'reports/labs.json'))
const outputPath = path.resolve(getArg('--output', 'reports/cloudflare-snapshot.json'))
const brokenLinksOverride = getArg('--broken-links')
const stateDaysOverride = getArg('--state-days')
const exceptionsOpenOverride = getArg('--exceptions-open')
const exceptionsResolvedOverride = getArg('--exceptions-resolved')
const defaultWindowDays = Number(process.env.CF_ANALYTICS_DAYS || 14)

if (!fs.existsSync(inputPath)) {
  console.error(`Cloudflare export not found at ${inputPath}. Run the export step first.`)
  process.exit(1)
}

function readJson(filePath, nullable = false) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    if (nullable && err.code === 'ENOENT') return null
    throw err
  }
}

const rawExport = readJson(inputPath)

function deriveWindow() {
  const meta = rawExport.meta || rawExport.window || {}
  const since =
    getArg('--since', process.env.CF_ANALYTICS_SINCE) ||
    meta.since ||
    new Date(Date.now() - defaultWindowDays * 24 * 60 * 60 * 1000).toISOString()
  const until =
    getArg('--until', process.env.CF_ANALYTICS_UNTIL) || meta.until || new Date().toISOString()
  return { since, until }
}

function median(numbers = []) {
  if (!numbers.length) return null
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function normalizePages(data) {
  if (Array.isArray(data.pages)) {
    return data.pages.map(page => ({
      path: page.path,
      views: Number(page.views || 0),
      medianTimeToAnswerMs: Number(page.median_time_to_answer_ms || page.time_to_answer_ms || 0)
    }))
  }

  const zone = data?.data?.viewer?.zones?.[0]
  if (!zone) {
    throw new Error('Unable to find zones data in the Cloudflare export')
  }

  const rumLookup = new Map()
  for (const rum of zone.rumSpeedPageInsightsAdaptiveGroups || []) {
    const pathName = rum.dimensions?.path
    if (!pathName) continue
    const medianValue = Number(
      rum.median?.pageLoadTime ??
        rum.quantiles?.pageLoadTimeP50 ??
        rum.quantiles?.unloadEventStartP50 ??
        0
    )
    if (medianValue > 0) {
      rumLookup.set(pathName, medianValue)
    }
  }

  return (zone.httpRequestsAdaptiveGroups || []).map(group => {
    const pathName = group.dimensions?.clientRequestPath || '/'
    const views = Number(group.sum?.requests ?? 0)
    const responseQuantile =
      Number(group.quantiles?.responseTime95th || group.quantiles?.edgeStartTimeP50 || 0) || null
    const rumTime = rumLookup.get(pathName) || responseQuantile
    return {
      path: pathName,
      views,
      medianTimeToAnswerMs: rumTime
    }
  })
}

function deriveEvents(data) {
  if (data.events) {
    return {
      notHelpful: Number(data.events.not_helpful || data.events.notHelpful || 0),
      ctaClicks: Number(data.events.cta_clicks || data.events.ctaClicks || 0)
    }
  }

  const zone = data?.data?.viewer?.zones?.[0]
  if (!zone) return { notHelpful: 0, ctaClicks: 0 }

  let notHelpful = 0
  let ctaClicks = 0
  for (const worker of zone.workersInvocationsAdaptiveGroups || []) {
    const scriptName = worker.dimensions?.scriptName || ''
    const total = Number(worker.sum?.requests ?? 0)
    if (!total) continue
    if (scriptName.includes('not-helpful')) {
      notHelpful += total
    } else if (scriptName.includes('cta') || scriptName.includes('primary-action')) {
      ctaClicks += total
    }
  }
  return { notHelpful, ctaClicks }
}

const pages = normalizePages(rawExport)
const events = deriveEvents(rawExport)

const adoption = {
  pages_touched: pages.length,
  total_views: pages.reduce((sum, page) => sum + page.views, 0),
  median_time_to_answer_ms: median(pages.map(page => page.medianTimeToAnswerMs).filter(Boolean)),
  not_helpful_clicks: events.notHelpful,
  cta_clicks: events.ctaClicks
}

const labsReport = readJson(labsPath, true)
let labPassRate = null
let labsFailed = 0
if (labsReport) {
  const pass = Number(labsReport.pass || 0)
  const fail = Number(labsReport.fail || 0)
  const total = pass + fail
  labPassRate = total === 0 ? null : pass / total
  labsFailed = fail
}

const quality = {
  lab_pass_rate: labPassRate,
  labs_failed: labsFailed,
  broken_links:
    brokenLinksOverride != null
      ? Number(brokenLinksOverride)
      : Number(rawExport.quality?.broken_links || 0)
}

const credibility = {
  state_fresh_within_days:
    stateDaysOverride != null
      ? Number(stateDaysOverride)
      : Number(rawExport.credibility?.state_fresh_within_days || 0),
  exceptions_open:
    exceptionsOpenOverride != null
      ? Number(exceptionsOpenOverride)
      : Number(rawExport.credibility?.exceptions_open || 0),
  exceptions_resolved:
    exceptionsResolvedOverride != null
      ? Number(exceptionsResolvedOverride)
      : Number(rawExport.credibility?.exceptions_resolved || 0)
}

const snapshot = {
  collected_at: new Date().toISOString(),
  window: deriveWindow(),
  adoption,
  quality,
  credibility,
  source_files: {
    cloudflare_export: path.relative(repoRoot, inputPath),
    labs_report: fs.existsSync(labsPath) ? path.relative(repoRoot, labsPath) : null
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2))

console.log(
  `Analytics snapshot written to ${path.relative(
    repoRoot,
    outputPath
  )} (pages touched: ${adoption.pages_touched}, lab pass rate: ${quality.lab_pass_rate ?? 'n/a'})`
)
