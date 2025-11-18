---
title: Navigate overview
mode: platform
owner: '@lop'
band: A
refresh_after_days: 120
change_type: patch
status: live
audience: People trying to find which Northbook page or lane to use
tone: 'Plainspoken, calm, practical'
narrative_goal: Point to one next page, fast
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: open_chapter_state
cta_secondary_label: open_steward_roster
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
date: '2025-01-15'
release_tag: site-v2025.11
nav:
  - none
search: false
list_label: Quick routes for the platform; keep nav small and clear.
---

Find the one page you need to move forward. Everything else stays out of the way.

<PageCTA />

## Open one of these and move

<PilotPageList bucket="navigate" />

## Common situations

### “I just joined / I’m catching up”

Open **chapter state** for the snapshot, what is active, and what to read before ops time.

> [Open chapter state](../changelog/state/web-frontend)

### “I’m not sure who owns this kind of problem”

Go to the **steward roster** for scope, signals, or exception owners and backups.

> [Open steward roster](../operate/stewards)

If navigation feels off, open a PR/note and tag the steward roster contact.

### “I want to see the health checks”

Open **signals roster** to see roster freshness and “do people leave with a next step.”

> [Open signals roster](../learn/signals-roster)

## If you are still unsure

Pick the closest page and flag the mismatch. The surface stays intentionally small.
