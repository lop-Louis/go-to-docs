---
title: Fast support index
band: A
owner: '@platform-eng'
refresh_after_days: 45
change_type: patch
status: live
audience: People clearing high-volume interrupts in under 10 minutes
tone: practical
narrative_goal: Route teammates to the right quick-check flow before escalating
nav_group: Mitigate
nav_order: 50
nav_label: 'Fix: Interrupt flows'
nav:
  - sidebar
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

Resolve the highest-volume interrupts with a single click. [Pick the quick-check flow](#flows) or [Escalate straight to Support IT](../support-it/contacting-it).
Exit metric: freezes trigger inside 24 hours and recoveries land within 7 days.

> Looking for the lane overview? [Open the Mitigate landing page](../mitigate/index.md) for opener copy, receipts, and CTA placements.

::: tip Tiny receipts — Mitigate (v2025.11)

- m-time-to-freeze: 6 hours average
- m-time-to-recovery: 2.5 days
  [See the receipts](../signals/receipts/v2025.11-mitigate)
  :::

Each page sticks to the 10-minute path and ends with a ready-to-paste escalation packet.

## Flows

- [Teams notifications](./teams-notifications) — Restore toast/badge alerts across devices before calling IT.
- [Repo or pipeline access](./access-repo-pipeline) — Confirm membership, branch rules, and run permissions prior to filing a ticket.
- [Design System component decision](./ds-component-decision) — Decide whether to use, extend, compose, or fork without relitigating.
- [Flag not behaving on Staging](./flag-staging) — Validate env, SDK keys, and targeting before pinging Platform.
- [VWO/Bloomreach sanity](./vwo-bloomreach-sanity) — Detect duplicate injections, CSP blocks, or wrong keys fast.

Need a different blocker covered? [Request a new Fix-it-fast flow](https://github.com/lop-louis/go-to-docs/issues/new?labels=kl,feature&title=%5BFlow%5D%20Fix%20it%20fast%20request&body=Page:%20https://northbook.guide/mitigate/).

## Related references

- [Quick-Run check](../navigate/quick-run) — Run this before/after a fast fix so receipts stay in your PR.
- [Start overview](../start-here/index.md) — Share this if an interrupt uncovers a missing orientation doc.
