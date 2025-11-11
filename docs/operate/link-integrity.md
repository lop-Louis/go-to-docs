---
title: Link integrity runbook
band: A
owner: '@lop'
change_type: patch
refresh_after_days: 60
status: archived
nav_group: Operate
nav_order: 20
nav_label: Link Integrity
audience: Maintainers fixing broken links across docs
tone: 'Plainspoken, candid, energetic'
narrative_goal: 'Give a repeatable flow to detect, fix, and prove link health'
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Link integrity runbook

Keep every link contract intact so readers never hit a dead end. [Run the link check flow](#action) or [Open the Proof Run](../labs/link-drift).

## Trigger

- A PR or deploy changed paths, anchors, or filenames
- A teammate reports “this link doesn’t work” or lands on a 404
- Receipts or Lighthouse signal redirect chains or broken anchors

## Action

1. **Reproduce** — Click the failing link from the same surface (doc, nav, release note). Capture the exact URL and the referring page.
2. **Fix the source** — Update the Markdown link to the new canonical path. Prefer relative links (e.g., `../operate/runbooks-index.md`) so moves stay local.
3. **Update siblings** — Search the repo for the old slug (`rg old-path`) and update every reference in the same change.
4. **Validate locally** — Run `pnpm run links` or the lighter [Quick-Run](../navigate/quick-run) depending on scope. Screenshots go in the PR for receipts.
5. **Proof it** — If the change touched multiple directories, run the [Link drift Proof Run](../labs/link-drift) for a stronger receipt.

## Receipt

- Automated link check (`pnpm run links`, Quick-Run, or Proof Run) exits 0
- Screenshots or logs attached to the PR / issue
- Release manifest / State ledger entry updated when the public URL changed

## Stop rule

If the link checker fails twice or you uncover a structural navigation issue, stop and open a `kl,question` issue with the failing paths—don’t ship a half-fix.

## Guardrails

- Keep anchors (`#heading-name`) in sync with actual headings; rename the anchor when you edit the text.
- Avoid opaque URLs. Readers should know where they’ll land from the link text alone.
- External links need one-line context; internal links should prefer repo-relative paths over GitHub UI URLs.

## Related runs

- [Quick-Run](../navigate/quick-run) — fastest check when you touched a single file.
- [Fix-it-fast index](../support/) — when the link outage is blocking production work.
- [State ledger](../navigate/state-ledger.md) — confirm whether the fix landed in the latest release.
