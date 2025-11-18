---
title: Ops contract · platform baseline
mode: platform
owner: '@lop'
band: A
refresh_after_days: 30
change_type: minor
status: live
audience: Operators and squads maintaining Northbook, releases, and guardrails
tone: 'Plainspoken, calm, practical'
narrative_goal: Make the platform guardrails, exceptions, and feedback loops explicit and runnable
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
list_label: Guardrails and receipts for changing Northbook as a platform.
---

This contract keeps the platform predictable: one guardrail set, clear exceptions, visible receipts, cross-team.

## What this contract covers

- Changes to **core pages** (`navigate`, `operate`, `learn`, `mitigate`, state, releases).
- How we handle **draft moves** and **exceptions**.
- **Receipts and signals** that prove the system is working across teams.

If a change falls outside this scope, log an exception first.

## Guardrails (musts)

1. **Scope first.** Touch the pages listed above; add new ones only with a linked decision.
2. **One owner + date** on every change; show `mode: platform` and keep release tagging current.
3. **Runnable in 10 minutes.** Any new workflow must work without a long playbook.
4. **Receipts visible.** State, releases, and roster refreshes stay current or get a logged exception.
5. **Default deny for drafts.** If a page is stale, duplicative, or unrunnable, move it to `/drafts` with a reason and receipt (decision `dec-2025-11-draft-move`).

## Exceptions + draft moves

- Log an exception with owner, reason, expiry (≤ 30 days), rollback path, and pause rule.
- Draft moves follow `decision dec-2025-11-draft-move`; keep traceability and add the move to the next release tag.
- No hidden redirects; page-scan must pass before shipping.

## Receipts we track

- `Chapter state` freshness and linked SLIs.
- `Releases` page lists every tagged change for `site-v2025.11` and beyond.
- `Signals roster` kept current (roster freshness + “next step” counts).
- Exceptions closed or renewed before their expiry.

If any receipt slips, pause new changes until it is back in bounds.

## Stop rules (operational integrity)

- If state freshness, signals freshness, or exception closures miss target for two consecutive review windows, **stop new changes**, fix the gap, and record the fix in the next release entry.
- If a guardrail or decision link is missing on a shipped change, **rollback or add it within 24h**.
- Broken links or nav drift in core pages trigger a **docs freeze** until page-scan is green.

## Governance + feedback

- **Decision changes** (scope, metrics) require a linked `decision_id` and release note.
- **Signal responses**: when roster freshness or “next step” dips for two weeks, log the cause in state and add the adjustment plan.
- **Feedback loop**: use PR notes + `chapter state` to record what changed and why; add a “what’s different” line to the next release entry.
- **Operator feedback path**: open a PR or note, tag the steward roster contact, and log any blocker as an exception if it stops work. Update `chapter state` with the change and include it in the next release entry.

## Cross-team integration

- Stewards keep lanes clear; other squads follow the guardrails when touching docs or ops.
- Exceptions are visible to adjacent teams; renewals require an owner and date.
- Release tags (e.g., `site-v2025.11`, future `vYYYY.MM-<lane>`) capture cross-team changes with links to decisions and receipts.
