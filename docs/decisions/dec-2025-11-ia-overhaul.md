---
title: adopt deep-embed north star + four-bucket ia with autonomy ladder
band: A
owner: '@lop'
refresh_after_days: 30
change_type: major
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
date: '2025-11-11'
decider: '@lop'
decision_date: '2025-11-11'
next_review: '2026-01-10'
seam: governance
decision_id: dec-2025-11-ia-overhaul
baseline_window: last-30-days
delta_type: people-capacity-risk
stop_rule: >-
  freeze if annex lab pass < 80% or time-to-answer worsens >=20% vs baseline for
  7 days.
tags:
  - v2025.11-governance
success_metric: >-
  North Star line + opener pattern visible on each bucket landing with receipts
  panel shipped; CTA lint stays <= 1 red-line per cycle.
release_tag: site-v2025.11
related_contract: ../contracts/northbook-ia-overhaul.md
decision_link: /decisions/dec-2025-11-ia-overhaul.md
---

# Adopt deep-embed North Star + four-bucket IA with autonomy ladder

Make the deep-embed governance bet actionable for every seam.
[Open the IA overhaul contract](../contracts/northbook-ia-overhaul.md) or [review the governance state snapshot](../governance/state/v2025.11-governance.md).

## context

The site behaves like a content library: helpful but unable to prove value or protect tone. We're formalizing the operating model so guidance stays respectful, changes are traceable, and outcomes have receipts. Guardrail reference: [Narrator tone guide (gr-101)](../navigate/tone.md#guardrail-id-gr-101--narrator-tone-guide).

## decision

Adopt the **deep-embed** model: one North Star line visible on Home and each section landing; organize into **navigate, operate, learn, mitigate** buckets; enforce the **autonomy ladder** (nudge-first) and required page opener pattern (one-sentence why, two actions, exit metric).

- Tradeoffs:
  - Less copy freedom above the fold in exchange for clarity and measurability.
  - Added CI nudges now to avoid costly retrofits later.
  - One set of signals capped at eight, so some metrics won't make the cut.

## scope

**In:** all public Band-A pages and annex labs under navigate/operate/learn/mitigate; monthly seam-scoped tags `vyyyy.mm-<seam>`.  
**Out:** doc engine swaps, paid tooling, staffing changes.

## acceptance

- Every covered page renders the opener pattern above first section.
- Frontmatter required: `bucket, north_star_id, guardrail_id, owner, band, date, cta_primary_label, cta_secondary_label, leading_metric, lagging_metric`; add `decision_link` when scope/metrics change.
- Traceability complete: `pr <-> decision/exception <-> guardrail <-> page <-> signal <-> receipt` (no orphans).
- Signals registry seeded (<= 8 active, each with owner and 30-day SLA).
- Tone allow/ban lists applied; CTA labels pass lint.
- CI budget cold start <= 5 minutes; blocks only on red-lines and broken traceability.
- First seam landing pages shipped with tiny receipts panel.
- All ids and tags are lowercase.

## receipts (expected)

- **Leading:** `m-nav-open` up vs baseline; `m-lab-pass` >= 90% on pilot annex lab.
- **Lagging:** `m-time-to-answer` improves >= 10% in first 30 days; `m-decision-hit-rate` >= 60% by second tag.
- Attach receipts to `v2025.11-governance`, then monthly.

## freeze and exit

**Freeze triggers:** annex lab pass < 80%; time-to-answer worsens >= 20% vs baseline; exceptions older than 14 days.  
**Exit criteria:** owner identified; fix applied; proof metric back within 10% of baseline for 7 consecutive days; freeze lifted via noted exception close.

## links

- [state snapshot](../governance/state/v2025.11-governance)
- [receipts](../signals/receipts/v2025.11-governance)
- [exceptions log](../governance/exceptions)
- [exceptions ledger](../governance/_exceptions_ledger.csv)
- [guardrails index](../operate/guardrail-index#guardrails-table)
