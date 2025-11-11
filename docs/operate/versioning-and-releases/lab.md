---
title: Versioning & releases · Annex lab
band: A
owner: '@lop'
change_type: minor
status: live
refresh_after_days: 30
sidebar: false
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Run the lab
cta_secondary_label: Log receipts
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-operate-pilot.md
date: '2025-11-11'
---

Run this checklist right after updating the [Versioning & releases pilot page](./index.md). [Start the clock](#steps-≤10-minutes) or [Post the receipts](../../signals/receipts/v2025.11-releases.md).
Exit metric: lab runtime ≤10 minutes with ≥0.9 pass rate and no new L3 overrides for the slice.

::: tip Tiny receipts — Releases (v2025.11)

- m-lab-pass: 0.92 (versioning & releases pilot)
- m-defect-rate-changed-pages: 0.02
  [See the receipts](../../signals/receipts/v2025.11-releases.md)
  :::

## Preconditions

- `pnpm install` finished and `pnpm run docs:guard` is green on the current branch.
- Page updates staged at `docs/operate/versioning-and-releases/index.md`.
- Receipts + state files checked out: `docs/signals/receipts/v2025.11-releases.md`, `docs/releases/state/v2025.11-releases.md`.
- Release manifest (`ops/releases/2025-11/manifest.json`) available for telemetry notes.

## Steps (≤10 minutes)

1. **Opener + CTA check (2 min)** — Run `pnpm run ux:scan` and confirm opener pattern + CTA placement render above the first heading.
2. **Guardrail + traceability (2 min)** — Execute `pnpm run traceability:check` to prove CTAs map to `m-lab-pass` and `m-defect-rate-changed-pages`. Screenshot or copy the success lines for receipts.
3. **Docs guard (3 min)** — Run `pnpm run docs:guard` to catch sanitization, tone, and frontmatter issues. Capture the first green output.
4. **Update receipts + state (2 min)** — Append adoption/quality/credibility notes to `/signals/receipts/v2025.11-releases.md` and refresh `/releases/state/v2025.11-releases.md` with the latest owner, decisions, and metrics.
5. **Log telemetry (1 min)** — Update `reports/labs.json` via `pnpm run labs` (or run the single lab file with `node scripts/run-labs.mjs`). Commit the refreshed report plus release bundle references.

## Acceptance checks

- Opener and CTAs pass `ux:scan`; no CTA override required.
- `pnpm run traceability:check` and `pnpm run docs:guard` exit 0 with artifacts attached to the PR.
- `reports/labs.json` shows the versioning & releases lab entry with pass: true.
- Receipts and state snapshot mention the pilot tag `v2025.11-releases`.
- Release bundle lists the decision + pilot status.

## Rollback / stop rule

- If any step fails twice, stop the pilot, file an exception in `/governance/exceptions.md`, and revert the page until guardrails pass.
- If runtime exceeds 10 minutes for two consecutive runs, remove the newest checklist addition and open an issue tagged `kl,question` with the offending step.
- Resume only when the annex lab and receipts file both pass guardrails for one tag.

## Related references

- [Pilot page](./index.md)
- [Receipt log](../../signals/receipts/v2025.11-releases.md)
- [State ledger](../../navigate/state-ledger.md)
- [Release bundle](../../../../ops/releases/2025-11/index.md)
