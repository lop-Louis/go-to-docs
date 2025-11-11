---
title: Northbook Operations Contract v1.0
band: A
owner: '@lop'
change_type: major
status: live
refresh_after_days: 14
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/adopt-deep-embed-north-star.md
date: '2025-11-10'
---

# Northbook IA Overhaul — Operations Contract v1

Guardrail reference: [Narrator tone guide (gr-101)](../navigate/tone.md).

Keep the IA overhaul guardrails enforceable and receipt-backed. [Review the deep-embed decision](../decisions/adopt-deep-embed-north-star.md) or [Open the governance release bundle](../../ops/releases/2025-11/index.md).
Exit metric: governance freeze triggers stay clear while annex labs finish in <= 10 minutes.

**Owner:** Louis
**Band:** A (public)
**Effective:** 10 Nov 2025
**Refresh SLA:** 30 days
**Tag reference:** latest release `vYYYY.MM-<seam>`

## 1) Purpose and Promise

Move the site from “content library” to “operating system” while preserving the voice: **guides over to-do, guidance over dictate**. Readers always see context, two sane options, and a clean exit. We measure outcomes, not obedience.

## 2) Scope

Covers all public Band-A pages and annex labs under **Navigate, Operate, Learn, Mitigate**. Out of scope: doc engine swaps, paid tooling, staffing.

## 3) Seams and Stewardship

Seams: **Navigation, Governance, Signals, Tests, Releases**.
Steward for all seams: **Louis** until the next refresh SLA. If a seam is unowned for more than 7 days, stop rule triggers.

## 4) Invariants

These must hold or we stop.

1. **Opener pattern on every covered page:** one-sentence why, exactly two suggested actions, one exit-metric sentence above the first section.
2. **Frontmatter required:**
   `bucket`, `north_star_id`, `guardrail_id`, `owner`, `band`, `date`, `cta_primary_label`, `cta_secondary_label`, `leading_metric`, `lagging_metric`.
   When scope or metrics change: `decision_link`.
3. **Traceability complete:** PR ↔ decision or exception ↔ guardrail ↔ page ↔ signal ↔ receipt. No orphans.
4. **Signals capped at 8**, each with owner and refresh SLA.
5. **Annex labs runnable in 10 minutes or less.**
6. **One named owner and a date** on every artifact.
7. **Monthly release tag** includes state snapshot and receipts link.
8. **Sanitization:** public pages contain no internal names or sensitive numbers; directional ranges are allowed.

## 5) Deep-Embed Narrator Contract

- **North Star line** visible on Home and each section landing. One sentence, one version.
- Section landing above the fold contains: the North Star in context, two actions, exit metric, and a tiny receipts panel. Copy above the fold stays within ~600 px.
- Tone allowlist for CTAs: try, use, choose, see example.
- Banlist for imperatives: must, always, fix now, comply. Linter warns if banned terms exceed 2 per 500 words.

## 6) Enforcement Ladder

Autonomy by default, blocks only for red-lines.

- **L0 Observe:** log only.
- **L1 Highlight:** inline notice on preview.
- **L2 Nudge:** PR comment with risk and examples. Merge allowed.
- **L3 Conscious override:** merge allowed only with `exception_id`, owner, expiry, exit criteria.
- **L4 Block:** merge denied.

### Default levels by seam

- Tone and CTA pattern → L2.
- Missing metric mapping → L2.
- Signals over cap or stale SLA → L2, auto-escalate to L3 next release.
- Missing traceability (PR not linked to decision or guardrail) → L3.
- Legal, privacy, security, source-of-truth tamper → L4.

## 7) Signals, Metrics, Receipts

- **Cap:** 8 active signals total. **SLA:** 30 days.
- **Per bucket defaults**
  - Navigate: leading = nav_open rate; lagging = time-to-answer delta.
  - Operate: leading = lab pass on example; lagging = defect rate on changed pages.
  - Learn: leading = dashboard freshness; lagging = decision hit rate vs receipts.
  - Mitigate: leading = time-to-freeze; lagging = time-to-recovery.

- **Receipts categories:** Adoption, Quality, Credibility. Latest receipts attach to the release tag, not scattered.

## 8) Freeze and Exceptions

### Freeze triggers

- Annex lab pass rate less than 80 percent, or
- Time-to-answer worsens 20 percent or more vs baseline, or
- Exceptions older than 14 days.

**On freeze:** halt migrations in scope, publish exit criteria, resume after proof metric returns within 10 percent of baseline for 7 days.

**Exceptions** use a mini-decision format: owner, date, trigger, expiry no more than 30 days, exit criteria. Public log is scrubbed; private ledger mirrors IDs.

## 9) Migration and Redirects

