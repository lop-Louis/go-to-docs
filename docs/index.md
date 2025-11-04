---
title: Go-To Docs
layout: home
band: A
owner: '@lop'
refresh_after_days: 90
change_type: minor
status: live
last_reviewed: '2025-11-04'

hero:
  name: Go-To Docs
  text: Answers you can link. Patterns you can trust.
  tagline: Public-safe playbook for decisions, facilitation, and quick wins.
  actions:
    - theme: brand
      text: Start here
      link: /band-a
    - theme: alt
      text: Ask a question
      link: https://github.com/lop-Louis/go-to-docs/issues/new?labels=kl,question&title=[Question]%20

features:
  - title: Make decisions faster
    details: Use the Decision Spine and stop relitigating. → /decision-spine
  - title: Run better meetings
    details: Copy-paste facilitation prompts that work. → /facilitation
  - title: Ship accessible UI
    details: Quick checks that catch 80% of issues. → /accessibility-quick-wins
---

---

- Monthly release captures meaningful changes in `CHANGELOG.md`

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
