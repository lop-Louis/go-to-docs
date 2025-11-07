---
title: Contact Support IT
band: A
owner: '@support-it'
refresh_after_days: 60
change_type: patch
status: live
works_here:
  env: [prod, staging]
  apps: [Teams, ServiceNow]
  regions: [MY, DK]
audience: everyone
purpose: Provide a single place to escalate unresolved IT blockers with the right evidence.
owner_role: Support IT liaison
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: resolve
nav:
  - none
---

Escalate stubborn IT issues with a clean packet so the liaison can act fast. <a href="#prep-the-packet" data-primary-action>Prep the escalation packet</a> or <a href="#contact-options" data-secondary-action>Pick a contact channel</a>.

> **Works here:** staging + prod · Teams + ServiceNow · Regions: MY, DK  
> **Owner:** Support IT liaison (support-it@northbook.guide)

## Prep the packet

1. **Summarize the impact** in one sentence (team, workflow, urgency).
2. **Attach evidence**: screenshots, logs, and the steps from the quick path you already ran.
3. **State what you need**: toggle access, unblock device, confirm policy, etc.
4. **List approvers** with contact handles so IT can reach them on the first pass.

## Contact options

- **Service desk ticket (preferred):** ServiceNow → _IT / Support_ → Assignment group `Support IT Liaison`. Paste the packet, add severity (P1–P4), and link to the originating runbook.
- **Backup chat:** Post the packet in `#support-it` (Teams) and @mention `@Support IT Liaison` so they can triage while you file the ticket.
- **Emergency only:** Call the on-call number from ServiceNow if the blocker is regulatory or customer-facing and note the incident ID afterward.

## SLA + escalation

| Priority | Trigger                    | First response   | Resolution target |
| -------- | -------------------------- | ---------------- | ----------------- |
| P1       | Regulatory/customer impact | 15 minutes       | 4 hours           |
| P2       | Multiple users blocked     | 1 hour           | 1 business day    |
| P3       | Single user interruption   | 4 business hours | 2 business days   |
| P4       | Informational              | 1 business day   | 5 business days   |

Missed SLA? Reply to the ticket, @mention the liaison again, then escalate via the `/escalations` contact listed in [/governance](/governance).

**Handoff** → Quick paths usually live under [/runbooks](../runbooks/index.md); link that context when you escalate.
