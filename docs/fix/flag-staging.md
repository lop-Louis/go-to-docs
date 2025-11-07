---
title: Feature flag not behaving on Staging
band: A
owner: '@platform-eng'
refresh_after_days: 45
change_type: patch
status: live
works_here:
  env: [staging]
  apps: ['Feature flag SDK']
  regions: [MY, DK]
audience: engineers, QA
purpose: Verify environment, SDK keys, and targeting; then escalate with proof.
owner_role: Platform Eng
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/flagging-model.html
stop_rule: Archive if vendor/keys change or <1 use in 90 days.
nav:
  - sidebar
nav_group: Fix it fast
nav_order: 40
---

Confirm staging feature flags in minutes before looping in the platform team. <a href="#quick-path" data-primary-action>Run the flag checks</a> or <a href="/support-it/contacting-it" data-secondary-action>Escalate to Support IT</a>.

> **Works here:** staging · Feature flag SDK · Regions: MY, DK  
> **Owner:** Platform Engineering (`/support-it/contacting-it`)

## Quick path

1. **Env check**: App shows **Staging** build and commit hash matches latest.

   ![Staging build indicator banner](/img/fix/flag-staging-1.png)

2. **SDK key**: Staging key is configured (not Production).
3. **Flag exists**: The exact flag key is present and **on** for staging environment.
4. **User context**: The attributes used in targeting (email, role, cohort) are present in the SDK init.
5. **Force refresh**: Clear cache and call the SDK’s `flush/identify/variation` test.

   ![Console logging variation result](/img/fix/flag-staging-2.png)

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

**Handoff** → [/support-it/contacting-it](/support-it/contacting-it)
