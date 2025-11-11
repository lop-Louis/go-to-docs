---
title: Verify-in-10 (Guide)
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
audience: Operators and reviewers moving work from Verify to Live
tone: 'Plainspoken, candid, energetic'
narrative_goal: Explain when and why to run Verify-in-10 before using the lab
nav_group: Operate
nav_order: 35
nav_label: Verify-in-10 guide
nav:
  - sidebar
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

# Verify-in-10 (Guide)

Verify the work before you call it “done.” [Read the pattern](#why-it-exists) or [Run the 10-minute lab](../labs/verify-in-10).

## Why it exists

- **SLII alignment:** moves squads from SLII S3 (supporting) to S4 (delegating) with a clear exit.
- **SLI automation:** keeps `ops/releases/YYYY-MM/manifest.json` honest so the State ledger reflects the real stage.
- **Receipts:** every Verify run posts fresh adoption/quality/credibility metrics.

## When to use it

- Moving from Verify → Ready or Ready → Live.
- Rolling out a fix to an existing doc pattern.
- Logging receipts for a monthly release.

## The pattern (≤500 words)

1. **Scope recorded** — SLI stage + guardrail mapping logged. If you’re outside the guardrails, a time-boxed exception lives next to the change.
2. **Fold rules hold** — Primary/secondary CTA above the first section, Verify guide link visible when the page triggers this contract.
3. **Default tests pass** — Quick-Run and targeted labs pass; screenshots/terminal logs ready.
4. **Receipts posted** — Latest `pnpm run docs:guard` output attached, plus `reports/cloudflare-snapshot.json` refreshed.
5. **State fresh** — Manifest metrics updated; `pnpm run state:build` rerun; PR includes the regenerated bundle + State page.

> Need the actionable checklist? [Run the Verify-in-10 lab](../labs/verify-in-10) — it walks the same checkpoints in ≤10 minutes.

## Anti-patterns

| Anti-pattern                        | Fix                                                         |
| ----------------------------------- | ----------------------------------------------------------- |
| Treating Verify as “go look around” | Follow the lab; it’s small on purpose.                      |
| Skipping manifest updates           | No manifest update, no release. `state:check` fails CI.     |
| Double-publishing the checklist     | Guide explains **why**; lab owns the steps. Don’t mix them. |

## Example receipt

```
Verify-in-10 · site-v2025.11
- Scope: SLII S3 (Build → Verify), guardrail UI Delivery #2
- Quick-Run + Link Drift labs passed (logs attached)
- Cloudflare snapshot updated YYYY-MM-DD hh:mm UTC
- Manifest metrics updated, state:build rerun
```

## Related references

- [Verify-in-10 lab](../labs/verify-in-10.md)
- [SLI States](../navigate/sli-states.md)
- [State ledger](../navigate/state-ledger.md)
- [Release manifest workflow](../navigate/monthly-release.md)
