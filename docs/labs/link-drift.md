---
title: Link Drift · Proof Run
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
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

Find the answer. Use it now. [Run the Quick-Run](../navigate/quick-run) or [Open the Proof Run](../labs/link-drift).

## Goal

Ship a page without broken links in under 10 minutes.

## Steps

1. Build the docs

```bash
pnpm docs:build
```

Expect "Build complete."

2. Check links — already covered by the markdown lint + CTA guardrail. If you need extra assurance, run `pnpm run lint:md` (same command Quick-Run already calls).

## Pass/Fail

Pass if both commands exit 0 within 10 minutes. Otherwise fail, shrink scope, retry.
