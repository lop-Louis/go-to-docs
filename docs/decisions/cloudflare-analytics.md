---
title: Decision — Cloudflare analytics
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-09'
next_review: '2026-01-15'
success_metric: >-
  Cloudflare analytics supplies adoption, quality, and credibility signals
  without storing personal data and snapshots land in Receipts every cycle.
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

# Cloudflare analytics

Set up privacy-safe Cloudflare analytics so the Signal Registry stays trustworthy. [Open the Signal Registry runbook](../operate/signal-registry.md) or [read the Cloudflare analytics runbook](../operate/cloudflare-analytics.md) for implementation detail.

## Intent

Replace manual spreadsheet exports with an auditable, automated signal snapshot that proves adoption, quality, and credibility without collecting personal data.

## Tension

- Receipts and State updates are fragile when copy-pasted from UI dashboards.
- Governance demands local-first automation, sub-10-minute runs, and zero secrets in the repo.
- The Signal Registry schema requires every signal to list source, cadence, thresholds, and kill criteria; manual exports skip that rigor.

## Guardrails and constraints

1. Stick to Automation & CI invariants: local-first, <10 minute runtime, no committed secrets, exceptions honored.
2. Collect only aggregated, sanitized metrics—no IP- or user-level telemetry.
3. Signals must register in `docs/operate/signal-registry.md` with owner, source, cadence, thresholds, kill criteria.

## Options considered

| Option                                       | Notes                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| Manual exports (status quo)                  | Cheap but brittle, fails “prove it” guardrail.                            |
| Heavy BI stack                               | Rich dashboards but high cost/privacy lift, breaks local-first invariant. |
| Cloudflare analytics + local script (chosen) | Reuses existing CDN edge data, keeps runs short, easy to audit.           |

## Decision

Adopt the Cloudflare analytics export plus a lightweight local script. Cloudflare supplies aggregated traffic, CTA, and feedback data; `scripts/cloudflare-analytics.mjs` converts that snapshot plus lab data into `reports/cloudflare-snapshot.json`, which fuels the Signal Registry and Receipts. This keeps the guardrail chain intact and removes spreadsheet guesswork.

## Commitments

1. Document the Cloudflare export path (GraphQL query, sanitization) and validate only aggregated metrics flow through.
2. Map each North Star signal to its Cloudflare or lab counterpart inside the Signal Registry runbook, noting cadence, owner, thresholds, and kill criteria.
3. Ship the ingestion script, store sample exports, and reference the JSON snapshot from release manifests so State/Receipts show the same data.

## Proof / acceptance

- Signal Registry validates and references the Cloudflare export path.
- `scripts/cloudflare-analytics.mjs` ingests sanitized exports + lab data and writes `reports/cloudflare-snapshot.json`.
- Receipts surface the Cloudflare metrics beside lab pass rate and exceptions with links back to the snapshot file.
- Running the script takes <10 minutes and relies only on an API token stored outside the repo.

## Stop rule

If Cloudflare analytics adds >15 minutes per day to CI or raises privacy concerns, pause the integration, revert to the previous local measurement method, and bring a governance follow-up before reintroducing it.
