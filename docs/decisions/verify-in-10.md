---
title: Decision — Verify-in-10 guide + lab alignment
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 60
decider: '@lop'
decision_date: '2025-11-10'
next_review: '2025-12-08'
success_metric: >-
  ≥80% of homepage clicks choose the guide before the lab, ≥60% of Start
  sessions trigger an SLI action, and the Verify lab runs in ≤10 minutes with
  telemetry captured.
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

# Verify-in-10 guide + lab

Align Home/Start with SLII + SLI automation and publish Verify-in-10 as **guide-first, lab-second**. [Open the release bundle](../../ops/releases/2025-11/index.md) or [jump straight to the lab](../labs/verify-in-10.md).

## Intent

Teach the verification pattern in one short guide, keep the runnable checklist in an Ops lab, and steer Home/Start visitors to the guide before the lab so the SL map and receipts chain stay clear.

## Tension

- SL states now auto-generate from manifests, but “Build” stays subjective unless we show the verify-close loop.
- Home and Start currently mix guides, labs, and CTA helpers, confusing the order of operations.
- Verify-in-10 needs to stay runnable in ≤10 minutes with telemetry captured for Receipts.

## Invariant added

**Guide-over-To-Do:** the canonical artifact is guidance; the actionable checklist lives in an Ops lab. Home/Start link to the guide first, then the lab.

## Options considered

| Option                                   | Notes                                                   |
| ---------------------------------------- | ------------------------------------------------------- |
| Guide-first + lab + CTA updates (chosen) | Hero and Start both point guide → lab, telemetry wired. |
| Only update Start                        | Leaves the hero inconsistent.                           |
| Wait for more data                       | Delays clarity while SL adoption stalls.                |

## Decision

Ship the guide and lab together, update Home/Start CTAs with helper text + telemetry, and surface the change in the release bundle and State ledger. Owner: Louis (@lop).

## Commitments

1. **Publish artifacts**
   - Guide (`docs/operate/verify-in-10.md`): why/when, SLII mapping, anti-patterns, example receipts, <500 words before examples.
   - Lab (`docs/labs/verify-in-10.md`): preflight, 5 steps, acceptance checks, rollback, stop rule; runnable ≤10 minutes.
2. **Homepage hero**
   - Primary CTA: “Place your initiative on the SLI map” + helper text.
   - Secondary CTA: “Verify-in-10 (guide)” + helper text, plus a text link to run the lab.
   - Telemetry IDs on both buttons + link.
3. **Start hub actions**
   - “Find my stage” → `navigate/sli-states`.
   - “Verify-in-10 (guide → lab)” with guide first.
   - “Post Receipts & State” → manifest + `pnpm run state:build`.
4. **Wiring**
   - SLI States page links guide + lab.
   - Ops contract references the guide as the SL4→SL5 gate; lab is the annex.
   - Release bundle + State ledger list the decision; telemetry IDs appear in receipts.

## Proof / acceptance

- Home hero shows the two CTAs + lab link above the fold with telemetry IDs.
- ≥80% of hero clicks choose the guide before the lab; ≤15% bounce back; ≤10% feedback cites duplicate confusion.
- Start hub shows the three SLI actions with telemetry IDs; ≥60% of Start sessions trigger one.
- Guide <500 words pre-examples; lab executes ≤10 minutes on a fresh checkout.
- Release bundle + State ledger list the decision; telemetry events appear in receipts.

## Stop rule

After two cycles, if the North Star target worsens, Verify-in-10 usage drops below 30% of Start sessions, or confusion exceeds the thresholds above, revert the hero to the previous pair, keep the guide/lab accessible from Start only, and retry the copy/placement.
