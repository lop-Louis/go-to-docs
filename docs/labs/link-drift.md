---
title: Link Drift · Proof Run
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: live
sidebar: false
---

Find the answer. Use it now. [Run the Quick-Run](../navigate/quick-run) or [Open the Proof Run](../labs/link-drift).

## Goal

Ship a page without broken links in under 10 minutes.

## Steps

1. Build the docs

```bash
pnpm docs:build
```

Expect "Build complete."

2. Check links — already covered by the markdown lint + CTA guardrail. If you need extra assurance, run `pnpm run lint:md` (same command Quick-Run already calls).

## Pass/Fail

Pass if both commands exit 0 within 10 minutes. Otherwise fail, shrink scope, retry.
