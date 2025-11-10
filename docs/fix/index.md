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
nav_group: Support
nav_order: 5
nav_label: 'Fix: Interrupt flows'
nav:
  - slot: main
    label: Support
  - sidebar
---

Resolve the highest-volume interrupts with a single click. [Pick the quick-check flow](#flows) or [Escalate straight to Support IT](/support-it/contacting-it).

Each page sticks to the 10-minute path and ends with a ready-to-paste escalation packet.

## Flows

- [Teams notifications](./teams-notifications.md) — Restore toast/badge alerts across devices before calling IT.
- [Repo or pipeline access](./access-repo-pipeline.md) — Confirm membership, branch rules, and run permissions prior to filing a ticket.
- [Design System component decision](./ds-component-decision.md) — Decide whether to use, extend, compose, or fork without relitigating.
- [Flag not behaving on Staging](./flag-staging.md) — Validate env, SDK keys, and targeting before pinging Platform.
- [VWO/Bloomreach sanity](./vwo-bloomreach-sanity.md) — Detect duplicate injections, CSP blocks, or wrong keys fast.

Need a different blocker covered? [Request a new Fix-it-fast flow](https://github.com/lop-louis/go-to-docs/issues/new?labels=kl,feature&title=%5BFlow%5D%20Fix%20it%20fast%20request&body=Page:%20https://northbook.guide/fix/).

## Related references

- [Quick-Run check](../ops/quick-run.md) — Run this before/after a fast fix so receipts stay in your PR.
- [Link Integrity runbook](../runbooks/link-integrity.md) — When a fix touches multiple anchors or navigation tables.
- [Start overview](../start-here/index.md) — Share this if an interrupt uncovers a missing orientation doc.
