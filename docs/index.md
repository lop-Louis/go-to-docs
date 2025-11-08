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
  text: Guidance over to-do.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: Teams move faster when the edges are obvious and overridable.
  actions:
    - theme: brand
      text: Onboarding
      link: /start-here/
    - theme: alt
      text: Ask a question
      link: https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=[Question]%20PATH
features:
  - title: Decide faster
    details: Use the Decision Spine to cut rework.
    link: /decision-spine
    linkText: Open Decision Spine
  - title: Facilitate better
    details: Copy-paste prompts that keep meetings on track.
    link: /facilitation
    linkText: Grab a facilitation prompt
  - title: Ship accessibly
    details: Quick checks that catch 80% of issues.
    link: /accessibility-quick-wins
    linkText: Run the accessibility quick checks
nav:
  - none
---

Find the answer. Use it now. <a href="./start-here/" data-primary-action>Use the starting links</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>.

Guidance stays light on chores; runbooks carry the detailed checklists.

If this didn’t answer your question in 60 seconds, <a href="https://github.com/lop-louis/northbook/issues/new?labels=kl,feedback&title=%5BFeedback%5D%20Homepage&body=Page:%20https://northbook.guide/" data-secondary-action>tell us so we can fix it</a>.

## Governance & Safety

Automation enforces: frontmatter completeness, sanctioned band, sanitization rules, secret scan, build integrity. See [Anti-drift Content Governance](./governance) for lifecycle and gate details.

## FAQ Highlights

- New joiner? See [FAQ for New Joiners](./faq-new-joiners)
- Making decisions? Start with [Decision Spine](./decision-spine)
- Not sure if content belongs? Re-check [Band A](./band-a) examples

## Opening a PR

Before submitting:

- `pnpm run guard`
- `pnpm run docs:build`
- Ensure no internal names, hard dates, or IDs
- Keep scope aligned with declared `change_type`

## Future (Non-binding)

Monthly release captures meaningful changes in [releases](./release.md).

- Optional analytics for drift scoring
- Inclusive language heuristics
- Link freshness scoring
