---
title: North Star & Guardrails
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
audience: Leaders and teams wanting clarity without deep technical detail
tone: 'Plainspoken, candid, reassuring'
narrative_goal: >-
  Explain how North Stars, guardrails, roles, and rhythm keep delivery steady
  without excess process
nav_group: Operate
nav_order: 20
nav_label: North Star & Guardrails
nav:
  - sidebar
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

# North Star & Guardrails

Make the work predictable. Protect the North Star. Ship small, prove it, and keep receipts. [See the reasoning](#why-the-reasoning) or [Read the philosophy](#philosophy).

## Executive summary

We align on a clear **North Star**: a visitor reaches the right doc and a runnable next action in under 60 seconds, for at least 80% of sessions across two consecutive weeks. We enforce a small set of **guardrails** (Band-A content only, runnable in 10 minutes, one owner per change) that protect this outcome. **Subcontracts** define the seams: UX Research & Content Design, UI Delivery, Tests & Acceptance, Governance & Decisions, and Automation & CI. The **Owner** approves scope and decisions; the **Operator** drafts, checks, and posts receipts. When we must step outside the rails, we log an exception with owner, reason, expiry, rollback plan, and stop rule. **Receipts** (pages touched, time-to-answer, lab pass rate, link health, state freshness, exceptions resolved) prove outcomes every 14 days.

## Watch the brief {#watch-the-brief}

<video controls width="100%" style="max-width: 800px; margin: 1rem 0;">
  <source src="../public/North_Star_&_Guardrails.mp4" type="video/mp4">
  Your browser does not support the video tag. [Download the walkthrough video](/North_Star_&_Guardrails.mp4).
</video>

_This walkthrough explains the North Star, guardrails, roles, and rhythm in under 7 minutes._

## WHY — the reasoning

1. **Direction beats speed.** A one-line North Star turns scattered actions into progress. We aim for visitors to reach the right doc and a runnable action in under 60 seconds.
2. **Autonomy needs boundaries.** Clear guardrails reduce rework and friction while keeping creativity alive. Default deny outside the rails; exceptions need owner, reason, expiry, rollback, and stop rule.
3. **Accountability must be simple.** Public state, named owners, and receipts make priorities obvious. One owner per change, Band-A content only.
4. **Automation should be boring.** Machines check repeatable parts (link health, frontmatter, CI gates) and free people to debate the exceptions. Pipelines finish in 10 minutes.
5. **Learning is a habit.** Exceptions stay visible and owned so the team improves together. Attribution is directional and receipt-backed.

## WHAT — the core concepts

### North Star

A visitor reaches the right doc and a runnable next action in under 60 seconds, for at least 80% of sessions across two consecutive weeks.

This is the canonical outcome. Replace the numbers only via a decision entry.

### Guardrails

A small set of invariants that protect the North Star and keep delivery predictable. All guardrails are **overridable** with a logged exception that includes owner, reason, expiry, rollback plan, and a measurable stop rule.

### Core invariants:

1. **Default deny outside the guardrails** — If a change is not covered, it is out of scope. The only path back in is a logged exception.
2. **Public Band-A content only** — No sensitive or internal-only information.
3. **Runnable in 10 minutes** — Hard gate for ops annex labs.
4. **Exceptions expire automatically** — No entry, no work. No extension without renewal.
5. **One owner and date on every change** — Clear accountability.
6. **Sanitize for public use before publish** — Privacy and safety first.

### Page requirements (UI Delivery):

- Plain opener plus two actions above the first section.
- Exit metric sentence visible on page.
- Links to State and Receipts visible.
- Band and owner shown in frontmatter or header.

### Testing defaults:

- Runnable in 10 minutes.
- Contracts present when shared or risky.
- One-line rollout and stop rule documented.

### Roles

### Seams and subcontracts:

- **UX Research & Content Design** — Problem discovery, hypothesis framing, IA, content design, and quick validation. Ensures information scent is obvious.
- **UI Delivery** — Create or change pages and components. Hands acceptance checklists to Tests.
- **Tests and Acceptance** — Define and run lightweight checks. Emit pass–fail signals to Automation.
- **Governance and Decisions** — Keep scope, decisions, exceptions, state, and receipts public and current.
- **Automation and CI** — Automate checks, gate merges, post receipts.

### Lanes within roles:

- **Owner** — Approve scope, decisions, exceptions, and final publish.
- **Operator** — Draft content, run checks, post receipts, flag expiries.

### Stewards:

- **Scope Steward** — Validates guardrail mapping, runs Scope Gate.
- **Signal Steward** — Maintains signal registry, defines queries, checks freshness.
- **Exception Steward** — Manages exception entries, expiries, rollback confirmations.

### Rhythm

**Cycle:** 14 days

**Baseline window:** Last 14 days (site analytics and change history)

### Per change:

- Guardrail checks run automatically.
- Exceptions logged with owner, reason, expiry, rollback, and stop rule.

### Change control:

- Single bet per cycle. Stop if receipts are flat or negative beyond the stop rule.
- Use "decision" entries for scope or metric changes.
- Pilot first for wide changes.

### Governance:

- Monthly release tagging on the first business day.
- State page updated within 30 days.
- Sunset pages after two low-signal months.

### Visibility

### Interfaces between seams:

- **UI → Tests** — Supplies acceptance checklist.
- **UI → Governance** — Supplies guardrail mapping and decision link.
- **Tests → Automation** — Supplies pass–fail signals.
- **Automation → Governance** — Posts receipts and state.

### Traceability:

Change → Decision → Guardrail → Page → Signal → Receipt

- No orphan changes; every merge links to a decision or exception.
- Pages link to at least one signal.
- Receipts reference the signal ids and the release tag.
- Coverage ≥ 90% of merged changes in the last cycle.

### Public visibility:

Each change keeps an owner, one-line why, exit metric, and current state label. State changes stay public so people can see progress without meetings.

## HOW — practical structure

## RACI overview

| Activity                     | Owner | Operator | UX Research | UI Delivery | Tests | Governance | Automation |
| ---------------------------- | ----- | -------- | ----------- | ----------- | ----- | ---------- | ---------- |
| Approve scope and decisions  | R/A   | I        | C           | C           | I     | C          | I          |
| Draft content and hypotheses | C     | R        | R/A         | I           | I     | I          | I          |
| Create or change pages       | A     | I        | C           | R/A         | I     | C          | I          |
| Define acceptance checks     | C     | I        | C           | R           | R/A   | I          | I          |
| Run automated checks         | I     | R        | I           | I           | C     | I          | R/A        |
| Log decisions and exceptions | A     | R        | I           | I           | I     | R/A        | I          |
| Post receipts and state      | C     | R        | I           | I           | I     | C          | R/A        |
| Validate guardrail mapping   | A     | I        | I           | C           | I     | R          | I          |
| Manage exception expiries    | A     | R        | I           | I           | I     | R          | I          |

**Legend**: R responsible, A accountable, C consulted, I informed.

### SLII model — adapt support to development level

SLII (Situational Leadership® II) ties the leadership style to a person's competence and commitment for a specific task or work area.

| Development level              | Typical signs                               | What they need           | Leadership style    | How we provide it                                                    | Automation help                                   |
| ------------------------------ | ------------------------------------------- | ------------------------ | ------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| **D1 – Enthusiastic beginner** | High energy, low experience, many questions | Direction and quick wins | **S1 – Directing**  | Give a clear why, break work into steps, set short checkpoints       | Templates, default guardrails, starter checklists |
| **D2 – Disillusioned learner** | Stuck, frustrated, progress uneven          | Coaching and structure   | **S2 – Coaching**   | Pair on scoping, review decisions together, celebrate small progress | Comment nudges, highlight risks, show examples    |
| **D3 – Capable but cautious**  | Good skills, inconsistent confidence        | Support and trust        | **S3 – Supporting** | Agree outcomes, let them choose method, review outcomes not steps    | Quiet checks, exception logging without noise     |
| **D4 – Self-reliant achiever** | Delivers consistently, anticipates risks    | Space and recognition    | **S4 – Delegating** | Set the target, step back, ask for a demo on a date                  | Minimal checks, periodic metric snapshots         |

We set a level per work area, adjust as context shifts, and match our style accordingly. This keeps support proportional—neither over-managing nor under-supporting.

### Guardrails v1 — contract enforcement

### Scope gate:

1. **No mapping, no merge** — Every change maps to a guardrail or carries a logged exception.
2. **Metric changes require decision entry** — Documented and traceable.
3. **Band and owner visible** — Clear accountability.
4. **Single bet per cycle** — Focus prevents thrash.

### UI delivery checks:

1. Plain opener plus two actions above first section.
2. Exit metric sentence visible on page.
3. State and Receipts links visible.
4. Band and owner in frontmatter or header.

### Test defaults:

1. Runnable in 10 minutes for annex labs.
2. Contracts present when shared or risky.
3. One-line rollout and stop rule documented.

### Governance requirements:

1. Decision exists for any scope or metric change.
2. All exceptions have not expired.
3. State page updated within last 30 days.
4. Release tag present for current month.

### Automation invariants:

1. Local-first; hosted only if saves ≥ 2 hours per week within 2 weeks.
2. No secrets in public repos.
3. Failures block merges unless covered by time-boxed exception.
4. Pipelines finish within 10 minutes.

### Measures that matter

**Receipts** (tracked per 14-day cycle):

- **Adoption** — Pages touched and time to answer.
- **Quality** — Lab pass rate and broken link count.
- **Credibility** — State page freshness and exceptions resolved on time.

### Signal Registry:

- ≤ 8 active signals maximum.
- Each signal has an owner and refresh SLA.
- North Star has one leading indicator and one lagging receipt.
- Privacy and public safety sanitized.

### Baseline window and source:

- Last 14 days
- Site analytics and change history
- Delta type: money, risk, people capacity

### Stop rule and backup plan

### Primary stop rule:

If the North Star target misses for two cycles and exceptions increase, pause new features and run a 7-day tighten pass focused on:

- UI clarity
- Acceptance tests
- Automation noise reduction

### Freeze protocol triggers:

- Time-to-answer worsens by ≥ 10% for two consecutive days
- More than three expired exceptions
- Link health shows > 5 criticals
- Test flakiness > 5% over a week
- Security or privacy breach indicators

### Freeze steps:

1. Announce freeze with cause, owner, start time.
2. CI sets merge block except critical fixes and exception work.
3. Triage to the smallest reproducible seam.
4. Fix, verify against acceptance checks, and post receipts.
5. Close with exit criteria met and stop rule noted.

### Exit criteria:

- North Star back to baseline window
- Exceptions reduced to ≤ 1 and none expired
- Zero critical link failures
- Flakiness back under 5%

### Backup:

If a freeze exceeds 7 calendar days without measurable improvement, escalate, cut scope by 30%, and re-run only the smallest slice with contracts visible.

## Philosophy

1. **Direction first. Methods are free.** The North Star is fixed; the path to reach it is flexible. Default deny outside the guardrails keeps scope tight.
2. **Transparency builds trust.** Public state, receipts, and traceability prevent hidden work. Change → Decision → Guardrail → Page → Signal → Receipt.
3. **Defaults, not diktats.** Good defaults make the right behavior easy. Exceptions need owner, reason, expiry, rollback, and stop rule—but they're allowed.
4. **Small bets, steady gains.** Single bet per cycle. Pilot first for wide changes. Stop if receipts are flat or negative beyond the stop rule.
5. **Evidence over opinion.** Receipts › analytics › heuristic review › opinion. Clarity over chrome. Information scent in first screen with ≤2 competing choices.
6. **Runnable in 10 minutes.** Hard gate for ops annex labs. Keeps experiments lightweight and feedback fast.

## FAQ

### Is this more bureaucracy?

No. If a guardrail adds more than a minute for no clear benefit, we strip or relax it. Contracts are light: runnable in 10 minutes, one owner per change, receipts posted automatically.

### Does automation block work?

Only when a check catches an issue we agreed matters. Anyone can override with a logged exception (owner, reason, expiry, rollback, stop rule). Pipelines finish within 10 minutes.

### What if we need different rules?

Guardrails apply to this operation. If scope changes, log a decision entry. Exceptions expire automatically—no entry, no work.

### How will I see progress?

Each page shows owner, band, exit metric. State page updates within 30 days. Receipts posted per 14-day cycle: pages touched, time-to-answer, lab pass rate, broken links, state freshness, exceptions resolved.

### What happens during a freeze?

CI blocks merges except critical fixes and exception work. Daily status posted. Exit when North Star returns to baseline, exceptions ≤ 1, zero critical link failures, flakiness < 5%. If freeze exceeds 7 days, escalate and cut scope by 30%.

## Appendix A — Example entries

### North Star:

_A visitor reaches the right doc and a runnable next action in under 60 seconds, for at least 80% of sessions across two consecutive weeks._

### Exit metric example:

_Time-to-answer median under 60 seconds for 80% of sessions across last 14 days._

### Guardrail mapping example:

_Change #123 maps to UI Delivery guardrail 2 (exit metric visible) and links to decision entry homepage-refresh-nov-2024._

### Exception entry example:

```
Exception ID: homepage-video-test
Owner: Content Team
Reason: Testing video embed impact on time-to-answer
Expiry: 14 days from start
Rollback: Remove video embed and revert to static screenshot
Stop rule: If time-to-answer increases by >5% or page load exceeds 3s for 48 hours
```

### Receipt snapshot example:

```
Cycle: Oct 25 to Nov 8, 2024
Adoption: 1,247 pages touched, median time-to-answer 52s
Quality: Lab pass rate 94%, broken links 2
Credibility: State page updated Nov 7, exceptions resolved 3/3
```

## Appendix B — Minimal artifacts

### Required per subcontract:

- **UX Research & Content Design** — Hypothesis notes, content briefs, task protocols.
- **UI Delivery** — Pages with opener + 2 CTAs, exit metric sentence, State/Receipts links, acceptance checklists.
- **Tests and Acceptance** — Pass–fail signals, lab artifacts.
- **Governance and Decisions** — Decision entries, exceptions list with expiries, monthly release tags, State page.
- **Automation and CI** — Pass–fail status, receipts artifacts, link health reports.

### Signal Registry: — Appendix B — Minimal artifacts

- id, name, description
- source and query reference
- refresh_after_days
- owner and steward
- weight and direction (up good, down good)
- thresholds and buckets
- kill_criteria and notes

### Traceability Map:

- Machine-readable map: Change → Decision → Guardrail → Page → Signal → Receipt
- Human page showing edges and orphans
- ≥ 90% coverage of merged changes

## Related references

- [State visibility map](../operate/state-visibility.md) — Where the public state table referenced here lives.
- [Transition operating promises](../operate/transition-operating-promises.md) — Use these when a guardrail breach needs an explicit escalation path.
- [Playbook canon](./runbooks-index.md) — Jump to the other patterns (RACI by seams, Handshake contracts) mentioned throughout this guide.
