import rawMap from '../../ops/cta-map.json'

type RawCtaEntry = {
  text: string
  doc?: string
}

export type CtaEntry = {
  label: string
  to?: string
}

function docPathToRoute(docPath?: string) {
  if (!docPath) return undefined
  let normalized = docPath.trim().replace(/\\/g, '/')
  normalized = normalized.replace(/^(\.\/)+/, '')
  if (normalized.startsWith('docs/')) normalized = normalized.slice(5)
  if (!normalized) return '/'

  let isIndex = normalized.endsWith('index.md')
  if (isIndex) {
    normalized = normalized.slice(0, -'index.md'.length)
  } else if (normalized.endsWith('.md')) {
    normalized = normalized.slice(0, -'.md'.length)
  }

  normalized = normalized.replace(/\/+$/, '')
  let route = `/${normalized}`.replace(/\/+/g, '/')
  if (route !== '/' && isIndex) {
    route = `${route}/`
  }
  return route || '/'
}

const CTA_MAP: Record<string, CtaEntry> = {}

for (const [key, value] of Object.entries(rawMap as Record<string, RawCtaEntry>)) {
  CTA_MAP[key] = {
    label: value.text,
    to: docPathToRoute(value.doc)
  }
}

export function resolveCta(key?: string | null) {
  if (!key) return null
  return CTA_MAP[key] ?? null
}

export { CTA_MAP }
