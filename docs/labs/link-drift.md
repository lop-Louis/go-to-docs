---
title: Link Drift Lab
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: live
sidebar: false
---

Need to confirm hyperlinks survived the latest edit? <a href="/ops/quick-run" data-primary-action>Jump back to the Ops Quick-Run</a> or
<a href="/labs/link-drift.lab.json" data-secondary-action>Download the lab config</a>.

## Trigger
Use this lab if a guidance page loses outbound link hygiene (missing `utm_source`, 404s) or when the guard warns about link drift.

## Action
- Run `pnpm labs` to execute every lab (this one is lightweight).
- Inspect `reports/labs.json` for the latest status.
- Patch the offending doc links, then rerun the lab.

## Receipt
- `reports/labs.json` shows `{ "lab": "link-drift.lab.json", "ok": true }`.

## Stop rule
- If the lab continues to fail after two runs, capture the broken URLs and open an issue tagged `link-drift`.
