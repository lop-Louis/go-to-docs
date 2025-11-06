---
title: Northbook
layout: home
band: A
owner: '@louis'
refresh_after_days: 120
change_type: patch
status: live
last_reviewed: '2025-01-15'
audience: Anyone looking for Northbook guidance and entry points
tone: Plainspoken, candid, energetic
narrative_goal: Orient newcomers to the core pillars and where to start
primary_action: Follow the highlighted starting links to continue the journey

hero:
  name: Northbook
  text: Guidance over to-do.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: Guidance you can ship today. Grab checklists from the runbooks.
  actions:
    - theme: brand
      text: Start here
      link: /band-a
    - theme: alt
      text: Ask a question
      link: https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=[Question]%20PATH

features:
  - title: Decide faster
    details: Use the Decision Spine to cut rework.
  - title: Facilitate better
    details: Copy-paste prompts that keep meetings on track.
  - title: Ship accessibly
    details: Quick checks that catch 80% of issues.
---

---

- Monthly release captures meaningful changes in `CHANGELOG.md`.

## Runbooks

Guidance stays light on chores. When you need the step-by-step checklist, jump to [/runbooks/](/runbooks/).

## Governance & Safety

Automation enforces: frontmatter completeness, sanctioned band, sanitization rules, secret scan, build integrity. See [Governance Policy](./governance) for lifecycle and gate details.

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

- Optional analytics for drift scoring
- Inclusive language heuristics
- Link freshness scoring

---

_Last reviewed: see git history (quarterly review cadence)._
