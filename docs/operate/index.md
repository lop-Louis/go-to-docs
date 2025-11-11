---
title: Playbook index
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
audience: 'Teams aligning on principles, policies, and shared patterns'
tone: plainspoken
narrative_goal: Point to the core playbook pages that keep guidance consistent
nav_group: Operate
nav_order: 15
nav_label: Playbook canon
nav:
  - slot: main
    label: Operate
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

Keep guidance consistent without adding chores. [Open the playbook page you need](#playbook-pages) or [Give feedback on the playbook](https://github.com/lop-louis/go-to-docs/issues/new?labels=kl,feedback&title=%5BFeedback%5D%20Playbook%20index&body=Page:%20https://northbook.guide/operate/).
Exit metric: annex labs stay ≥ 0.9 pass rate and defects per changed page ≤ 0.05.

::: tip Tiny receipts — Operate (v2025.11)

- m-lab-pass: 0.94 across Verify-in-10 runs
- m-defect-rate-changed-pages: 0.03
  [See the receipts](../signals/receipts/v2025.11-operate.md)
  :::

These entries inherit the [content governance rules](./governance) so readers recognize layout, tone, and CTA placement at a glance.

## Playbook pages

- [Guides vs rules](./guides-vs-rules.md) — Classify whether something is advisory or mandatory.
- [Handshake contracts](./handshake-contracts.md) — Frame promises and acceptance criteria before collaborating across seams.
- [Versioning & releases pilot](./versioning-and-releases/) — Follow the opener pattern + annex lab combo before cloning the slice.
- [RACI by seams](./raci-by-seams.md) — Assign ownership using the seam-first model.
- [Stop rules](./stop-rules.md) — Define the tripwires that pause or stop work when promises are at risk.
- [Scoreboard](./scoreboard.md) — Publish baselines, targets, cadence, and accountability in one card.
- [North Star & guardrails](./north-star-guardrails.md) — Keep direction, autonomy, and accountability in balance.
- [Policy → action: expenses](./pattern-expense-sla) — Show the expense SLA as a working example.

Want a new pattern canonized? [Propose an addition to the playbook](https://github.com/lop-louis/go-to-docs/issues/new?labels=kl,proposal&title=%5BPlaybook%5D%20New%20pattern&body=Page:%20https://northbook.guide/operate/).

## Related references

- [Start overview](../start-here/index.md) — Direct newcomers here before dropping them into canonical playbooks.
- [Runbooks index](../operate/runbooks-index.md) — Use this when a pattern needs a chore-heavy counterpart.
- [Transition operating promises](../operate/transition-operating-promises.md) — Where playbook language turns into enforceable promises.
