# Northbook

Guidance over to-do. Northbook is a public VitePress site for Band A principles, patterns, and decisions—guidance you can link without dumping chores.

**Live Site:** https://northbook.guide

---

## What’s in the repo?

- **Guidance (`/docs`)** — VitePress content for principles, patterns, and decision aids. Subfolders track how automation scopes linting (e.g., `start-here/`, `playbook/`, `runbooks/`).
- **Runbooks (`/runbooks`)** — Legacy home for operational checklists; new runbooks live under `docs/runbooks/` so they render on the public site.
- **Guardrails (`/scripts`)** — Automation that stops drift, broken links, and unsanitized content.

Every published page declares its navigation placement via the `nav` array in frontmatter (e.g., `['main','sidebar']` for top nav and sidebar entries, `['none']` for hidden pages). `.vitepress/navigation.generated.ts` is generated from that metadata via `pnpm run nav:sync`, so the docs themselves stay the source of truth.

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

<!-- scripts:start -->

| Command                     | Purpose                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| `pnpm run docs:dev`         | Start the VitePress dev server                                           |
| `pnpm run docs:build`       | Build the production site and verify CTA placement                       |
| `pnpm run docs:preview`     | Preview the production build locally                                     |
| `pnpm run docs:guard`       | Run frontmatter lint, guard, drift, and UX scans                         |
| `pnpm run nav:sync`         | Regenerate nav + sidebar from frontmatter metadata                       |
| `pnpm run frontmatter:lint` | Validate Band A frontmatter against the JSON schema                      |
| `pnpm run guard`            | Band A forbidden pattern scan                                            |
| `pnpm run drift`            | Advisory drift audit (storytelling, inclusive language, etc.)            |
| `pnpm run ux:scan`          | Verify CTA intro sentence includes both actions before the first section |
| `pnpm run links`            | Check internal and external links                                        |
| `pnpm run stale`            | Generate stale page report                                               |
| `pnpm run test`             | Run Node tests and component suite                                       |

<!-- scripts:end -->

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

- `docs/.vitepress/config.ts` — VitePress config + GA tag; imports the generated nav/sidebar.
- `docs/.vitepress/navigation.generated.ts` — Auto-generated from frontmatter `nav` metadata.
- `docs/index.md` — Homepage hero that sells “Guidance over to-do.”
- `docs/governance.md` — Anti-drift rules for public content.
- `scripts/guard.mjs` — Band A and anti-drift guard (read-only).
- `scripts/sync-navigation.mjs` — Generates the nav/sidebar file from frontmatter.
- `.github/workflows/pages.yml` — Deploys the site.
- `.github/workflows/guard.yml` — Runs guard on PRs.

---

Keep this list handy as you finish the remaining setup steps.
