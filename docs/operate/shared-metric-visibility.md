---
title: Shared metric visibility
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 120
status: live
audience: Stream leads aligning around one transition metric
tone: 'Plainspoken, candid, energetic'
narrative_goal: Lock in the baseline -> target -> date promise and keep it visible
nav_group: Operate
nav_order: 60
nav_label: Shared metric visibility
nav:
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

# Shared metric visibility

When multiple teams chase one metric, this template keeps baseline → target → date honest. [Fill in your metric table](#template) or [Browse the runbooks index](./runbooks-index). Pair it with the [Monthly Release Rhythm](../navigate/monthly-release.md) so status stays current at each tag.

## Template

| Metric                       | Baseline | Target          | Target date               | Status band | Notes / owner                             |
| ---------------------------- | -------- | --------------- | ------------------------- | ----------- | ----------------------------------------- |
| Weekly onboarding NPS        | 38       | ≥50             | Next quarterly checkpoint | 🟡          | Product Ops — blocked on support scripts  |
| Docs release cadence         | 1/mo     | 1/mo (no skips) | Rolling monthly           | 🟢          | Docs Steward — on track                   |
| Interrupt resolution <10 min | 62%      | 80%             | Next Fast Support update  | 🟠          | Support Lead — need new Fast Support flow |

Color legend: 🟢 on track, 🟡 at risk, 🟠 behind.

## How to use it

1. Duplicate the table into the shared status doc.
2. Keep baselines immutable; adjust targets only during planning.
3. Update status bands weekly and drop a link to the latest receipt (release, PR, metric screenshot).

## Related references

- [Transition operating promises](./transition-operating-promises.md) — Promise owners should include their metric deltas in status updates.
- [State ledger](../navigate/state-ledger.md) — Confirm the metrics show up in the generated entry each time you tag a release.
- [Fast support index](../support/) — Add a metric row if interrupts are part of the promise you’re tracking.
