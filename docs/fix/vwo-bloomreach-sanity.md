---
title: VWO/Bloomreach script sanity check
band: A
owner: '@web-platform'
refresh_after_days: 45
change_type: patch
status: live
works_here:
  env: [staging, prod]
  apps: [VWO, Bloomreach]
  regions: [MY, DK]
audience: engineers, marketers
purpose: Detect duplicate/incorrect injections and CSP blocks quickly.
owner_role: Web Platform
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/exp-platform.html
stop_rule: Update if vendor URLs or CMS template changes.
nav:
  - sidebar
nav_group: Fix it fast
nav_order: 50
---

Verify experiment scripts are injected once, load from the right CDN, and aren’t blocked by CSP. <a href="#quick-path" data-primary-action>Run the sanity checks</a> or <a href="/support-it/contacting-it" data-secondary-action>Escalate to Support IT</a>.

> **Works here:** staging + prod · VWO + Bloomreach · Regions: MY, DK  
> **Owner:** Web Platform (`/support-it/contacting-it`)

## Quick path

1. **One instance only**: Open DevTools → Console and run the snippet below. Expect **1** VWO and **1** Bloomreach.

   ![Console output counting VWO and Bloomreach scripts](/img/fix/vwo-bloomreach-sanity-1.png)

2. **Correct URL**: Network tab confirms vendor CDN with **200** and no 404.
3. **CSP**: Console has no `blocked by Content Security Policy` errors.

   ![Network waterfall showing vendor scripts loading once](/img/fix/vwo-bloomreach-sanity-2.png)

4. **Order**: Bloomreach loads after core; experiments don’t delay page load > 200 ms.
5. **Staging vs Prod**: Keys/IDs match environment.

### Console snippet: count injections

```js
;(() => {
  const vwo = [...document.scripts].filter(s => /vwo.*\.js/.test(s.src)).length
  const br = [...document.scripts].filter(s => /bloomreach|brcdn/.test(s.src)).length
  console.log({ vwo, bloomreach: br })
})()
```

### Escalation package

```
URL tested: <page>
Counts: { vwo: <n>, bloomreach: <n> }
Errors: <console errors if any>
Env keys/IDs: <staging/prod ids>
Network screenshots attached
```

**Handoff** → [/support-it/contacting-it](/support-it/contacting-it)
