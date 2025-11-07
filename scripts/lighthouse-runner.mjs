#!/usr/bin/env node

/**
 * Lighthouse CI Runner with Playwright-managed preview server
 *
 * This script:
 * 1. Starts VitePress preview server using Playwright
 * 2. Waits for server to be ready
 * 3. Runs Lighthouse audits on key pages
 * 4. Gracefully shuts down server
 * 5. Outputs results in JSON format
 */

import { chromium } from 'playwright'
import { spawn } from 'child_process'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = 5173
const REMOTE_BASE = process.env.LH_REMOTE_BASE ? process.env.LH_REMOTE_BASE.trim() : ''
const USE_REMOTE = REMOTE_BASE.length > 0
const NORMALIZED_REMOTE_BASE = USE_REMOTE ? REMOTE_BASE.replace(/\/+$/, '') : ''
const BASE_URL = USE_REMOTE ? NORMALIZED_REMOTE_BASE : `http://localhost:${PORT}`
const TIMEOUT = 60000 // 60 seconds

/**
 * Extract unique page paths from navigation.generated.ts
 */
async function extractPagesFromNav() {
  const navPath = resolve(__dirname, '../docs/.vitepress/navigation.generated.ts')

  if (!existsSync(navPath)) {
    console.warn('⚠️  navigation.generated.ts not found, using default pages')
    return ['/', '/band-a', '/governance']
  }

  try {
    // Read the TypeScript file and parse it manually
    const content = readFileSync(navPath, 'utf-8')
    const pages = new Set()

    // Add homepage
    pages.add('/')

    // Use regex to extract link paths from the navigation structure
    // Match patterns like: link: '/some-path'
    const linkPattern = /link:\s*['"]([^'"]+)['"]/g
    let match

    while ((match = linkPattern.exec(content)) !== null) {
      const link = match[1]
      // Only add if it looks like a valid path (starts with /)
      if (link.startsWith('/')) {
        pages.add(link)
      }
    }

    // If no pages were found, use defaults
    if (pages.size === 1) {
      // Only has the homepage
      console.warn('⚠️  No pages found in navigation, using defaults')
      return ['/', '/band-a', '/governance']
    }

    return Array.from(pages).sort()
  } catch (err) {
    console.warn(`⚠️  Failed to load navigation file: ${err.message}`)
    return ['/', '/band-a', '/governance']
  }
}

// Pages to audit - will be populated from navigation
let PAGES = []

let serverProcess = null
let browser = null

/**
 * Start VitePress preview server
 */
async function startServer() {
  if (USE_REMOTE) return

  console.log('🚀 Starting VitePress preview server...')

  return new Promise((resolve, reject) => {
    serverProcess = spawn('pnpm', ['run', 'docs:preview'], {
      stdio: 'pipe',
      env: { ...process.env, PORT: String(PORT) }
    })

    serverProcess.stdout.on('data', data => {
      const output = data.toString()
      console.log(output)

      // VitePress logs "Local: http://localhost:5173/" when ready
      if (output.includes(`localhost:${PORT}`)) {
        console.log('✅ Preview server started')
        resolve()
      }
    })

    serverProcess.stderr.on('data', data => {
      console.error('Server error:', data.toString())
    })

    serverProcess.on('error', err => {
      reject(new Error(`Failed to start server: ${err.message}`))
    })

    // Timeout if server doesn't start
    setTimeout(() => {
      reject(new Error(`Server failed to start within ${TIMEOUT}ms`))
    }, TIMEOUT)
  })
}

/**
 * Wait for server to be responsive using Playwright
 */
