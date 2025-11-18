---
title: Steward roster
mode: pilot
pilot_id: web_frontend_chapter_v1
owner: '@lop'
band: A
refresh_after_days: 14
change_type: patch
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
date: '2025-11-15'
cta_primary_label: open_signals_roster
cta_secondary_label: raise_exception
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
release_tag: site-v2025.11
list_label: >
  Who is currently on point for scope, signals and exceptions in this pilot, plus how fast they aim
  to respond.
---

Use this page to answer two simple questions:

1. Who is on the hook for scope, signals, and exceptions right now?
2. Is anyone carrying too much without a backup?

If you feel overloaded or unsure who owns what, this is the place to raise it and adjust.

<PageCTA />

## Steward roster

We keep this list small on purpose. If your plate is too full, say so early so we can move coverage before fatigue turns into silence.

| Steward role      | Primary         | Backup                                        | Alert window      |
| ----------------- | --------------- | --------------------------------------------- | ----------------- |
| Scope steward     | Louis (interim) | TBD (assign before the first December review) | reply within 24 h |
| Signal steward    | Louis (interim) | TBD                                           | reply within 24 h |
| Exception steward | Louis (interim) | TBD                                           | reply within 24 h |

## What these roles roughly mean

- **Scope**: keeps “what belongs to the chapter vs the squad” clear enough that work doesn’t fall between chairs.
- **Signals**: looks after the few health checks we agreed on, so we notice drift before it becomes drama.
- **Exceptions**: makes sure temporary rule-bending (like access gaps) is written down, owned, and closed again.

If you’re listed as primary, you’re the first ping. Backup is there so you can breathe and take holidays without guilt.

## How to request a handoff

If you need to hand a steward role to someone else:

1. Bring it into an Operation-style chapter session under the title **“Steward change”**.
2. Agree on who is ready to take over and that they are okay with the refresh rhythm for that area.
3. Update this page and the latest state snapshot, and make sure the next release log notes the change.

The goal is simple: no secret owners, no surprise responsibilities.

## Steward duties

If you’re a steward for an area, your job is to:

- keep the key pages for that area fresh often enough that people can trust them
- call out any expiring or missed updates in the next chapter check-in
- log a visible exception if you know you will miss a refresh for a while, instead of disappearing

You are not a hero role; you’re a clear point of contact.

## How we’ll know it’s working

Within the first month, nobody is surprised by who the stewards are.

Over two review cycles, this is working if:

- most refreshes happen on time without chasing individuals
- most people can say who to talk to about scope, signals, or exceptions without digging through docs

If not, we adjust the roles or coverage. The problem is the setup, not the person.

## Where the detailed trail lives

The detailed metrics, impact notes, and history for steward changes live in the releases and reporting views.

This page is here so humans can see **who** to tap and **when**, without reading through logs.

---

### Jargon cheat sheet

- **Steward**: the person who looks after a specific area so others know who to tap first.
- **Alert window**: how fast the steward is expected to reply when something in their area is raised.
- **Refresh**: giving a page or roster a quick update so it reflects today, not last quarter.
- **State snapshot**: the “current picture” page for the chapter, fed by these roles and routines.
- **Release log**: the running history of changes for each tag or version, used by reporting and traceability.
