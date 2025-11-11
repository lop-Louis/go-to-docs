---
title: Decision Spine
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
audience: Deciders and collaborators tackling multi-team technical choices
tone: 'Plainspoken, candid, energetic'
narrative_goal: 'Give a reusable structure for framing, deciding, and reviewing work'
nav_group: Operate
nav_order: 10
nav_label: Decision spine
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
date: '2025-11-04'
---

# Decision Spine

This lightweight spine keeps framing, options, the call, and the review aligned across teams. [Run your next decision through the spine](#four-stages) or [Browse the runbooks index](./index).
Exit metric: every logged decision names an owner + review date and ships with ≤1 unresolved comment.

- **Why**: Prevents re-litigation, makes tradeoffs explicit early, and leaves a durable paper trail for future teams.
- **When**: Use for multi‑stakeholder choices, anything with meaningful tradeoffs, or answers you expect to paste more than twice.

## Four stages

1. **Frame** - What are we deciding? What constraints matter?
2. **Options** - What are 2-4 viable paths? What are the tradeoffs?
3. **Decide** - Who decides? When? What's the rationale?
4. **Review** - When do we revisit? What would trigger a change?

## Why use it

- Prevents "meeting amnesia" where decisions get re-litigated
- Makes tradeoffs explicit before emotions run high
- Creates a paper trail for future teams
- Speeds up recurring decision patterns

## Example template

```markdown
## Decision: [Short title]

### Frame

Problem: [What needs deciding]
Constraints: [Time, budget, skills, compliance]
Stakes: [What happens if we get this wrong]

### Options

**A. [Name]**
Pros: ...
Cons: ...
Effort: [S/M/L]

**B. [Name]**
Pros: ...
Cons: ...
Effort: [S/M/L]

### Decide

Choice: [A/B]
Decider: [Role or name]
Rationale: [Why this beats alternatives]
Date: YYYY-MM-DD

### Review

Next review: [Date or trigger]
Success metric: [What good looks like]
```

## Anti-patterns

- ❌ Skipping the Frame and jumping to solutions
- ❌ Listing 10+ options (decision paralysis)
- ❌ No named decider (consensus trap)
- ❌ Never revisiting (sunk cost fallacy)

## Related references

- [Handshake contracts](./handshake-contracts) — Lock expectations once a decision is made.
- [Start overview](../start-here/index.md) — Send new collaborators here before sharing the spine.
- [Transition operating promises](./transition-operating-promises) — Use these when a decision creates new approvals or escalations.

## Integration with other practices

Combine with:

- [Answer Ledger](./answer-ledger) for recurring questions
- [Facilitation](./facilitation) techniques for group decisions
- [Decision tripwires](../decision-tripwires) to enforce timely follow-up

See [Anti-drift Content Governance](./governance) for change types and the monthly release cadence.