async function waitForServer(maxAttempts = 30) {
  if (USE_REMOTE) return

  console.log('⏳ Waiting for server to be responsive...')

  browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await page.goto(`${BASE_URL}/`, {
        timeout: 2000,
        waitUntil: 'domcontentloaded'
      })

      if (response && response.ok()) {
        console.log('✅ Server is responsive')
        await context.close()
        return
      }
    } catch {
      console.log(`Attempt ${i + 1}/${maxAttempts} - waiting...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  await context.close()
  throw new Error('Server did not become responsive in time')
}

/**
 * Run Lighthouse audit on a single page
 */
async function runLighthouse(url) {
  console.log(`\n🔦 Auditing: ${url}`)

  return new Promise((resolve, reject) => {
    const lighthouse = spawn(
      'npx',
      [
        'lighthouse',
        url,
        '--output=json',
        '--output-path=stdout',
        '--chrome-flags=--headless',
        '--quiet',
        '--only-categories=performance,accessibility,best-practices,seo'
      ],
      {
        stdio: 'pipe'
      }
    )

    let output = ''
    let errorOutput = ''

    lighthouse.stdout.on('data', data => {
      output += data.toString()
    })

    lighthouse.stderr.on('data', data => {
      errorOutput += data.toString()
    })

    lighthouse.on('close', code => {
      if (code !== 0) {
        console.error(`Lighthouse failed for ${url}:`, errorOutput)
        reject(new Error(`Lighthouse exited with code ${code}`))
        return
      }

      try {
        const result = JSON.parse(output)
        const scores = {
          performance: Math.round(result.categories.performance.score * 100),
          accessibility: Math.round(result.categories.accessibility.score * 100),
          bestPractices: Math.round(result.categories['best-practices'].score * 100),
          seo: Math.round(result.categories.seo.score * 100)
        }

        console.log(`  Performance: ${scores.performance}`)
        console.log(`  Accessibility: ${scores.accessibility}`)
        console.log(`  Best Practices: ${scores.bestPractices}`)
        console.log(`  SEO: ${scores.seo}`)

        resolve({ url, scores, fullReport: result })
      } catch (err) {
        reject(new Error(`Failed to parse Lighthouse output: ${err.message}`))
      }
    })
  })
}

/**
 * Run all Lighthouse audits
 */
async function runAllAudits() {
  console.log('\n📊 Running Lighthouse audits on all pages...\n')

  const results = []
  for (const page of PAGES) {
    try {
      const result = await runLighthouse(`${BASE_URL}${page}`)
      results.push(result)
    } catch (err) {
      console.error(`Failed to audit ${page}:`, err.message)
      results.push({ url: page, error: err.message })
    }
  }

  return results
}

/**
 * Cleanup: stop server and close browser
 */
async function cleanup() {
  console.log('\n🧹 Cleaning up...')

  if (browser) {
    await browser.close()
  }

  if (!USE_REMOTE && serverProcess) {
    serverProcess.kill('SIGTERM')

    // Give it 5 seconds to terminate gracefully
    await new Promise(resolve => setTimeout(resolve, 5000))

    if (serverProcess.exitCode === null) {
      console.log('Force killing server process...')
      serverProcess.kill('SIGKILL')
    }
  }
}

/**
 * Generate summary report
 */
function generateSummary(results) {
  console.log('\n' + '='.repeat(60))
  console.log('📈 LIGHTHOUSE CI SUMMARY')
  console.log('='.repeat(60))

  let allPassed = true
  const thresholds = {
    performance: 90,
    accessibility: 100,
    bestPractices: 90,
    seo: 90
  }

  for (const result of results) {
    if (result.error) {
      console.log(`\n❌ ${result.url}: ERROR - ${result.error}`)
      allPassed = false
      continue
    }

    console.log(`\n🔗 ${result.url}`)

    for (const [category, score] of Object.entries(result.scores)) {
      const threshold = thresholds[category]
      const passed = score >= threshold
      const icon = passed ? '✅' : '❌'

      console.log(`  ${icon} ${category}: ${score} (threshold: ${threshold})`)

      if (!passed) {
        allPassed = false
      }
    }
  }

  console.log('\n' + '='.repeat(60))

  if (allPassed) {
    console.log('✅ All audits passed performance budgets!')
    return 0
  } else {
    console.log('❌ Some audits failed to meet performance budgets')
    return 1
  }
}

/**
 * Save results to file
 */
function saveResults(results) {
  const outputDir = resolve(__dirname, '../.lighthouse')
  mkdirSync(outputDir, { recursive: true })

  const outputPath = resolve(outputDir, `results-${Date.now()}.json`)
  writeFileSync(outputPath, JSON.stringify(results, null, 2))

  console.log(`\n💾 Full results saved to: ${outputPath}`)
}

/**
 * Main execution
 */
async function main() {
  let exitCode = 0

  try {
    // Extract pages from navigation
    console.log('📚 Loading pages from navigation.generated.ts...')
    PAGES = await extractPagesFromNav()
    console.log(`Found ${PAGES.length} pages to audit:`, PAGES)

    if (USE_REMOTE) {
      console.log(`🌐 Remote mode enabled. Auditing ${BASE_URL}`)
    } else {
      // Start server
      await startServer()

      // Wait for server to be ready
      await waitForServer()
    }

    // Run audits
    const results = await runAllAudits()

    // Save results
    saveResults(results)

    // Generate summary and determine exit code
    exitCode = generateSummary(results)
  } catch (err) {
    console.error('\n❌ Fatal error:', err.message)
    exitCode = 1
  } finally {
    await cleanup()
  }

  process.exit(exitCode)
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n⚠️  Received SIGINT, cleaning up...')
  await cleanup()
  process.exit(1)
})

process.on('SIGTERM', async () => {
  console.log('\n⚠️  Received SIGTERM, cleaning up...')
  await cleanup()
  process.exit(1)
})

// Run
main()
