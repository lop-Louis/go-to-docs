---
title: Decision — Contract metadata links
band: A
owner: '@lop'
change_type: patch
status: draft
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-10'
next_review: '2026-01-10'
success_metric: Contracts describe their release, state, and receipts context without introducing undocumented frontmatter fields.
---

# Contract metadata links decision

Protect guardrail clarity before adding new schema fields. [Review the frame](#frame) or [See the contract in practice](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../runbooks/state-visibility.md) · Ledger: [Release state](../state/index.md) · Release reference: [site-v2025.11 bundle](../../ops/releases/2025-11/index.md)

## Frame

### Problem

We want every contract page to expose its introducing release plus links to State and Receipts. Initial implementation added `introduced_in_release`, `state_link`, and `receipts_link` frontmatter keys, but they are undocumented and unvalidated, which risks drift and confusion when editors copy the pattern.

### Constraints

- Guardrails require public clarity: every addition must be documented, lintable, and traceable through the Change → Decision → Guardrail → Page → Signal → Receipt chain.
- Frontmatter fields are currently enforced by `schemas/frontmatter.schema.json`; adding new keys without schema/docs means they can rot silently.
- Documentation should remain runnable in ≤10 minutes—extra metadata must not force manual cleanup when automation regenerates navigation.

### Stakes

- **Handled well:** Contributors know exactly how to represent release/context links, automation can rely on schema validation, and contracts stay consistent.
- **Handled poorly:** Editors copy undocumented keys, automation ignores them, and we accumulate pseudo-standards that collide with future guardrails.

## Options

### Option 1 — Keep body-only links (status quo)

Rely on inline paragraphs to mention release/state/receipts. Pros: no schema work. Cons: no structured data and inconsistent placement.

### Option 2 — Add new frontmatter keys immediately

Ship `introduced_in_release`, `state_link`, `receipts_link` now and depend on convention. Pros: structured info exists. Cons: keys are undocumented, unlinted, and easy to drift from the contract philosophy.

### Option 3 — Delay new keys until schema + governance docs are ready

Remove the provisional keys for now, keep the context in body copy, and revisit once we have schema updates plus a governance note. Pros: no drift, still communicates context, future change will include automation + documentation. Cons: structured tooling waits until the follow-up cycle.

## Decide

- **Choice:** Option 3 — Delay adding new frontmatter keys until schema + governance docs exist.
- **Decider:** Product/Operations lead (@lop acting steward).
- **Date:** Mid-November 2025 release window.
- **Rationale:** Keeps the contract aligned with published guardrails, avoids undocumented metadata, and sets a clear follow-up to add schema-backed keys later.
- **Related contract:** [Northbook Operations Contract v1.0](../contracts/northbook-operations-contract-v1.md).

## Review

- **Next review:** Early January 2026.
- **Success metric:** Contracts continue to cite release/state/receipt context in the body, and no new undocumented frontmatter keys appear before the schema/governance update.
- **Owner actions:** Draft the schema extension + governance note when ready, then create a follow-up decision to adopt the structured fields.
