---
title: 'Teams notifications: quick checks and when to escalate'
band: A
owner: '@support-it'
refresh_after_days: 60
change_type: patch
status: live
works_here:
  env: [prod]
  apps: ['Microsoft Teams desktop', 'Microsoft Teams web']
  regions: [MY, DK]
audience: everyone
purpose: Resolve common "no toast/badge" issues in under 10 minutes; otherwise hand off cleanly.
owner_role: Support IT liaison
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
adr_ref: /governance/decisions/it-handoff.html
stop_rule: Archive if <1 use in 90 days or upstream policy changes.
nav:
  - sidebar
nav_group: Fix it fast
nav_order: 10
---

Keep Teams notifications reliable with a 10-minute check path before involving IT. <a href="#quick-path-3-7-checks" data-primary-action>Run the quick checks</a> or <a href="/support-it/contacting-it" data-secondary-action>Escalate to Support IT</a>.

> **Works here:** prod · Microsoft Teams desktop/web · Regions: MY, DK  
> **Owner:** Support IT liaison (`/support-it/contacting-it`)

## Quick path (3–7 checks)

1. **Teams settings**: Profile → Settings → **Notifications**. Ensure Global = All, affected channel is **Followed**.

   ![Teams notifications settings panel](/img/fix/teams-notifications-1.png)

2. **Do Not Disturb / Focus**: Windows Focus Assist OFF; macOS Do Not Disturb OFF during work hours.
3. **OS notifications**: System → Notifications → Teams = Allowed (banner + badge).

   ![Operating system notification center showing Teams allowed](/img/fix/teams-notifications-2.png)

4. **Membership**: Confirm you’re still a member of the team and the channel is **Follow** not **Mute**.
5. **Web vs desktop**: Try web at <https://teams.microsoft.com>. If web works but desktop doesn’t, sign out and back in.
6. **Cache reset**: Sign out, fully quit Teams, reboot.

> **Done** when a step restores toasts or badges.

## When to escalate

Escalate if:

- Fails on **multiple devices** or both web and desktop.
- Settings look correct but no toast after 30 minutes on a known active channel.
- You see license prompts or permission errors.

### Escalation package (paste in ticket)

```
Steps tried: 1–6 above
Channel link: <paste link>
Last expected message time: <UTC+08>
Devices tested: <Windows/macOS/iOS/Web>
Teams version: <Help → About>
Region/office: <MY-KL or DK-Cph>
Screenshots: teams-notifications-1, teams-notifications-2
```

## Why we do it this way

Upstream policy and device settings dominate behavior; we keep only a 10-minute path then hand off to IT as source of truth.

**Handoff** → [/support-it/contacting-it](/support-it/contacting-it)
