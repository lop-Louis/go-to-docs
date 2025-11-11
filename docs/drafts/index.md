---
title: Drafts holding pen
band: A
owner: '@lop'
refresh_after_days: 30
change_type: patch
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-104
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-proof-or-private.md
date: '2025-11-11'
nav:
  - none
search: false
---

# Drafts holding pen

Work that fails the proof-or-private gate lands here. [Move risky pages into `/drafts/`](#how-to-park-a-draft) or [Restore them to public scope once receipts exist](#restore-to-public).
Exit metric: zero sanitization red-lines on public pages; blocked work stays private.

## How to park a draft

1. Move or create the markdown file under `docs/drafts/`.
2. Keep the required frontmatter fields so CI tracks ownership/metrics.
3. Leave `nav` unset (or `none`) so the page stays off sitemap and menus.
4. Link the active PR/issue so reviewers know when it can return to Band-A.

## Restore to public

1. Fix the opener pattern, frontmatter, CTA mapping, and sanitization issues.
2. Move the page back under `navigate/`, `operate/`, `learn/`, or `mitigate`.
3. Re-run `pnpm run docs:guard`; when green, update the PR with proof or receipts.

## Current gated pages

Auto-generated list: [gated work](./gated.generated.md). Anything on that list stays out of the sitemap until the opener pattern + frontmatter pass the guardrails.
