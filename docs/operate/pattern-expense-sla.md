---
title: Policy → Action Pattern (Expenses)
band: A
owner: '@lop-Louis'
refresh_after_days: 180
change_type: patch
status: live
labels:
  - finance
audience: People converting finance policies into public-safe actions
tone: 'Plainspoken, candid, energetic'
narrative_goal: 'Show how to translate expense policy into fast, safe guidance'
nav_group: Operate
nav_order: 40
nav_label: Policy-to-action example
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

# Policy → Action Pattern (Expenses)

This three-line pattern turns finance policy into action without leaking specifics. [Apply the expense pattern](#public-safe-example) or [Browse the runbooks index](./index).

This pattern turns a policy reminder into action with three lines:

1. **SLA** (the time rule)
2. **Example** (how to apply it)
3. **Consequence** (what happens if missed)

## Public-safe example

- **SLA:** Submit expense claims within **14 days** of the event or receipt.
- **Example:** Travel - submit within 14 days after you return. Other expenses - submit within 14 days of the receipt date.
- **Consequence:** Late submissions **may be refused**.

## Common loophole question

> "Can I wait to maximize an allowance (e.g., pro-rated year-end)?"

**Short answer:** Don't miss the SLA. Eligibility is determined by Finance rules (often the **transaction date**). Confirm **which date** controls eligibility, but submit on time.

## Why it works

- Keeps the public doc focused on safe, reusable language
- Gives readers an immediate action instead of the full internal policy
- Moves internal details (systems, edge cases, reimbursement rules) to private channels

## Publish checklist

- ✔️ No internal system names or screenshots
- ✔️ SLA expressed as a range or day count (no calendar dates)
- ✔️ Generic consequence that reflects policy intent without quoting it
- ✔️ Link from onboarding/FAQ so people can find the pattern quickly

## Related references

- [Start overview](../navigate/index) — Direct readers here when they need the why before the pattern.
- [Transition operating promises](./transition-operating-promises) — Use this when expenses are part of a handover contract.
- [State ledger](../navigate/state-ledger) — Log when you update this pattern so the change shows up in the release notes.
