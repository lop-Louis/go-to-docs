---
title: Welcome to the Practice Hub
band: A
owner: '@lop'
refresh_after_days: 90
change_type: minor
status: live
last_reviewed: '2025-11-04'
---

# Practice Hub

Public-safe patterns for working, deciding, and improving. This site keeps knowledge lightweight, generic, and reusable.

## What You'll Find

| Area           | Purpose                            |
| -------------- | ---------------------------------- |
| Decision Spine | Lightweight decision-making steps  |
| Facilitation   | Inclusive group techniques         |
| Answer Ledger  | Pattern for recurring Q&A          |
| Accessibility  | Quick wins + audit approach        |
| Release Rhythm | Monthly tagging & cadence          |
| Governance     | Policy & automation model          |
| Sanitization   | How to prepare public-safe content |

## Quick Start

1. Read the [Band A guide](./band-a)
2. Follow the [Sanitization Checklist](./sanitization)
3. Open a draft PR early for feedback
4. Let automation run (guard, link checks, secret scan)
5. Green PRs auto-merge; Yellow requires review

## Contributing Flow

```text
Idea → Draft Page → Guard / Build Pass → Review → Merge → Tag (monthly)
```

## Cross-linking Conventions

- Use relative links without `.md` extension: `./decision-spine`
- Prefer short nouns or verbs for titles
- Add new pages only when an existing one cannot expand logically

## Maintenance Expectations

- Each page declares `refresh_after_days`
- Weekly stale scan alerts when pages pass their window
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
