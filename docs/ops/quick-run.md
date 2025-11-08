---
title: Quick-Run
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 45
status: live
nav_group: Start
nav_order: 15
nav_label: Quick-Run check
nav:
  - sidebar
---

# Quick-Run

Ship a docs change? Run this in under 10 minutes. <a href="#run-it" data-primary-action>Run the Quick-Run</a> or <a href="../labs/link-drift" data-secondary-action>Open the Proof Run</a>.

## Trigger

- You edited or moved a Markdown file
- CI passed but a reviewer flagged a broken link, asset, or embed
- You need a receipt that the surface still works

## Prep

- `pnpm install` once per workstation
- Keep `rg` available for link search/replace

## Run it {#run-it}

1. **Open the edited page** and scan for obvious regressions (links, images, embeds).
2. **Run the automated check** that matches your change scope:
   - Single page → `pnpm run guard --filter <file>`
   - Multiple files → `pnpm run guard`
3. **Read the first failure**. Fix that path before addressing the rest; it usually cascades.
4. **Search for ghosts**. Use `rg broken-slug` to update every occurrence of the old link.
5. **Re-run the guard** until it exits 0.
6. **Capture a receipt** (terminal output or screenshot) and drop it in the PR or issue.

## Receipt

- Guard command exits 0
- PR or issue contains the receipt screenshot or log
- Reviewer can click the changed page without hitting errors

## Stop rule

If you spend more than 10 minutes chasing failures or the guard stays red after two fixes, stop and escalate: run the [Link drift Proof Run](../labs/link-drift) or open a `kl,question` issue with the failing slug.

## Related references

- [Link Integrity runbook](../runbooks/link-integrity.md) — Full remediation path when Quick-Run isn’t enough.
- [Fast support index](../fix/) — Interrupt flows for anything that blocks shipping.
- [Release receipts](../receipts/index) — Paste your Quick-Run evidence when logging a release.
