---
title: Decision — Navigation lanes (Navigate · Operate · Support)
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-10'
next_review: '2026-01-10'
success_metric: >-
  ≥80% of homepage nav clicks hit Navigate/Operate links first, Support stays
  capped at three fixes with <20% of total nav clicks, and time-to-answer stays
  ≤60 seconds.
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

# Navigation lanes (Navigate · Operate · Support)

Split the docs navigation into three lanes so visitors orient fast and support remains intentional. [Open the Navigate hub](../navigate/index.md) or [review the Support fixes](../support/index.md) to see the layout in use.

## Intent

Rebuild the sidebar and top nav into three audience-first lanes—**Navigate** for orientation, **Operate** for guardrails/runbooks, and **Support** for a capped set of interrupt fixes—so the home promise (“answer + runnable next action in 60 seconds”) is obvious from every page.

## Tension

- Previous navigation mixed strategy, ops patterns, and reactive fixes in five sections, which diluted the “navigate by heart, operate with freedom, support with guidance” philosophy.
- A dedicated “Fast support” block sounded like a helpdesk queue, encouraging reactive work outside guardrails.
- Editors struggled to keep Contributor Kit and Playbook items distinct, causing duplication and drift.

## Guardrails and constraints

1. Navigation must show no more than three groups, with only one dedicated support lane.
2. Support links point to pre-approved labs/checklists, not ad-hoc tickets.
3. Operate group keeps the guardrail chain visible (Change → Decision → Guardrail → Page → Signal → Receipt).
4. CTA contract still applies: pages must open with a plain sentence and link pair; navigation should reinforce the same pattern.

## Options considered

| Option                                             | Notes                                                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Keep five-group nav                                | No change, but philosophy stays muddled and support sounds reactive.                          |
| Merge Start + Playbook only                        | Reduces clutter but leaves Runbooks/Support fragmented.                                       |
| Three-lane nav (Navigate/Operate/Support) (chosen) | Mirrors the Northbook mantra, caps support at one lane, and groups everything else by intent. |

## Decision

Adopt the three-lane navigation:

- **Navigate** — Overview, SLI map, wayfinding shortcuts, State, monthly cadence, new-joiner FAQ, Band A guardrails.
- **Operate** — Playbook canon, Decision spine, North Star & Guardrails, Verify-in-10, facilitation patterns, accessibility quick wins, policy-to-action example, all runbooks + key runbook entries, Sanitization checklist, Answer ledger, Governance.
- **Support** — Capped at three “Fix:” entries (Interrupt flows index, Repo & pipeline access, Teams notifications).

Top nav now mirrors the same labels (Navigate, Operate, Support).

Home page feature cards follow the same trio:

- **Navigate fast** → SLI map (seam + guardrail placement).
- **Operate with freedom** → Verify-in-10 guide/lab + North Star guardrails.
- **Support with guidance** → Fix-it flows landing on the Support index.

## Commitments

1. Keep Support capped at three links. Additions require a decision + removal of an existing link.
2. Review analytics monthly to confirm ≥80% of nav clicks favor Navigate/Operate before Support.
3. Surface nav changes in release notes and State so auditors see when lanes shift.

## Proof / acceptance

- Sidebar shows only the three lanes above.
- Support group contains exactly three “Fix:” entries pointing to the published labs.
- Analytics dashboards (nav_clicks) confirm the success metric within two cycles.

## Stop rule

If navigation click data shows Support exceeding 20% of total nav interactions for two consecutive cycles—or time-to-answer rises above 60 seconds—revisit the grouping via a new decision and consider rebalancing content or adding contextual CTAs instead.
