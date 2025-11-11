---
title: Release receipts (archived)
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 90
status: archived
---

Release receipts now live in the automated State ledger. [Open the State ledger](../navigate/state-ledger.md) or [Browse the release bundles](../../ops/releases).

- Open [`/navigate/state-ledger`](../navigate/state-ledger.md) to see the latest site-vYYYY.MM entry with adoption/quality/credibility highlights.
- Each entry is generated from `ops/releases/YYYY-MM/manifest.json`; update the manifest and run `pnpm run state:build` whenever you tag a release.
- For raw metrics (analytics snapshot, labs report, exceptions), refer to the files referenced in the manifest (e.g., `reports/cloudflare-snapshot.json`, `reports/labs.json`).

This page remains only to redirect old bookmarks.
