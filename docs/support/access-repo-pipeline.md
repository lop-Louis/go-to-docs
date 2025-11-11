---
title: Repo & pipeline access
band: A
owner: '@platform-eng'
refresh_after_days: 60
change_type: patch
status: live
works_here:
  env:
    - prod
  apps:
    - GitHub
    - Azure DevOps
  regions:
    - MY
    - DK
audience: engineers
purpose: Fix common permission misses; otherwise file a precise access request.
owner_role: Platform Eng
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/access-model.html
stop_rule: Archive if model changes or <1 use in 90 days.
nav:
  - sidebar
nav_group: Mitigate
nav_order: 20
nav_label: 'Fix: Repo & pipeline access'
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

Unblock repo or pipeline access in five minutes, then escalate with a clean request. [Follow the quick checks](#quick-path) or [Escalate to Support IT](../support-it/contacting-it).
Exit metric: ≥90% of access issues resolve or escalate with a complete packet inside 10 minutes.

> **Works here:** prod · GitHub + Azure DevOps · Regions: MY, DK  
> **Owner:** Platform Engineering (`/support-it/contacting-it`)

## Quick path

1. **Org membership**: Confirm you’re in the correct org/tenant. If SSO, re-authenticate.
2. **Team role**: Ask your team lead to add you to the repo group (least privilege).
3. **Repo visibility**: Private vs internal; confirm the repo actually exists under the org.
4. **Branch protection**: If you can see but cannot push, check protection rules and required reviews.
5. **Pipeline run permission** (ADO/GitHub Actions): ensure you’re in the “Run pipelines” role or Actions is allowed for forks.

### CLI snippet to verify your permission (GitHub)

```bash
gh repo view <org>/<repo> --json name,viewerPermission
```

If `viewerPermission` is `"none"` or `"read"` and you need write, proceed to escalate.

## Escalation package

```
Repo/pipeline: <org>/<repo> or <ado project/pipeline>
Needed role: read|triage|write|maintain|admin
Reason (1 line): <ticket/user story or incident>
Owner/approver: <team lead or repo owner>
Start/End date: <if temporary>
```

**Handoff** → [/support-it/contacting-it](../support-it/contacting-it)

## Related references

- [Fast support index](./index.md) — When access isn’t the real blocker, point teammates to another flow.
- [Transition operating promises](../operate/transition-operating-promises.md) — Record if access delays breach a transition SLA.
- [Start overview](../start-here/index.md) — Share this when onboarding contributors who keep hitting access friction.
