---
title: 20-minute handover drill
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: draft
audience: Stream leads executing a rapid handover
tone: 'Plainspoken, candid, energetic'
narrative_goal: Lay out the steps that move work from Framing to Ready fast
nav_group: Operate
nav_order: 10
nav_label: 20-minute handover
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

# 20-minute handover drill

Force clarity fast: this drill moves a stream from Framing to Ready in 20 minutes. [Run the drill](#20-minute-handover-drill) or [Browse the runbooks index](./runbooks-index).

**Goal:** move a stream from Framing to Ready.

## Timer-based drill

| Minute mark | Facilitator cue                                                                    | Output                                |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| 0-3         | Name the stream, owner, and the single exit metric                                 | Slide/Doc updated with owner + metric |
| 3-6         | List every open risk/contract in 60 seconds; vote on the top 2 to keep             | Ranked list of risks + owners         |
| 6-10        | Confirm what “Ready” means (env, docs, receipts) and rewrite it if unclear         | Ready definition + checklist          |
| 10-15       | Identify the very next pull request or artifact and who pairs on it                | PR/Artifact link + owners             |
| 15-20       | Confirm comms: who’s informed, which channel, and when the next checkpoint happens | Status post drafted in channel        |

## Acceptance

- SLI column moves from Framing → Ready in the [SLI states map](../navigate/sli-states.md)
- Next PR is created or prepped with owners assigned
- Risks/Contracts table updated with the new owners and timestamps

## Related references

- [Handover RACI template](./handover-raci-template.md) — Document who owns every activity after the drill.
- [Transition operating promises](./transition-operating-promises.md) — Publish the approvals/escalations you agreed to in the session.
- [SLI states map](../navigate/sli-states.md) — Update the official state tracker the moment the drill finishes.
