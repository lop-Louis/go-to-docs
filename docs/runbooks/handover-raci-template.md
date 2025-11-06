---
title: Handover RACI template
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads packaging a handover
tone: Plainspoken, candid, energetic
narrative_goal: Offer a public-safe RACI matrix teams can copy fast
primary_action: Copy the template and adapt the example for your handover
---

# Handover RACI template

Use this page when you need to broadcast handover roles without exposing internal specifics.
The structure below stays inside the [Governance Policy](../governance.md) guardrails and keeps RACI labels uncluttered.

## How to use it

1. Duplicate the template table into your handover document.
2. Replace the placeholder rows with the concrete activities in scope.
3. Stick to role names or generic titles (for example, "On-call engineer") rather than personal identifiers.
4. Link to the supporting [Runbooks index](./index.md) if you need step-by-step execution support.

## Template

> Tip: keep one row per decision or activity so the RACI stays readable.

| Activity / Decision | Responsible (R)        | Accountable (A)         | Consulted (C)         | Informed (I)            | Notes                           |
| ------------------- | ---------------------- | ----------------------- | --------------------- | ----------------------- | ------------------------------- |
| e.g. Placeholder    | Role handling the work | Role owning the outcome | Roles providing input | Roles receiving updates | Dependencies, tools, or cadence |

Copy the header row and add as many rows as you need. Delete the example row after you add your content.

## KL-safe example

The example below mirrors a typical release-to-support handover while keeping identifiers neutral.

| Activity / Decision             | Responsible (R)      | Accountable (A)  | Consulted (C)                          | Informed (I)                        | Notes                                                |
| ------------------------------- | -------------------- | ---------------- | -------------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| Finalize release notes          | Delivery facilitator | Stream owner     | Quality reviewer, feature engineer     | Partner success lead, support inbox | Uses sanitized release summary, no ticket IDs        |
| Confirm on-call coverage window | Support coordinator  | Stream owner     | Delivery facilitator                   | Engineering guild, incident channel | Reference public on-call rota overview               |
| Schedule watch-window check-in  | Delivery facilitator | Stream owner     | Support coordinator, analytics partner | Wider product crew                  | 15-minute sync within first 48 hours post-launch     |
| Archive temporary access grants | Operations steward   | Security steward | Delivery facilitator                   | Stream owner, compliance recorder   | Remove access within 24 hours; log in access tracker |

Keep rows action-oriented. If you need deeper playbooks for any row, link to the relevant runbook alongside the note column.
