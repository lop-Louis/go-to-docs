---
title: Quick-Run
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 45
status: live
---

> Find the answer. Use it now.  
> [Run the Quick-Run](/ops/quick-run) · [Open the Proof Run](/labs/link-drift)
> <a href="/ops/quick-run" data-primary-action>Run the Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Open the Proof Run</a>.

## Trigger

Build fails or links break after a content change.

## Action

- Open the page you touched and scan for dead or stale links
- Run the link check locally and note the first failing path
- Fix the smallest failing link or remove it if truly obsolete
- Re-run the check and commit with a clear message

## Receipt

Link check exits 0 and the page renders without broken links.

## Stop rule

If this takes over 10 minutes or fails twice, switch to the Proof Run and cut scope to the smallest fix.
