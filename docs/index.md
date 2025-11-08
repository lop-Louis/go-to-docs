---
title: Northbook
layout: home
band: A
owner: '@lop'
refresh_after_days: 120
change_type: patch
status: live
last_reviewed: '2025-01-15'
audience: Anyone looking for Northbook guidance and entry points
tone: Plainspoken, candid, energetic
narrative_goal: Orient newcomers to the core pillars and where to start
hero:
  name: Northbook
  text: Make the work predictable.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: A visitor reaches the right doc and a runnable next action in under 60 seconds, for at least 80% of sessions.
  actions:
    - theme: brand
      text: Start now
      link: /start-here/
    - theme: alt
      text: See the philosophy
      link: /playbook/north-star-guardrails#philosophy
features:
  - title: Direction beats speed
    details: A one-line North Star turns scattered actions into progress. Clear guardrails reduce rework and keep creativity alive.
    link: /playbook/north-star-guardrails
    linkText: Read North Star & Guardrails
  - title: Ship small, prove it
    details: Single bet per cycle. Pilot first. Receipts prove outcomes every 14 days—pages touched, time-to-answer, lab pass rate.
    link: /ops/quick-run
    linkText: Run Quick-Run
  - title: Keep receipts
    details: Public state, named owners, and traceability prevent hidden work. Change → Decision → Guardrail → Page → Signal → Receipt.
    link: /playbook/north-star-guardrails#visibility
    linkText: See traceability
nav:
  - none
---

Find the answer. Act within 60 seconds. <a href="./start-here/" data-primary-action>Use the starting links</a> or <a href="./playbook/north-star-guardrails" data-secondary-action>Read the North Star & Guardrails</a>.

**Protect the North Star.** Every page has an owner, band, exit metric, and links to State and Receipts. Default deny outside the guardrails. Exceptions need owner, reason, expiry, rollback, and stop rule—but they're allowed.

If this didn't answer your question in 60 seconds, <a href="https://github.com/lop-louis/northbook/issues/new?labels=kl,feedback&title=%5BFeedback%5D%20Homepage&body=Page:%20https://northbook.guide/" data-secondary-action>tell us so we can fix it</a>.

## Governance & Safety

**Invariants enforced:**

1. **Default deny outside the guardrails** — If a change is not covered, it is out of scope.
2. **Public Band-A content only** — No sensitive or internal-only information.
3. **Runnable in 10 minutes** — Hard gate for ops annex labs.
4. **Exceptions expire automatically** — No entry, no work.
5. **One owner and date on every change** — Clear accountability.
6. **Sanitize for public use before publish** — Privacy and safety first.

Automation enforces: frontmatter completeness, Band-A sanitization, secret scan, build integrity. See [North Star & Guardrails](./playbook/north-star-guardrails) for the full contract.

## FAQ Highlights

- New joiner? See [FAQ for New Joiners](./faq-new-joiners)
- Making decisions? Start with [Decision Spine](./decision-spine)
- Not sure if content belongs? Re-check [Band A](./band-a) examples
- How does it work? Watch the [North Star & Guardrails walkthrough](./playbook/north-star-guardrails)

## Philosophy

1. **Direction first. Methods are free.** The North Star is fixed; the path to reach it is flexible.
2. **Transparency builds trust.** Public state, receipts, and traceability prevent hidden work.
3. **Defaults, not diktats.** Good defaults make the right behavior easy. Exceptions need owner, reason, expiry, rollback, and stop rule—but they're allowed.
4. **Small bets, steady gains.** Single bet per cycle. Pilot first for wide changes. Stop if receipts are flat or negative beyond the stop rule.
5. **Evidence over opinion.** Receipts › analytics › heuristic review › opinion. Clarity over chrome.
6. **Runnable in 10 minutes.** Hard gate for ops annex labs. Keeps experiments lightweight and feedback fast.

## Opening a PR

Before submitting:

- `pnpm run docs:guard` — Enforces guardrails and Band-A sanitization
- `pnpm run docs:build` — Verifies build integrity
- Ensure no internal names, hard dates, or ticket IDs
- One owner and date on every change
- Keep scope aligned with declared `change_type`

**Stop rule:** If CI adds more than 15 minutes per day across two weeks, remove the last added check and reassess ROI.

## Receipts & State

**Tracked per 14-day cycle:**

- **Adoption** — Pages touched and time to answer
- **Quality** — Lab pass rate and broken link count
- **Credibility** — State page freshness and exceptions resolved on time

Monthly release captures meaningful changes in [releases](./release.md). State page updated within 30 days.
