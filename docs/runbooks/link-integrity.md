---
title: Link integrity runbook
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: live
nav_group: Runbooks
nav_order: 20
nav_label: Link Integrity
audience: Maintainers fixing broken links across docs
tone: Plainspoken, candid, energetic
narrative_goal: Give a repeatable flow to detect, fix, and prove link health
nav:
  - sidebar
---

# Link integrity runbook

Keep every link contract intact so readers never hit a dead end. <a href="#action" data-primary-action>Run the link check flow</a> or <a href="../labs/link-drift" data-secondary-action>Open the Proof Run</a>.

## Trigger

- A PR or deploy changed paths, anchors, or filenames
- A teammate reports “this link doesn’t work” or lands on a 404
- Receipts or Lighthouse signal redirect chains or broken anchors

## Action {#action}

1. **Reproduce** — Click the failing link from the same surface (doc, nav, release note). Capture the exact URL and the referring page.
2. **Fix the source** — Update the Markdown link to the new canonical path. Prefer relative links (e.g., `../runbooks/index.md`) so moves stay local.
3. **Update siblings** — Search the repo for the old slug (`rg old-path`) and update every reference in the same change.
4. **Validate locally** — Run `pnpm run links` or the lighter [Quick-Run](../ops/quick-run) depending on scope. Screenshots go in the PR for receipts.
5. **Proof it** — If the change touched multiple directories, run the [Link drift Proof Run](../labs/link-drift) for a stronger receipt.

## Receipt

- Automated link check (`pnpm run links`, Quick-Run, or Proof Run) exits 0
- Screenshots or logs attached to the PR / issue
- Release note or changelog updated when the public URL changed

## Stop rule

If the link checker fails twice or you uncover a structural navigation issue, stop and open a `kl,question` issue with the failing paths—don’t ship a half-fix.

## Guardrails

- Keep anchors (`#heading-name`) in sync with actual headings; rename the anchor when you edit the text.
- Avoid opaque URLs. Readers should know where they’ll land from the link text alone.
- External links need one-line context; internal links should prefer repo-relative paths over GitHub UI URLs.

## Related runs

- [Quick-Run](../ops/quick-run) — fastest check when you touched a single file.
- [Fix-it-fast index](../fix/) — when the link outage is blocking production work.
- [Receipts](../receipts/index) — confirm whether the fix landed in the latest release.
