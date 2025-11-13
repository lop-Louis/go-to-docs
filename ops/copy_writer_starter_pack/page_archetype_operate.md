---
bucket: 'operate'
north_star_id: 'ns-001'
guardrail_id: 'gr-103'
owner: 'louis'
band: 'a'
date: '{{ yyyy-mm-dd }}'
cta_primary_label: 'see example'
cta_secondary_label: 'adapt'
leading_metric: 'm-lab-pass'
lagging_metric: 'm-defect-rate-changed-pages'
---

## What this page is for

This page shows the **smallest runnable example** of **{{task or change}}** so **{{who}}** can try it safely, check the result, and roll back if needed.

## What you can do here

- action 1: see example: run the **{{example}}** for **{{task}}** end‑to‑end.
- action 2: adapt: copy the example and adjust **{{inputs / scope / config}}** for your own context.

**How we’ll know it worked**
The annex lab for this page runs in ≤ 10 minutes, and defect rate on changed pages does not worsen after release.

> receipts: link to the annex lab, last lab pass result, and the current release tag.
