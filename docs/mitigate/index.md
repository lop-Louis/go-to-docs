---
title: Mitigate lane · Web frontend pilot
owner: '@louis'
band: A
refresh_after_days: 60
change_type: patch
status: live
audience: People facing blockers and wanting to handle them in the open
tone: 'Plainspoken, calm, practical'
narrative_goal: Help people log serious blocks and use the cloud-access stub without drama
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
date: '2025-11-15'
release_tag: site-v2025.11
nav:
  - none
search: false
---

Use this page when something is **blocking work** and you want to handle it in the open, not in private chats.

Exit metric: you leave knowing whether your blocker belongs in the **cloud-access stub** or somewhere else, and what to do next.  
Most pilot-era blocks go here:

- [Open cloud-access stub](./exception-cloud-access)
- [See who owns exceptions](../operate/stewards)

## What “Mitigate” means in this pilot

This lane is about handling trouble:

- access gaps
- process issues that stall work
- things that keep repeating but never quite get fixed

In the pilot, we start with one concrete case: **cloud-platform access** problems for people doing DevOps and delivery work.

## Cloud-access blocks

Use the **cloud-access exception stub** when:

- you cannot do needed work because of missing access, tooling, or unclear responsibility
- it affects more than just one trivial task
- you need a safe temporary path while the fix is in progress

On that page you can:

- log the blocker with an owner and an expiry
- agree on a temporary route so work can continue safely
- see what must be true before we close the exception

> [Open cloud-access stub](./exception-cloud-access)

## Who to talk to

If you are unsure whether to log something as an exception, check the **steward roster**:

- find the exception steward
- ask whether this belongs in Mitigate or somewhere else

> [Open steward roster](../operate/stewards)

## Growing this lane

As we learn which kinds of blocks recur often, this lane may grow to include more specific guides or stubs.

For the pilot, we keep it at one clear pattern and do that well first.
