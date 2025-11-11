---
title: Release receipts (archived)
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 90
status: archived
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

Release receipts now live in the automated State ledger. [Open the State ledger](../navigate/state-ledger.md) or [Browse the release bundles](../../ops/releases).

- Open [`/navigate/state-ledger`](../navigate/state-ledger.md) to see the latest site-vYYYY.MM entry with adoption/quality/credibility highlights.
- Each entry is generated from `ops/releases/YYYY-MM/manifest.json`; update the manifest and run `pnpm run state:build` whenever you tag a release.
- For raw metrics (analytics snapshot, labs report, exceptions), refer to the files referenced in the manifest (e.g., `reports/cloudflare-snapshot.json`, `reports/labs.json`).

This page remains only to redirect old bookmarks.
