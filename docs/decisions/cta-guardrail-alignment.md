---
title: Decision — CTA guardrail alignment
band: A
owner: '@lop'
change_type: patch
status: draft
refresh_after_days: 45
decider: '@lop'
decision_date: '2025-11-10'
next_review: '2026-01-10'
success_metric: >-
  CTA enforcement relies on the post-build above-the-fold scan until new
  metadata and automation exist.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
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

# CTA guardrail alignment

Reduce overlapping CTA drift checks until the metadata path is ready. [See the governing contract](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../operate/state-visibility.md) · Ledger: [Release state](../navigate/state-ledger.md)

## Intent

Keep the high-signal CTA guardrail (the above-the-fold render check) and pause the redundant markdown scan so Quick-Run receipts stay clean while we design schema-backed metadata.

## Tension

- Two checks—`verify-primary-actions.mjs` (markdown) and the post-build render scan—flag the same failures and extend Quick-Run for no extra safety.
- CTA placement must still satisfy the [North Star & Guardrails opener contract](../operate/north-star-guardrails.md#ui-delivery-checks).
- Future CTA metadata needs schema + documentation before we add automation again.

## Guardrails and constraints

1. Quick-Run must finish in ≤10 minutes; duplicate failures violate that.
2. Rendered output is the source of truth for CTA placement, not markdown heuristics.
3. Any new metadata enforcement must be documented, schema-backed, and publicly logged before shipping.

## Options considered

| Option                          | Notes                                                      |
| ------------------------------- | ---------------------------------------------------------- |
| Keep both checks                | Zero change but doubles noise.                             |
| Drop the render scan            | Faster but loses the real guardrail.                       |
| Drop the markdown scan (chosen) | Keeps the higher-value guardrail while we design metadata. |

## Decision

Pause the markdown CTA enforcement (`scripts/verify-primary-actions.mjs`, `pnpm run verify:cta`, docs-build hook, Link Drift lab reference). Rely on the post-build above-the-fold scan as the single CTA guardrail until metadata work is ready.

## Commitments

1. Remove the markdown script and all references so Quick-Run stays within the budget.
2. Document that CTA compliance relies on the render scan, and log the future metadata follow-up.
3. Track CTA incidents via the render scan to confirm coverage while metadata design progresses.

## Proof / acceptance

- CTA issues continue to surface through the post-build scan.
- Quick-Run remains ≤10 minutes without redundant failures.
- Future CTA metadata decision is documented before reintroducing structured enforcement.

## Review cadence

- **Next review:** Early January 2026.
- **Success metric:** Zero CTA regressions escape because of the pared-back guardrail; Quick-Run receipts show reduced noise.
- **Follow-up:** Reintroduce structured enforcement when the CTA metadata schema and automation ship.
