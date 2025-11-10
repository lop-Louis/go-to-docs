---
title: Start Here
band: A
owner: '@lop'
refresh_after_days: 60
change_type: minor
status: live
last_reviewed: '2025-11-10'
audience: Anyone kicking off work and needing a fast orientation
tone: Plainspoken, candid, energetic
narrative_goal: Give newcomers outcome-based entry points before policy
nav_group: Navigate
nav_order: 1
nav_label: Overview
nav:
  - slot: main
    label: Navigate
  - sidebar
---

# Start Here

Jump into the work, not the policy. [Place your initiative on the SLI map](./sli-states) or [Read the Verify-in-10 guide](../playbook/verify-in-10).

## SL actions first

1. **Find my stage** — Drop the work into the [SLI map](./sli-states) so the team sees the same signals.
2. **Verify-in-10 (guide → lab)** — [Read the pattern](../playbook/verify-in-10.md), then [run the 10-minute lab](../labs/verify-in-10.md) before calling a change “done.”
3. **Post Receipts & State** — Update [`ops/releases/YYYY-MM/manifest.json`](../monthly-release.md) and run `pnpm run state:build` so [State](../state/index.md) shows the new signals.

> Completed the SL loop? Then move on to decisions, facilitation, or accessibility below.

## Pick your first win

- **Decide faster** — Use the [Decision Spine](../decision-spine) to frame options, make the call, and leave a review plan.
- **Facilitate better** — Borrow ready-to-use prompts from [Facilitation Techniques](../facilitation) to keep meetings on-rails.
- **Ship accessibly** — Run the [Accessibility Quick Wins](../accessibility-quick-wins) checklist to catch the 80% issues fast.

## When you need the rules

Need to publish or link something publicly? Check [What is Band A](../band-a) for the sanitization contract, then ship.

Need the UI, tone, or states for your artifact? Use:

- [Find anything fast](./find) for a search cheatsheet
- [Voice & Tone](./tone) for sample phrasing
- [UI Baseline](./ui) for typography, buttons, and spacing
- [SLI States](./sli-states) to see how we visualize progress

## Fix it fast or escalate

- Follow the [Quick-Run](../ops/quick-run) when something regresses after an edit, then [Verify-in-10](../playbook/verify-in-10.md) + [run the lab](../labs/verify-in-10.md) before re-listing it as Live.
- Browse the [Fix-it-fast index](../fix/) when interrupts hit and you need a 10-minute checklist.
- Need something more involved? The [Runbooks index](../runbooks/) keeps the chore-heavy flows out of guidance pages.

## Feedback loop

If this hub doesn’t land you on the right page within a minute, [tell us](https://github.com/lop-louis/northbook/issues/new?labels=kl,feedback&title=%5BFeedback%5D%20Start%20here&body=Page:%20https://northbook.guide/start-here/) so we can plug the gap.

## Related references

- [Wayfinding shortcuts](./find.md) — Fast pointer to every major doc category.
- [Band A guardrails](../band-a.md) — Sanitization contract before you publish.
- [Quick-Run check](../ops/quick-run.md) — Required pre-flight after any doc edit.
- [Playbook canon](../playbook/) — The deeper guidance you’ll link once you’re oriented.
