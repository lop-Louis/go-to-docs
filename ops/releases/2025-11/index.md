---
title: Release ops bundle · 2025-11
owner: '@lop'
date: '2025-11-09'
guardrail_mapping: governance-state
release_tag: site-v2025.11
status: live
---

# Release ops bundle · 2025-11

Monthly release artefacts live here. Follow the release folder decision for naming rules.

## Highlights

- **Adoption** — 3 pages touched / 1,740 views / median time-to-answer 51 s (Cloudflare analytics, 14-day window).
- **Quality** — Lab pass rate 1.00, broken links 0 (Quick-Run + Link Drift).
- **Credibility** — State page refreshed 12 days ago, 1 exception open / 2 resolved on time.

## Decisions

- [Navigation lanes decision](../../../docs/decisions/navigation-lanes.md)
- [Cloudflare analytics decision](../../../docs/decisions/cloudflare-analytics.md)
- [Release-centric ops folders](../../../docs/decisions/release-folders.md)
- [Automate state and release pages](../../../docs/decisions/automation-state-pages.md)
- [Verify-in-10 decision](../../../docs/decisions/verify-in-10.md)
- [Deep-embed North Star governance decision](../../../docs/decisions/dec-2025-11-ia-overhaul.md)

## Signals

- [Analytics snapshot](../../../reports/cloudflare-snapshot.json) — Generated via pnpm run analytics:snapshot
- [Cloudflare export template](../../../reports/cloudflare-export.sample.json) — Shows the expected sanitized structure
- [Labs report](../../../reports/labs.json) — Quick-Run + Proof Run lab results

## Receipts

- [State ledger entry](../../../docs/navigate/state-ledger.md#site-v2025.11-2025-11)
- [State visibility runbook](../../../docs/operate/state-visibility.md)
