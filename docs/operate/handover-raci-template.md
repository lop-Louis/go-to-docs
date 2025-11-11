---
title: Handover RACI template
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads packaging a handover
tone: 'Plainspoken, candid, energetic'
narrative_goal: Offer a public-safe RACI matrix teams can copy fast
nav_group: Operate
nav_order: 20
nav_label: Handover RACI template
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Handover RACI template

Use this template when you need to broadcast handover roles without exposing internal specifics. [Copy the RACI template](#how-to-use-it) or [Browse the runbooks index](./runbooks-index).
The structure below stays inside the [Anti-drift Content Governance](./governance) guardrails and keeps RACI labels uncluttered.

## How to use it

1. Duplicate the template table into your handover document.
2. Replace the placeholder rows with the concrete activities in scope.
3. Stick to role names or generic titles (for example, "On-call engineer") rather than personal identifiers.
4. Link to the supporting [Runbooks index](./runbooks-index.md) if you need step-by-step execution support.
5. Pair each owner with the [transition operating promises](./transition-operating-promises.md) so SLA and backup coverage stays visible.

## Template

> Tip: keep one row per decision or activity so the RACI stays readable.

| Activity / Decision              | Responsible (R)  | Accountable (A)    | Consulted (C)   | Informed (I)      | Notes                            |
| -------------------------------- | ---------------- | ------------------ | --------------- | ----------------- | -------------------------------- |
| Publish daily status update      | Delivery lead    | Product sponsor    | Facilitator     | Partner teams     | Async in #handover-status at 5pm |
| Merge final PR to enable feature | Engineering lead | Tech lead          | QA lead         | Support team      | Attach receipts + rollback plan  |
| Approve scope change >10%        | Product sponsor  | Steering committee | Finance partner | Transition distro | Requires updated SLI + timeline  |

## Related references

- [20-minute handover drill](./handover-20-min.md) — Use this before or after the RACI to lock scope.
- [Transition operating promises](./transition-operating-promises.md) — Pair each RACI line with an explicit SLA or escalation.
- [SLI states map](./state-visibility.md) — Keep the official state tracker aligned with your RACI owners.
