---
title: Find anything fast
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 30
status: live
nav_group: Start
nav_order: 12
nav_label: Wayfinding shortcuts
nav:
  - sidebar
---

# Wayfinding map

You shouldn’t fight the site to find work. <a href="#routes" data-primary-action>Pick the fastest route</a> or <a href="../runbooks/index" data-secondary-action>Jump to the runbooks</a>.

## First three clicks

1. **Hero buttons** — Decision Spine, Facilitation Techniques, and Accessibility Quick Wins stay pinned to the homepage hero for the default outcomes.
2. **Contracts** — Use [Start Here](./index.md) for the checklist and [Band A](../band-a) when you need the publishing guardrails.
3. **Search** — Tap the header icon (or `⌘K` / `Ctrl+K`) and type a topic, owner, or acronym. The palette indexes titles, headings, and descriptions.

## Routes by intent {#routes}

| You want to…               | Go here                                                 | Why                                       |
| -------------------------- | ------------------------------------------------------- | ----------------------------------------- |
| Frame or decide            | [Decision Spine](../decision-spine)                     | Template + review triggers in one place   |
| Facilitate                 | [Facilitation Techniques](../facilitation)              | Ready prompts, no filler                  |
| Ship accessibly            | [Accessibility Quick Wins](../accessibility-quick-wins) | High-signal checks that fit sprint timing |
| Clear interrupts in 10 min | [Fix-it-fast index](../fix/)                            | Triage flows with escalation packets      |
| Verify your doc change     | [Quick-Run](../ops/quick-run)                           | Fast regression check before you merge    |
| Run a deeper op            | [Runbooks index](../runbooks/)                          | Chore-heavy flows with receipts           |
| See what changed           | [Receipts](../receipts/)                                | Highlights from the latest release        |

## URL and anchor cheats

- Most directories resolve to index pages. Example: `/fix/` and `/runbooks/` load their indexes—skip `index.md` in links.
- Section links follow the heading slug (`#four-stages`). Click the chain icon next to a heading to copy the exact anchor.
- Anything under `docs/ops` or `docs/runbooks` is an operational flow; guidance stays in the root.

## If you still can’t find it

1. Search again using the owner or the keyword in the page’s “tone” or “narrative” fields (e.g., `stale`, `accessibility`).
2. Skim the sidebar—groups mirror the governance taxonomy (Start, Guides, Runbooks, Contributor Kit, Fix it fast).
3. Still lost? [Open a “Question” issue](https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=%5BQuestion%5D%20Wayfinding&body=Page:%20https://northbook.guide/start-here/find) with what you tried. We patch wayfinding gaps in the next release.
