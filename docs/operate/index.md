---
title: Operate overview
mode: pilot
pilot_id: web_frontend_chapter_v1
owner: '@lop'
band: A
refresh_after_days: 60
change_type: patch
status: live
audience: People changing or running web frontend chapter ops
tone: 'Plainspoken, calm, practical'
narrative_goal: Keep ops changes on the small set of active pages
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: open_chapter_state
cta_secondary_label: open_steward_roster
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
date: '2025-11-15'
release_tag: site-v2025.11
nav:
  - none
search: false
list_label: Small set of ops pages in play for this pilot.
---

Use this when you are changing **how the chapter runs**—state, stewards, signals, or blockers. Everything else waits.

<PilotPageList bucket="operate" />

## What is live in Operate

- **Chapter state** — the current snapshot and what to read before ops time.  
  → [Open chapter state](../changelog/state/web-frontend)
- **Steward roster** — owners for scope, signals, and exceptions plus backups.  
  → [Open steward roster](./stewards)
- **Signals roster** — the two health checks (roster freshness, clear next step).  
  → [Open signals roster](../learn/signals-roster)
- **Cloud-access stub** — log and handle serious access blocks.  
  → [Open cloud-access stub](../mitigate/exception-cloud-access)

## If you are changing the system itself

The **ops contract** explains guardrails, exceptions, and receipts for this pilot.  
Read it when you are working **on** Northbook, not just using it.  
→ [Open ops contract](./ops-contract)
