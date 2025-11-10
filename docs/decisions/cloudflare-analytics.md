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
success_metric: Cloudflare analytics supplies adoption, quality, and credibility signals without storing personal data and snapshots land in Receipts every cycle.
related_contract: ../contracts/northbook-operations-contract-v1.md
release_tag: site-v2025.11
---

# Cloudflare analytics decision

Set up privacy-safe Cloudflare analytics so the Signal Registry stays live. [Review the frame](#frame) or [open the Signal Registry runbook](../runbooks/signal-registry.md).

## Frame

### Problem

Receipts and state updates relied on manual exports and ad-hoc spreadsheets, so proving progress against the North Star was fragile. We need a repeatable, audit-friendly way to capture adoption (pages touched, time-to-answer), quality (lab pass rate, link integrity), and credibility (state freshness, exceptions resolved) without collecting personal data.

### Constraints

- Must stick to the Automation & CI invariants: local-first, pipelines under 10 minutes, no secrets committed, exceptions honored.
- Data must stay aggregated and sanitized; no IP-level or user-identifiable telemetry.
- The Signal Registry requires every signal to list source, owner, refresh cadence, thresholds, and kill criteria.

### Stakes

- **If successful:** Receipts show Cloudflare-backed metrics every cycle, reviewers can inspect the JSON snapshot posted to `reports/`, and automation can block when adoption signals regress.
- **If unsuccessful:** We fly blind on the North Star, spend hours merging spreadsheets, and regress to anecdotes instead of receipts.

## Options

### Option 1 — Keep manual exports

Continue copying UI charts into docs. Pros: no new tooling. Cons: time-consuming, error-prone, and fails the “prove it” guardrail.

### Option 2 — Add a third-party BI stack

Adopt a heavier analytics platform (Mixpanel, Amplitude). Pros: richer dashboards. Cons: high cost, heavier privacy review, breaks local-first invariant.

### Option 3 — Use Cloudflare analytics + lightweight script (chosen)

Export sanitized Cloudflare analytics for northbook.guide, convert to the Signal Registry format via a local script, and post the snapshot to Receipts. Pros: reuses existing CDN, no personal data, under 10 minutes to run, easy to audit.

## Decide

- **Choice:** Option 3 — Cloudflare analytics + local snapshot script.
- **Owner:** Louis (Product/Ops).
- **Date:** 09 Nov 2025.
- **Guardrail mapping:** Automation & CI → Signal Registry.
- **Scope:** Build the runbook + script that transform Cloudflare analytics exports into adoption/quality/credibility signals. Update the Signal Registry and Receipts pages to consume the snapshot.

## Work plan

1. **Suitability & privacy:** Document the Cloudflare export path (GraphQL query + aggregation). Confirm only aggregated page metrics and CTA/feedback events are captured.
2. **Signal mapping:** Define how each North Star signal maps to Cloudflare metrics or existing lab/exception data inside `docs/runbooks/signal-registry.md`.
3. **Instrumentation:** Ship `scripts/cloudflare-analytics.mjs`, which ingests a sanitized Cloudflare export plus lab data and emits `reports/cloudflare-snapshot.json`.
4. **State integration:** Reference the snapshot from the release manifest (`ops/releases/YYYY-MM/manifest.json`) so the State ledger entry shows adoption, quality, and credibility numbers.
5. **Baseline:** Capture a 14-day baseline in `reports/cloudflare-export.sample.json` so future runs have a template.

## Acceptance checks

- Signal Registry page validates (id/name/owner/source/refresh/thresholds/kill criteria) and references the Cloudflare export path.
- `scripts/cloudflare-analytics.mjs` ingests a sanitized export + lab data and writes `reports/cloudflare-snapshot.json`.
- Receipts show the Cloudflare metrics alongside lab pass rate and exceptions, with links back to the snapshot file.
- Running the analytics script takes < 10 minutes and requires no production secrets beyond the Cloudflare API token stored outside the repo.

## Stop rule

If Cloudflare analytics adds >15 minutes per day to CI or reveals privacy issues, pause the integration, revert to the previous local measurement method, and reassess the ROI with Governance before retrying.
