import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const FIXTURE_DIR = path.join('tests', 'fixtures', 'smoke-nav')
const NAV_FILE = path.join(FIXTURE_DIR, 'navigation.generated.ts')
const OUTPUT_FILE = path.join(FIXTURE_DIR, 'smoke-targets.json')
const SCRIPT = 'scripts/generate-smoke-targets.mjs'

function runSmokeGenerator() {
  execSync(`node ${SCRIPT} --nav ${NAV_FILE} --output ${OUTPUT_FILE}`, {
    stdio: 'inherit',
    env: process.env
  })
  return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'))
}

describe('generate-smoke-targets', () => {
  before(() => {
    fs.mkdirSync(FIXTURE_DIR, { recursive: true })
    fs.writeFileSync(
      NAV_FILE,
      `import { DefaultTheme } from 'vitepress'
export const generatedNav = [
  { text: 'Start here', link: '/start-here' },
  { text: 'Operate', link: '/operate/' },
  { text: 'Learn', link: '/learn' },
  { text: 'Operate (duplicate)', link: '/operate/' },
  { text: 'Root', link: '/' }
] as DefaultTheme.NavItem[]

export const generatedSidebar = [] as DefaultTheme.Sidebar
`
    )
  })

  after(() => {
    if (fs.existsSync(FIXTURE_DIR)) {
      fs.rmSync(FIXTURE_DIR, { recursive: true })
    }
  })

  it('normalizes, de-duplicates, and preserves nav order', () => {
    const payload = runSmokeGenerator()
    assert.deepEqual(payload.topNav, ['/start-here/', '/operate/', '/learn/', '/'])
  })
})
