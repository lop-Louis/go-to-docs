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
nav_group: Runbooks
nav_order: 20
nav_label: Handover RACI template
nav:
  - sidebar
---

# Handover RACI template

Use this template when you need to broadcast handover roles without exposing internal specifics. <a href="#how-to-use-it" data-primary-action>Copy the RACI template</a> or <a href="./index" data-secondary-action>Browse the runbooks index</a>.
The structure below stays inside the [Anti-drift Content Governance](../governance.md) guardrails and keeps RACI labels uncluttered.

## How to use it

1. Duplicate the template table into your handover document.
2. Replace the placeholder rows with the concrete activities in scope.
3. Stick to role names or generic titles (for example, "On-call engineer") rather than personal identifiers.
4. Link to the supporting [Runbooks index](./index.md) if you need step-by-step execution support.
5. Pair each owner with the [transition operating promises](./transition-operating-promises.md) so SLA and backup coverage stays visible.

## Template

> Tip: keep one row per decision or activity so the RACI stays readable.

| Activity / Decision              | Responsible (R)  | Accountable (A)    | Consulted (C)   | Informed (I)      | Notes                                                   |
| -------------------------------- | ---------------- | ------------------ | --------------- | ----------------- | ------------------------------------------------------- |
| Publish daily status update      | Delivery lead    | Product sponsor    | Facilitator     | Partner teams     | Async in #handover-status at 5pm                        |
| Merge final PR to enable feature | Engineering lead | Tech lead          | QA lead         | Support team      | Attach receipts + rollback plan                         |
| Update docs + run Link Integrity | Doc steward      | Product sponsor    | QA lead         | Entire org        | Reference [Link Integrity runbook](./link-integrity.md) |
| Approve scope change >10%        | Product sponsor  | Steering committee | Finance partner | Transition distro | Requires updated SLI + timeline                         |
