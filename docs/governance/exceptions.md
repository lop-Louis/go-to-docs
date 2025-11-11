---
title: Governance exceptions log
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 14
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/adopt-deep-embed-north-star
date: '2025-11-11'
---

# Governance exceptions

Keep freezes transparent and exceptions short-lived.
[Copy the exception template](../../ops/templates/exeption_template.md) or [append the ledger entry](./_exceptions_ledger.csv).
File an L3 override? Gated instructions live in `/ops/templates/exeption_template.md` and must cite owner, expiry (<=30 days), and exit criteria before merge.

This log summarizes public exceptions tied to the governance seam. Each entry must include owner, scope, expiry (<= 30 days), trigger, exit criteria, and a link to the private ledger (`_exceptions_ledger.csv`). Use the template in `ops/templates/exeption_template.md` when filing a new record.

## Active exceptions

_None. Freeze triggers remain idle as of v2025.11-governance._

## Closed exceptions (last 90 days)

| exception_id                | opened      | expiry      | seam       | trigger                                      | exit criteria                                   | status |
| --------------------------- | ----------- | ----------- | ---------- | -------------------------------------------- | ----------------------------------------------- | ------ |
| exc-2025-09-governance-tone | 12 Sep 2025 | 26 Sep 2025 | governance | CTA tone lint outage during pipeline upgrade | Restore lint + post receipts for impacted pages | closed |

## How to file an exception

1. Copy `ops/templates/exeption_template.md` into `docs/governance/exceptions/` (or the relevant seam) with a unique `exception_id`.
2. Populate owner, seam, trigger, expiry (<= 30 days), mitigation, and rollback steps.
3. Add a short summary entry to this log and append the full row to `_exceptions_ledger.csv`.
4. Link the exception ID in PR descriptions and decision entries until it closes.
5. Update both the public log and ledger when the exit criteria are met.
