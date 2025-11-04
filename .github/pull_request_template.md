## Content Sanitization

Before submitting, verify all items below:

### Public Safety ✅

- [ ] No internal names (company, product, vendor)
- [ ] No internal URLs, screenshots, or system references
- [ ] No ticket IDs (JIRA-1234, Linear-ABC, etc.)
- [ ] No exact numbers (use ranges: "10-20 users" or percentages: "~15% increase")
- [ ] No calendar dates (use relative: "within 3 months" vs "Q2 2024")
- [ ] No personal data (names, emails, identifying details)

### Code Samples 💻

- [ ] Code is original or properly licensed
- [ ] Attribution included if adapted from external sources
- [ ] No API keys, tokens, passwords, or connection strings

### Required Frontmatter 📋

Every markdown file must have:

```yaml
---
title: Page Title
band: A
owner: 'company-initials'
refresh_after_days: 90
change_type: patch | minor | major
status: live
---
```

### Change Size 📏

Check the appropriate size:

- [ ] **patch** (≤ 20 lines) - Typos, small clarifications
- [ ] **minor** (≤ 120 lines) - New section, substantial edits
- [ ] **major** (> 120 lines) - New page, major restructure

### Testing 🧪

- [ ] Previewed locally: `npm run docs:dev`
- [ ] Passed content guard: `npm run guard`
- [ ] Links are valid and accessible

## What's Changed

<!-- Brief description of your changes -->

## Context

<!-- Why is this change needed? How does it help? -->

---

**CI will automatically:**

- ✅ **Green**: Auto-merge if all checks pass
- ⚠️ **Yellow**: Request review for warnings
- ❌ **Red**: Block merge until issues are fixed

See [Sanitization Checklist](../docs/sanitization.md) for detailed guidance.
