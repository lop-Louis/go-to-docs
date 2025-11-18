---
title: Ops contract · web frontend pilot
mode: pilot
pilot_id: web_frontend_chapter_v1
owner: '@lop'
band: A
refresh_after_days: 30
change_type: minor
status: live
audience: People maintaining Northbook, releases, and guardrails for this pilot
tone: 'Plainspoken, calm, practical'
narrative_goal: Make the guardrails and receipts for the pilot explicit and runnable
bucket: operate
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
list_label: Guardrails and receipts for changing Northbook during the web frontend pilot.
---

This contract keeps the pilot tight: one guardrail set, clear exceptions, visible receipts.

## What this contract covers

- Changes to **pilot pages** (`navigate`, `operate`, `learn`, `mitigate`, state, releases).
- How we handle **draft moves** and **exceptions**.
- **Receipts and signals** that prove the system is working.

If a change falls outside this scope, log an exception first.

## Guardrails (musts)

1. **Pilot scope only.** Touch the pages listed above; add new ones only with a decision link.
2. **One owner + date** on every change; keep `mode: pilot` and `pilot_id` intact.
3. **Runnable in 10 minutes.** Any new workflow must be usable without a long playbook.
4. **Receipts visible.** State, releases, and roster refreshes stay current or get an exception logged.
5. **Default deny for drafts.** If a page is stale, duplicative, or unrunnable, move it to `/drafts` with a reason and receipt.

## Exceptions + draft moves

- Log an exception with owner, reason, expiry (≤ 30 days), rollback path, and pause rule.
- Draft moves follow `decision dec-2025-11-draft-move`; keep traceability and add the move to the next release tag.
- No hidden redirects; page-scan must pass before shipping.

## Receipts we track

- `Chapter state` freshness.
- `Releases` page lists every tagged change for `site-v2025.11`.
- `Signals roster` kept current (roster freshness + “next step” counts).
- Exceptions closed or renewed before their expiry.

If any receipt slips, pause new changes until it is back in bounds.

## Governance + feedback

- **Decision changes** (scope, metrics) require a linked `decision_id` and release note.
- **Signal responses**: when roster freshness or “next step” dips for two weeks, log the cause in state and add the adjustment plan.
- **Feedback loop**: use PR notes + `chapter state` to record what changed and why; add a short “what’s different” line to the next release entry.

## How to use this page

- Planning a change? Confirm it fits the guardrails above and note receipts.
- Need to bend a rule? Log an exception first, then proceed.
- Unsure? Ask the steward listed on the roster before shipping.
