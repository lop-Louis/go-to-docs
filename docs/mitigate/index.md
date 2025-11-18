---
title: Mitigate overview
mode: pilot
pilot_id: web_frontend_chapter_v1
owner: '@lop'
band: A
refresh_after_days: 60
change_type: patch
status: pilot
audience: People facing blockers and wanting to handle them in the open
tone: 'Plainspoken, calm, practical'
narrative_goal: Help people log serious blocks and use the cloud-access stub without drama
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: open_cloud_exception
cta_secondary_label: raise_exception
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
date: '2025-11-15'
release_tag: site-v2025.11
nav:
  - none
search: false
list_label: >
  Where we park the ugly stuff for this pilot: blocks, exceptions, and how we decide what to do
  about them.
---

Use this when work is **blocked** and you need an open, safe path forward.

<PilotPageList bucket="mitigate" />

## What is live in Mitigate

- **Cloud-access stub** — log the blocker, owner, expiry, and safe fallback.  
  → [Open cloud-access stub](./exception-cloud-access)
- **Who to ask** — use the steward roster if you are unsure whether it belongs here.  
  → [Open steward roster](../operate/stewards)

If it is not about a real blocker, it stays out of Mitigate for now.
