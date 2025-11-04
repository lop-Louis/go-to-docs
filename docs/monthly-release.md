---
title: Monthly Release Rhythm
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
---

# Monthly Release Rhythm

A lightweight cadence for publishing improvements and tracking impact.

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

| Signal                     | Healthy | Investigate |
| -------------------------- | ------- | ----------- |
| Build success              | ≥99%    | <98%        |
| Link errors/mo             | ≤5      | >8          |
| Stale pages                | ≤10%    | >20%        |
| Feedback ratio (helpful %) | ≥60%    | <40%        |

## Roles

- Maintainer (@lop) prepares tag
- Policy Owner (@manager-handle) reviews monthly changelog
- Team contributes improvements via normal PR flow

---

_This rhythm supports transparency and lean scope. Avoid bloating monthly tags with low-value changes._
