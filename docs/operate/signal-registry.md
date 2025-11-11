---
title: Signal Registry
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 30
audience: 'Stewards keeping adoption, quality, and credibility signals current'
tone: 'Plainspoken, candid, energetic'
narrative_goal: 'List every signal, its source, refresh cadence, and kill criteria'
nav_group: Operate
nav_order: 95
nav_label: Signal Registry
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

# Signal Registry

This is the canonical list of metrics we publish every cycle. [Log a new signal](#signals-table) or [Run the Cloudflare analytics export](./cloudflare-analytics.md).

## Signals Table

All active signals share the same SLA: **refresh every 30 days** or raise an exception. The cap stays at eight.

| id                            | Name                     | Source                                                                                | Owner (@handle) | Refresh after days | Direction | Threshold / stop rule                     | Kill criteria                                    |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------- | --------------- | ------------------ | --------- | ----------------------------------------- | ------------------------------------------------ |
| `m-nav-open`                  | Navigation open rate     | Cloudflare analytics export (`nav_open` event via `scripts/cloudflare-analytics.mjs`) | @lop            | 30                 | Up good   | >= baseline + show 10% lift in pilot tags | Remove if nav instrumentation drops for >1 cycle |
| `m-time-to-answer`            | Time to answer           | Cloudflare analytics export (time-to-answer event)                                    | @lop            | 30                 | Down good | <= 60 seconds for 80% of tracked sessions | Drop if CTA instrumentation is disabled          |
| `m-lab-pass`                  | Annex lab pass rate      | `reports/labs.json` (Quick-Run + Proof Run)                                           | @lop            | 30                 | Up good   | >= 0.9, freeze if < 0.8                   | Remove when Verify-in-10 labs retire             |
| `m-defect-rate-changed-pages` | Defects per changed page | Link Drift + QA follow-ups recorded in `reports/labs.json`                            | @lop            | 30                 | Down good | <= 0.05; investigate if > 0.08            | Drop if defect tracking moves to another source  |
| `m-dashboard-freshness-days`  | Dashboard freshness      | Manual value in `reports/cloudflare-export.json > dashboard_freshness`                | @lop            | 30                 | Down good | <= 30 days; exception at 35+              | Remove if dashboards merge with State            |
| `m-decision-hit-rate`         | Decision hit rate        | Governance receipts + decision ledger                                                 | @lop            | 30                 | Up good   | >= 60% by second tag                      | Retire if decision receipts move to tooling      |
| `m-time-to-freeze`            | Time to freeze           | Exceptions log + freeze manager                                                       | @lop            | 30                 | Down good | <= 24 hours to activate a freeze trigger  | Remove if mitigations move to another platform   |
| `m-time-to-recovery`          | Time to recovery         | Exceptions log + Quick-Run receipts                                                   | @lop            | 30                 | Down good | <= 7 days to exit freeze                  | Remove if recovery tracking automates elsewhere  |

## How to add a signal

1. Gather the source and ensure it meets the privacy/ROI guardrails.
2. Add a new row to the table above with:
   - **id:** machine-readable key.
   - **Name:** human label.
   - **Source:** document the export or script.
   - **Owner:** GitHub handle of the steward.
   - **Refresh after days:** SLA for updating it.
   - **Direction:** “Up good” or “Down good.”
   - **Threshold:** When to raise a flag.
   - **Kill criteria:** When to stop collecting the signal.
3. Update any automation (scripts, workflows) that emits the signal.
4. Reference the new signal from Receipts or the relevant decision entry.

## Related references

- [Cloudflare analytics snapshot](./cloudflare-analytics.md)
- [State ledger](../navigate/state-ledger.md)
- [North Star & Guardrails](../operate/north-star-guardrails.md)
