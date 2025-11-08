---
title: SLI States
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: live
audience: Stream and seam leads tracking work health
tone: Plainspoken, candid, energetic
narrative_goal: Show how work flows across states and which metrics to watch
nav_group: Start
nav_order: 35
nav_label: SLI states map
nav:
  - sidebar
---

# SLI States

This map keeps every initiative’s SLI state and guardrails obvious. <a href="#top" data-primary-action>Place your initiative</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>.

| State            | Entry signals                                                                 | Exit signals                                                         | SLI guardrail                                                  |
| ---------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Framing**      | Problem statement logged, owner + decider named, success metric sketched      | Scope, exit metric, and next artifact agreed; risks logged           | Age in Framing < 5 business days                               |
| **Build**        | Acceptance criteria frozen, team staffed, backlog item sized ≤ 3 days         | Working change behind flag or draft PR merged to default branch      | No more than 3 concurrent Build streams per team               |
| **Verify**       | Change deployed to test/stage, telemetry hooks on, release note draft started | Acceptance checks green, Sev-1/2 regressions = 0, release note final | Each Verify cycle closes inside 48 hours                       |
| **Ready**        | Verification finished, release owner assigned, rollback tested                | Pack shipped or feature enabled for target audience                  | Release queue < 2 business days; < 1 skipped retro follow-up   |
| **Live / Watch** | Change is in prod or public                                                   | Metrics stable for the agreed watch window                           | Error budget consumed < 20%; page/issue feedback triaged daily |

## How to use this map

1. **Tag every initiative** in the planning doc or kanban we expose publicly. If a stream lacks a state, it is invisible by default.
2. **Review once a week** (calendar it) and note anything that breached its SLI. A breached guardrail is a decision prompt, not a scarlet letter.
3. **Escalate by state**:
   - Framing stuck? Re-run the [20-minute handover drill](../runbooks/handover-20-min.md).
   - Build overloaded? Drop the lowest-impact stream until WIP <= 3.
   - Verify or Ready stalled? Use the [Fix it fast index](../fix/) to clear the blocker or page an owner.
4. **Publish the board** (screenshot or embed) wherever leadership expects status so the SLI legend is obvious.

## Keeping SLI guardrails honest

- **Age-based SLIs (Framing, Ready)** — Track the first day in-state; anything older than the guardrail gets highlighted in yellow until resolved.
- **WIP SLIs (Build)** — Count human owners, not cards. Two people pairing on one change = one stream.
- **Time-bound SLIs (Verify)** — Start the clock when code hits the validation environment, not when somebody “starts testing.”
- **Quality SLIs (Live/Watch)** — Tie them to the page or service telemetry. If we promise error budget < 20%, paste the chart right under the status block.

## When to update this page

- Add a new state only when you have a distinct entry/exit signal _and_ a measurable guardrail.
- Retire a state if it lives purely in tooling (e.g., CI automation) and the audience never acts on it.
- Re-run `pnpm run nav:sync` after editing so the Start navigation stays honest.
