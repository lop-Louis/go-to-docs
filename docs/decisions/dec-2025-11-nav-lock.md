---
title: lock navigation skeleton + redirect ledger
band: A
owner: '@lop'
refresh_after_days: 30
change_type: minor
status: live
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
date: '2025-11-11'
seam: navigation
decision_id: dec-2025-11-nav-lock
baseline_window: last-30-days
delta_type: people-capacity-risk
stop_rule: >-
  extend dual-run if 404s exceed threshold or > 5% of traffic hits /legacy
  after one cycle.
tags:
  - v2025.11-navigation
release_tag: site-v2025.11
success_metric: 404 crawl passes and /legacy traffic <5% during the freeze window.
related_contract: ../contracts/northbook-ia-overhaul.md
decision_link: /decisions/dec-2025-11-ia-overhaul.md
---

# Lock navigation skeleton + redirect ledger

Keep the deep-embed skeleton stable while we migrate. [Try the Navigate path](../navigate/index.md) or [See example route](../navigate/index.md#start-here).
Exit metric: 404 crawl passes and `/legacy` traffic stays < 5% during the freeze.

## context

During migration, users need a stable map. The four-bucket deep-embed skeleton must remain fixed while content moves, and old links must resolve.

## decision

Freeze the top-level IA at **navigate / operate / learn / mitigate** for one window. Publish `/legacy` with a dated banner. Maintain a lower-case, single-hop redirect ledger.

## scope

**In:** section landings, `/legacy` route/banner, and `redirect_ledger.csv`.  
**Out:** renaming bucket labels or adding new top-level sections in this window.

## acceptance

- Four section landings render opener pattern and tiny receipts panel.
- Redirect ledger committed; all entries lower-case, max one hop.
- 404 crawl passes for moved routes; `/legacy` banner visible and dated.
- Receipts attached to `v2025.11-navigation`.

## receipts (expected)

- leading: `m-nav-open` stable or ↑ on section landings.
- lagging: `m-time-to-answer` improves ≥ 10% vs baseline across top entries.

## freeze and exit

If 404s exceed threshold or > 5% of traffic hits `/legacy` after one cycle, extend dual-run and narrow scope of moves. Exit after crawl passes and `/legacy` traffic drops below 5%.

## links

- [state snapshot](../governance/state/v2025.11-governance.md)
- [receipts](../signals/receipts/v2025.11-navigate.md)
- [redirect ledger](../../ops/redirect_ledger.csv)
- [legacy banner](../../ops/legacy_banner)
- [guardrails index](../operate/guardrail-index)
