---
title: Northbook Operations Contract v1.0
band: A
owner: '@lop'
change_type: major
status: live
refresh_after_days: 14
---

# Northbook IA Overhaul — Operations Contract v1

Keep the IA overhaul guardrails enforceable and receipt-backed.
[Review the deep-embed decision](../decisions/adopt-deep-embed-north-star.md) or [open the governance release bundle](../../ops/releases/2025-11/index.md).

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
