---
title: Keep links from breaking
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: live
---

> Find the answer. Use it now.  
> [Run the Quick-Run](/ops/quick-run) · [Open the Proof Run](/labs/link-drift)
> <a href="/ops/quick-run" data-primary-action>Run the Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Open the Proof Run</a>.

## What this helps you do

Prevent and fix broken links so readers don't hit dead ends.

## When to use it

- Build passes but pages show dead links
- You moved or renamed files and aren't sure what broke
- A colleague reports "this link doesn't work"

## How it works

- Treat links as contracts. When a path changes, update every reference.
- Prefer descriptive markdown links over raw URLs so intent is clear.
- Keep external links minimal; add alt text and a short description.
- Validate links on every change with a fast script before you merge.

## Try it

- Quick fix -> [/ops/quick-run](/ops/quick-run)
- Prove it works -> [/labs/link-drift](/labs/link-drift)

## Common mistakes

- Linking to file explorer URLs -> replace with relative doc links
- Long redirect chains -> link to the final destination
- Dead anchors -> verify headings exist before publishing

## Related (ChronoLink)

- Next: [Fixing content drift quickly](/ops/quick-run) · 2025-11
- Receipt: [/receipts/#2025-11](/receipts/#2025-11)
