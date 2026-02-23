---
name: mds-layout-patterns
description: Applies MDS layout patterns for dashboard backgrounds, banner/dashboard title sizing, tab-content spacing, and button spacing. Use when editing page/layout CSS, dashboard headers, section headers with actions, or tabbed page structure.
---

# MDS Layout Patterns

## Use This Skill For

- Dashboard or page shell layout work
- Header/title/subtitle sizing and alignment
- Tab navigation spacing and section spacing
- Button group spacing around tables/cards/forms

## Required Patterns

### 1) Banner and Dashboard Title Sizing

- App/banner name: `1.5em`
- Dashboard page title: `2em`
- Dashboard subtitle: `1.2em`
- Full-width widget title: `1.4em`

If title is centered, subtitle must also be centered. If title is left-aligned, subtitle must also be left-aligned.

### 2) Dashboard Background With White Elevated Cards

When the page contains elevated white cards/panels, set:

```css
.dashboard {
  background: var(--mds-color-background-subtle);
}
```

Do not force this background on flat table pages with no elevated card/panel structure.

### 3) Button Spacing

- Section header above content: `margin-bottom: 1.5rem` minimum
- Horizontal button groups: `gap: 0.75rem` to `1rem`
- Table action buttons: use `margin-right: 0.5rem` with `:last-child` reset

### 4) Tab Navigation and Content Spacing

- Tab bar must have spacing below (`1.5rem` minimum, `2rem` preferred)
- Tab content should not be flush to tab bar (`margin-top: 1.5rem` when needed)
- Active indicator belongs on active tab only, never full-width container border

## Fast Checklist

- [ ] Title/subtitle sizes and alignment match standards
- [ ] Elevated-card dashboards use subtle page background
- [ ] Buttons are not flush with surrounding content
- [ ] Tabs have breathing room before content
- [ ] Active tab indicator is scoped to active tab only
