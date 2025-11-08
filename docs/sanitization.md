---
title: Sanitization Guidance
band: A
owner: '@lop'
refresh_after_days: 60
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Contributors preparing public-safe guidance
tone: Plainspoken, candid, energetic
narrative_goal: Show how to strip risk while keeping guidance useful
nav_group: Contributor Kit
nav_order: 10
nav:
  - sidebar
---

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


# Sanitization Guidance

Northbook only ships guidance that anyone can quote safely. <a href="#what-sanitization-protects" data-primary-action>Run the sanitization checklist</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>. Use these guardrails to keep every page linkable while chore-like checklists stay in `/runbooks`.

## What Sanitization Protects

- **People** — strip personal data, names, emails, or avatars that could identify someone.
- **Systems** — remove URLs, ticket IDs, and architecture breadcrumbs tied to internal tools.
- **Signals** — convert precise numbers or dates into ranges and relative time so nothing leaks velocity or runway.
- **Brand** — recreate screenshots with dummy data instead of redacting; avoid dragging internal UI chrome into public view.

If a fact is safe enough for a press release, it is safe enough for Northbook.

## Rewrite Instead of Redact

| Risky detail | Public-safe rewrite |
|
