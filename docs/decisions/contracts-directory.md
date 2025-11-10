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
success_metric: Users can open the right governance doc in ≤60 seconds and every contract links to its release receipts.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
---

# Contracts directory decision

Keep governance docs discoverable and receipt-backed. [Review the frame](#frame) or [Read the operations contract](../contracts/northbook-operations-contract-v1.md).

State: [State visibility map](../runbooks/state-visibility.md) · Ledger: [Release state](../state/index.md) · Release reference: [site-v2025.11 bundle](../../ops/releases/2025-11/index.md)  
Guardrail mapping: Governance & Decisions invariants (decision entries visible, exceptions current, state updated under 30 days, monthly release tags) in the [North Star & Guardrails playbook](../playbook/north-star-guardrails.md#governance-requirements).

## Frame

### Problem

Post‑V1 contracts and their decision entries need a predictable home so contributors can find them in under 60 seconds while maintaining the traceability chain (Change → Decision → Guardrail → Page → Signal → Receipt).

### Constraints

- Every page must show owner, band, exit metric sentence, and visible State/Receipts links per [UI Delivery guardrails](../playbook/north-star-guardrails.md).
- Governance artifacts have to stay sanitized for public use and default deny outside guardrails as defined in the [operations contract](../contracts/northbook-operations-contract-v1.md).
- Navigation should remain slim; adding contracts cannot clutter the main sidebar or bury other Band‑A guidance.

### Stakes

- **Placed well:** Governance docs remain easy to locate, stay linked to their releases, and model how to log future contracts (security, privacy, etc.).
- **Placed poorly:** Contracts sprawl across release folders or legacy log notes, making it slow to discover, update, or audit them.

## Options

### Option 1 — Per-release folders

Store each contract inside the release folder that introduced it. Pros: keeps temporal context with release artifacts. Cons: governance spreads across multiple release directories, so contributors must know the exact release to find a contract; duplicates decision metadata in State entries.

### Option 2 — Dedicated contracts directory

Create a top-level `contracts/` section for all governance contracts plus a sibling `decisions/` directory. Each contract includes metadata about its introducing release and links back to the release bundle, while decisions cross-link to both the contract and release receipts. Pros: predictable location, scales as new contracts arrive, keeps nav intentional via a Contracts group. Cons: requires upfront directory creation and nav tuning.

### Option 3 — Embed full text in one release log

Expand the release log entry (legacy changelog) to include the full contract text and decision rationale. Pros: zero new directories. Cons: the log becomes bloated, governance content mixes with operational updates, and individual contracts become hard to maintain or cross-link.

## Decide

- **Choice:** Option 2 — Dedicated contracts directory.
- **Decider:** Product/Operations lead (@lop acting steward).
- **Date:** Mid-November 2025 release window.
- **Rationale:** Centralizes governance docs to satisfy the 60-second discovery rule, keeps the guardrail chain visible (contract ↔ decision ↔ receipts), and lets future contracts reuse the same layout without bloating release folders.
- **Release linkage:** [site-v2025.11 bundle](../../ops/releases/2025-11/index.md).
- **Contract reference:** [Northbook Operations Contract v1.0](../contracts/northbook-operations-contract-v1.md).

## Review

- **Next review:** Early January 2026 (two cycles after the decision).
- **Success metric:** Users can locate governance documents within 60 seconds, every contract links to its introducing release, and contributor feedback confirms clarity on where contracts live.
- **Signals:** Track doc view-to-click time via site analytics plus qualitative feedback from PRs/issues tagged `kl,feedback`.
- **Owner actions:** Keep the Contracts index tidy, ensure each new contract/decision pair carries release metadata, and log any exceptions in the Governance ledger before adding off-cycle documents.
