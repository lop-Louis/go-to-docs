---
title: Sanitization Guidance
band: A
owner: '@lop'
refresh_after_days: 60
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Contributors preparing public-safe guidance
tone: 'Plainspoken, candid, energetic'
narrative_goal: Show how to strip risk while keeping guidance useful
nav_group: Operate
nav_order: 10
nav_label: Sanitization checklist
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# Sanitization Guidance

Northbook only ships guidance that anyone can quote safely. [Run the sanitization checklist](#what-sanitization-protects) or [Browse the runbooks index](../operate/runbooks-index). Use these guardrails to keep every page linkable while chore-like checklists stay in `/runbooks`.

## What Sanitization Protects

- **People** — strip personal data, names, emails, or avatars that could identify someone.
- **Systems** — remove URLs, ticket IDs, and architecture breadcrumbs tied to internal tools.
- **Signals** — convert precise numbers or dates into ranges and relative time so nothing leaks velocity or runway.
- **Brand** — recreate screenshots with dummy data instead of redacting; avoid dragging internal UI chrome into public view.

If a fact is safe enough for a press release, it is safe enough for Northbook.

## Rewrite Instead of Redact

| Risky detail | Public-safe rewrite |
|
