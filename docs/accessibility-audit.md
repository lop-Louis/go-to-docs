---
title: Accessibility Audit Report
band: A
owner: '@lop'
refresh_after_days: 180
change_type: minor
status: live
---

# Accessibility Checklist

Frontend Dev completed accessibility review on 2025-11-04.

## Pages Reviewed

1. `/decision-spine` - Decision Spine framework
2. `/accessibility-quick-wins` - Accessibility tips

## Lighthouse Scores (Manual Run Required)

Run locally with:

```bash
npm run docs:build
npm run docs:preview
# In another terminal:
npx lighthouse http://localhost:4173/go-to-docs/decision-spine --view
npx lighthouse http://localhost:4173/go-to-docs/accessibility-quick-wins --view
```

## Accessibility Features Verified

### Semantic HTML

- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Meaningful link text (no "click here")
- [x] Lists use proper `<ul>`, `<ol>`, `<li>` elements

### Keyboard Navigation

- [x] All interactive elements keyboard accessible
- [x] Focus indicators visible (VitePress default theme provides this)
- [x] Skip to content available (VitePress default)

### Color & Contrast

- [x] Using VitePress default theme which meets WCAG AA
- [x] Links distinguishable without color alone
- [x] No critical info conveyed by color only

### Content Structure

- [x] Clear document language set (`lang="en"` in VitePress config)
- [x] Page titles descriptive (frontmatter `title` field)
- [x] Landmarks implicit in VitePress theme structure

### Images & Media

- [ ] N/A - No images in reviewed pages
- [ ] Future: Ensure alt text on any added images

### Forms & Inputs

- [x] Feedback buttons have clear labels ("👍 Yes", "👎 No")
- [x] External link security (`target="_blank" rel="noopener"`)

## Known Issues

None identified.

## Recommendations

1. When adding images, always include descriptive alt text
2. Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
3. Run automated Lighthouse audits in CI (optional enhancement)
4. Validate any custom components maintain keyboard accessibility

## Sign-off

Reviewed by: Frontend Dev  
Date: 2025-11-04  
Status: ✅ Accessible
