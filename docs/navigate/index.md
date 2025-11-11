---
title: Navigate lane
band: A
owner: '@lop'
refresh_after_days: 60
change_type: minor
status: live
last_reviewed: '2025-11-10'
audience: People keeping the map stable while content moves
tone: 'Plainspoken, directive'
narrative_goal: Keep the four-bucket skeleton and redirect ledger honest
nav_group: Navigate
nav_order: 1
nav_label: Navigate
nav:
  - sidebar
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Navigate lane

Keep the four-bucket map stable while content moves. [Open Start Here](../start-here/) or [Check the SLI map](./sli-states).
Exit metric: 404 crawl passes and `/legacy` traffic stays <5% during the freeze.

::: tip Tiny receipts — Navigate (v2025.11)

- Nav skeleton: 4-of-4 buckets visible with opener pattern
- `/legacy` traffic: 3.4% (Cloudflare 7-day lookback)
  [See the receipts](../signals/receipts/v2025.11-navigate.md)
  :::

## Hold the frame

1. **Lock the buckets** — Home hero + top nav must show Navigate · Operate · Learn · Mitigate every release.
2. **Mirror the opener** — Each landing keeps one sentence why, two CTAs, and an exit metric above the first heading.
3. **Surface receipts** — Link the seam receipts for every landing (Navigate uses `v2025.11-navigate`).

Use [Start Here](../start-here/) for orientation copy; keep this page focused on the governance skeleton.

## Redirects & legacy

- `/legacy` renders the [published banner](../../ops/legacy_banner.md) and points visitors to `/start-here/`.
- Every moved path lands in [`ops/redirect_ledger.csv`](../../ops/redirect_ledger.csv) with lower-case, single-hop entries.
- Run [Link Integrity](../operate/link-integrity.md) plus Link Drift before shipping nav changes; 404s stop the freeze exit.

## Receipts & monitoring

- `/legacy` traffic stays <5% — track via Cloudflare nav dashboard and log deltas in [Navigate receipts](../signals/receipts/v2025.11-navigate.md).
- 404 crawl = 0 blockers — tie runs to `pnpm run drift:check` and capture proof in the release bundle.
- Exceptions older than 14 days halt moves; close them or stop migrating until they’re green.

## Related references

- [Wayfinding shortcuts](./find.md) — Keeps the quick links honest.
- [Band A guardrails](./band-a.md) — Sanitization rules this lane enforces.
- [Monthly cadence](./monthly-release.md) — Where we log nav changes + receipts.
- [Quick-Run check](./quick-run.md) — Required before escalating nav regressions.
