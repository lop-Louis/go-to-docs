---
title: Cloud access blocks
mode: platform
owner: '@lop'
band: A
refresh_after_days: 14
change_type: minor
status: live
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
date: '2025-11-15'
leading_metric: m-time-to-freeze
lagging_metric: m-time-to-recovery
release_tag: site-v2025.11
cta_primary_label: raise_exception
cta_secondary_label: use_in_next_session
list_label: >
  Simple template for handling cloud access blocks in the open instead of hacking around them.
---

Use this page when **cloud access is blocking your work**.

Two moves only:

- make the blocker visible with an owner and a date
- switch to the agreed temporary path so delivery keeps moving

The detailed graphs and trails live in the reporting views and releases.  
This page is here to keep the story and the promises clear.

<PageCTA />

## What this page is for

This page is the place where we:

- write down serious cloud-access problems in one place
- name who is driving the fix and by when
- agree on a safe temporary way of working until the fix is live

So people are not stuck in DMs, and we don’t quietly accept “blocked” as normal.

If cloud access is slowing you down in a real way, you come here.

## What you can do here

When you hit a cloud-access problem that blocks work:

- **Log the blocker**  
  Add one line to the exception list with:
  - who owns the unblock
  - what is actually missing (access, tool, clear responsibility)
  - when this should be fixed by (no more than 30 days)
  - how the team will work safely in the meantime
  - when we pause more cloud-dependent changes if there’s no update

- **Follow the temporary path**  
  Use the fallback steps below so work can move while the platform team does their part.

If you are not sure whether something belongs here, err on the side of logging it.  
It is easier to close a blocker than to find one that was never written down.

## How we’ll know it’s working

Within the first month of using this page, every real cloud-access blocker:

- has a named owner, and
- has a clear target date to be fixed.

Over two review cycles, we treat this as healthy if:

- most blockers close before their agreed expiry window
- most affected people say they knew what temporary path to use without scrambling

If we see long-lived blockers or confusion about “what now,” we fix the process, not the person.

> For cloud access, a “receipt” is:
>
> - a short exception entry with owner, reason, expiry, rollback, and pause rule, and
> - a close-out note when the normal path is restored and the fallback passes its quick lab.

---

### Exception fields (what to capture)

Use these fields when you log a blocker:

| Field      | What to capture                                                                |
| ---------- | ------------------------------------------------------------------------------ |
| Owner      | The person who is responsible for driving the unblock (usually a DevOps lead). |
| Reason     | What is missing: responsibility, tooling, permissions, or something similar.   |
| Expiry     | A clear “fix by” date, no more than 30 days from when you log it.              |
| Rollback   | How work continues safely in the meantime (manual path, sandbox, etc.).        |
| Pause rule | When we pause new cloud-dependent changes if there is no update.               |

Keep the entries short and concrete. The goal is to make it obvious who does what, by when.

### Fallback path (temporary way of working)

When the cloud path is blocked:

1. **Log the blocker**  
   Add it to the shared parking lot with an owner and today’s date.

2. **Use the sandbox route**  
   Route affected work through a sandbox or safer environment with manual approvals  
   instead of full automation.

3. **Smoke test the fallback**  
   Once a week, run a quick check to confirm the temporary path still works  
   and can be completed in roughly 10 minutes.

4. **Keep the chapter in the loop**  
   Share a short status update during chapter Operation time  
   until the platform team closes the blocker or agrees on a permanent path.

### When we can close the exception

We treat the blocker as closed when:

- the platform team restores access or documents the new normal path, and
- the temporary path (if we keep any of it) passes its short lab/test in a reasonable time, and
- things have stayed stable for about a week without new issues linked to this blocker

At that point, we can remove the entry here and go back to the standard way of working.

---

### Jargon cheat sheet

For anyone not living in ops land:

- **Exception**: a temporary break from the usual rules, written down with an owner and an expiry.
- **Parking lot**: a small list of open items we track in the open instead of hiding in chat.
- **Fallback / temporary path**: the “plan B” route that keeps work moving while the main path is broken.
- **Sandbox**: a safer environment where we can run things with less risk while we sort out access.
- **Operation time**: a focused chapter session with a clear outcome, not a casual catch-up.
