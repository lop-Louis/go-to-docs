---
title: Community meeting pack
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: draft
audience: Facilitators running community meetings
tone: 'Plainspoken, candid, energetic'
narrative_goal: Provide the quick-reference pack for a community session
nav_group: Operate
nav_order: 40
nav_label: Community meeting pack
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

# Community meeting pack

This pack bundles the agenda, outputs, and reference links for a community session. [Prep the meeting pack](#agenda-template) or [Browse the runbooks index](./runbooks-index).

## Prep checklist

| Task                          | Owner             | Due      | Receipt             |
| ----------------------------- | ----------------- | -------- | ------------------- |
| Confirm speakers + topic list | Facilitator       | T-5 days | Agenda doc updated  |
| Collect wins / metrics        | Ops partner       | T-3 days | Slides updated      |
| Gather Q&A backlog            | Community manager | T-2 days | Q list added to doc |
| Dry run with speakers         | Facilitator       | T-1 day  | Notes logged        |
| Share pre-read + Zoom link    | Ops partner       | T-1 day  | Posted in channel   |

## Agenda template

| Segment                 | Time   | Owner         | Notes                                          |
| ----------------------- | ------ | ------------- | ---------------------------------------------- |
| Welcome + context       | 5 min  | Facilitator   | Highlight purpose, remind of chat norms        |
| Lightning wins          | 10 min | 2–3 speakers  | Screenshare gifs/screens; keep it < 3 min each |
| Deep dive topic         | 15 min | Feature owner | Problem → approach → ask                       |
| Q&A (pre-seeded + live) | 10 min | Facilitator   | Start with backlog; open floor last 3 min      |
| Retro pulse (poll)      | 5 min  | Ops           | Simple pulse (“More of / Less of”)             |
| Actions + close         | 5 min  | Facilitator   | Recap decisions, remind where notes live       |

## Outputs

- Notes doc with agenda + timestamps
- Recording link (if allowed)
- Action items board (owners + due dates)
- Poll results screenshot

## Communication template

```
Channel: #community
Subject: Community Sync – DATE – Recording & Actions

Wins: [bulleted summary]
Decisions: [short list]
Actions: @owner → due DATE
Recording: <link>
Notes: <link>
Next session: DATE (topic nominations welcome)
```

## Related references

- [Facilitation Techniques](./facilitation) — Pluck prompts or warm-ups from here when the agenda needs energy.
- [Decision Spine](./decision-spine) — Use it when the community session includes a decision point.
- [State ledger](../navigate/state-ledger) — Capture the outcomes when the community meeting leads to a ship-worthy change.
