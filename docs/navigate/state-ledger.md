---
title: State
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 30
nav_group: Navigate
nav_order: 15
nav_label: State
nav:
  - sidebar
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/adopt-deep-embed-north-star
date: '2025-11-09'
---

# Release state ledger

Keep the monthly state bundle predictable. [Open site-v2025.11](../../ops/releases/2025-11/index.md) or [Browse the State runbook](../operate/state-visibility.md).
Exit metric: readers act via the CTA pair within 60 seconds.

## site-v2025.11 (2025-11)

- Owner: @lop
- [Release bundle](../../ops/releases/2025-11/index.md)
- Decisions: [Navigation lanes decision](../decisions/navigation-lanes.md), [Cloudflare analytics decision](../decisions/cloudflare-analytics.md), [Release-centric ops folders](../decisions/release-folders.md), [Automate state and release pages](../decisions/automation-state-pages.md), [Verify-in-10 decision](../decisions/verify-in-10.md), [Deep-embed North Star governance decision](../decisions/adopt-deep-embed-north-star.md)
- Signals: [Analytics snapshot](../../reports/cloudflare-snapshot.json), [Cloudflare export template](../../reports/cloudflare-export.sample.json), [Labs report](../../reports/labs.json)
- Receipts: [State ledger entry](./state-ledger.md#site-v2025.11-2025-11), [State visibility runbook](../operate/state-visibility.md)
- Adoption: 3 pages touched / 1,740 views / median time-to-answer 51 s (Cloudflare analytics, 14-day window).
- Quality: Lab pass rate 1.00, broken links 0 (Quick-Run + Link Drift).
- Credibility: State page refreshed 12 days ago, 1 exception open / 2 resolved on time.
