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
hero:
  name: Northbook
  text: Guidance over to-do.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: Teams move faster when the edges are obvious and overridable.
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
nav:
  - none
---

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


## Why this exists

**Curated quick-paths with escalation packets and governance guardrails**, not another wiki. Every runbook includes a clear escalation path when self-service hits a wall. See [Fix-it-fast flows](./runbooks/index) for common interrupts or [Governance](./governance) for content lifecycle rules.

## North-star KPIs

Track what sponsors care about:

- **Time-to-answer** for common interrupts
- **% escalations** with complete packet
- **Stale pages** at tag time

Learn more: [Monthly Release Rhythm](./monthly-release) · [Shared Metric Visibility](./runbooks/shared-metric-visibility)

---

Guidance stays light on chores; runbooks carry the detailed checklists. <a href="#governance-safety" data-primary-action>Jump to starting links</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>.

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
