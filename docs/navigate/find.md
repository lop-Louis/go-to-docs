---
title: Find anything fast
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 30
status: live
nav_group: Navigate
nav_order: 12
nav_label: Wayfinding shortcuts
audience: Anyone who needs the right Northbook page in under a minute
tone: 'Plainspoken, candid, energetic'
narrative_goal: Show newcomers the fastest navigation patterns before they guess
nav:
  - sidebar
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Wayfinding map

You shouldn’t fight the site to find work. [Pick the fastest route](#routes-by-intent) or [Jump to the runbooks](../operate/runbooks-index).

## First three clicks

1. **Hero buttons** — Decision Spine, Facilitation Techniques, and Accessibility Quick Wins stay pinned to the homepage hero for the default outcomes.
2. **Contracts** — Use [Start Here](./index.md) for the checklist and [Band A](../navigate/band-a) when you need the publishing guardrails.
3. **Search** — Tap the header icon (or `⌘K` / `Ctrl+K`) and type a topic, owner, or acronym. The palette indexes titles, headings, and descriptions.

## Routes by intent

| You want to…           | Go here                                                                                     | Why                                       |
| ---------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Frame or decide        | [Decision Spine](../operate/decision-spine)                                                 | Template + review triggers in one place   |
| Facilitate             | [Facilitation Techniques](../operate/facilitation)                                          | Ready prompts, no filler                  |
| Ship accessibly        | [Accessibility Quick Wins](../operate/accessibility-quick-wins)                             | High-signal checks that fit sprint timing |
| Clear interrupts fast  | [Fast support index](../support/)                                                           | Triage flows with escalation packets      |
| Check for regressions  | [Quick-Run](../navigate/quick-run)                                                          | Fast regression check before you merge    |
| Verify your doc change | [Verify-in-10 guide](../operate/verify-in-10.md) + [10-minute lab](../labs/verify-in-10.md) | Learn the pattern, then run the lab       |
| Run a deeper op        | [All runbooks](../operate/runbooks-index)                                                   | Chore-heavy flows with receipts           |
| See what changed       | [State ledger](../navigate/state-ledger.md)                                                 | Highlights + links for the latest release |

## URL and anchor cheats

- Most directories resolve to index pages. Example: `/support/` and `/operate/runbooks-index` load their indexes—skip `index.md` in links.
- Section links follow the heading slug (`#four-stages`). Click the chain icon next to a heading to copy the exact anchor.
- Anything under `docs/ops` or `docs/runbooks` is an operational flow; guidance stays in the root.

## If you still can’t find it

1. Search again using the owner or the keyword in the page’s “tone” or “narrative” fields (e.g., `stale`, `accessibility`).
2. Skim the sidebar—groups mirror the governance taxonomy (Start, Guides, Runbooks, Contributor Kit, Fast support).
3. Still lost? [Open a “Question” issue](https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=%5BQuestion%5D%20Wayfinding&body=Page:%20https://northbook.guide/navigate/find) with what you tried. We patch wayfinding gaps in the next release.

## Related references

- [Start overview](./index.md) — When you need the full onboarding story.
- [Quick-Run check](../navigate/quick-run.md) — The hygiene run linked all over this page.
- [Wayfinding shortcuts table source](../operate/) — Keep the canonical index synced if you add new guides.
