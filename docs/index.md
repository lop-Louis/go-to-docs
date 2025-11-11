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
tone: 'Plainspoken, candid, energetic'
narrative_goal: Orient newcomers to the core pillars and where to start
hero:
  name: Northbook
  text: Make the work predictable.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: >-
    A visitor reaches the right doc and a runnable next action in under 60
    seconds, for at least 80% of sessions.
  actions:
    - theme: brand
      text: Place your initiative on the SLI map
      link: /navigate/sli-states?cta=home-sli
    - theme: alt
      text: Verify-in-10 (guide)
      link: /operate/verify-in-10?cta=home-verify-guide
features:
  - title: Navigate fast
    details: >-
      Place every initiative on the SLI map so the seam, guardrail, and next
      constraint are obvious in under a minute.
    link: /navigate/sli-states
    linkText: Open the SLI map
  - title: Operate with freedom
    details: >-
      Ship small and prove it—read the Verify-in-10 guide, run the 10-minute
      lab, and keep the North Star guardrails visible.
    link: /operate/verify-in-10
    linkText: Run Verify-in-10
  - title: Support with guidance
    details: >-
      Clear the top interrupts via three Fix flows, each capped at 10 minutes
      with escalation packets ready for handoff.
    link: /support/
    linkText: Open Fix flows
nav:
  - none
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-01-15'
---

Find the answer. Act within 60 seconds. [Place your initiative on the SLI map](./navigate/sli-states) or [Read the Verify-in-10 guide](./operate/verify-in-10).

Northbook is the public operating contract for docs, labs, and automation. Everything here exists to get you to the right page and a runnable next step inside one minute.

## Your 60-second path

1. **Map your initiative** — Use the [SLI map](./navigate/sli-states) to confirm the seam and constraint.
2. **Learn before running** — Read the [Verify-in-10 guide](./operate/verify-in-10) for the why/when/anti-patterns.
3. **Run the lab** — Execute the [10-minute lab](./labs/verify-in-10) and capture receipts as you go.
4. **Post receipts & state** — Follow [Quick-Run](./navigate/quick-run) and update [State](./navigate/state-ledger.md) so the ledger reflects reality.

**Protect the North Star.** Every page shows owner, band, exit metric, State, and Receipts. Default deny outside the guardrails. Exceptions are allowed only with owner, reason, expiry, rollback, and stop rule.

## Ops guardrails we enforce

1. **Default deny outside guardrails** — No contract, no work.
2. **Public Band‑A content only** — Sanitized for public sharing; no internal data or secrets.
3. **Runnable in 10 minutes** — Labs, annexes, and automation must finish locally inside the limit.
4. **Exceptions auto-expire** — No entry, no work after expiry.
5. **One owner and date per change** — Traceability from Change → Decision → Guardrail → Page → Signal → Receipt.
6. **Sanitize before publish** — Frontmatter complete, links live, names redacted.

Automation enforces frontmatter schema, guardrail links, build integrity, secret scans, and state freshness. Read the [North Star & Guardrails playbook](./operate/north-star-guardrails) for the full contract.

## Receipts we publish every cycle

- **Adoption** — Pages touched, time-to-answer, CTA telemetry from the [Signal Registry](./operate/signal-registry).
- **Quality** — Verify-in-10 lab pass rate, link health, accessibility quick wins.
- **Credibility** — State freshness, release tags, and exception closure rate.

Check the live ledger on the [State page](./navigate/state-ledger.md) or open the current [release bundle](./release.md).

## Build or change a page

1. Map the change to an existing guardrail or log an exception + decision before starting.
2. Run `pnpm run docs:guard` to enforce frontmatter, guardrails, and Band-A sanitization.
3. Run `pnpm run docs:build` to confirm the site compiles cleanly.
4. Keep owner, date, guardrail mapping, and acceptance checklist visible in the doc or PR.
5. Post receipts via `pnpm run state:build` and link them inside the release folder.

_Stop rule:_ If CI adds more than 15 minutes per day across two weeks, remove the last added check and raise a decision before re-enabling it.

## When to raise your hand

- New joiner? Start with the [FAQ for New Joiners](./navigate/faq-new-joiners) plus the [Handshake contracts](./operate/handshake-contracts).
- Making a scope call? Open the [Decision Spine](./operate/decision-spine) and [Decision tripwires](./decision-tripwires).
- Unsure if content belongs? Re-check [Band A](./navigate/band-a) and the [Contracts directory](./contracts/northbook-operations-contract-v1.md).
- Need facilitation or handover help? Use the [20-minute handover runbook](./operate/handover-20-min.md) or the [Handover RACI template](./operate/handover-raci-template.md).

If this page didn’t get you to an answer in 60 seconds, [tell us so we can fix it](https://github.com/lop-louis/northbook/issues/new?labels=kl,feedback&title=%5BFeedback%5D%20Homepage&body=Page:%20https://northbook.guide/). We'll log the feedback, post receipts, and adjust within the next cycle.
