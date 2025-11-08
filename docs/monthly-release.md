---
title: Monthly Release Rhythm
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Maintainers planning and shipping the monthly docs release
tone: Plainspoken, candid, energetic
narrative_goal: Explain how the monthly tagging cadence keeps the site current
nav_group: Start
nav_order: 30
nav_label: Monthly cadence
nav:
  - sidebar
---

# Monthly Release Rhythm

This cadence keeps the public docs fresh each month and records what changed. <a href="#goals" data-primary-action>Run the prep checklist</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>.

## Goals

- Keep public documentation fresh and intentionally small
- Capture meaningful changes in one tagged snapshot
- Support governance reviews with transparent change log

## Tag Format

```
site-vYYYY.MM
```

Example: `site-v2025.11`

## When

- First business day of each month
- Skip tag if no substantive changes (patch-only changes OK to roll up)

## Preparation Checklist

1. Merge outstanding approved PRs
2. Run `npm run guard` (no red failures)
3. Run `npm run docs:build` (build success)
4. Review stale report and address critical items
5. Update `CHANGELOG.md` with sections below

## Changelog Template

```markdown
## site-vYYYY.MM (YYYY-MM-DD)

### Added

- New: Accessibility Quick Wins page

### Updated

- Decision Spine: clarified review stage

### Fixed

- Removed outdated facilitation example

### Metrics (last 30 days)

- Pages viewed: ~X
- Feedback issues opened: X helpful / X not-helpful
- Stale pages at tag time: X
- Shared metric snapshot: see [shared metric visibility runbook](./runbooks/shared-metric-visibility.md)

### Policy / Governance

- No changes OR Updated governance SLO wording

### Next Focus

- Improve FAQ discoverability
- Expand ledger pattern examples
```

## Tagging Steps

```bash
# Generate changelog section first (manual edit or script)
node scripts/changelog.mjs >> CHANGELOG.md

# Commit changelog update
git add CHANGELOG.md
git commit -m "chore: update changelog for site-v2025.11"

# Create and push tag
git tag site-v2025.11
git push origin site-v2025.11
```

## Metrics Sources

- Page views: (Analytics dashboard if configured)
- Feedback: GitHub issues with `feedback` label
- Stale count: Weekly stale report issue data
- Shared metric: Update via the [shared metric visibility](./runbooks/shared-metric-visibility.md) template before tagging

## Governance Review

- Confirm SLO adherence (build success rate, link errors, stale %)
- Identify pages to archive next cycle
- Re-evaluate forbidden pattern list in `scripts/guard.mjs`

## Sunset Criteria (Monthly Lens)

Sunset or pivot if after 2 consecutive tags:

- Views near zero
- No feedback issues
- No questions closed with doc links

## Health Signals

| Signal | Healthy | Investigate |
|

## Related references

- [Release receipts](./receipts/index) — Publish the highlights from each tag here.
- [Shared metric visibility](./runbooks/shared-metric-visibility.md) — Update metrics before locking the changelog.
- [Transition operating promises](./runbooks/transition-operating-promises.md) — Align monthly commitments with the promises table if cadence slips.
