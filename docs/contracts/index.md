---
title: Contracts directory
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
---

# Contracts directory

Keep governance contracts discoverable in under a minute.
[Open the IA Overhaul contract](./northbook-ia-overhaul.md) or [browse the latest governance release bundle](../../ops/releases/2025-11/index.md).

Guardrails and operating contracts now live under this directory for public discovery, per the [Contracts directory decision](../decisions/contracts-directory.md). Each contract lists its release context, receipts, and owner so contributors can trace Change -> Decision -> Guardrail -> Page -> Signal -> Receipt in under 60 seconds.

## Current contracts

| Contract                                                                     | Seam       | Owner | Status | Release reference                                           |
| ---------------------------------------------------------------------------- | ---------- | ----- | ------ | ----------------------------------------------------------- |
| [Northbook IA Overhaul — Operations Contract v1](./northbook-ia-overhaul.md) | governance | Louis | live   | [site-v2025.11 bundle](../../ops/releases/2025-11/index.md) |

## How to add a contract

1. Start from `ops/contracts/` or copy an existing file into this directory.
2. Update the frontmatter (title, owner, band, status, refresh cadence) and include release/state/receipts links in the body.
3. Reference the governing decision ID and guardrails that enforce the contract.
4. Link the new contract from the relevant release bundle, seam landing page, and any decision entries that rely on it.
5. Update this directory table so editors and auditors can locate it quickly.

Need help? Open an issue or reach out via the governance seam for pairing.
