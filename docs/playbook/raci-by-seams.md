---
title: RACI by Seams
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: draft
audience: Leads mapping accountability across seams
tone: Plainspoken, candid, energetic
narrative_goal: Provide a table-driven way to clarify who owns what work
nav:
  - none
---

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


# RACI by Seams

Mapping RACI by seam keeps ownership stable even when teams reorganize. <a href="#why-seams-not-teams" data-primary-action>Use the seam-first template</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>. Each seam represents a boundary where ownership often fuzzes—APIs ↔ clients, platform ↔ feature, product ↔ ops.

## Why seams, not teams

- Teams reorganize; seams persist where work hands off.
- Seams keep focus on outcomes (“Data quality”) instead of reporting lines.
- Ownership debates shrink when the table names the seam first.

## Drafting the table

1. **List the seams.** Capture the interfaces where hand-offs hurt the most.
2. **Assign roles, not people.** Roles survive reorgs; handles change.
3. **Keep it lean.** One R, one A. Add C/I only if they act on the seam.
4. **Validate with the seam owners.** Walk the table together and confirm nothing overlaps.
5. **Link to supporting docs.** Decisions go to the <u>[Decision Spine](../decision-spine.md)</u>; policies go to the <u>[Answer Ledger](../answer-ledger.md)</u>.

## Template

| Seam | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
|
