---
title: Monthly Release Rhythm
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Maintainers planning and shipping the monthly docs release
tone: 'Plainspoken, candid, energetic'
narrative_goal: Explain how the monthly tagging cadence keeps the site current
nav_group: Navigate
nav_order: 30
nav_label: Monthly cadence
nav:
  - sidebar
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# Monthly Release Rhythm

This cadence keeps the public docs fresh each month and records what changed. [Run the prep checklist](#preparation-checklist) or [Browse the runbooks index](../operate/runbooks-index).

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

1. Merge outstanding approved PRs.
2. Run `pnpm run docs:guard` and fix red failures.
3. Refresh analytics + labs: `pnpm run analytics:snapshot` and rerun the relevant labs (`pnpm run labs` or Quick-Run/Proof Run) so `reports/labs.json` is current.
4. Update `ops/releases/YYYY-MM/manifest.json`, then run `pnpm run state:build` to regenerate `ops/releases/YYYY-MM/index.md` and `docs/navigate/state-ledger.md`.
5. Update the manifest `metrics` block with the adoption, quality, and credibility summary for the month so the State ledger reflects the human-friendly view.

## Release Manifest Template

Create `ops/releases/YYYY-MM/manifest.json` (copy the previous month) and fill:

```jsonc
{
  "title": "Release ops bundle · 2025-11",
  "owner": "@lop",
  "date": "YYYY-MM-DD",
  "guardrail_mapping": "governance-state",
  "release_tag": "site-v2025.11",
  "status": "live",
  "summary": "Monthly release artefacts live here.",
  "decisions": [{ "title": "Example decision", "path": "docs/decisions/example.md" }],
  "signals": [{ "title": "Analytics snapshot", "path": "reports/cloudflare-snapshot.json" }],
  "receipts": [
    { "title": "State ledger entry", "path": "docs/navigate/state-ledger.md#site-v2025.11-2025-11" }
  ]
}
```

Run `pnpm run state:build` to regenerate `ops/releases/YYYY-MM/index.md` and `docs/navigate/state-ledger.md`, then commit those files with the manifest. This keeps the State ledger and release bundle in sync.

## Tagging Steps

```bash
# Refresh analytics snapshot and labs (if applicable)
pnpm run analytics:snapshot

# Update release manifest and regenerate state bundle
pnpm run state:build

# Commit manifest + generated files
git add ops/releases/YYYY-MM docs/navigate/state-ledger.md
git commit -m "release: bundle site-vYYYY.MM"

# Create and push tag after review
git tag site-vYYYY.MM
git push origin site-vYYYY.MM
```

## Metrics Sources

- Page views / time-to-answer: `pnpm run analytics:snapshot` (Cloudflare export)
- Feedback / labs: [`reports/labs.json`](../../reports/labs.json) and the [Link Drift Proof Run](../labs/link-drift.md)
- Stale count: Weekly stale report issue data
- Shared metric: Update via the [shared metric visibility](../operate/shared-metric-visibility.md) template before updating the manifest

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

- [State ledger](./state-ledger) — Generated from the release manifests.
- [Shared metric visibility](../operate/shared-metric-visibility.md) — Update metrics before locking the manifest.
- [Transition operating promises](../operate/transition-operating-promises.md) — Align monthly commitments with the promises table if cadence slips.
