---
title: Northbook Operations Contract v1.0
band: A
owner: '@lop'
change_type: major
status: archived
refresh_after_days: 14
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-10-01'
---

# Northbook Operations Contract v1.0

Keep the work predictable and receipts visible. [Apply this contract](#purpose) or [Review the release context](../release.md).

State: [State visibility map](../operate/state-visibility.md) · Ledger: [Release state](../navigate/state-ledger.md) · Release reference: [site-v2025.11 bundle](../../ops/releases/2025-11/index.md)

## Purpose

Make the work predictable. Protect the North Star. Ship small, prove it, and keep receipts.

## Scope rule

If a change is not covered by these guardrails and contracts, it is out of scope. The only path back in is a logged exception with owner, reason, expiry, rollback plan, and a measurable stop rule.

## North Star

A visitor reaches the right doc and a runnable next action in under 60 seconds, for at least 80% of sessions across two consecutive weeks. Replace the numbers only via a decision entry.

### Owner and cadence

- **Owner:** '@lop'
- **Ops assist:** 'Area Operator (UX/Frontend/Tests/Automation/Governance)'
- **Cycle:** 14 days

### Baseline window and source

- **Baseline window:** last 14 days
- **Source:** site analytics and PR log
- **Delta type:** money, risk, people capacity

### Invariants

1. Default deny outside the guardrails.
2. Public Band‑A content only.
3. Runnable in 10 minutes is a hard gate for ops annex labs.
4. Exceptions expire automatically. No entry, no work.
5. One owner and date on every change.
6. Sanitize for public use before publish.

### Seams

- UX research & content design
- UI delivery
- Tests and acceptance
- Governance and decisions
- Automation and CI

### Interfaces

- UI → Tests: supplies acceptance checklist.
- UI → Governance: supplies guardrail mapping and decision link.
- Tests → Automation: supplies pass–fail signals.
- Automation → Governance: posts receipts and state.

### Change control

- Single bet per cycle. Stop if receipts are flat or negative beyond the stop rule.
- Use "decision" entries for scope or metric changes.
- Pilot first for wide changes.

### Receipts

- Adoption: pages touched and time to answer.
- Quality: lab pass rate and broken link count.
- Credibility: state page freshness and exceptions resolved on time.

### Stop rule

If the North Star target misses for two cycles and exceptions increase, pause new features and run a 7‑day tighten pass focused on UI clarity, acceptance tests, and automation noise.

---

## Subcontract 1: UI Delivery

### Scope

Create or change pages and components that help users find the answer and act within 60 seconds.

### Inputs

- One sentence problem statement
- Mapping to a specific guardrail
- Decision link if scope or numbers change

### Outputs

- Page with visible North Star line and CTA pair
- Link to public state and receipts
- Acceptance checklist handed to Tests

### Invariants — Subcontract 1: UI Delivery

1. Plain opener plus two actions above the first section.
2. Exit metric sentence visible on page.
3. Links to State and Receipts visible.
4. Band and owner shown in frontmatter or header.

### Interfaces — Subcontract 1: UI Delivery

- Provide acceptance checklist to Tests.
- Provide guardrail mapping to Governance.

### Rollout

- Pilot on one page. If time‑to‑answer improves, extend.
- One owner and date. Keep the change under 600 px of fold copy.

### Acceptance checks

- Opener and two CTAs render above first section.
- Exit metric sentence present.
- State and Receipts links present and live.
- Page usable without scripts.
- Runnable in 10 minutes for any annex lab.

### Risks and tripwires

- Drift to marketing copy. Cut 20% if the fold gets crowded.
- Missing owner or band. Block until fixed.

### Stop rule — Subcontract 1: UI Delivery

If time‑to‑answer worsens by 10% after release, revert and fix the copy or IA before retrying.

### Lanes

- **OWNER** approve copy and IA changes, final publish.
- **OPERATOR** draft copy, check link health, assemble checklist.

---

## Subcontract 2: Tests and Acceptance

### Scope — Subcontract 2: Tests and Acceptance

Define and run lightweight acceptance checks that protect the North Star without slowing delivery.

### Inputs — Subcontract 2: Tests and Acceptance

- Acceptance checklist from UI
- Guardrail mapping from Governance

### Outputs — Subcontract 2: Tests and Acceptance

- Pass–fail signals per page or change
- Lab artifacts for annex pages

### Invariants — Subcontract 2: Tests and Acceptance

1. Three defaults always present: Runnable in 10, Contracts present when shared or risky, One‑line rollout and stop rule.
2. Tests describe user‑visible behavior, not internal frameworks.
3. Failures block merge unless a time‑boxed exception exists.

### Interfaces — Subcontract 2: Tests and Acceptance

- Emit machine‑readable pass–fail to Automation.
- Publish a short human summary to Governance.

### Rollout — Subcontract 2: Tests and Acceptance

- Start with the top three pages by traffic. Add more only when signals improve.

### Acceptance checks — Subcontract 2: Tests and Acceptance

- All default checks present and passing.
- Page has owner and date.
- Links resolve within three hops.
- State and Receipts visible.
- Verify-in-10 run before promoting a change from Verify to Ready/Live.

### Risks and tripwires — Subcontract 2: Tests and Acceptance

- Over‑testing. Limit to five checks per page.
- Hidden dependency on external services. Provide a fallback.

### Stop rule — Subcontract 2: Tests and Acceptance

If test flakiness exceeds 5% across two cycles, freeze new checks and simplify to the defaults.

### Lanes — Subcontract 2: Tests and Acceptance

- **OWNER** choose what is worth testing, approve exceptions.
- **OPERATOR** maintain checklists, run labs, file failures.

---

## Subcontract 3: Governance and Decisions

### Scope — Subcontract 3: Governance and Decisions

Keep scope, decisions, exceptions, state, and receipts public and current.

### Inputs — Subcontract 3: Governance and Decisions

- Guardrail mapping from UI
- Test summaries and automation receipts

### Outputs — Subcontract 3: Governance and Decisions

- Decision entries with owner and date
- Live exceptions list with expiry
- Monthly release tag and state page

### Invariants — Subcontract 3: Governance and Decisions

1. Default deny outside the guardrails.
2. Exceptions must include owner, reason, expiry, rollback, and a stop rule.
3. Monthly release tagging on the first business day.
4. Sunset pages after two low‑signal months.

### Interfaces — Subcontract 3: Governance and Decisions

- Notify UI of scope calls.
- Feed Automation with the list of signals to compute.

### Rollout — Subcontract 3: Governance and Decisions

- Add a visible scope line to the Home and Guardrails pages.
- Keep a compact State page and Receipts page linkable from the Home.

### Acceptance checks — Subcontract 3: Governance and Decisions

- Decision exists for any scope or metric change.
- All exceptions have not expired.
- State page updated within the last 30 days.
- Release tag present for the current month.

### Risks and tripwires — Subcontract 3: Governance and Decisions

- Decision sprawl. Collapse duplicates.
- Exception creep. Auto‑expire on date.

### Stop rule — Subcontract 3: Governance and Decisions

If more than three active exceptions persist beyond expiry, freeze new work until cleared.

### Lanes — Subcontract 3: Governance and Decisions

- **OWNER** approve decisions and exceptions, publish state.
- **OPERATOR** draft entries, compute signals, highlight expiries.

---

## Subcontract 4: Automation and CI

### Scope — Subcontract 4: Automation and CI

Automate checks that save time without locking you into heavy tooling.

### Inputs — Subcontract 4: Automation and CI

- Machine‑readable checks from Tests
- Governance signals to compute

### Outputs — Subcontract 4: Automation and CI

- Pass–fail status that gates merges
- State and Receipts artifacts

### Invariants — Subcontract 4: Automation and CI

1. Local‑first with a hosted path allowed only if it saves two hours per week within two weeks.
2. No secrets in public repos.
3. Failures block merges unless covered by a time‑boxed exception.
4. Pipelines finish within 10 minutes.

### Interfaces — Subcontract 4: Automation and CI

- Post results to State and Receipts.
- Expose a clear exception flag back to Governance.

### Rollout — Subcontract 4: Automation and CI

- Start with link health, frontmatter completeness, and State freshness.
- Add analytics snapshots for receipts.
- Pilot on one page then expand.

### Acceptance checks — Subcontract 4: Automation and CI

- Pipeline time under 10 minutes.
- Link health report has zero criticals.
- State freshness computed and posted.
- Exceptions are respected by gates.

### Risks and tripwires — Subcontract 4: Automation and CI

- Tool lock‑in. Keep a local script path.
- Noisy failures. Triage to three severities only.

### Stop rule — Subcontract 4: Automation and CI

If CI adds more than 15 minutes per day across two weeks, remove the last added check and reassess ROI.

### Lanes — Subcontract 4: Automation and CI

- **OWNER** choose what to gate, approve ROI trade‑offs.
- **OPERATOR** wire checks, post receipts, maintain exception switches.

---

## Verification list (review in under 5 minutes)

- Scope line visible on Home and Guardrails pages.
- Home shows exit metric sentence, State link, Receipts link.
- Each change has an owner, date, guardrail mapping, and acceptance checklist.
- Tests show the three default checks and pass.
- CI time under 10 minutes and gates merges.
- Decisions exist for scope or metric changes.
- Exceptions have owner, reason, expiry, rollback, stop rule.
- State updated within 30 days and monthly release tag exists.

---

## Operational Addendum v1.1

## Subcontract 5: Scope Gate

### Purpose — Subcontract 5: Scope Gate

Stop scope creep at the door. Every change maps to a guardrail or carries a logged exception. Default deny.

### Inputs — Subcontract 5: Scope Gate

- PR with owner and date
- Guardrail mapping ID
- Exception entry when mapping is missing or broken

### Outputs — Subcontract 5: Scope Gate

- Pass or fail status with reason
- Label set: `in-scope` or `out-of-scope` and `exception-[id]`

### Invariants — Subcontract 5: Scope Gate

1. No mapping, no merge.
2. Metric changes require a decision entry.
3. Band and owner visible.
4. Single bet per cycle is respected.

### Interfaces — Subcontract 5: Scope Gate

- Governance for decisions and exceptions
- Automation to enforce gate
- UI and Tests to supply mapping and acceptance

### Rollout — Subcontract 5: Scope Gate

- Phase 1 manual checklist in reviews
- Phase 2 CI check for guardrail mapping and exception token
- Phase 3 auto-block on missing mapping

### Acceptance checks — Subcontract 5: Scope Gate

- Guardrail ID present
- Decision link present for metric changes
- Exception entry present and unexpired when used
- Owner and band present

### Risks and tripwires — Subcontract 5: Scope Gate

- Bypass via direct merge
- Noisy false fails
- Overly broad exceptions

### Stop rule — Subcontract 5: Scope Gate

If false fail rate exceeds 5% or cycle time increases by more than 15 minutes on average over two weeks, soften to manual and tune.

---

## Subcontract 6: Signal Registry

### Purpose — Subcontract 6: Signal Registry

Canonical list of signals we compute and display. Small, stable set that proves outcomes.

### Schema

- id, name, description
- source and query reference
- refresh_after_days
- owner and steward
- weight and direction (up good, down good)
- thresholds and buckets
- kill_criteria and notes

### Initial set

- Adoption: pages touched, time to answer
- Quality: annex lab pass rate, broken link count
- Credibility: state freshness, exceptions resolved on time

### Invariants — Subcontract 6: Signal Registry

1. ≤ 8 active signals.
2. Privacy and public safety sanitized.
3. Each signal has an owner and refresh SLA.
4. North Star has one leading indicator and one lagging receipt only.

### Interfaces — Subcontract 6: Signal Registry

- Automation computes and posts receipts
- Governance curates and sunsets
- UI consumes for state panels
- Cloudflare analytics export → [`scripts/cloudflare-analytics.mjs`](../../scripts/cloudflare-analytics.mjs) → [`docs/operate/cloudflare-analytics.md`](../operate/cloudflare-analytics.md)
- Registry stays public at [`docs/operate/signal-registry.md`](../operate/signal-registry.md)

### Rollout — Subcontract 6: Signal Registry

- Publish registry and a public page
- Post monthly snapshots with release tag

### Acceptance checks — Subcontract 6: Signal Registry

- Registry exists and validates
- Every signal shows owner and refresh date
- Latest snapshot linked from State
- At least one leading and one lagging mapped to the North Star

### Risks and tripwires — Subcontract 6: Signal Registry

- Metric creep and vanity graphs
- Stale signals that no one owns

### Stop rule — Subcontract 6: Signal Registry

If more than 8 signals or more than 25% are stale for 30 days, prune to the top 5 by decision value.

---

## Subcontract 7: Stewards for Scope, Signals, Exceptions

### Purpose — Subcontract 7: Stewards for Scope, Signals, Exceptions

Name who keeps the rails tight and visible.

### Roles

- **Scope Steward:** validates guardrail mapping, runs Scope Gate, proposes scope decisions.
- **Signal Steward:** maintains registry, defines queries, checks freshness.
- **Exception Steward:** manages exception entries, expiries, and rollback confirmations.
- **OPERATOR** runs checks, posts receipts, flags expiries.

### Invariants — Subcontract 7: Stewards for Scope, Signals, Exceptions

1. One named steward per role plus a backup.
2. Steward names visible on the State page.
3. Conflicts of interest called out; steward cannot approve own exception.

### Interfaces — Subcontract 7: Stewards for Scope, Signals, Exceptions

- Governance lists stewards and backups
- Automation routes alerts to the right steward

### Acceptance checks — Subcontract 7: Stewards for Scope, Signals, Exceptions

- Stewards and backups listed with dates
- Alerts have an owner within 24 hours
- Exceptions closed or renewed before expiry

### Risks and tripwires — Subcontract 7: Stewards for Scope, Signals, Exceptions

- Steward bottlenecks
- Silent ownership drift

### Stop rule — Subcontract 7: Stewards for Scope, Signals, Exceptions

If any steward backlog exceeds one cycle or two expired exceptions linger, appoint acting steward and cut scope.

---

## Subcontract 8: Traceability Map

### Purpose — Subcontract 8: Traceability Map

Make the path from change to impact obvious. PR → Decision → Guardrail → Page → Signal → Receipt.

### Inputs — Subcontract 8: Traceability Map

- PR metadata and labels
- Decision and exception entries
- Signal registry
- Analytics snapshots

### Outputs — Subcontract 8: Traceability Map

- Machine-readable map for Automation
- Human page showing edges and orphans

### Invariants — Subcontract 8: Traceability Map

1. No orphan PRs; every merge links to a decision or exception.
2. Pages link to at least one signal.
3. Receipts reference the signal ids and the release tag.

### Interfaces — Subcontract 8: Traceability Map

- Automation builds and posts map
- Governance audits orphans
- UI uses map to place state links

### Rollout — Subcontract 8: Traceability Map

- Start with top 10 changes by impact
- Add weekly, keep the page under 1 screen of copy

### Acceptance checks — Subcontract 8: Traceability Map

- Coverage ≥ 90% of merged PRs in the last cycle
- Orphans listed and dated
- Example queries documented to trace any PR to receipts in under 3 clicks

### Risks and tripwires — Subcontract 8: Traceability Map

- Manual upkeep
- Overly clever diagrams that no one uses

### Stop rule — Subcontract 8: Traceability Map

If maintenance exceeds 30 minutes per week for two weeks, reduce to a table with three columns and drop diagrams.

---

## Subcontract 9: Attribution Rule

### Purpose — Subcontract 9: Attribution Rule

Credit impact without overclaiming. Directional, time-bounded, receipts-backed.

### Rule

- Default to team credit on receipts.
- When a single change is the clear driver, attribute primary credit to the change owner, secondary to the steward that enabled it.
- Use a baseline window and report ranges, not single points.
- Public phrasing stays directional: “contributed to,” “associated with,” “enabled.”

### Invariants — Subcontract 9: Attribution Rule

1. Every attribution links to receipts.
2. No hero claims without a counterfactual window.
3. Limit to one primary owner per claim.

### Interfaces — Subcontract 9: Attribution Rule

- Governance reviews attribution phrasing
- Automation attaches receipt links

### Acceptance checks — Subcontract 9: Attribution Rule

- Receipt link present
- Baseline window stated
- Directional language used
- No more than one primary owner named

### Risks and tripwires — Subcontract 9: Attribution Rule

- Metric gaming
- Social friction across teams

### Stop rule — Subcontract 9: Attribution Rule

If more than one attribution dispute arises in a cycle, revert to team-only credit for that cycle and update rules next release.

---

## Subcontract 10: Freeze Protocol

### Purpose — Subcontract 10: Freeze Protocol

Pause changes when signals degrade or governance is breached. Fix fast, then unfreeze.

### Triggers

- Time-to-answer worsens by ≥ 10% for two consecutive days
- More than three expired exceptions
- Link health shows > 5 criticals
- Test flakiness > 5% over a week
- Security or privacy breach indicators

### Steps

1. Announce freeze with cause, owner, start time.
2. CI sets merge block except P0 hotfix and exception work.
3. Triage to the smallest reproducible seam.
4. Fix, verify against acceptance checks, and post receipts.
5. Close with exit criteria met and stop rule noted.

### Exit criteria

- North Star back to baseline window
- Exceptions reduced to ≤ 1 and none expired
- Zero critical link failures
- Flakiness back under 5%

### Invariants — Subcontract 10: Freeze Protocol

1. Daily status during freeze.
2. No scope growth inside the freeze.
3. Postmortem entry with owner and date.

### Interfaces — Subcontract 10: Freeze Protocol

- Governance logs freeze and closure
- Automation enforces block and posts status

### Acceptance checks — Subcontract 10: Freeze Protocol

- Freeze log shows cause, timestamps, owner
- CI block verified
- Exit receipts posted and linked to signals

### Risks and tripwires — Subcontract 10: Freeze Protocol

- Frozen pipes used as an excuse to add scope
- Side-channel merges

### Stop rule — Subcontract 10: Freeze Protocol

If a freeze exceeds 7 calendar days without measurable improvement, escalate, cut scope by 30%, and re-run only the smallest slice with contracts visible.

---

## Subcontract 11: UX Research & Content Design

### Purpose — Subcontract 11: UX Research & Content Design

Ensure the experience has evidence behind it and that information scent is obvious, so users reach the right doc and act within 60 seconds.

### Scope — Subcontract 11: UX Research & Content Design

Problem discovery, hypothesis framing, IA, content design, low‑fi prototypes, and quick validation. No pixel‑polish here; that lives in UI Delivery.

### Inputs — Subcontract 11: UX Research & Content Design

- One‑sentence problem statement and target audience
- Guardrail mapping and decision link when scope/metrics change
- Baseline window and success metric from North Star

### Outputs — Subcontract 11: UX Research & Content Design

- Hypothesis note with evidence links
- IA change or content brief
- Prototype or copy draft ready for UI
- Acceptance checklist handed to Tests

### Invariants — Subcontract 11: UX Research & Content Design

1. Evidence hierarchy: receipts › analytics › heuristic review › opinion.
2. Clarity over chrome: plain language, verb‑first CTAs, no jargon.
3. Accessibility baseline: WCAG 2.2 AA intent preserved in copy and IA.
4. Information scent: primary task visible in first screen with two or fewer competing choices.
5. Privacy: do not collect new personal data to run a UX check.

### Interfaces — Subcontract 11: UX Research & Content Design

- → UI Delivery: content brief, IA diff, prototype, and acceptance checklist.
- → Governance: guardrail mapping, decision links, and exception needs.
- ↔ Signals: define or adjust leading indicator queries with the Signal Steward.
- → Tests: task protocol for a 10‑minute UX lab.

### Rollout — Subcontract 11: UX Research & Content Design

- Pilot on the top entry page by traffic. Use a 10‑minute five‑task micro‑lab or five‑second test. If time‑to‑answer improves, extend.

### Acceptance checks — Subcontract 11: UX Research & Content Design

- Hypothesis note links to baseline and target.
- IA or copy diff attached and traceable to a guardrail.
- Prototype/copy covers opener + two actions and includes an exit metric sentence.
- Task success ≥ 4 of 5 participants or equivalent heuristic pass.
- Accessibility intent intact; no loss in heading structure or link clarity.

### Risks and tripwires — Subcontract 11: UX Research & Content Design

- Over‑research slowing delivery. Cap to two hours per change.
- Style drift. Enforce content brief and terminology list.
- Confounding releases hiding impact. Coordinate with Release tag.

### Stop rule — Subcontract 11: UX Research & Content Design

If UX work adds more than 15 minutes to average cycle time for two weeks without improving time‑to‑answer or task success, pause new UX changes, keep the highest‑leverage IA fix only, and re‑evaluate signals.

### Lanes — Subcontract 11: UX Research & Content Design

- **OWNER** approve hypotheses affecting scope or signals; sign off IA changes.
- **OPERATOR** draft content briefs, run micro‑labs, compile receipts and handoffs.
