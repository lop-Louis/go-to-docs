# Northbook

Guidance over to-do. Northbook is a public VitePress site for Band A principles, patterns, and decisions—guidance you can link without dumping chores.

**Live Site:** https://northbook.guide

---

## What’s in the repo?

- **Guidance (`/docs`)** — VitePress content for principles, patterns, and decision aids.
- **Runbooks (`/runbooks`)** — Operational checklists and task sequences that stay off the site.
- **Guardrails (`/scripts`)** — Automation that stops drift, broken links, and unsanitized content.

Task checklists belong under `/runbooks`, not in the published site.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run docs:dev

# Build for production
pnpm run docs:build

# Preview production build
pnpm run docs:preview

# One-shot validation
pnpm run validate
```

---

## Operating Model

- ✅ Only publishes **Band A** content (sanitized, public-safe).
- 🔐 Guardrails catch forbidden patterns, unreviewed changes, and missing metadata.
- 📅 Release rhythm documented in `/docs/monthly-release.md`.
- 🔗 Runbooks stay separate, but you can link back from `/docs`.

See `docs/principles.md` and [GOVERNANCE](./GOVERNANCE.md) for fuller details.

---

## Contributing

### Before You Submit

1. Work through the [Sanitization Checklist](./docs/sanitization.md).
2. Confirm frontmatter is complete (see [Band A Guidelines](./docs/band-a.md)).
3. Test locally with `pnpm run docs:dev`.

### Helpful Scripts

| Command               | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `pnpm run guard`      | Band A compliance + anti-drift rules            |
| `pnpm run links`      | Internal and external link validation           |
| `pnpm run stale`      | Generates stale pages report                    |
| `pnpm run validate`   | Lint + type check + guard + build + links combo |
| `pnpm run docs:build` | Production build                                |

Automation catches most issues; reviewers focus on judgment calls.

---

## GitHub Setup Checklist

1. **Rename repo** to `Northbook` (`Settings → General`).
2. **GitHub Pages** → Source: GitHub Actions (already configured).
3. **Branch protection** on `main`:
   - Require pull requests + 1 approval.
   - Require status checks: `Guard`, `Deploy VitePress`.
   - Require linear history and dismiss stale approvals.
4. **Secrets (optional):** `VITE_GA_ID` for GA4 measurement.

---

## Key Files

- `docs/.vitepress/config.ts` — VitePress config + GA tag.
- `docs/index.md` — Homepage hero that sells “Guidance over to-do.”
- `docs/principles.md` — Canonical principles and brand micro-rules.
- `scripts/guard.mjs` — Band A and anti-drift guard.
- `.github/workflows/pages.yml` — Deploys the site.
- `.github/workflows/guard.yml` — Runs guard on PRs.

---

Keep this list handy as you finish the remaining setup steps.
