---
title: 'pilot operate slice: versioning & releases (with annex lab)'
band: A
owner: '@lop'
refresh_after_days: 30
change_type: minor
status: draft
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
date: '2025-11-11'
seam: releases
decision_id: dec-2025-11-operate-pilot
baseline_window: last-30-days
delta_type: people-capacity-risk
stop_rule: >-
  pause pilot if lab pass < 0.80 or page requires l3 override twice; resume
  after lab is green and mappings are fixed.
tags:
  - v2025.11-releases
release_tag: site-v2025.11
success_metric: Operate pilot lab ≥0.9 pass rate, no linked L3 traceability gaps.
related_contract: ../contracts/northbook-ia-overhaul.md
decision_link: /decisions/dec-2025-11-ia-overhaul.md
---

# Pilot operate slice: versioning & releases (with annex lab)

Prove deep-embed in Operate with the versioning & releases slice. [Use this guardrail](../operate/index.md) or [See example runbook](../operate/verify-in-10.md).
Exit metric: annex lab pass rate ≥ 0.9 with receipts linked to `v2025.11-releases`.

## context

We need a visible, end-to-end proof that deep-embed works: a real Operate page with a runnable annex lab and tagged receipts.

## decision

Ship the Operate page “Versioning & Releases” with two reversible actions and a ≤10-minute annex lab. Execute the lab in CI on PRs. Attach receipts to `v2025.11-releases`.

## scope

**In:** one Operate subsection (“versioning & releases”) + its annex lab and decision entry.  
**Out:** additional Operate subsections this cycle.

## acceptance

- Page uses the opener pattern above first section.
- Annex lab executes locally and in CI in ≤ 10 minutes with a single command.
- Frontmatter includes required fields; CTAs map to one leading and one lagging signal.
- Traceability complete: `pr ↔ decision/exception ↔ guardrail ↔ page ↔ signal ↔ receipt`.
- CI: tone at L2, traceability at L3, sanitization/red-lines at L4.
- Receipts and state snapshot linked under `v2025.11-releases`.

## receipts (expected)

- leading: `m-lab-pass` ≥ 0.90 on pilot lab.
- lagging: `m-defect-rate-changed-pages` does not worsen vs baseline.

## freeze and exit

Freeze further Operate migrations if lab pass < 0.80 or page requires two L3 overrides. Exit after lab ≥ 0.90 and mappings pass for one release.

## links

- state snapshot: /releases/state/v2025.11-releases.md
- receipts: /signals/receipts/v2025.11-releases.md
- annex lab: /operate/versioning-and-releases/lab.md
- exceptions log (public): /governance/exceptions.md
- guardrails index: /operate/guardrail-index.md
