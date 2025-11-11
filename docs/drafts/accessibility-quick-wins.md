---
title: Accessibility Quick Wins
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
audience: Designers and engineers shipping customer-facing UI
tone: 'Plainspoken, candid, energetic'
narrative_goal: Give the fastest accessibility fixes that raise baseline quality
nav_group: Operate
nav_order: 30
nav_label: Accessibility quick wins
nav:
  - none
search: false
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# Accessibility Quick Wins

These quick wins catch the bulk of accessibility bugs before you ship. [Run the quick checks](#keyboard-navigation) or [Browse the runbooks index](./index).

## Keyboard navigation

✅ **Add tab index and focus styles**

```css
button:focus,
a:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

✅ **Test without mouse**: Can you reach every interactive element with Tab/Shift+Tab?

## Semantic HTML

✅ **Use proper elements**

```html
<!-- ❌ Don't -->
<div onclick="submit()">Submit</div>

<!-- ✅ Do -->
<button type="submit">Submit</button>
```

✅ **Structure headings**: h1 → h2 → h3 (no skipping levels)

## Color contrast

✅ **Minimum ratios** (WCAG AA):

- Text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

✅ **Tools**: Use browser DevTools contrast checker or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/?utm_source=northbook)

## Alt text

✅ **Descriptive for content images**

```html
<img src="chart.png" alt="Bar chart showing 40% increase in response time" />
```

✅ **Empty for decorative images**

```html
<img src="decorative-line.png" alt="" />
```

## ARIA labels

✅ **Label interactive elements without visible text**

```html
<button aria-label="Close dialog">
  <svg><!-- X icon --></svg>
</button>
```

✅ **Announce dynamic changes**

```html
<div role="alert" aria-live="polite">Form submitted successfully</div>
```

## Form labels

✅ **Associate labels with inputs**

```html
<label for="email">Email address</label> <input id="email" type="email" required />
```

✅ **Show error messages clearly**

```html
<input aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" role="alert">Please enter a valid email</span>
```

## Testing checklist

- ✅ Navigate entire site with keyboard only
- ✅ Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac/iOS)
- ✅ Check contrast in DevTools
- ✅ Run Lighthouse accessibility audit
- ✅ Validate HTML structure
- ✅ Test at 200% zoom (text should reflow without horizontal scroll)

## Common pitfalls

- ❌ Clickable divs instead of buttons
- ❌ Placeholder text as label replacement
- ❌ Low contrast gray text for "subtle" UI
- ❌ Auto-playing media without controls
- ❌ Forgetting to update docs when new components ship (sync with [Accessibility audit runbook](./accessibility-audit.md))

## Related references

- [Accessibility audit runbook](./accessibility-audit) — Quarterly deep dive that proves these wins are in place.
- [Wayfinding shortcuts](../navigate/find) — Share this when teammates need quick access to the relevant runbook or guide.
- ❌ Time-limited actions without extensions

## Resources

- [WebAIM Articles](https://webaim.org/articles/?utm_source=northbook)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/?utm_source=northbook)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/?utm_source=northbook)