- **Dual-run duration:** 14 days.
- **Redirect ledger:** max one hop, verified in CI.
- **Legacy:** keep `/legacy` one extra cycle after cutover with a dated banner.

## 10) Releases and Tagging

- **Tag cadence:** first business day monthly.
- **Tag format:** `vYYYY.MM-<seam>` where `<seam>` is one of `pilot`, `main`, `legacy` unless otherwise defined.
- **Tag contents:** state snapshot link, receipts link, list of exceptions with expiry.

## 11) Analytics and Events

Primary platform: Cloudflare Web Analytics pilot.
Emit events: `nav_open`, `cta_primary_click`, `cta_secondary_click`, `time_to_answer`, `lab_pass`, `exception_opened`, `exception_closed`.
Staging tracking is off.

## 12) CI Budget and Blocking Rules

Cold-start wall time cap 5 minutes.
Blocking checks: frontmatter validity, traceability, sanitization, red-line violations. All others nudge.

## 13) Sanitization and Red-Lines

Blocks are justified for:

- Personal data exposure or EU GDPR violation.
- Security secrets or integrity risks.
- Unverifiable numbers presented as fact.
- Broken traceability that prevents rollback.
- Compliance audit prune: upon audit request, immediately block, archive, and remove affected content; log exception with audit reference.

## 14) Stop Rule

Freeze new migrations if in any release either of these is true:

- More than 20 percent of merges require L3 overrides, or
- Any freeze trigger fires.
  Run a 7-day tighten focused on tone, mappings, tests only. Resume with a single pilot page.

## 15) Acceptance Checks (contract level)

1. Every covered page renders opener pattern above the first section.
2. Required frontmatter keys present and valid; `decision_link` present when scope or metrics change.
3. Traceability chain complete; orphan scanner returns zero.
4. Signals within cap and fresh by SLA.
5. Latest tag contains state and receipts links.
6. Annex labs run in 10 minutes or less.
7. Public sanitization lints pass.

## Fine. Dictionary time. Here are appendices that translate the ops-speak into human.

## Appendix

### Appendix A · Plain-English Glossary

- **North Star**
  The one-sentence promise the site is judged by. It does not change per section.

- **Guardrails**
  Boundaries that keep pages helpful and respectful. They protect tone, privacy, and credibility.

- **Buckets**
  The four shelves the whole site sits on:
  Navigate (why and scope), Operate (how options), Learn (proof and metrics), Mitigate (risk and rollback).

- **Opener pattern**
  The first screen of any page. One sentence why, two suggested actions, one exit-metric line. No lectures up top.

- **CTA**
  The button or link that suggests what to try next. Labels stay gentle: try, use, choose, see example.

- **Exit metric**
  What “good” looks like for this page in one line, for example time-to-answer drops.

- **Signal**
  A metric we track on purpose. Example nav_open, lab_pass, time_to_answer. Capped at 8 total so we stay sane.

- **Leading vs lagging**
  Leading moves quickly and hints at direction, example CTA clicks. Lagging moves slower and proves the win, example time-to-answer over a week.

- **Receipt**
  A short, time-bounded proof attached to a release, example Adoption up 12 percent since October.

- **Baseline window**
  The “before” period we compare against, default last 30 days.

- **Single bet**
  We run one model for a window. No parallel theories.

- **Seam**
  A critical edge in the system: Navigation, Governance, Signals, Tests, Releases.

- **Steward**
  The person minding a seam. For now it is you, on all seams.

- **Invariant**
  A rule that must hold or we stop. Example every page has an opener pattern.

- **Traceability**
  The chain that lets us prove why a change happened and roll it back. PR ↔ decision or exception ↔ guardrail ↔ page ↔ signal ↔ receipt.

- **Exception**
  A conscious break with a reason, owner, expiry, and exit criteria.

- **Freeze**
  Temporary stop on migrations because risk or damage crossed a line.

- **Enforcement ladder**
  Five levels that decide how hard the system reacts. L0 observe, L1 highlight, L2 nudge, L3 conscious override with expiry, L4 block.

- **Deep-embed**
  The North Star and receipts appear directly on section landings. The star is always visible.

- **Dual-run**
  Old and new live together for a short period so users do not get lost.

- **Redirect ledger**
  A list that maps old links to new ones. Verified so we do not create loops.

- **Orphan**
  A page or PR that is not linked into the traceability chain.

- **State snapshot**
  A simple page that says what changed this month and what is pending.

- **Release tag**
  A monthly label on the repo. Format vYYYY.MM-<lane> and it links to the snapshot and receipts.

- **SLA**
  How often something must be refreshed. Signals default to 30 days.

- **Annex lab**
  A small, runnable example or test that proves a page’s claim. Must run in 10 minutes or less.

