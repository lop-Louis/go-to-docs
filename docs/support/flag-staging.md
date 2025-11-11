---
title: Feature flag not behaving on Staging
band: A
owner: '@platform-eng'
refresh_after_days: 45
change_type: patch
status: live
works_here:
  env:
    - staging
  apps:
    - Feature flag SDK
  regions:
    - MY
    - DK
audience: 'engineers, QA'
purpose: 'Verify environment, SDK keys, and targeting; then escalate with proof.'
owner_role: Platform Eng
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/flagging-model.html
stop_rule: Archive if vendor/keys change or <1 use in 90 days.
nav:
  - none
nav_group: Support
nav_order: 40
nav_label: Feature flag on staging
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-102
cta_primary_label: Choose a fix flow
cta_secondary_label: See example exception
leading_metric: m-time-to-freeze
lagging_metric: m-time-to-recovery
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

Confirm staging feature flags in minutes before looping in the platform team. [Run the flag checks](#quick-path) or [Escalate to Support IT](../support-it/contacting-it).

> **Works here:** staging · Feature flag SDK · Regions: MY, DK  
> **Owner:** Platform Engineering (`/Web Platform-O35/Issues-Support`)

## Quick path

1. **Env check**: App shows **Staging** build and commit hash matches latest.
2. **SDK key**: Staging key is configured (not Production).
3. **Flag exists**: The exact flag key is present and **on** for staging environment.
4. **User context**: The attributes used in targeting (email, role, cohort) are present in the SDK init.
5. **Force refresh**: Clear cache and call the SDK’s `flush/identify/variation` test.

### Code snippet (evaluate a flag)

```ts
const on = client.variation('my-flag-key', { key: userId, role }, false)
console.log('flag my-flag-key =', on)
```

### Escalation package

```
Flag key: <key>
SDK: <name + version>
Context: { userId: "...", role: "...", cohort: "..." }
Staging build hash: <abc123>
Expected vs observed: <1 line>
Console/network screenshots attached
```

**Handoff** → [/support-it/contacting-it](../support-it/contacting-it)

## Related references

- [Fast support index](./index.md) — Share other flows if the blocker isn’t flag-related.
- [Transition operating promises](../operate/transition-operating-promises.md) — Update promises if the flag outage pauses a handover.
- [Decision Spine](../operate/decision-spine.md) — Refer to it when a flag outcome requires a re-frame or new decision.
