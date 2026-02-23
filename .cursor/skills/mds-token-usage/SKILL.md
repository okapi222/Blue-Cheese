---
name: mds-token-usage
description: Enforces component-specific MDS token usage for tabs and progress bars. Use when styling tabs, tab navigation, progress bars, or converting hard-coded/generic CSS values to MDS component tokens.
---

# MDS Token Usage (Tabs + Progress Bars)

## Use This Skill For

- `Tabs` and `TabNav` styling work
- Progress bar styling in pages/cards/tables/modals
- Refactors from generic tokens to component tokens

## Tabs Rules

Always use `--mds-tabs-*` tokens when available:

- Typography: `--mds-tabs-font-*`
- Colors: `--mds-tabs-text-*`, `--mds-tabs-background-*`
- Spacing: `--mds-tabs-padding-*`, `--mds-tabs-gap`
- Indicator: `--mds-tabs-indicator-*`
- Transition: `--mds-tabs-transition-*`

Do not use hard-coded values or generic color/spacing tokens when tab tokens exist.

## Progress Bar Rules

Always use `--mds-progress-bar-*` tokens:

- Heights: `--mds-progress-bar-height-2px|4px|8px`
- Track: `--mds-progress-bar-track`
- Fill: `--mds-progress-bar-fill`
- Label text: `--mds-progress-bar-text`, `--mds-progress-bar-text-muted`
- Gap: `--mds-progress-bar-gap`

Critical: progress bars have no border-radius token. Use square/flat corners.

## Good Pattern

```css
.progress-bar {
  height: var(--mds-progress-bar-height-4px);
  background: var(--mds-progress-bar-track);
  overflow: hidden;
}

.progress-fill {
  background: var(--mds-progress-bar-fill);
}
```

## Fast Checklist

- [ ] Tabs use only tabs tokens where available
- [ ] Progress bars use progress-bar tokens
- [ ] No hard-coded indicator, spacing, or bar sizes
- [ ] No border-radius on progress bars
