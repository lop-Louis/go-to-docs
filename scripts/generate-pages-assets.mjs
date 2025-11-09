#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.warn(`[pages-assets] Missing ${name}; defaulting to "unknown"`)
    return 'unknown'
  }
  return value
}

const outputDir = process.env.OUTPUT_DIR ?? 'public'
const latestVersion = process.env.LATEST_VERSION ?? 'v1'
const redirectTarget = process.env.REDIRECT_TARGET ?? `/${latestVersion}/`
const generatedAt = process.env.GENERATED_AT ?? new Date().toISOString()
const releaseSha = requiredEnv('RELEASE_SHA')
const stagingSha = requiredEnv('STAGING_SHA')

mkdirSync(outputDir, { recursive: true })

const redirectHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Northbook docs</title>
    <meta http-equiv="refresh" content="0; url=${redirectTarget}" />
    <link rel="canonical" href="${redirectTarget}" />
    <script>
      window.location.replace('${redirectTarget}');
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${redirectTarget}">${redirectTarget}</a>…</p>
  </body>
</html>
`

const manifest = {
  latest: latestVersion,
  generatedAt,
  versions: [
    {
      id: latestVersion,
      path: `/${latestVersion}/`,
      branch: process.env.RELEASE_BRANCH ?? 'main',
      commit: releaseSha
    },
    {
      id: 'staging',
      path: '/staging/',
      branch: process.env.STAGING_BRANCH ?? 'development',
      commit: stagingSha
    }
  ]
}

writeFileSync(join(outputDir, 'index.html'), redirectHtml, 'utf8')
writeFileSync(join(outputDir, 'versions.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
writeFileSync(join(outputDir, '.nojekyll'), '', 'utf8')
