#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

/**
 * Freeze Manager: Automates freeze/allowlist behavior for quality control
 *
 * Capabilities:
 * 1. Detect yellow-flag threshold breaches
 * 2. Block non-allowlisted areas during freeze
 * 3. Auto-unfreeze when counts drop below threshold
 */

const REPORTS_DIR = 'reports'
const YELLOW_FLAGS_FILE = path.join(REPORTS_DIR, 'yellow-flags.json')
const FREEZE_STATE_FILE = path.join(REPORTS_DIR, 'freeze-state.json')
const FREEZE_THRESHOLD = parseInt(process.env.FREEZE_THRESHOLD || '10', 10)
const UNFREEZE_THRESHOLD = parseInt(process.env.UNFREEZE_THRESHOLD || '5', 10)

// Allowlist: areas that can be modified even during freeze
const ALLOWLIST = [
  'docs/navigate/state-ledger.md',
  'docs/index.md',
  'README.md',
  '.github/workflows',
  'scripts/',
  'ops/releases',
  'tests/'
]

function loadYellowFlags() {
  if (!fs.existsSync(YELLOW_FLAGS_FILE)) {
    console.log('⚠️  No yellow-flags.json found. Run `pnpm guard` first.')
    return []
  }
  return JSON.parse(fs.readFileSync(YELLOW_FLAGS_FILE, 'utf8'))
}

function loadFreezeState() {
  if (!fs.existsSync(FREEZE_STATE_FILE)) {
    return {
      frozen: false,
      frozenAt: null,
      unfrozenAt: null,
      threshold: FREEZE_THRESHOLD,
      lastCount: 0
    }
  }
  return JSON.parse(fs.readFileSync(FREEZE_STATE_FILE, 'utf8'))
}

function saveFreezeState(state) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }
  fs.writeFileSync(FREEZE_STATE_FILE, JSON.stringify(state, null, 2), 'utf8')
}

function isAllowlisted(filePath) {
  return ALLOWLIST.some(pattern => filePath.startsWith(pattern))
}

function checkFreezeStatus() {
  const yellowFlags = loadYellowFlags()
  const flagCount = yellowFlags.length
  const state = loadFreezeState()

  console.log(`\n🔍 Freeze Manager Status Check`)
  console.log(`═══════════════════════════════`)
  console.log(`Current yellow flags: ${flagCount}`)
  console.log(`Freeze threshold: ${FREEZE_THRESHOLD}`)
  console.log(`Unfreeze threshold: ${UNFREEZE_THRESHOLD}`)
  console.log(`Current freeze state: ${state.frozen ? '🧊 FROZEN' : '✅ ACTIVE'}`)

  // Determine if we should freeze or unfreeze
  if (!state.frozen && flagCount >= FREEZE_THRESHOLD) {
    // Trigger freeze
    state.frozen = true
    state.frozenAt = new Date().toISOString()
    state.threshold = FREEZE_THRESHOLD
    state.lastCount = flagCount
    saveFreezeState(state)

    console.log(`\n🚨 FREEZE ACTIVATED`)
    console.log(`Yellow flag count (${flagCount}) exceeded threshold (${FREEZE_THRESHOLD})`)
    console.log(`Frozen at: ${state.frozenAt}`)
    console.log(`\nAllowlisted areas (can still be modified):`)
    ALLOWLIST.forEach(area => console.log(`  ✓ ${area}`))
    console.log(
      `\n::warning::Quality freeze activated - ${flagCount} yellow flags exceed threshold`
    )

    return { frozen: true, changed: true, flagCount }
  } else if (state.frozen && flagCount <= UNFREEZE_THRESHOLD) {
    // Trigger unfreeze
    state.frozen = false
    state.unfrozenAt = new Date().toISOString()
    state.lastCount = flagCount
    saveFreezeState(state)

    console.log(`\n✅ FREEZE LIFTED`)
    console.log(
      `Yellow flag count (${flagCount}) dropped below unfreeze threshold (${UNFREEZE_THRESHOLD})`
    )
    console.log(`Unfrozen at: ${state.unfrozenAt}`)
    console.log(`::notice::Quality freeze lifted - yellow flags resolved`)

    return { frozen: false, changed: true, flagCount }
  } else if (state.frozen) {
    console.log(
      `\n🧊 Freeze remains active (${flagCount} flags, need ≤${UNFREEZE_THRESHOLD} to unfreeze)`
    )
    state.lastCount = flagCount
    saveFreezeState(state)
    return { frozen: true, changed: false, flagCount }
  } else {
    console.log(`\n✅ No freeze needed (${flagCount} flags, need ≥${FREEZE_THRESHOLD} to freeze)`)
    state.lastCount = flagCount
    saveFreezeState(state)
    return { frozen: false, changed: false, flagCount }
  }
}

function checkFileAgainstFreeze(filePath) {
  const state = loadFreezeState()

  if (!state.frozen) {
    return {
      allowed: true,
      reason: 'No freeze in effect'
    }
  }

  if (isAllowlisted(filePath)) {
    return {
      allowed: true,
      reason: 'File is in allowlist'
    }
  }

  return {
    allowed: false,
    reason: `Quality freeze active - modify allowlisted areas only. Current yellow flags: ${state.lastCount}`
  }
}

// CLI interface
const command = process.argv[2] || 'check'

switch (command) {
  case 'check':
    checkFreezeStatus()
    break

  case 'verify-file': {
    const filePath = process.argv[3]
    if (!filePath) {
      console.error('Usage: freeze-manager.mjs verify-file <path>')
      process.exit(1)
    }
    const result = checkFileAgainstFreeze(filePath)
    console.log(JSON.stringify(result, null, 2))
    if (!result.allowed) {
      console.error(`\n❌ ${result.reason}`)
      process.exit(1)
    }
    console.log(`\n✅ ${result.reason}`)
    break
  }

  case 'status': {
    const state = loadFreezeState()
    console.log(JSON.stringify(state, null, 2))
    break
  }

  case 'allowlist': {
    console.log('Allowlisted areas:')
    ALLOWLIST.forEach(area => console.log(`  ${area}`))
    break
  }

  default:
    console.log(`
Freeze Manager - Quality Control Automation

Usage:
  node scripts/freeze-manager.mjs [command]

Commands:
  check              Check freeze status and update state (default)
  verify-file <path> Verify if a file can be modified during freeze
  status             Show current freeze state
  allowlist          Show allowlisted areas

Environment Variables:
  FREEZE_THRESHOLD   Flags needed to trigger freeze (default: 10)
  UNFREEZE_THRESHOLD Flags needed to lift freeze (default: 5)
`)
    break
}
