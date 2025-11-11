---
title: RACI by Seams
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: draft
audience: Leads mapping accountability across seams
tone: 'Plainspoken, candid, energetic'
narrative_goal: Provide a table-driven way to clarify who owns what work
nav:
  - none
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

# RACI by Seams

Mapping RACI by seam keeps ownership stable even when teams reorganize. [Use the seam-first template](#why-seams-not-teams) or [Browse the runbooks index](../operate/runbooks-index). Each seam represents a boundary where ownership often fuzzes—APIs ↔ clients, platform ↔ feature, product ↔ ops.

## Why seams, not teams

- Teams reorganize; seams persist where work hands off.
- Seams keep focus on outcomes (“Data quality”) instead of reporting lines.
- Ownership debates shrink when the table names the seam first.

## Drafting the table

1. **List the seams.** Capture the interfaces where hand-offs hurt the most.
2. **Assign roles, not people.** Roles survive reorgs; handles change.
3. **Keep it lean.** One R, one A. Add C/I only if they act on the seam.
4. **Validate with the seam owners.** Walk the table together and confirm nothing overlaps.
5. **Link to supporting docs.** Decisions go to the [Decision Spine](../operate/decision-spine.md); policies go to the [Answer Ledger](../operate/answer-ledger.md).

## Template

| Seam | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
|
