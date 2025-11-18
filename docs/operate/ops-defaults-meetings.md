---
title: Casual vs Operation meeting defaults
mode: pilot
pilot_id: web_frontend_chapter_v1
owner: '@lop'
band: A
refresh_after_days: 14
change_type: minor
status: pilot
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
date: '2025-11-15'
cta_primary_label: try_ops_defaults
cta_secondary_label: see_roster_signals
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
release_tag: site-v2025.11
list_label: >
  How we tell a casual chat from an ops session, plus the default 1:1 pattern we fall back to when
  nothing else is agreed.
---

Steady every touchpoint before you dive in. [Use this kit in your next session](#what-you-can-do-here) or [Open the shared parking lot](#11-fallback-pattern) so nothing drifts.

## What this page is for

This page turns “Casual vs Operation” into a runnable default so every chapter touchpoint produces one owner/date or parks cleanly without burning energy, even when the week is noisy. If your load spikes, say so—we can co-host or slow the cadence instead of letting intent slip.

## What you can do here

- action 1: use this in your next session — label the meeting, prep the doc-first note, and exit with a receipt in under 20 minutes.
- action 2: open the parking lot — move topics that lack an owner/date into the shared lot with a steward and revisit time.

> For this default, a “receipt” is:
>
> - a doc-first note with why we met and the expected outcome, and
> - for each topic, either:
>   1. an owner + date, or
>   2. a parking-lot entry with a steward + revisit date.

## How we’ll know it’s working

Within the first month, the doc-first notes actually go out before the meeting.  
Over two review cycles:

- At least 9 out of 10 Operation sessions end with an owner/date logged or a parking-lot entry with a revisit date.
- At least 8 out of 10 people say the cadence helps them know what to prep before we meet.

## Reference log:

- [Frontend Charter](../navigate/frontend-charter.md)
- [Release v2025.11](../changelog/releases/site-v2025.11.md)

---

### Casual vs Operation defaults

| Mode      | When to use it                               | Requirements                                                                |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| Casual    | decompressing, context swap, optional social | optional attendance, no receipts required, 15-minute cap                    |
| Operation | decisions, blockers, focusing work           | agenda in doc, owner + date per topic, receipts logged, Parking lot visible |

### 1:1 fallback pattern

1. Schedule 20 minutes
2. Send a doc-first note with “why now” + “expected outcome” at least 12 hours ahead.
3. Keep PR reviews async when the diff is < 300 lines; larger sets get a scheduled review inside 48 hours.
4. Close with either (a) owner + date or (b) parking-lot entry plus steward.

### Annex lab · Verify in 10

Run this checklist before calling the defaults “ready” for a chapter member:

1. Start a timer and label the session (Casual or Operation) in the shared doc.
2. Confirm the doc shows participants, owner, and date.
3. Capture at least one topic and decide if it needs action now or later.
4. For an action-now item, record owner/date; for a later item, add it to the parking lot with steward + revisit-by date.
5. Stop the timer. If > 10 minutes, trim the template or pre-fill info before the session.

### Stop rule

If direction clarity drops below 80% for seven consecutive days or lab runs exceed 10 minutes twice in a row, pause new meetings under this default, fix the doc-first template, and rerun the annex lab before resuming.
