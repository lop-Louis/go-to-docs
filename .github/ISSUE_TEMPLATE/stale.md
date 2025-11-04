---
name: Stale Page Review
about: Review pages flagged as stale by automation
title: '📅 Stale Review: <page or batch>'
labels: stale, documentation
---

## Pages to Review

<!-- List from stale report or bot PR -->

- [ ] docs/example-page.md (Age: X days / Threshold: Y)

## Action Taken

For each page:
| Page | Decision | Notes |
|------|----------|-------|
| example.md | Updated / Extended / Archived | summary |

## Checklist

- [ ] Content still accurate OR updated
- [ ] Frontmatter `status` corrected (`live` / `archived`)
- [ ] `refresh_after_days` adjusted if stability changed
- [ ] Removed any drift (internal references, outdated ranges)

## If Archived

Use tombstone pattern:

```
> Archived (YYYY-MM-DD): Superseded by <new-page-link> or no longer relevant.
```

## Follow-ups

- Optional improvements:
- Potential new page ideas:

## Notes

<!-- Any context for next monthly governance review -->
