---
title: Receipts & dashboards
band: A
owner: '@lop'
refresh_after_days: 30
change_type: minor
status: live
audience: Measurement owners and reviewers
tone: plainspoken
narrative_goal: Keep dashboards fresh and decisions receipt-backed
nav_group: Learn
nav_order: 2
nav_label: Receipts & dashboards
nav:
  - sidebar
bucket: learn
north_star_id: ns-001
guardrail_id: gr-105
cta_primary_label: Use this cadence
cta_secondary_label: See example receipts
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Receipts & dashboards

Teach with proof, not vibes. [Use this cadence](#keep-dashboards-stale-free) or [See example receipts](../signals/receipts/v2025.11-learn.md).
Exit metric: dashboards refresh inside 30 days and decision hit rate ≥ 60%.

::: tip Tiny receipts — Learn (v2025.11)

- m-dashboard-freshness-days: 9 days
- m-decision-hit-rate: 62%
  [See the receipts](../signals/receipts/v2025.11-learn.md)
  :::

## Keep dashboards stale-free

1. **Update the manifest first** — Fill in owner, guardrail, and signal IDs in `ops/releases/YYYY-MM/manifest.json` before touching a chart.
2. **Snapshot + log** — Run `pnpm run analytics:snapshot`, attach the timestamp/logs to your PR, and note the delta in `/signals/receipts/vYYYY.MM-learn.md`.
3. **Regenerate State** — After merging, run `pnpm run state:build` so [State](../navigate/state-ledger.md) reflects the fresh metrics.

## Map signals to decisions

- Every metric must link `decision → guardrail → signal → receipt`. Missing links fail `pnpm run traceability:check`.
- When a dashboard forces an exception, log the `exc-` entry with expiry + exit criteria in [exceptions](../governance/exceptions.md).
- Receipts roll into the [release bundle](../../ops/releases/2025-11/index.md); keep owners + timestamps visible.

## Related references

- [Signal registry](../operate/signal-registry.md)
- [Start Here](../start-here/index.md)
- [Navigate state ledger](../navigate/state-ledger.md)
- [Verify-in-10 guide](../operate/verify-in-10.md)
