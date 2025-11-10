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
success_metric: CTA enforcement relies on the post-build above-the-fold scan until new metadata and automation exist.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
---

# CTA guardrail alignment decision

Reduce overlapping CTA drift checks until the metadata path is ready. [Review the frame](#frame) or [See the governing contract](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../runbooks/state-visibility.md) · Ledger: [Release state](../state/index.md)

## Frame

### Problem

We currently run two CTA contract checks: a markdown head scan that enforces `data-primary-action`/`data-secondary-action`, and a post-build scan that confirms the CTA pair renders above the first section. These duplicate each other, add noise to Quick-Run receipts, and block experiments with future metadata/frontmatter without giving additional safety.

### Constraints

- CTA placement still has to satisfy the [North Star & Guardrails](../playbook/north-star-guardrails.md#ui-delivery-checks) opener contract.
- Automation should stay runnable in ≤10 minutes (`Quick-Run` contract), so overlapping checks that fail for the same reason are discouraged.
- Future metadata changes (e.g., CTA definitions in frontmatter) must be documented and schema-backed before we add new enforcement.

### Stakes

- **If handled well:** Contributors keep the higher-signal post-build scan while we design the next metadata contract, and PR noise drops.
- **If handled poorly:** Removing the redundant check without a trace allows drift or creates confusion when we reintroduce stricter automation later.

## Options

### Option 1 — Keep both checks

Do nothing; the markdown scan and the post-build scan both run. Pros: zero change. Cons: duplicated failures, no new signal, harder to evolve metadata.

### Option 2 — Remove the post-build scan

Drop the above-the-fold check and keep the markdown enforcement. Pros: simpler implementation. Cons: Loses the guardrail that actually checks rendered output, leaving only a syntax heuristic.

### Option 3 — Remove the markdown-enforcement scan (preferred)

Stop running `verify-primary-actions.mjs` until new metadata/frontmatter automation exists; keep the post-build/above-fold scan as the single source of truth. Pros: Removes redundant noise while preserving the higher-value guardrail. Cons: Requires future decision to reintroduce structured enforcement when ready.

## Decide

- **Choice:** Option 3 — Pause the markdown CTA enforcement.
- **Decider:** Product/Operations lead (@lop acting steward).
- **Date:** Mid-November 2025 release window.
- **Rationale:** The above-the-fold scan already guarantees CTA compliance in the rendered output. Keeping only one guardrail reduces noise and keeps cycle time under the 10-minute Quick-Run target while we design the next metadata layer.
- **Implementation:** Removed `scripts/verify-primary-actions.mjs`, its `pnpm run verify:cta` hook, the docs-build call, and the Link Drift lab reference.

## Review

- **Next review:** Early January 2026.
- **Success metric:** CTA issues continue to be caught by the post-build scan, Quick-Run stays ≤10 minutes, and future CTA metadata decisions are documented before reintroducing the check.
- **Follow-up:** When the frontmatter schema and automation for CTA metadata are ready, create a new decision to reintroduce structured enforcement.
