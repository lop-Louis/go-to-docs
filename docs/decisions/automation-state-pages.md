---
title: Decision — Automate state and release pages
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-09'
next_review: '2026-01-15'
success_metric: >-
  State page and release indices regenerate automatically from ops metadata
  within 10 minutes and fail CI when out of sync.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Automate State and release pages

Keep the State page, release indices, and cross-links generated off the same release metadata source of truth. [Open the latest bundle](../../ops/releases/2025-11/index.md) or [review the State visibility runbook](../operate/state-visibility.md) for context.

## Intent

Make State, Receipts, and release indices regenerate from manifests so editors stop hand-syncing three surfaces. The goal is one command, one schema, zero guesswork.

## Tension

- Release folders already centralize artefacts; manual markdown edits now duplicate manifest data.
- Every change must stay local-first, stay under the 10-minute CI budget, and honor the guardrail that generated files still show owner, date, guardrail mapping, and release tag.
- Without automation, State/Receipts fall out of sync and the ledger loses credibility.

## Guardrails and constraints

1. Generator runs locally and in CI inside 10 minutes.
2. Output files keep the required frontmatter plus Decisions, Signals, and Receipts sections.
3. CI blocks any drift between manifests and generated markdown.

## Options considered

| Option                                   | Outcome                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| Manual edits (status quo)                | Slow, error-prone, no single source of truth.                      |
| Partial automation                       | Only the State page regenerates, release folders stay manual.      |
| Full manifest-driven generation (chosen) | One script emits release indices and State, CI enforces freshness. |

## Decision

Adopt full manifest-driven generation. One Node script reads `ops/releases/YYYY-MM/manifest.json`, emits deterministic `index.md` files and `docs/navigate/state-ledger.md`, and runs as part of `pnpm run docs:guard` plus a dedicated CI step. This keeps receipts visible, enforces frontmatter, and removes duplicate editing.

## Commitments

1. Build the generator script and land fixtures for a pilot release.
2. Wire the script into local guardrails and CI (`pnpm run state:check`) so PRs fail when regeneration is needed.
3. Update the release bundle, State ledger, and relevant runbooks with the new workflow.

## Proof / acceptance

- Generator finishes locally and in CI in under 10 minutes.
- Generated files keep owner/date/guardrail mapping/release tag and list Decisions, Signals, Receipts.
- State page reflects the latest release and links to all bundles.
- CI fails when `pnpm run state:check` detects pending changes.

## Stop rule

If the automation pushes CI beyond 10 minutes or flakes more than 5% of builds across two cycles, pause it, revert to manual updates, and work a follow-up decision before retrying.
