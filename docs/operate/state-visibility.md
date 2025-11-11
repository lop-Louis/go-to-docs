---
title: State visibility map
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads and facilitators sharing transition status publicly
tone: 'Plainspoken, candid, energetic'
narrative_goal: Make every work state explicit with its entry/exit signals and SLI
nav_group: Operate
nav_order: 70
nav_label: State visibility map
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

# State visibility map

Stop guessing whether work is stuck—let this map show the state, entry signal, and SLI guardrail for every stream. [Publish your state map](#state-table) or [Browse the runbooks index](./runbooks-index). Pair this with a weekly 15-minute review so deviations surface fast.

> Latest release bundle: [`ops/releases/2025-11/index.md`](../../ops/releases/2025-11/index.md) summarises decisions, signals, and receipts for the current cycle.

## State table

| State        | Entry signals (what must be true)                                                | Exit signals (what closes the state)                                      | SLI                                            |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------- |
| Framing      | Problem statement + owner logged, success metric drafted, decision date penciled | Scope + exit metric agreed, risks captured, decider acknowledged          | ≤5 business days                               |
| Build        | Acceptance criteria frozen, team staffed, backlog item ≤3 days effort            | Working change merged behind flag or ready for Verify                     | ≤3 concurrent Build items per team             |
| Verify       | Change deployed to test/stage, telemetry hooks active                            | Acceptance checks green, Sev-1/2 regressions = 0, release note draft done | Verify cycle ≤48 hours                         |
| Ready        | Verification signed, rollback tested, runbooks updated                           | Feature/pack shipped or feature flag enabled to target audience           | Release queue ≤2 business days                 |
| Live / Watch | Change public; monitoring engaged                                                | Watch window complete; metrics stable                                     | Error budget burn <20%; feedback triaged daily |

## Related references

- [SLI States](../navigate/sli-states.md) — Mirror these rows in the public-facing legend so teams see the same definitions.
- [Transition operating promises](./transition-operating-promises.md) — When a state breaches its SLI, trigger the promises here.
- [Decision Spine](./decision-spine.md) — If a stream drops back into Framing, link to the spine so reviewers see context.
