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
success_metric: >-
  Contracts describe their release, state, and receipts context without
  introducing undocumented frontmatter fields.
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

# Contract metadata links

Protect guardrail clarity before adding new schema fields. [See the contract in practice](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../operate/state-visibility.md) · Ledger: [Release state](../navigate/state-ledger.md) · Release reference: [site-v2025.11 bundle](../../ops/releases/2025-11/index.md)

## Intent

Expose release, State, and Receipts context for every contract without inventing undocumented frontmatter fields that automation cannot trust yet.

## Tension

- Editors added provisional `introduced_in_release`, `state_link`, and `receipts_link` fields with no schema or governance note.
- Guardrails demand public clarity plus validation across the Change → Decision → Guardrail → Page → Signal → Receipt chain.
- Any metadata change must remain runnable in ≤10 minutes; manual cleanup of rogue keys breaks that promise.

## Guardrails and constraints

1. Contracts already show owner, band, exit metric sentence, State link, and Receipts link in the body.
2. `schemas/frontmatter.schema.json` is the single enforcement point—no new keys without schema + docs.
3. Governance defaults to “deny outside guardrails,” so pseudo-standards create scope creep.

## Options considered

| Option                                          | Notes                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| Keep body-only links (status quo)               | No schema work but inconsistent placement.                        |
| Add new frontmatter keys now                    | Structured data, but undocumented and unlinted.                   |
| Delay keys until schema/docs are ready (chosen) | Keep clarity in body copy while preparing schema-backed metadata. |

## Decision

Choose the delay. Keep release/State/Receipts context in body copy, remove provisional frontmatter keys, and explicitly defer structured fields until schema and governance documentation are ready. This preserves clarity without minting fragile metadata.

## Commitments

1. Maintain Contracts and Decisions directories so contributors know exactly where governance lives.
2. Keep each contract body stating its introducing release plus links to State and Receipts until schema work lands.
3. Draft the schema extension and governance note, then raise a follow-up decision when the structured fields are ready to ship.

## Proof / acceptance

- Contributors locate governance docs in ≤60 seconds via the Contracts index.
- No new undocumented frontmatter keys appear in contracts.
- Feedback tagged `kl,feedback` confirms editors understand where to place release context.

## Review cadence

- **Next review:** Early January 2026.
- **Success metric:** 100% of contracts cite release/State/Receipts context without undocumented keys.
- **Owner action:** Create the follow-up schema decision once documentation and validation are prepared.
