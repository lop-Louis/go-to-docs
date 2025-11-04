---
title: Sanitization Checklist
band: A
owner: '@lop'
refresh_after_days: 60
change_type: patch
status: live
---

# Sanitization Checklist

Use this checklist before submitting any PR to ensure content is public-safe.

## Pre-flight checks

- [ ] **No internal names**: Replace company, product, or vendor names with generic terms
- [ ] **No URLs**: Remove links to internal systems (intranet, internal tools, corp domains)
- [ ] **No screenshots**: If needed, redact or recreate with dummy data
- [ ] **No ticket IDs**: Strip patterns like `JIRA-####`, `ABC-####` (replace with `TICKET-ID` if educational)
- [ ] **No exact numbers**: Convert to ranges ("10-20 users") or percentages ("~15% increase")
- [ ] **No calendar dates**: Use relative time ("Q2 2024" → "within 3 months")
- [ ] **No personal data**: Remove names, emails, phone numbers, or identifying details

## Code samples

- [ ] **Original work**: Code you wrote or public examples
- [ ] **License noted**: If adapted, include attribution in comments
- [ ] **No secrets**: No API keys, tokens, passwords, or connection strings

## Frontmatter required

Every page must have:

```yaml
---
title: Page Title
band: A
owner: '@handle'
refresh_after_days: 60 # adjust for volatility (60–120 typical)
change_type: patch | minor | major
status: live | stale | archived | draft
---
```

## Change size guidelines

| Declared | Suggested Scope                    | Typical Line Delta | Examples                    |
| -------- | ---------------------------------- | ------------------ | --------------------------- |
| patch    | Minor clarity, typo, 1–2 sentences | ≤ 50               | Fix wording, add link       |
| minor    | New subsection, moderate rewrite   | ≤ 250              | Add facilitation pattern    |
| major    | New page or large restructure      | > 250              | Introduce new practice page |

## Testing locally

Run before submitting:

```bash
npm run docs:dev      # Preview site locally
npm run guard         # Static hygiene / Band A checks
npm run docs:build    # Ensure production build succeeds
```

## What happens next

1. CI runs content guard, link checker, and secret scanner
2. **Green**: Auto-merged within 1 minute
3. **Yellow**: Review recommended (non-blocking warnings)
4. **Red**: Blocked until fixed (policy / leak risk)

See GOVERNANCE.md (repository root) for policy, stop rules, and SLOs.

## Final Self-check Before PR

- Grep for sensitive words you removed: `grep -Ei "(secret|password|internal)" -R docs/` → should return nothing relevant
- Run guard: `npm run guard` → no red failures
- Build passes: `npm run docs:build`
- Frontmatter fields complete and accurate
- Optional: run link check locally if you changed many URLs

## Educational Placeholder Conventions

Use the following placeholders when teaching patterns:

| Placeholder    | Meaning                                |
| -------------- | -------------------------------------- |
| `TICKET-ID`    | Internal tracker reference omitted     |
| `INTERNAL-URL` | Non-public link removed                |
| `REDACTED`     | Sensitive detail intentionally removed |
| `@handle`      | Any valid GitHub username              |
