---
title: Release bundle · site-v2025.11
owner: '@lop'
band: A
refresh_after_days: 365
change_type: minor
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
cta_primary_label: open_chapter_state
cta_secondary_label: open_decision_bundle
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
date: '2025-11-15'
release_tag: site-v2025.11
nav:
  - none
search: false
---

Use this decision to steady the chapter. [Review the scope line](../../navigate/chapter-scope.md) or [Open the ops defaults kit](../../operate/ops-defaults-meetings.md).

## context

We ran a public chapter kickoff focused on clarity and fairness. The note captured lanes, constraints, and review styles, but it wasn’t yet operational. This decision converts that note into defaults we can run: a chapter scope line, "Casual vs Operation" meeting defaults, two measurable signals, and named stewardship. Prior state: ad‑hoc expectations and no single receipt per person.

## decision

**Single bet:** publish minimum governance so every person leaves meetings with one owner/date or the topic parks.

Tradeoffs:

- Lighter process may miss nuance, but people get a path today.
- Two signals only reduces dashboard dopamine, but improves focus.
- Steward-as-you for now risks bottleneck, but avoids fake delegation.

## scope

**In scope now:** chapter scope line, 1:1 fallback defaults, definition of "Casual vs Operation," two signals (Baseline coverage, Direction clarity), and interim stewards.

**Explicitly out of scope:** HR performance processes, salary ladders, and long-form research.

## acceptance

- opener pattern enforced above first section on each deliverable page
- frontmatter keys present (`bucket, north_star_id, guardrail_id, owner, band, date, cta_primary_label, cta_secondary_label, leading_metric, lagging_metric`)
- traceability complete (pr ↔ decision/exception ↔ guardrail ↔ page ↔ signal ↔ receipt)

## receipts (expected)

- **leading:** `m-baseline-coverage` ≥ 90% of roster fields complete by next ops session
- **lagging:** `m-direction-clarity` ≥ 80% mark “clear next step” at 1:1 check‑out
- attach to tag: `v2025.11-main`

## freeze and exit

**Trigger:** annex lab for the Operate page fails or either metric worsens for 7 consecutive days vs baseline.
**Exit:** publish a micro‑fix, re‑run annex lab under 10 minutes, observe proof within 10% of baseline for 7 days, then unfreeze.

## deliverables

Use the **copy_writer_starter_pack** templates for opener, CTA labels, and annex lab stub. Keep people‑leader tone, Band‑A safe.

1. **Navigate / Chapter scope line**
   - Path: [frontend-charter.md](../../navigate/frontend-charter.md)
   - What: one‑sentence scope line clarifying what the chapter is for and what it is not.
   - Opener: why in one sentence, two gentle actions, exit metric line.
   - CTAs: `try the ops defaults`, `see the roster signals`.
   - Acceptance: opener pattern present; decision link in frontmatter; links to State and Receipts.

2. **Operate / Meeting defaults: Casual vs Operation**
   - Path: [ops-defaults-meetings.md](../../operate/ops-defaults-meetings.md)
   - What: define Casual vs Operation; publish the 1:1 fallback (20 min, fortnightly, doc‑first; PRs < 300 lines async; schedule within 48h if bigger).
   - Annex lab: a 10‑minute dry‑run checklist to produce exactly one owner/date or park it.
   - CTAs: `use this in your next session`, `open the parking lot`.
   - Acceptance: runnable annex lab under 10 minutes; stop rule visible; decision link.

3. **Learn / Signals mini‑page**
   - Path: [signals-roster.md](../../learn/signals-roster.md)
   - What: define `m-baseline-coverage` and `m-direction-clarity`, owners, refresh SLA 30 days.
   - Opener: why two signals only; exit line states the target ranges.
   - CTAs: `open latest receipts`, `see how to update your baseline`.
   - Acceptance: signal ids, owners, refresh dates; mapped to North Star; decision link.

4. **Mitigate / Exception stub: Cloud access**
   - Path: [exception-cloud-access.md](../../mitigate/exception-cloud-access.md)
   - What: mini‑decision fields for DevOps cloud access uncertainty (owner, trigger, expiry ≤ 30 days, exit criteria).
   - CTAs: `raise an exception`, `see fallback path`.
   - Acceptance: expiry set; rollback plan; appears in public exceptions list.

5. **Ops / State snapshot update**
   - Path: [dec-2025-11-chapter-ops-defaults](../../decisions/ops/dec-2025-11-chapter-ops-defaults.md)
   - What: add snapshot lines for new pages and the two signals; link receipts.
   - Acceptance: snapshot exists; links valid; tag listed as `v2025.11-main`.

6. **Ops / Receipts**
   - Path: [2025-11.md](../../changelog/releases/site-v2025.11.md)
   - What: stub Adoption, Quality, Credibility with placeholders for the two metrics; link to analytics source.
   - Acceptance: shows owner/date; references signal ids; attached from the monthly tag.

7. **Governance / Stewards list**
   - Path: [stewards.md](../../operate/stewards.md)
   - What: list Scope, Signal, Exception stewards and backups; interim = Louis until reassigned.
   - Acceptance: names and dates shown; alert window ≤ 24h.

## links

- state snapshot: `/ops/releases/2025-11/index.md`
- related exceptions: `/mitigate/exception-cloud-access.md`
