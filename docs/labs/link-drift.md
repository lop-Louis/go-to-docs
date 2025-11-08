---
title: Link Drift · Proof Run
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: live
sidebar: false
---

Find the answer. Use it now. <a href="../ops/quick-run" data-primary-action>Run the Quick-Run</a> or <a href="../labs/link-drift" data-secondary-action>Open the Proof Run</a>.

## Goal

Ship a page without broken links in under 10 minutes.

## Steps

1. Build the docs

```bash
pnpm docs:build
```

Expect "Build complete."

2. Check links

```bash
node scripts/check-links.mjs
```

Expect "0 broken links."

## Pass/Fail

Pass if both commands exit 0 within 10 minutes. Otherwise fail, shrink scope, retry.
