---
name: mds-vanilla-components
description: Implements MDS component styling patterns in pure HTML/CSS/JavaScript, including tabs, badges, tables, spacing, and progress bars using token files directly.
---

# MDS Vanilla Components

## Scope

Use when building component behavior and styles in vanilla HTML/CSS/JS.

Do not use TSX/React props like `badgeStyle`. Express decisions with CSS classes instead.

## Tabs (Vanilla)

Use `--mds-tabs-*` tokens and active-tab-only indicator.

```html
<nav class="tabs" role="tablist">
  <button class="tabs__tab tabs__tab--active" role="tab">Upload</button>
  <button class="tabs__tab" role="tab">Preview</button>
</nav>
```

```css
.tabs {
  display: flex;
  gap: var(--mds-tabs-gap);
  margin-bottom: 2rem;
}

.tabs__tab {
  padding: var(--mds-tabs-padding-y) var(--mds-tabs-padding-x);
  color: var(--mds-tabs-text-default);
  border: none;
  border-bottom: var(--mds-tabs-indicator-height) solid transparent;
}

.tabs__tab--active {
  color: var(--mds-tabs-text-active);
  border-bottom-color: var(--mds-tabs-indicator-color);
}
```

## Progress Bars (Vanilla)

Use `--mds-progress-bar-*` tokens and square corners.

```html
<div class="progress">
  <div class="progress__fill" style="width:48%"></div>
</div>
```

```css
.progress {
  height: var(--mds-progress-bar-height-8px);
  background: var(--mds-progress-bar-track);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--mds-progress-bar-fill);
}
```

## Table + Badge + Actions (Vanilla)

- Keep table semantics.
- If row contains status badge + actions, use outlined badge class.

```html
<tr>
  <td>Project Alpha</td>
  <td><span class="badge badge--outlined badge--success">Active</span></td>
  <td class="table-actions">
    <button class="btn btn--tertiary btn--sm">View</button>
    <button class="btn btn--tertiary btn--sm">Edit</button>
  </td>
</tr>
```

```css
.table-actions { white-space: nowrap; }
.table-actions .btn { margin-right: 0.5rem; }
.table-actions .btn:last-child { margin-right: 0; }
```

## Header Spacing and Alignment

- Section headers above content: `margin-bottom: 1.5rem` minimum
- Badge next to heading: match heading font-size
- Title/subtitle alignment must match (left/left or center/center)

## Quick Checklist

- [ ] Only token-backed values where available
- [ ] No React-specific API references
- [ ] Active tab indicator only on active tab
- [ ] Progress bars have no border radius
- [ ] Table actions use inline flow and margin spacing
