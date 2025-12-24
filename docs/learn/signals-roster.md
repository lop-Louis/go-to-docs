---
title: Signals roster
mode: platform
owner: '@lop'
band: A
refresh_after_days: 30
change_type: minor
status: live
bucket: learn
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
date: '2025-11-15'
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
cta_primary_label: use_in_next_session
cta_secondary_label: open_chapter_state
release_tag: site-v2025.11
list_label: >
  The two health checks we watch—roster freshness and whether people leave sessions knowing their
  next step.
---

This page keeps an eye on two simple things:

1. Is our **chapter roster up to date**?
2. Do people **leave conversations knowing what to do next**?

The graphs and detailed numbers live in the reporting views.  
Here you just see what we are watching and what “healthy” looks like.

<PageCTA />

## What this page is for

Use this page as a quick health check:

- When the roster is current and people leave with a clear next step,  
  our chapter time is doing its job.
- When either of those starts to slip, it is a nudge to talk and adjust,  
  not a reason to blame anyone.

If you are changing chapter routines or planning an ops session, read this first.

> For signals, receipts show up as:
>
> - an updated roster row for each member (lane, 60-day target, constraints, review style, with a fresh date), and
> - a simple count of “yes / no” to “Can you name your next step?” after operation sessions. You don’t log extra. You just keep the roster real and ask that one question at the end.

## The two health checks

### 1. Roster freshness

**Question:**  
Do we actually know what each person is working toward right now?

**What we look at**  
For each active member, these four fields are filled in and not stale:

- what lane they are best in right now
- their one main 60-day target
- any real-world limits (time, split, tools)
- how they prefer 1:1s to run

We aim for **9 out of 10** people to have this filled in and refreshed.  
If it drops much below that, we treat it as a sign the picture is out of date.

**Why it matters**  
If this is fuzzy, every promise about focus, load, or growth is built on guesswork.

### 2. Direction after conversations

**Question:**  
Do people leave 1:1s and ops sessions knowing their next step?

**What we look at**  
At the end of any **Operation** session (not casual chats), we ask:

> “Can you name your next concrete step?”

We keep a simple count of **yes vs no** across sessions.  
We aim for at least **8 out of 10** to say “yes.”

**Why it matters**  
If people keep walking out thinking “so… now what?”,  
then the format is broken, even if the meeting felt “nice.”

## How you can use this page

When you are in a chapter or ops role:

- If you run a **1:1 or ops session**, make sure the person can say their next step out loud.
- If you **update the roster**, fill in or refresh the four fields and the date.
- If you notice the health checks slipping for a while, raise it in the ops session so we can adjust together.

You do not need to touch any metrics directly.  
Just keep your part of the roster and your conversations clean and concrete.

---

### For ops / reporting

For the people running dashboards and reports, these are the same two checks in ops language:

- **Roster freshness**  
  Tracks how many active members have all four roster fields filled and current  
  (`best_lane_now`, `target_60d`, `constraints`, `review_style`) plus attendance.  
  It is the early-warning number.

- **Direction after conversations**  
  Tracks the share of members who can name a concrete next step at the end of an Operation-mode session.  
  It is the confirmation number.

They line up with the metrics configured in the frontmatter at the top of this file.

---

### Jargon cheat sheet

- **Roster**: the shared list of people in the chapter, with their lane, target, limits, and review style.
- **Operation mode**: a focused session with a clear agenda and exit, not a casual chat.
- **Health check**: a number we watch to see if something important is drifting.
- **Reporting views**: dashboards or pages that show graphs and trends; they pull from this file and the roster.
