---
title: VWO/Bloomreach script sanity check
band: A
owner: '@web-platform'
refresh_after_days: 45
change_type: patch
status: live
works_here:
  env:
    - staging
    - prod
  apps:
    - VWO
    - Bloomreach
  regions:
    - MY
    - DK
audience: 'engineers, marketers'
purpose: Detect duplicate/incorrect injections and CSP blocks quickly.
owner_role: Web Platform
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/exp-platform.html
stop_rule: Update if vendor URLs or CMS template changes.
nav:
  - none
nav_group: Support
nav_order: 50
nav_label: VWO/Bloomreach sanity
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-102
cta_primary_label: Choose a fix flow
cta_secondary_label: See example exception
leading_metric: m-time-to-freeze
lagging_metric: m-time-to-recovery
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
search: false
---

Verify experiment scripts are injected once, load from the right CDN, and aren’t blocked by CSP. [Run the sanity checks](#quick-path) or [Escalate to Support IT](../support-it/contacting-it).

> **Works here:** staging + prod · VWO + Bloomreach · Regions: MY, DK  
> **Owner:** Web Platform (`Web Platform-O365/Issues-Support`)

## Quick path

1. **One instance only**: Open DevTools → Console and run the snippet below. Expect **1** VWO and **1** Bloomreach.
2. **Correct URL**: Network tab confirms vendor CDN with **200** and no 404.
3. **CSP**: Console has no `blocked by Content Security Policy` errors.
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

**Handoff** → [/support-it/contacting-it](../support-it/contacting-it)

## Related references

- [Fast support index](./index.md) — Route to other flows when scripts aren’t the issue.
- [Accessibility Quick Wins](../operate/accessibility-quick-wins.md) — Re-check if experiments inject UI that could regress a11y.
- [Monthly cadence](../navigate/monthly-release.md) — Document significant experiment fixes in the release log.
