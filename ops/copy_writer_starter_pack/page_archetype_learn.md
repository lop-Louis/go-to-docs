---
bucket: 'learn'
north_star_id: 'ns-001'
guardrail_id: 'gr-105'
owner: 'louis'
band: 'a'
date: '{{ yyyy-mm-dd }}'
cta_primary_label: 'preview'
cta_secondary_label: 'compare'
leading_metric: 'm-dashboard-freshness-days'
lagging_metric: 'm-decision-hit-rate'
---

## What this page is for

This page shows what **changed**, what **stayed flat**, and what that means for **{{team / product / risk}}**, so we can decide whether to continue, adjust, or stop.

## What you can do here\*\*

- action 1: preview: open the dashboard slice for **{{signal group, for example Adoption or Quality}}** over **{{baseline window}}**.
- action 2: compare: line it up against the last **{{tag / release}}** and note where the trend supports or challenges our bet.

## How we’ll know it worked

Dashboards refreshed within 30 days; decision hit‑rate (decisions that produced expected receipts) is up or stable.

> receipts: list the 1–3 most relevant signals, each with a short "what this tells us" sentence.
