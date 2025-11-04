# Contributor Guide

## Welcome!

Thank you for contributing to Go-To Docs. This guide helps you get started.

---

## Before You Start

1. Read [Band A Guidelines](./docs/band-a.md)
2. Review [Sanitization Checklist](./docs/sanitization.md)
3. Check [GOVERNANCE.md](./GOVERNANCE.md) for policies

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

4. **Wait for CI:**
   - ✅ Green: Auto-merges
   - ⚠️ Yellow: Needs review
   - 🛑 Red: Fix issues

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

- All checks pass
- No warnings
- Valid Band A content

### Yellow PRs (Review Required)

- Large changes for declared `change_type`
- Possible internal references detected
- Broken external links

### Red PRs (Blocked)

- Missing frontmatter
- Invalid band value
- Secret scan fails
- Build fails

---

## Getting Help

- **Content questions:** Ask page owner (see frontmatter)
- **Technical issues:** Open issue with `help wanted` label
- **Security concerns:** Use security incident template
- **General:** Comment on PR or issue

---

## Thank You! 🙏

Your contributions make this resource better for everyone.
