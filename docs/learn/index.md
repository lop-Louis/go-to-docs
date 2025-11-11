---
title: Learn with proof
band: A
owner: '@lop'
refresh_after_days: 45
change_type: minor
status: live
audience: Measurement owners and reviewers publishing receipts
tone: plainspoken
narrative_goal: Keep dashboards refreshed and decisions backed by receipts
nav_group: Learn
nav_order: 30
nav_label: Learn
nav:
  - slot: main
    label: Learn
  - sidebar
bucket: learn
north_star_id: ns-001
guardrail_id: gr-105
cta_primary_label: Use this dashboard cadence
cta_secondary_label: See example receipts
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Learn with proof

Teach with receipts, not vibes. [Use this dashboard cadence](#keep-dashboards-fresh) or [See example receipts](../signals/receipts/v2025.11-learn.md).
Exit metric: dashboards refresh within 30 days and decision hit rate stays ≥ 60%.

::: tip Tiny receipts — Learn (v2025.11)

- m-dashboard-freshness-days: 9 days
- m-decision-hit-rate: 62%
  [See the receipts](../signals/receipts/v2025.11-learn.md)
  :::

## Keep dashboards fresh

1. **Start from the manifest** — Update `ops/releases/YYYY-MM/manifest.json` with owner, guardrail, and signal IDs before touching the chart.
2. **Refresh data on a cadence** — Run `pnpm run analytics:snapshot` (Cloudflare) and publish deltas inside 30 days. Capture the timestamp plus links in the PR.
3. **Regenerate State** — After dashboards update, run `pnpm run state:build` and stage `docs/navigate/state-ledger.md` so auditors see the change.

## Show the decision hit rate

- Map every metric to a decision ID (`decision_id` frontmatter + receipts entry) before you publish. Missing mappings trigger `pnpm run traceability:check`.
- Attach a short proof in `/signals/receipts/vYYYY.MM-learn.md` for each change: scope, metric delta, source file, owner.
- During a freeze, summarize adoption/quality/credibility in `ops/releases/<tag>/index.md` so the ledger stays green.

## Teach with runnable examples

- **Narrate the signal chain** — Each Learn article links `guardrail → signal → dashboard → receipt`. Use the [Signal registry](../operate/signal-registry.md) as the source of truth.
- **Keep labs under 10 minutes** — When you add a walkthrough, drop the steps into `/labs/` and wire them into `pnpm run labs` for telemetry.
- **Document anti-patterns** — Capture two “don’t do this” examples in every Learn guide so readers know how to keep receipts credible.

## Related references

- [Receipts & dashboards](./receipts.md)
- [Signal registry](../operate/signal-registry.md)
- [State ledger](../navigate/state-ledger.md)
- [Verify-in-10 guide](../operate/verify-in-10.md)
- [Release bundle · 2025-11](../../ops/releases/2025-11/index.md)
