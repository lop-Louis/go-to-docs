---
title: Navigate lane · Northbook pilot
owner: '@lop'
band: A
refresh_after_days: 120
change_type: patch
status: live
audience: People trying to find which Northbook page or lane to use
tone: 'Plainspoken, calm, practical'
narrative_goal: Route people to the small set of active pilot pages without overwhelming them
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
date: '2025-01-15'
release_tag: site-v2025.11
nav:
  - none
search: false
---

Use this page when you are trying to figure out **where** in Northbook your work or question belongs.

Exit metric: you leave with one page to open next, not a list of ten.  
From here, most people either go to **chapter state** or to the **steward roster**:

- [Open chapter state](../operate/state/web-frontend)
- [Open steward roster](../operate/stewards)

## What “Navigate” means in this pilot

Long term, “Navigate” will cover maps and shortcuts across all of Northbook.

In this pilot, it does one simpler job:

- help you find the **few** ops pages that are actually in play for the web frontend chapter

We keep the navigation surface small on purpose so it stays honest and easy to use.

## Common situations

### “I just joined / I’m catching up”

Start with the **chapter state**:

- see what the pilot is currently testing
- see which ops pages matter right now

> [Open chapter state](../operate/state/web-frontend)

### “I’m not sure who owns this kind of problem”

Go to the **steward roster**:

- find who to tap for scope, signals, or exceptions
- check if there is a backup if the primary steward is busy

> [Open steward roster](../operate/stewards)

### “I want to see the health checks”

If you care about how the chapter is doing over time, open the **signals roster**:

- roster freshness
- whether people leave sessions with a clear next step

> [Open signals roster](../learn/signals-roster)

## If you are still unsure

If none of these fit your situation, pick the closest one and bring the mismatch as a story.

Navigation in a pilot is allowed to be rough; what matters is that you can find a person or page to talk through it with.
