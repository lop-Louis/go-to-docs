import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const TEST_DIR = 'tests/fixtures/docs-stale'
const STALE_SCRIPT = 'scripts/stale.mjs'

function createTestFile(filename, frontmatter, content, daysOld = 0) {
  const filePath = path.join(TEST_DIR, filename)
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v).replace(/"/g, '')}`)
    .join('\n')
  const fullContent = `---\n${fm}\n---\n\n${content}`
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, fullContent)

  // Adjust file mtime to simulate age
  if (daysOld > 0) {
    const oldDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000)
    fs.utimesSync(filePath, oldDate, oldDate)
  }

  return filePath
}

function runStale() {
  try {
    const result = execSync(`node ${STALE_SCRIPT}`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: { ...process.env }
    })
    return { success: true, output: result }
  } catch (error) {
    return { success: false, output: error.stdout + error.stderr }
  }
}

describe('Stale Detection - Basic Functionality', () => {
  before(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
    fs.mkdirSync(TEST_DIR, { recursive: true })
  })

  after(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
  })

  it('should report no stale pages when all are fresh', () => {
    // Create a fresh file
    createTestFile(
      'fresh.md',
      {
        title: 'Fresh Page',
        band: 'A',
        owner: '@test',
        refresh_after_days: 90,
        change_type: 'patch',
        status: 'live'
      },
      'Fresh content',
      0
    )

    const result = runStale()
    assert.strictEqual(result.success, true, 'Stale script should run successfully')
    assert.match(result.output, /No stale pages/i, 'Should report no stale pages')
  })
})

describe('Stale Detection - Age Calculation', () => {
  before(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
  })

  after(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
  })

  it('should detect pages past their refresh threshold', () => {
    fs.mkdirSync(TEST_DIR, { recursive: true })

    // Create a file that's 100 days old with 90-day threshold
    createTestFile(
      'old.md',
      {
        title: 'Old Page',
        band: 'A',
        owner: '@test',
        refresh_after_days: 90,
        change_type: 'patch',
        status: 'live'
      },
      'Old content',
      100
    )

    const result = runStale()
    assert.strictEqual(result.success, true, 'Stale script should run')
    assert.match(result.output, /stale/i, 'Should detect stale page')
    assert.match(result.output, /old\.md/i, 'Should list the stale file')
  })

  it('should not flag pages within their refresh window', () => {
    fs.rmSync(TEST_DIR, { recursive: true })
    fs.mkdirSync(TEST_DIR, { recursive: true })

    // Create a file that's 50 days old with 90-day threshold
    createTestFile(
      'recent.md',
      {
        title: 'Recent Page',
        band: 'A',
        owner: '@test',
        refresh_after_days: 90,
        change_type: 'patch',
        status: 'live'
      },
      'Recent content',
      50
    )

    const result = runStale()
    assert.match(result.output, /No stale pages/i, 'Should not flag recent pages')
  })
})

describe('Stale Detection - Report Format', () => {
  before(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
    fs.mkdirSync(TEST_DIR, { recursive: true })
  })

  after(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
  })

  it('should generate markdown table format', () => {
    createTestFile(
      'stale1.md',
      {
        title: 'Stale Page',
        band: 'A',
        owner: '@test',
        refresh_after_days: 30,
        change_type: 'patch',
        status: 'live'
      },
      'Content',
      45
    )

    const result = runStale()
    assert.match(result.output, /\|.*\|.*\|/, 'Should contain markdown table')
    assert.match(result.output, /Page.*Age.*Threshold/i, 'Should have table headers')
  })

  it('should include owner information in report', () => {
    fs.rmSync(TEST_DIR, { recursive: true })
    fs.mkdirSync(TEST_DIR, { recursive: true })

    createTestFile(
      'owned.md',
      {
        title: 'Owned Page',
        band: 'A',
        owner: '@alice',
        refresh_after_days: 30,
        change_type: 'patch',
        status: 'live'
      },
      'Content',
      45
    )

    const result = runStale()
    assert.match(result.output, /@alice/i, 'Should include owner in report')
  })
})

describe('Stale Detection - Severity Levels', () => {
  before(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
    fs.mkdirSync(TEST_DIR, { recursive: true })
  })

  after(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true })
    }
  })

  it('should flag severely stale pages (2x threshold)', () => {
    createTestFile(
      'ancient.md',
      {
        title: 'Ancient Page',
        band: 'A',
        owner: '@test',
        refresh_after_days: 60,
        change_type: 'patch',
        status: 'live'
      },
      'Very old content',
      150
    )

    const result = runStale()
    assert.match(result.output, /severely stale|priority/i, 'Should flag severe staleness')
  })
})

console.log('✅ All stale detection tests configured')
