---
title: Signal Registry
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 30
audience: Stewards keeping adoption, quality, and credibility signals current
tone: Plainspoken, candid, energetic
narrative_goal: List every signal, its source, refresh cadence, and kill criteria
nav_group: Operate
nav_order: 95
nav_label: Signal Registry
nav:
  - sidebar
---

# Signal Registry

This is the canonical list of metrics we publish every cycle. [Log a new signal](#signals-table) or [Run the Cloudflare analytics export](./cloudflare-analytics.md).

## Signals Table

| id                                | Name                        | Source                                                                                 | Owner                    | Refresh after days | Direction | Threshold / stop rule                         | Kill criteria                                        |
| --------------------------------- | --------------------------- | -------------------------------------------------------------------------------------- | ------------------------ | ------------------ | --------- | --------------------------------------------- | ---------------------------------------------------- |
| `adoption.pages_touched`          | Pages touched (14d)         | Cloudflare export (converted via `scripts/cloudflare-analytics.mjs`)                   | Analytics steward (@lop) | 14                 | Up good   | ≥ 10 unique paths touched; investigate if < 5 | Remove if Cloudflare export unavailable for 2 cycles |
| `adoption.time_to_answer`         | Median time-to-answer (ms)  | Cloudflare export (median page load/time-to-answer events)                             | Analytics steward        | 14                 | Down good | ≤ 60,000 ms for 80% of sessions               | Drop if CTA instrumentation is disabled              |
| `quality.lab_pass_rate`           | Lab pass rate               | `reports/labs.json` (Quick-Run + Proof Run)                                            | Labs steward (@lop)      | 7                  | Up good   | ≥ 0.9; treat < 0.8 as yellow                  | Remove when labs are retired                         |
| `quality.broken_links`            | Broken links per cycle      | Markdown lint + Cloudflare export `broken_links` field                                 | Docs operator            | 7                  | Down good | 0 blocking links; > 0 triggers fix-it         | Drop if link validation moves elsewhere              |
| `credibility.state_fresh`         | State page freshness        | Manual value in `reports/cloudflare-export.json > credibility.state_fresh_within_days` | Governance steward       | 30                 | Down good | ≤ 30 days old                                 | Remove if State page merges into another surface     |
| `credibility.exceptions_resolved` | Exceptions resolved on time | Exceptions log aggregated via script                                                   | Governance steward       | 14                 | Up good   | 100% on-time resolution                       | Retire if exception tracking moves to tooling        |

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
