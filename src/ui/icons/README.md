# MDS Icon System

This directory contains the icon system for the MDS application.

## Current Status: Emoji Placeholders

The Icon component is currently using **emoji placeholders** until official MDS SVG icon assets are available. This provides:

- ✅ Consistent API across the application
- ✅ Type-safe icon names
- ✅ Standardized sizing and coloring
- ✅ Easy migration path to real icons

## Usage

```tsx
import { Icon } from '@ui'

// Basic usage
<Icon name="check" size="md" />

// With color
<Icon name="warning" size="md" color="warning" />

// With aria-label for accessibility
<Icon name="close" size="sm" aria-label="Close dialog" />

// In a badge
<Badge variant="success">
  <Icon name="check" size="sm" /> Success
</Badge>
```

## Available Icons

Current icon set (expand as needed):

- **Actions**: `check`, `close`, `plus`, `minus`, `edit`, `delete`, `upload`, `download`
- **Navigation**: `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`
- **Status**: `warning`, `info`, `error`
- **Content**: `document`, `email`, `calendar`, `text`, `number`, `boolean`, `currency`
- **UI**: `search`, `filter`, `user`

To add a new icon, update the `IconName` type and `ICON_EMOJI_MAP` in `Icon.tsx`.

## Sizes

- `xs`: 12px
- `sm`: 16px
- `md`: 24px (default)
- `lg`: 32px
- `xl`: 48px

## Colors

Semantic color options that map to MDS feedback colors:

- `default`: Grey (#707070)
- `primary`: Electric Blue
- `success`: Green
- `warning`: Yellow
- `danger`: Red
- `info`: Blue
- `disabled`: Light Grey

## Migration to Real SVG Icons

When MDS provides official SVG icons, follow these steps:

### Option A: SVG Sprite (Recommended)

1. **Place SVG sprite** in `public/icons/mds-icons.svg`

2. **Update Icon.tsx** to use SVG:

```tsx
export function Icon({ name, size = 'md', color = 'default', ... }: IconProps) {
  return (
    <svg
      className={`ui-Icon ui-Icon--${size} ui-Icon--${color}`}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      style={style}
    >
      <use href={`/icons/mds-icons.svg#${name}`} />
    </svg>
  )
}
```

3. **No application code changes needed** - all icon usage stays the same!

### Option B: Individual SVG Files

1. **Place SVG files** in `public/icons/mds/`
   ```
   public/icons/mds/
   ├── check.svg
   ├── close.svg
   ├── warning.svg
   └── ...
   ```

2. **Update Icon.tsx**:

```tsx
export function Icon({ name, size = 'md', color = 'default', ... }: IconProps) {
  return (
    <img
      src={`/icons/mds/${name}.svg`}
      alt={ariaLabel || ''}
      className={`ui-Icon ui-Icon--${size} ui-Icon--${color}`}
      style={style}
    />
  )
}
```

### Option C: React Components (If MDS provides them)

1. **Import individual icon components**

2. **Update Icon.tsx** to map names to components:

```tsx
import * as MdsIcons from '@mckinsey/mds-icons' // hypothetical package

const iconMap: Record<IconName, React.ComponentType> = {
  check: MdsIcons.Check,
  close: MdsIcons.Close,
  warning: MdsIcons.Warning,
  // ...
}

export function Icon({ name, size = 'md', ... }: IconProps) {
  const IconComponent = iconMap[name]
  return <IconComponent className={`ui-Icon--${size}`} />
}
```

## Design Tokens

Icon tokens are defined in `src/styles/mds/icon.tokens.css`:

- `--mds-icon-size-*`: Size values
- `--mds-icon-color-*`: Semantic colors

These tokens ensure consistency with the rest of the MDS design system.

## Accessibility

Always provide `aria-label` when icons are used without accompanying text:

```tsx
// ✅ GOOD - Icon with label
<button>
  <Icon name="close" size="sm" aria-label="Close dialog" />
</button>

// ✅ GOOD - Icon with visible text
<button>
  <Icon name="check" size="sm" />
  Save
</button>

// ❌ BAD - Icon without context
<button>
  <Icon name="close" size="sm" />
</button>
```

## Notes

- The Icon component uses `role="presentation"` by default (decorative)
- When `aria-label` is provided, role changes to `"img"` (meaningful)
- Colors use `currentColor` by default, inheriting from parent text color
- All sizes use CSS custom properties for consistency
