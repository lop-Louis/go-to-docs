---
title: API Guidelines (Stub)
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Engineers designing and reviewing HTTP APIs
tone: 'Plainspoken, candid, energetic'
narrative_goal: Capture the baseline rules for Northbook APIs until the full guide ships
nav:
  - none
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# API Guidelines (Stub)

Neutral, public-safe defaults keep every HTTP+JSON API predictable while the full guide is in flight. [Apply the API defaults](#core-principles) or [Browse the runbooks index](./operate/runbooks-index).

## Core Principles

1. Consistency over cleverness
2. Minimal surface area; evolve additively
3. Predictable pagination, errors, and versioning
4. Clear separation of concerns (resource vs operation)

## Resource Modeling

- Use plural nouns: `/users`, `/invoices`
- Nest only to express containment: `/users/{id}/sessions`
- Avoid deep nesting (>2 levels) — prefer top-level plus filters

## HTTP Methods

| Method | Use |
|
