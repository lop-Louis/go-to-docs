# Contributor Guide

## Welcome!

Thank you for contributing to Go-To Docs. This guide helps you get started.

---

## Before You Start

1. Read [Band A Guidelines](./docs/band-a.md)
2. Review [Sanitization Checklist](./docs/sanitization.md)
3. Check [Governance Policy](./docs/governance.md) for policies
4. Understand [common pitfalls](#common-band-a-pitfalls) below

---

## Local Development

```bash
# Clone repo
git clone https://github.com/lop-Louis/go-to-docs.git
cd go-to-docs

# Install dependencies
npm install

# Start dev server
npm run docs:dev
```

Visit http://localhost:5173

---

## Creating a Page

1. Create new file in `docs/` (e.g., `docs/my-practice.md`)

2. Add required frontmatter:

```yaml
---
title: My Practice
band: A
owner: '@your-github-handle'
refresh_after_days: 90
change_type: patch
status: live
---
```

3. Write content (Band A only!)

4. Test locally:

```bash
npm run guard        # Check compliance
npm run docs:dev     # Preview
```

---

## Submitting a PR

1. **Create branch:**

   ```bash
   git checkout -b feature/my-practice
   ```

2. **Make changes and commit:**

   ```bash
   git add docs/my-practice.md
   git commit -m "docs: add my practice guide"
   ```

3. **Push and open PR:**

   ```bash
   git push origin feature/my-practice
   ```

4. **Wait for automated checks:**

   The PR will receive a comprehensive automated summary covering:
   - ✅ Frontmatter validation
   - ✅ Band A compliance (Content Guard)
   - ✅ Link validation (internal + external)
   - ✅ Build test
   - ✅ Component tests
   - ✅ Performance audit (Lighthouse CI)
   - ✅ Secret scan

5. **Check PR status:**
   - 🟢 **Green:** All checks passed, ready for auto-merge
   - 🟡 **Yellow:** Warnings detected, needs human review
   - � **Red:** Blocking issues, must fix before merge

6. **Choose appropriate change_type:**
   - `patch`: < 50 lines, typos/clarifications
   - `minor`: 50-250 lines, new sections, moderate changes
   - `major`: > 250 lines, new pages, major restructuring

---

## Common Band A Pitfalls

Understanding what **not** to publish is crucial. Here are real-world examples:

### ❌ Accidental Internal References

**Bad:**

```markdown
Check the team wiki at http://wiki.internal.company.com/docs
File a ticket in JIRA-PROJ-1234 for access
Contact Alice (alice.smith@company.com) for approval
```

**Good:**

```markdown
Check the team's internal documentation
File a ticket using TICKET-ID for access
Contact the team owner for approval
```

### ❌ Over-Specific Metrics

**Bad:**

```markdown
Our API handles exactly 1,247 requests per second
Team velocity: 23 story points per sprint
Database contains 4,892,331 user records
```

**Good:**

```markdown
Our API handles ~1,200-1,300 requests per second
Team velocity: ~20-25 story points per sprint
Database contains millions of user records
```

### ❌ Temporal Specificity

**Bad:**

```markdown
Feature launched on March 15, 2024
Next review scheduled for Q2 2025
Deploy every Tuesday at 2 PM
```

**Good:**

```markdown
Feature launched in early 2024
Next review scheduled quarterly
Deploy weekly during business hours
```

### ❌ Organizational Details

**Bad:**

```markdown
The Phoenix project (budget: $2.3M) reports to Jane Smith
Our 23-person Seattle team uses Datadog APM
Contract with AWS expires December 2025
```

**Good:**

```markdown
The project reports to senior leadership
A mid-sized team uses application performance monitoring
Infrastructure hosted on cloud provider
```

### ✅ Band A Safe Patterns

**Describing Processes:**

```markdown
## Code Review Process

1. Developer creates pull request
2. Automated checks run (linting, tests, security scans)
3. Reviewer provides feedback within 1-2 business days
4. Author addresses comments
5. Merge after approval and passing checks
```

**Sharing Generic Metrics:**

```markdown
## Performance Targets

- API response time: < 500ms (p95)
- Page load time: < 3 seconds
- Test coverage: > 80%
- Build time: < 10 minutes
```

**Generic Role Descriptions:**

```markdown
## Tech Lead Responsibilities

- Code review and architecture guidance
- Mentoring junior engineers (~2-3 direct reports)
- Sprint planning and backlog refinement
- Technical debt management
- Incident response coordination
```

### Sanitization Quick Reference

Before submitting a PR, search your content for:

```bash
# Search for common violations
grep -i "jira\|confluence\|slack\|wiki" docs/your-file.md
grep -E "https?://internal|\.corp\.|\.local" docs/your-file.md
grep -E "\b[A-Z]+-[0-9]+" docs/your-file.md  # Ticket IDs
grep -E "\b20[0-9]{2}-[0-9]{2}-[0-9]{2}\b" docs/your-file.md  # Calendar dates
```

If any matches appear, sanitize them using the patterns above.

---

## Common Issues

### Guard Fails with "Missing Frontmatter"

Add all required fields:

```yaml
---
title: Required
band: A
owner: '@required'
refresh_after_days: 90
change_type: patch
status: live
---
```

### Guard Fails with "Band Not Allowed"

Ensure `band: A` (exactly, capital A).

### "Possible Internal Reference"

Remove:

- Internal URLs (intranet, corp domains)
- Ticket IDs (JIRA-1234)
- Company/product names
- Exact numbers (use ranges)

### Build Fails

Check for:

- Broken links in markdown
- Invalid Vue syntax in frontmatter
- Missing images

---

## Code Style

### Markdown

- Use ATX headers (`# Title`, `## Section`)
- Code blocks with language tags
- Links to other docs as relative paths

### Frontmatter

- YAML format
- Lowercase keys
- Quoted strings for special chars

---

## Review Process

### Green PRs (Auto-merge)

- All checks pass ✅
- No warnings
- Valid Band A content
- Appropriate `change_type` for scope

**Timeline:** Auto-merges after final check passes (typically < 5 minutes)

### Yellow PRs (Review Required)

- Large changes for declared `change_type` ⚠️
- Possible internal references detected
- Broken external links (internal links must pass)
- Heuristic warnings requiring human judgment

**Timeline:** Maintainer review within 1-2 business days

**Common Yellow Triggers:**

- Content includes patterns like "Q1", "Q2" (quarters may need review)
- Large content delta doesn't match declared change_type
- External links return non-200 status codes
- Placeholder patterns detected (verify they're intentional)

### Red PRs (Blocked)

- Missing required frontmatter ❌
- Invalid `band` value (must be `A`)
- Secret scan fails (credentials, API keys detected)
- Build fails (broken internal links, syntax errors)
- Content Guard red violations

**Timeline:** Must be fixed by author before any review

**How to Fix:**

1. Check the automated PR comment for specific issues
2. Fix all red violations locally
3. Run `pnpm run guard` and `pnpm run docs:build` to verify
4. Push fixes to trigger re-check

---

## Quarterly Content Review

Every quarter, page owners should:

1. **Review your pages:** Check `owner: '@your-handle'` in frontmatter
2. **Update content:** Ensure accuracy and relevance
3. **Verify Band A compliance:** No internal references crept in
4. **Test links:** Internal and external link validity
5. **Update `last_reviewed`:** Set to current date
6. **Adjust `refresh_after_days`:** Based on content stability

**Q1 Target (Jan-Mar):** Review all pages > 90 days old  
**Q2 Target (Apr-Jun):** Review high-traffic pages  
**Q3 Target (Jul-Sep):** Review pages with accumulated warnings  
**Q4 Target (Oct-Dec):** Year-end comprehensive audit

See [Governance Policy](./docs/governance.md) for detailed quarterly review process.

---

## Getting Help

- **Content questions:** Ask page owner (see frontmatter)
- **Technical issues:** Open issue with `help wanted` label
- **Security concerns:** Use security incident template
- **General:** Comment on PR or issue

---

## Thank You! 🙏

Your contributions make this resource better for everyone.
