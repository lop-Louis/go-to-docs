---
title: Guardrail index
band: A
owner: '@lop'
refresh_after_days: 60
change_type: patch
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/adopt-deep-embed-north-star
date: '2025-11-11'
nav:
  - sidebar
---

# Guardrail index

Map work to the right guardrail fast. [See the canonical guardrail descriptions](#guardrails-table) or [Jump to the North Star & Guardrails playbook](./north-star-guardrails.md).
Exit metric: every change cites a guardrail ID within one hop (≤ 60 seconds).

::: tip Tiny receipts — Guardrails (v2025.11)

- m-lab-pass: 0.94
- m-defect-rate-changed-pages: 0.03
  [See the receipts](../signals/receipts/v2025.11-operate.md)
  :::

## Guardrails table

| id     | Name                      | Summary                                                                                      | Primary doc                                           |
| ------ | ------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| gr-101 | Narrator tone guide       | Keep Band-A guidance plainspoken, candid, and respectful; CTA verbs follow the allowlist.    | [Voice & Tone](../navigate/tone.md)                   |
| gr-102 | Mitigate fast             | Fix interrupts within 10 minutes, freeze under 24 hours, and recover inside 7 days.          | [Support index](../support/index.md)                  |
| gr-103 | Guardrail traceability    | Map every change to a guardrail or exception, keep receipts, and enforce opener + CTA rules. | [North Star & Guardrails](./north-star-guardrails.md) |
| gr-104 | Sanitization public       | Ship Band-A safe content: no secrets, names, or sensitive numbers; rely on ranges instead.   | [Band A requirements](../navigate/band-a.md)          |
| gr-105 | Signal registry freshness | Maintain ≤ 8 signals, each with owner + 30-day SLA, and publish receipts every tag.          | [Signal Registry](./signal-registry.md)               |

Need to add or retire a guardrail? Log the decision, update this table, and link the new ID to a public doc before shipping.