- **Time-to-answer**
  How long a reader needs to find a usable answer from entry to click.

- **Sanitization**
  Removing names, secrets, and exact numbers that would leak or mislead. Directional ranges are allowed.

- **Red-lines**
  The short list that triggers a hard block. See Appendix E.

- **Compliance audit prune**
  When an audit hits, affected content is blocked and removed, with an entry in the log.

- **GDPR violation**
  Any exposure or misuse of personal data that breaks EU rules. This is a hard stop.

- **Source of truth**
  The canonical place where facts live, for example the Governance folder and release tags.

- **Pilot**
  A tiny end-to-end trial before a wide change.

- **Band A**
  Public content only. No sensitive internals.

- **Legacy**
  The old site routes kept briefly with a banner while you migrate.

---

### Appendix B · The Enforcement Ladder by example

- **L0 Observe**
  You used one stern word. We log it. No action.

- **L1 Highlight**
  Preview shows “Tone is a bit pushy.” You can still ship.

- **L2 Nudge**
  A PR comment says “Add an exit metric and map your CTAs to signals.” Merge allowed.

- **L3 Conscious override**
  Traceability is missing. You add an exception with owner, expiry in 30 days, and exit criteria. Merge allowed.

- **L4 Block**
  You pasted a real customer name or an API key. Merge denied until fixed.

Default behavior stays at L1 or L2. Blocks are rare and only for red-lines.

---

### Appendix C · What shows up on a page

Above the fold you always see:

1. **Why** in one sentence
2. **Two actions** with soft labels
3. **Exit metric** line
4. **Tiny receipts** panel with the last release’s Adoption, Quality, Credibility

Everything else sits below. No walls of text up top.

---

### Appendix D · Signals and metrics cheat-sheet

- **Navigate**
  Leading nav_open rate
  Lagging time-to-answer change

- **Operate**
  Leading annex lab pass on the example
  Lagging defect rate on pages changed this month

- **Learn**
  Leading dashboard freshness in days
  Lagging decision hit rate, percent of decisions that produced expected receipts

- **Mitigate**
  Leading time-to-freeze from trigger
  Lagging time-to-recovery back to baseline

Cap total active signals at 8. Each has an owner and a refresh deadline.

---

### Appendix E · What actually triggers a block

- Personal data, GDPR issues, security secrets
- Broken traceability that prevents rollback
- Unverifiable hard numbers presented as fact
- Compliance audit prune requests

Everything else is a nudge or a conscious override with an expiry.

---

### Appendix F · Exceptions and freezes, quick guide

- **Exception**
  Use when you need to ship without a perfect chain or tone. Include owner, date, trigger, expiry within 30 days, exit criteria. Public log is scrubbed. Private ledger mirrors the IDs.

- **Freeze**
  Triggers: annex lab pass rate below 80 percent, time-to-answer worsens 20 percent or more, or exceptions older than 14 days.
  Action: stop migrations in scope, publish exit criteria, resume when proof is back within 10 percent of baseline for 7 days.

---

### Appendix G · Tags, lanes, and snapshots

- **Monthly tag**
  First business day. Format vYYYY.MM-<lane>.
  Lanes: pilot, main, legacy.

- **What the tag links to**
  The state snapshot and a receipts page.
  The receipts page lists Adoption, Quality, Credibility with dates.

---

### Appendix H · Autonomy rules in one page

- Two options minimum on every page.
- Actions are reversible and state a stop rule in one sentence.
- Tone is guidance, not orders.
- Most tests nudge. Blocks are only for red-lines.
- L3 overrides are allowed with owner, expiry, and exit criteria.

---

### Appendix I · Contributor quick checklist

1. Does the opener show why, two actions, and an exit metric
2. Do CTAs use the soft allowlist
3. Did you map actions to one leading and one lagging signal
4. Does the frontmatter include bucket, north_star_id, guardrail_id, owner, band, date, CTA labels, metrics, and decision_link if scope or metrics changed
5. Does an annex lab exist and run in 10 minutes or less
6. Is traceability complete PR to receipt
7. Did you avoid names, secrets, and exact internal numbers

If you tick these boxes, you are inside the guardrails and nobody will nag you.

---

### Appendix J · Tiny FAQ

- **Can I suggest only one action**
  Only with an exception that states the tradeoff and expiry.

- **What if the example lab needs 15 minutes**
  Cut scope or split the example so the runnable part is under 10 minutes.

- **What if I hate the gentle CTA words**
  Then your page fails tone lint. Use the allowlist. It exists so readers feel respected.

- **What if I ship and forget the metrics mapping**
  You get a nudge. If it happens again next release, you need an override with an expiry.
