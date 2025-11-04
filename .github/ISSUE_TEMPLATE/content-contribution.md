---
name: Content Contribution
about: Submit new documentation or update existing content
title: '[CONTENT] '
labels: documentation
---

## Content Type

- [ ] New page
- [ ] Update existing page
- [ ] Fix/correction
- [ ] Other: **\_**

## Sanitization Checklist

Before submitting, verify all items:

### Public Safety

- [ ] No internal names (company, product, vendor)
- [ ] No internal URLs or screenshots
- [ ] No ticket IDs (JIRA-1234, etc.)
- [ ] No exact numbers (converted to ranges or percentages)
- [ ] No calendar dates (use relative time)
- [ ] No personal data (names, emails, phone numbers)

### Code Samples

- [ ] Code is original work or properly attributed
- [ ] No API keys, tokens, passwords, or secrets
- [ ] License noted if adapted from external sources

### Frontmatter (Required)

- [ ] `title` set
- [ ] `band: A` confirmed
- [ ] `owner` assigned (your GitHub handle with @)
- [ ] `refresh_after_days` set (typically 60-90)
- [ ] `change_type` set (patch/minor/major)
- [ ] `status` set (usually 'live')

### Change Size

- [ ] **Patch** (≤ 20 lines): Typos, small clarifications
- [ ] **Minor** (≤ 120 lines): New section, substantial edits
- [ ] **Major** (> 120 lines): New page, major restructure

### Testing

- [ ] Previewed locally with `npm run docs:dev`
- [ ] Ran content guard with `npm run guard`
- [ ] Links are valid and accessible

## Context

**What does this change/add?**

**Why is this needed?**

**How does it help the team?**

## Additional Notes

<!-- Any other information reviewers should know -->
