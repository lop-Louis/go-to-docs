---
title: Versioning & releases pilot
band: A
owner: '@lop'
change_type: minor
status: live
refresh_after_days: 30
audience: Operate stewards and reviewers wiring release proofs
tone: plainspoken
narrative_goal: Show how to ship the opener pattern plus annex lab for versioning & releases
nav_group: Operate
nav_order: 48
nav_label: Versioning & releases
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-operate-pilot.md
date: '2025-11-11'
---

# Versioning & releases pilot

Ship the first Operate slice that proves deep-embed with receipts. [Draft the page skeleton](#ship-the-page) or [Run the annex lab](./lab.md).
Exit metric: annex lab pass rate ≥ 0.9 with receipts and state snapshot logged under `v2025.11-releases`.

::: tip Tiny receipts — Releases (v2025.11)

- m-lab-pass: 0.92 across versioning & releases pilot runs
- m-defect-rate-changed-pages: 0.02 for touched Operate assets
  [See the receipts](../../signals/receipts/v2025.11-releases.md)
  :::

## Why this slice exists

- **Proof over promise** — We need one Operate page that shows opener pattern, telemetry, annex lab, and receipts before cloning the approach.
- **Reversible by default** — Two CTAs (“Draft the skeleton” / “Run the lab”) keep changes testable; any override is logged at L3 with expiry.
- **Traceable** — Readers can walk `decision → guardrail → page → annex lab → receipts` without leaving the seam.

## Ship the page

1. **Hold the opener pattern** — One-sentence “why,” two reversible CTAs, and an exit metric must render above the first heading. `pnpm run ux:scan` verifies the fold.
2. **Embed the contract** — Frontmatter includes `bucket`, `north_star_id`, `guardrail_id`, metrics, and `decision_link`. `pnpm run frontmatter:lint` blocks gaps.
3. **Surface receipts inline** — Tiny receipts panel links to `/signals/receipts/v2025.11-releases.md` and states the guardrail budget (0.9 lab pass, ≤0.05 defects).
4. **Keep copy within ~600 px** — Readers should see the why, two actions, exit metric, and receipts without scrolling.

## Wire telemetry & traceability

- **Signals** — Both CTAs map to `m-lab-pass` (leading) and `m-defect-rate-changed-pages` (lagging). `pnpm run traceability:check` enforces the link between CTAs, signals, and receipts.
- **Labs** — `pnpm run labs` executes the annex config (`labs/versioning-and-releases.lab.json`) and records output in `reports/labs.json`.
- **Receipts + state** — Update `/signals/receipts/v2025.11-releases.md` and `/releases/state/v2025.11-releases.md` after every run so adoption/quality/credibility stay fresh.
- **CI budget** — Guardrails stay nudges unless sanitation or traceability fails. Lab runtime ≤10 minutes keeps the seam within the release budget.

## Publish receipts & exit criteria

1. Attach the latest `reports/labs.json` excerpt plus analytics snapshot for the slice to the PR.
2. Add a short adoption/quality/credibility note to `docs/signals/receipts/v2025.11-releases.md`.
3. Update the release bundle (`ops/releases/2025-11/index.md`) and state snapshot (`/releases/state/v2025.11-releases.md`) so auditors can trace the pilot.
4. Freeze the slice if pass rate drops below 0.80 or if two L3 overrides occur during the window; resume only after receipts recover for one full tag.

## Related references

- [Annex lab](./lab.md)
- [Operate playbook canon](../index.md)
- [IA overhaul contract](../../contracts/northbook-ia-overhaul.md)
- [Pilot decision](../../decisions/dec-2025-11-operate-pilot.md)
