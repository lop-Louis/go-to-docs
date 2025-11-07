---
title: Transition operating promises
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads and facilitators shepherding handovers
tone: Plainspoken, candid, energetic
narrative_goal: Codify the non-negotiable rhythms that keep a transition safe
primary_action: Copy the templates and plug them into your handover notes and RACI
---

# Transition operating promises

Pair these prompts with the [Handover RACI template](./handover-raci-template.md) so every role knows the service level they own during a transition.
Stick to the `condition -> action -> owner -> time box` structure for Band A clarity.

## Approvals template

| Condition                              | Action                                                  | Primary owner        | Time box / SLA             | Backup               |
| -------------------------------------- | ------------------------------------------------------- | -------------------- | -------------------------- | -------------------- |
| Decision packet ready for sign-off     | Share sanitized summary + blockers in public channel    | Delivery facilitator | Same day by 16:00 local    | Stream owner         |
| No response after SLA window           | Ping owner in shared channel with ready-to-send summary | Delivery facilitator | +4 business hours past SLA | Partner success lead |
| Approval denial with missing rationale | Capture rationale stub and schedule follow-up           | Accountable decider  | Within 1 business day      | Governance steward   |

## Escalation template

| Condition                            | Action                                         | Primary owner | Time box / SLA                   | Backup              |
| ------------------------------------ | ---------------------------------------------- | ------------- | -------------------------------- | ------------------- |
| Blocker lasts > 1 business day       | Move issue to escalation log and tag duty lead | Stream owner  | Log within 2 hours of threshold  | On-call engineer    |
| Incident risk rises to medium+       | Convene 15-minute stabilization call           | Duty lead     | Start within 1 hour of trigger   | Operations steward  |
| Escalation unresolved after 2 cycles | Notify executive sponsor with concise status   | Stream owner  | Within 1 hour after second cycle | Accountable decider |

## Cadence template

| Condition             | Action                                              | Primary owner        | Time box / SLA                  | Backup               |
| --------------------- | --------------------------------------------------- | -------------------- | ------------------------------- | -------------------- |
| Transition kickoff    | Send daily cadence outline (standup, review, retro) | Delivery facilitator | 24 hours before work starts     | Partner success lead |
| Daily standup gap     | Post async update using same template               | Stream owner         | Within 1 hour of scheduled time | Support coordinator  |
| Watch-window complete | Publish outcomes, decisions, and next review date   | Stream owner         | Within 24 hours of window close | Analytics partner    |

Document these promises next to your RACI.
If an owner changes, update the promise and notify the backup so the safety net stays intact.
