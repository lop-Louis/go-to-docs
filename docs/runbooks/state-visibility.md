---
title: State visibility map
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads and facilitators sharing transition status publicly
tone: Plainspoken, candid, energetic
narrative_goal: Make every work state explicit with its entry/exit signals and SLI
nav_group: Runbooks
nav_order: 70
nav_label: State visibility map
nav:
  - sidebar
---

# State visibility map

Stop guessing whether work is stuck—let this map show the state, entry signal, and SLI guardrail for every stream. <a href="#weekly-15-minute-review-agenda" data-primary-action>Publish your state map</a> or <a href="./index" data-secondary-action>Browse the runbooks index</a>. Pair this with a weekly 15-minute review so deviations surface fast.

| State        | Entry signals (what must be true)                                                | Exit signals (what closes the state)                                      | SLI                                            |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------- |
| Framing      | Problem statement + owner logged, success metric drafted, decision date penciled | Scope + exit metric agreed, risks captured, decider acknowledged          | ≤5 business days                               |
| Build        | Acceptance criteria frozen, team staffed, backlog item ≤3 days effort            | Working change merged behind flag or ready for Verify                     | ≤3 concurrent Build items per team             |
| Verify       | Change deployed to test/stage, telemetry hooks active                            | Acceptance checks green, Sev-1/2 regressions = 0, release note draft done | Verify cycle ≤48 hours                         |
| Ready        | Verification signed, rollback tested, runbooks updated                           | Feature/pack shipped or feature flag enabled to target audience           | Release queue ≤2 business days                 |
| Live / Watch | Change public; monitoring engaged                                                | Watch window complete; metrics stable                                     | Error budget burn <20%; feedback triaged daily |
