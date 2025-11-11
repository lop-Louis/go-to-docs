---
title: Decision — Release-centric ops folders
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-09'
next_review: '2026-01-15'
success_metric: Every release stores its ops artefacts under `ops/releases/YYYY-MM/`, Receipts and State link to the index, and CI guards the structure.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
---

# Release-centric ops folders

Cluster every release’s artefacts under one predictable directory. [Open the 2025‑11 bundle](../../ops/releases/2025-11/index.md) or [jump to the release manifest](../../ops/releases/2025-11/manifest.json).

## Intent

Give each release a self-contained folder so reviewers open `ops/releases/YYYY-MM/index.md` and instantly see the month’s Decisions, Signals, and Receipts.

## Tension

- Receipts, analytics, and decisions were scattered across `docs/`, `reports/`, and ad-hoc folders, making audits slow.
- Governance requires visible state + receipts + decisions per release.
- Structure must stay lightweight enough to maintain monthly and runnable locally.

## Guardrails and constraints

1. Keep everything local-first with deterministic naming (`YYYY-MM` folders, `YYYY-MM-DD-short-name` files).
2. CI enforces presence of `index.md` plus required frontmatter (owner, date, guardrail mapping, release tag).
3. State and Receipts surfaces must link back to the release folder so receipts are traceable.

## Options considered

| Option                               | Notes                                                  |
| ------------------------------------ | ------------------------------------------------------ |
| Ad-hoc folders                       | Zero work but impossible to audit.                     |
| Single flat release log              | One file, but conflicts and unreadable history.        |
| Release-centric directories (chosen) | Predictable path, easy to script, aligns with cadence. |

## Decision

Adopt release-centric directories. Create `ops/releases/YYYY-MM/` with an `index.md` capturing Decisions, Signals, Receipts plus links to artefacts. Update State/Receipts to reference the folder and add CI to guard the structure.

## Commitments

1. Build the pilot `ops/releases/2025-11/` with owner/date/guardrail mapping/release tag frontmatter and the standard sections.
2. Link the pilot index from State and Receipts pages.
3. Ship `scripts/release-folders-check.mjs` and wire it into CI to enforce naming and index presence.
4. Document the pattern inside the release bundle manifest and State ledger so every subsequent release follows the template.

## Proof / acceptance

- Every release folder includes a compliant `index.md`.
- Index pages list Decisions, Signals, Receipts with working links.
- State and Receipts surfaces point to the latest release index.
- CI blocks PRs when release folders drift.

## Stop rule

If locating artefacts in this structure takes >30 minutes per week across two cycles, open a follow-up decision with a revised structure (hybrid or flat).
