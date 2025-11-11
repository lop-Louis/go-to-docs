---
title: Transition operating promises
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads and facilitators shepherding handovers
tone: 'Plainspoken, candid, energetic'
narrative_goal: Codify the non-negotiable rhythms that keep a transition safe
nav_group: Operate
nav_order: 50
nav_label: Transition promises
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul
date: '2025-11-11'
---

# Transition operating promises

These templates keep transition approvals, escalations, and cadences explicit. [Codify your operating promises](#approvals-template) or [Browse the runbooks index](./runbooks-index). Pair them with the [Handover RACI template](./handover-raci-template) so every role knows the service level they own during a transition.

## Approvals template

Fill this table before the handover call so nobody waits for ad-hoc green lights.

| Condition                                  | Action                                                                 | Primary owner                     | Time box / SLA  | Backup            |
| ------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------- | --------------- | ----------------- |
| Scope change increases effort by >1 sprint | Revalidate scope, align on tradeoffs, capture delta in ledger          | Transition decider (Product lead) | 2 business days | Engineering lead  |
| New risk rated Sev-2+ surfaces             | Triage with receiving team, confirm mitigation owner, update stop rule | Facilitator                       | Same day        | On-call EM        |
| Resource gap longer than 3 business days   | Trigger staffing request, pause handover until backfill is confirmed   | Delivery lead                     | 24 hours        | Program manager   |
| Policy questions outside Band A            | Escalate to governance owners, log answer in FAQ                       | Doc steward                       | 48 hours        | Governance backup |

## Escalation path

When a promise is violated, the on-call should know exactly who to page.

| Breach                       | First escalation                              | Second escalation | Auto-stop rule                         |
| ---------------------------- | --------------------------------------------- | ----------------- | -------------------------------------- |
| SLA missed by >24h           | Delivery lead pings facilitator + owning lead | Program sponsor   | Pause transition until next review     |
| Risk not acknowledged in 48h | Facilitator pings governance owner            | VP sponsor        | Strip scope to minimum viable handover |

## Status cadence

| Signal                    | Audience                      | Channel                         | Owner           | Notes                                        |
| ------------------------- | ----------------------------- | ------------------------------- | --------------- | -------------------------------------------- |
| Daily checkpoint (10 min) | Core transition team          | Async thread with template      | Facilitator     | Share blockers + highlight upcoming promises |
| Weekly executive update   | Sponsors + partner teams      | Snapshot doc + link to receipts | Program manager | Include SLA/RACI deltas + next focus         |
| Release-ready review      | QA, doc steward, product lead | Live call + notes               | QA lead         | Run [Quick-Run](../navigate/quick-run)       |

## Communication promises

- **Everyone gets the same story** — Publish the status snapshot in the same doc you use for RACI, never in DMs.
- **Receipts or it didn’t happen** — Every action item references a runbook section or screenshot.
- **“Stop the line” stays literal** — Anyone can pause the transition if a promise is at risk; log the pause in the transition doc.

## After the handover

1. Archive the fulfilled promises in the [State ledger](../navigate/state-ledger) with the release tag.
2. Update the [Fast support index](../support/) if new interrupts surfaced during the transition.
3. Review this page every 6 months—promises that no one owns should be removed or reassigned.

## Related references

- [Handover RACI template](./handover-raci-template) — align each promise with the accountable role.
- [SLI states map](../navigate/sli-states) — show state changes when promises trigger handoffs.
- [Playbook canon](../operate/) — link to the governing decision patterns you referenced.
