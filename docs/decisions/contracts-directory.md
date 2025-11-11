---
title: Decision — Contracts directory
band: A
owner: '@lop'
change_type: patch
status: draft
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-10'
next_review: '2026-01-10'
success_metric: >-
  Users can open the right governance doc in ≤60 seconds and every contract
  links to its release receipts.
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

# Contracts directory

Keep governance docs discoverable and receipt-backed. [Read the operations contract](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../operate/state-visibility.md) · Ledger: [Release state](../navigate/state-ledger.md) · Release reference: [site-v2025.11 bundle](../../ops/releases/2025-11/index.md)  
Guardrail mapping: Governance & Decisions invariants (decision entries visible, exceptions current, State updated under 30 days, monthly release tags) in the [North Star & Guardrails playbook](../operate/north-star-guardrails.md#governance-requirements).

## Intent

Give every post‑V1 contract and decision a predictable home so contributors reach the right governance doc in ≤60 seconds without breaking the Change → Decision → Guardrail → Page → Signal → Receipt chain.

## Tension

- Governance artifacts must show owner, band, exit metric, and visible State/Receipts links.
- Navigation needs to stay slim; dumping contracts across release folders or legacy changelogs makes discovery painful.
- We have to maintain public-ready, sanitized docs that default-deny outside guardrails.

## Guardrails and constraints

1. UI Delivery contract: owner/band/exit metric/State and Receipts links stay visible.
2. Governance contract: scope, state, exceptions, and release tags remain public.
3. Release cadence: monthly tagging cannot slow down because contracts hide in ad-hoc paths.

## Options considered

| Option                                 | Notes                                                                |
| -------------------------------------- | -------------------------------------------------------------------- |
| Per-release folders                    | Keeps temporal context but forces editors to know the exact release. |
| Dedicated contracts directory (chosen) | Predictable location, scales cleanly, keeps nav intentional.         |
| Embed full text in release log         | Zero new folders but bloats the log and complicates updates.         |

## Decision

Create a top-level `docs/contracts/` section with a sibling `docs/decisions/`. Each contract lists its release context in the body while decisions cross-link to both the contract and the release bundle. This satisfies the 60-second discovery rule and keeps the guardrail chain visible without bloating release folders.

## Commitments

1. Stand up the Contracts index and keep nav weight low by grouping governance content together.
2. Ensure every contract/decision pair adds release metadata and links back to the relevant bundle, State, and Receipts.
3. Log any off-cycle governance additions in the Governance ledger with owner, date, and exception data before publishing.

## Proof / acceptance

- Users locate governance docs in ≤60 seconds via the Contracts index.
- Contracts and decisions cite their release bundle, State, and Receipts.
- Analytics (view-to-click) and tagged feedback confirm the path is clear.

## Review cadence

- **Next review:** Early January 2026.
- **Success metric:** 100% of governance docs discovered within the SLA, with zero orphaned contracts.
- **Owner action:** Keep the index tidy and roll follow-up decisions into the same directory pattern.
