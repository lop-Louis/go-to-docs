---
title: Content review checklist
owner: '@lop'
owner_role: chapter-lead
band: A
change_type: minor
status: pilot
bucket: playbook
audience: squad
tone: practical
narrative_goal: teach
primary_action: /start-here
refresh_after_days: 90
---

Use this checklist to keep content reviews consistent and fast. Add a short note in the PR when items are complete. This page is intentionally concise — treat it as a quick, repeatable guide.

## Before you open the PR

- [ ] Title: clear, action-focused (e.g. `fix(learn): update signals wording`)
- [ ] Scope: the PR contains one small, reviewable change
- [ ] Frontmatter: page has required fields and valid values

## Content and narrative

- [ ] Headline and summary clearly state the change and why it matters
- [ ] Body is short, scannable, and uses plain language
- [ ] Narrative goal is respected (teach / decide / resolve)
- [ ] No unresolved TODOs or stray notes left in the content

## Links, assets, and references

- [ ] All internal links use internal-link syntax (e.g. `</learn/signals-roster>`) and work locally
- [ ] External links point to reliable sources and open in a new tab where appropriate
- [ ] Images have `alt` text and are optimized for the web

## Accessibility and formatting

- [ ] Headings are hierarchical and descriptive
- [ ] Lists and tables render sensibly for screen readers
- [ ] Code blocks and inline code use appropriate fences

## Metadata and traces

- [ ] `release_tag` set if this change must ship in a release
- [ ] `last_reviewed` set when the content is approved and merged
- [ ] Owner and audience are correct in frontmatter

## Review and sign-off

- [ ] At least one peer reviewer confirmed content and style
- [ ] Reviewer left a short note in the PR describing the check performed
- [ ] If the change affects the public experience, confirm with the owner listed in frontmatter

---

When in doubt, prefer short, explicit writing. If a change grows to more than a small clarifying edit, split it into multiple PRs or open an issue to discuss scope.
