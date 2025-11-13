---
title: Operate lane · Web frontend pilot
owner: '@louis'
band: A
refresh_after_days: 60
change_type: patch
status: live
audience: People changing or running web frontend chapter ops
tone: Plainspoken, calm, practical
narrative_goal: Point people to chapter state, stewards, signals, and cloud-access handling
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
decision_link: operate/decisions/dec-2025-11-chapter-baseline.md
date: '2025-11-15'
nav:
  - none
search: false
---

Use this page when you are thinking about **how the web frontend chapter runs**, not just about one pull request.

Exit metric: you leave knowing which ops page to look at before you change how the chapter operates.  
Most of the time, that means:

- [Review the chapter state](./state/web-frontend)
- [Review the steward roster](./stewards)

## What “Operate” means in this pilot

In this pilot, “Operate” focuses on a small set of routines that shape how the chapter works:

- the **current picture** of where we are (chapter state)
- **who owns what** in ops (stewards)
- **how we watch ourselves** (signals)
- **what we do when blocked** (cloud access)

We avoided adding more until these pieces prove useful.

## The core ops pages

### Chapter state

A simple snapshot of:

- what this pilot is trying to do
- which ops pages are active
- what to look at before a chapter ops session

> [Open chapter state](./state/web-frontend)

### Steward roster

Shows who is currently on point for:

- scope
- signals
- exceptions

and their expected response window.

> [Open steward roster](./stewards)

### Signals roster

Shows the two health checks we are watching:

- how fresh the roster is
- whether people leave sessions with a clear next step

> [Open signals roster](/learn/signals-roster)

### Cloud-access exception stub

Used when cloud access blocks meaningful work:

- log the blocker with an owner and expiry
- follow a safe temporary path while the fix is in progress

> [Open cloud-access stub](/mitigate/exception-cloud-access)

## If you want the deeper contract

If you help maintain Northbook itself (docs, state, automation), there is a separate ops contract that explains the guardrails and release flow.

Read it when you are working **on** the system, not when you just need to get work done.
