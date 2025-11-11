---
title: gate public pages behind proof or private
band: A
owner: '@lop'
refresh_after_days: 30
change_type: major
status: draft
bucket: operate
north_star_id: ns-001
guardrail_id: gr-104
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
date: '2025-11-11'
seam: governance
decision_id: dec-2025-11-proof-or-private
baseline_window: last-30-days
delta_type: people-capacity-risk
stop_rule: >-
  freeze services publishing if l4 blocks > 10% or gdpr risk detected; resume
  after fixes and seven days of clean receipts.
tags:
  - v2025.11-governance
release_tag: site-v2025.11
success_metric: Zero sanitization red-lines on public pages, tone/mapping nudge rate <10%.
related_contract: ../contracts/northbook-ia-overhaul.md
decision_link: /decisions/dec-2025-11-ia-overhaul.md
---

# Gate public pages behind proof or private

Keep risky services private until they ship proof. [Use this guardrail](../operate/guardrail-index.md) or [See example runbook](../governance/state/v2025.11-governance.md).
Exit metric: zero sanitization red-lines on public Band-A pages plus receipts logged under `v2025.11-governance`.

## context

Services content is not yet ready for public consumption. We need a safety gate that preserves credibility and privacy while allowing contributors to work at speed.

## decision

Enable a “proof or private” gate: pages that fail opener pattern, metric mapping, or sanitization auto-route to `/drafts` (private, no sitemap). Public Band-A pages must pass tone, mapping, and sanitization checks.

## scope

**In:** all band-a public pages under navigate/operate/learn/mitigate; all “services” pages first.  
**Out:** engine/tooling swaps; staffing.

## acceptance

- Public page renders opener pattern above first section: one-sentence why, two actions, exit-metric line.
- Frontmatter contains: `bucket, north_star_id, guardrail_id, owner, band, date, cta_primary_label, cta_secondary_label, leading_metric, lagging_metric`.
- Each CTA mapped to one leading and one lagging signal from the registry.
- Sanitization passes (no personal data, secrets, unverifiable numbers).
- Failing pages auto-route to `/drafts` and are excluded from sitemap.
- CI behavior: tone/mapping at L2; traceability gaps at L3; sanitization/red-lines at L4.
- Tag receipts under `v2025.11-governance`.

## acceptance delivery

1. **Opener + CTA pattern** — `scripts/ux-scan.mjs` runs inside `pnpm run docs:guard`, failing PRs until opener pattern, two CTAs, and exit metric render above the first heading.
2. **Frontmatter completeness** — `scripts/frontmatter-lint.mjs` enforces the schema (bucket through lagging_metric); missing fields are a hard block.
3. **Signal mapping + receipts stability** — `scripts/traceability-check.mjs` verifies leading/lagging metrics exist in `ops/signal_registry_seed.csv` and point to receipts under `/signals/receipts/vYYYY.MM-<seam>.md`; `scripts/guard.mjs` now red-lines any “See the receipts” link that drifts away from those pages.
4. **Sanitization** — `scripts/guard.mjs` keeps red-line rules for GDPR, secrets, and unverifiable numbers; tone/mapping issues surface at L2 nudges.
5. **Proof-or-private routing** — Risky or unfinished pages move under `/drafts/` (see `docs/drafts/index.md`); `pnpm run docs:guard` blocks merges until content is either proven or quarantined, keeping `/drafts/` out of nav/sitemap.
6. **CI ladder + budget** — `scripts/docs-guard.mjs` chains the checks above, failing only on red-lines or traceability gaps and finishing cold-start runs in ~3.9s (<=5m budget).
7. **Receipts** — Governance receipts live at `/signals/receipts/v2025.11-governance.md`; the guardrails above keep the tag link stable.

## receipts (expected)

- leading: `m-nav-open` stable or ↑ on public pages; tone l2 warnings < 10% of changed pages.
- lagging: `m-time-to-answer` improves ≥ 10% vs baseline for public pages in scope.

## freeze and exit

Freeze “services” publishing if L4 blocks exceed 10% or any gdpr issue. Exit after fixes and seven consecutive days with zero L4 and green sanitization receipts.

## links

- [state snapshot](../governance/state/v2025.11-governance)
- [receipts](../signals/receipts/v2025.11-governance)
- [exceptions log](../governance/exceptions)
- [exceptions ledger](../governance/_exceptions_ledger.csv)
- [guardrails index](../operate/guardrail-index)
