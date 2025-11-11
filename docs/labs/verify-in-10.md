---
title: Verify-in-10 · Lab
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 45
status: live
sidebar: false
bucket: learn
north_star_id: ns-001
guardrail_id: gr-105
cta_primary_label: Learn more dashboards
cta_secondary_label: See example receipts
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

Run this checklist in ≤10 minutes after reading the [Verify-in-10 guide](../operate/verify-in-10.md). [Run the lab](#steps) or [Log your receipts](../navigate/state-ledger.md).
Exit metric: dashboards refresh within 30 days and decision hit rate stays ≥ 60%.

::: tip Tiny receipts — Learn (v2025.11)

- m-dashboard-freshness-days: 9 days
- m-decision-hit-rate: 62%
  [See the receipts](../signals/receipts/v2025.11-learn.md)
  :::

## Preconditions

- SLI stage and guardrail mapping logged (or exception ID ready).
- `pnpm install` and `pnpm run docs:guard` available locally.
- Latest manifest file (`ops/releases/YYYY-MM/manifest.json`) checked out.

## Steps (≤10 minutes)

1. **Scope check (1 min)** — Confirm SLI stage + guardrail ID (or exception). Update manifest `decisions` if needed.
2. **Fold rules (2 min)** — Verify opener + CTAs render above the first section and the Verify guide link is visible when required.
3. **Tests + labs (3 min)** — Run `pnpm run docs:guard` (or targeted labs). Capture the first successful output for receipts.
4. **Receipts + snapshot (2 min)** — Refresh analytics snapshot (`pnpm run analytics:snapshot`) if adoption data changed.
5. **State build (2 min)** — Edit manifest metrics, run `pnpm run state:build`, stage `ops/releases/YYYY-MM/index.md` + `do../navigate/state-ledger.md`.

## Acceptance checks

- Guardrail mapping or exception recorded.
- CTA fold rules pass; Verify link visible when required.
- `pnpm run docs:guard` exits 0; logs attached to PR.
- Manifest metrics updated; `pnpm run state:build` rerun; outputs staged.
- Receipts (manifest + snapshot) referenced in PR or release notes.

## Rollback / stop rule

- If any step fails twice, stop and fix the underlying issue (CTA contract, tests, manifest). Don’t ship until the lab runs clean in ≤10 minutes.
- If the lab consistently exceeds 10 minutes, roll back the last checklist addition and file a `kl,question` issue with the failing step.

## Related references

- [Verify-in-10 guide](../operate/verify-in-10.md)
- [State ledger](../navigate/state-ledger.md)
- [Monthly release workflow](../navigate/monthly-release.md)
