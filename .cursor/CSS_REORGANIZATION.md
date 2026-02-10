# CSS File Reorganization Summary

**Date:** February 10, 2026

## What Was Done

All CSS files from the client-portal MDS source were successfully copied and reorganized into the proper locations within this project.

## File Structure

### Token Files (Design System Variables)
**Location:** `src/styles/mds/`

All token files define CSS variables (`:root { --mds-*: ... }`) that contain the core design values from Figma. These files are imported globally in `src/index.css`.

#### Core Tokens
- `colors.css` - Color palette
- `typography.css` - Font families, sizes, weights, line heights
- `elevation.css` - Shadows and z-index values
- `grid.css` - Breakpoints and grid system

#### Component Tokens (renamed to `.tokens.css`)
- `accordion.tokens.css`
- `alert.tokens.css`
- `avatar.tokens.css`
- `back-to-top.tokens.css`
- `badge.tokens.css`
- `breadcrumb.tokens.css`
- `button.tokens.css`
- `card.tokens.css`
- `checkbox.tokens.css`
- `code.tokens.css`
- `date-picker.tokens.css`
- `footer.tokens.css`
- `header.tokens.css`
- `hero.tokens.css`
- `input.tokens.css`
- `link.tokens.css`
- `loading.tokens.css`
- `modal.tokens.css`
- `nested-components.tokens.css`
- `numeric-input.tokens.css`
- `page-switcher.tokens.css`
- `pagination.tokens.css`
- `popup-menu.tokens.css`
- `progress-bar.tokens.css`
- `radio.tokens.css`
- `script-mark.tokens.css`
- `select.tokens.css`
- `table.tokens.css`
- `tabs.tokens.css`
- `tag.tokens.css`
- `textarea.tokens.css`
- `toast.tokens.css`
- `toggle.tokens.css`
- `tooltip.tokens.css`
- `vertical-navigation.tokens.css`

### Component Styles
**Location:** `src/ui/`

These files contain the actual CSS classes that style React components by consuming the tokens above.

- `button.css` - Styles for `Button.tsx`
- `badge-component.css` - Styles for `Badge.tsx`

## Import Strategy

All token files are imported once globally in `src/index.css`:

```css
/* Core Design Tokens */
@import './styles/mds/colors.css';
@import './styles/mds/typography.css';
@import './styles/mds/elevation.css';
@import './styles/mds/grid.css';

/* Component Tokens */
@import './styles/mds/accordion.tokens.css';
@import './styles/mds/alert.tokens.css';
/* ... all other component tokens ... */
```

Component-specific CSS files (in `src/ui/`) are imported individually by their respective React components.

## Benefits of This Structure

1. **Clear Separation**: Tokens (design system) vs. component styles (implementation)
2. **Single Source of Truth**: All design values come from token files
3. **Easy Updates**: When MDS tokens change in Figma, update only the token files
4. **Type Safety**: Component tokens are namespaced (e.g., `--mds-button-*`, `--mds-badge-*`)
5. **Scalability**: Adding new components requires adding both a token file and a component style file
6. **Consistency**: All components use the same token values, ensuring visual consistency

## Next Steps

When creating new UI components:
1. Check if a token file exists for that component in `src/styles/mds/`
2. Create the React component in `src/ui/ComponentName.tsx`
3. Create the component CSS in `src/ui/component-name.css`
4. Use `var(--mds-componentname-*)` tokens in the CSS
5. Export the component from `src/ui/index.ts`
