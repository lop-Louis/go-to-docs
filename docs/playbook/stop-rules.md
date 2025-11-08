---
title: Stop Rules Library
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: draft
audience: Teams pacing delivery and knowing when to pause work
tone: Plainspoken, candid, energetic
narrative_goal: Offer the framing for stop rules until full guidance ships
nav:
  - none
---

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


# Stop Rules Library

Stop rules protect teams from marching forward when risk outpaces confidence. <a href="#when-to-write-a-stop-rule" data-primary-action>Capture your stop conditions</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>. Define them before work starts so everyone knows when to pause, escalate, or roll back.

## When to write a stop rule

- The plan hinges on a guardrail metric staying green.
- Work depends on external approvals or time-limited windows.
- A previous incident showed that drift goes unnoticed until it is too late.

## Crafting effective rules

1. **Name the condition.** Describe the observable signal—not a vibe.
2. **State the action.** Pause, rollback, escalate, or regroup. Keep it unambiguous.
3. **Assign the owner.** One role pulls the brake and communicates next steps.
4. **Set the time box.** Clarify how long the pause lasts or when to reassess.
5. **Link to the metric.** Reference the dashboard or data source that triggers the rule.

## Format

| Condition | Action | Owner | Time box / Follow-up |
|
