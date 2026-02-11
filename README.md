# Blue Cheese - MDS Design System Application

A React application built with the McKinsey Design System (MDS), structured for consistency, maintainability, and future integration with the official MDS NPM package.

## Table of Contents

- [Overview](#overview)
- [Design System Architecture](#design-system-architecture)
- [Design Tokens](#design-tokens)
- [UI Components](#ui-components)
- [Cursor Rules](#cursor-rules)
- [File Hierarchy](#file-hierarchy)
- [Development Workflow](#development-workflow)
- [Adding New Components](#adding-new-components)

---

## Overview

This project follows a **facade pattern** that allows application code to import UI components from a single source (`@ui`) while keeping the underlying implementation flexible. This architecture ensures:

- **Consistent MDS usage** across all application code
- **Easy migration** to the official MDS NPM package when available
- **Enforced design standards** through Cursor AI rules
- **Type-safe component usage** with TypeScript

### Key Principles

1. **Application code never uses raw HTML controls** (no `<button>`, `<input>`, `<select>`, etc.)
2. **All UI components are imported from `@ui`** (e.g., `import { Button } from '@ui'`)
3. **Design tokens provide single source of truth** for all visual properties
4. **Cursor rules enforce design standards** automatically during development

---

## Design System Architecture

### The `@ui` Facade

The `@ui` alias is the central abstraction layer for all UI components.

```tsx
// ✅ GOOD - Use @ui alias
import { Button, Badge, Input } from '@ui'

// ❌ BAD - Never use raw HTML controls
<button>Click me</button>
```

#### How It Works

1. **Alias Configuration**
   - Vite: `vite.config.ts` maps `@ui` → `./src/ui`
   - TypeScript: `tsconfig.app.json` provides type resolution

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
  },
}

// tsconfig.app.json
"paths": {
  "@ui": ["src/ui/index.ts"],
  "@ui/*": ["src/ui/*"]
}
```

2. **Central Export**
   - All components are re-exported from `src/ui/index.ts`
   - Application code only imports from this single entry point

3. **Future-Proof Design**
   - When the official MDS package is available, only `src/ui/` needs updating
   - Application code remains unchanged

---

## Design Tokens

Design tokens are CSS custom properties (variables) that define all visual design decisions. They provide a single source of truth for colors, typography, spacing, shadows, and component-specific properties.

### Location

```
src/styles/mds/
├── colors.css              # Color palette and semantic colors
├── typography.css          # Font families, sizes, weights, line heights
├── elevation.css           # Shadow and elevation values
├── grid.css               # Layout grid and spacing
└── *.tokens.css           # Component-specific tokens
```

### Token Types

#### 1. Core Tokens

**`colors.css`** - Color system with semantic naming

```css
:root {
  /* Brand Colors */
  --mds-color-electric-blue-500: #2251FF;
  --mds-color-marine-green-500: #007C93;
  
  /* Semantic Colors */
  --mds-color-text-headings: #000000;
  --mds-color-text-body: #333333;
  --mds-color-border-default: #CCCCCC;
  
  /* Feedback Colors */
  --mds-color-feedback-success: #117E1A;
  --mds-color-feedback-danger: #CD3030;
  --mds-color-feedback-warning: #FFD048;
}
```

**`typography.css`** - Font system

```css
:root {
  /* Font Families */
  --mds-font-display: 'Bower', serif;        /* Display text only */
  --mds-font-body: 'McKinsey Sans', sans-serif;  /* All other text */
  
  /* Font Sizes */
  --mds-font-size-display-1: 6rem;   /* 96px */
  --mds-font-size-heading-1: 4rem;   /* 64px */
  --mds-font-size-body: 1rem;        /* 16px */
  
  /* Font Weights */
  --mds-font-weight-regular: 400;
  --mds-font-weight-medium: 500;
  --mds-font-weight-bold: 700;
}
```

**`elevation.css`** - Shadows and depth

```css
:root {
  --mds-elevation-100: 0 1px 2px rgba(0, 0, 0, 0.1);
  --mds-elevation-200: 0 2px 4px rgba(0, 0, 0, 0.1);
  --mds-elevation-300: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

**`grid.css`** - Layout and spacing

```css
:root {
  --mds-spacing-xs: 0.25rem;   /* 4px */
  --mds-spacing-sm: 0.5rem;    /* 8px */
  --mds-spacing-md: 1rem;      /* 16px */
  --mds-spacing-lg: 1.5rem;    /* 24px */
  --mds-spacing-xl: 2rem;      /* 32px */
}
```

#### 2. Component Tokens

Each component has its own token file (e.g., `button.tokens.css`, `badge.tokens.css`) that defines component-specific properties.

**Example: `button.tokens.css`**

```css
:root {
  /* Sizes */
  --mds-button-size-sm-height: 32px;
  --mds-button-size-md-height: 40px;
  --mds-button-size-lg-height: 48px;
  
  /* Primary Button */
  --mds-button-primary-background: var(--mds-color-electric-blue-500);
  --mds-button-primary-text: var(--mds-color-white);
  --mds-button-primary-background-hover: var(--mds-color-electric-blue-400);
  
  /* Typography */
  --mds-button-font-family: var(--mds-font-body);
  --mds-button-font-weight: var(--mds-font-weight-medium);
}
```

### Token Naming Convention

Tokens follow a consistent naming pattern:

```
--mds-[category]-[property]-[variant]-[state]
```

Examples:
- `--mds-button-primary-background-hover`
- `--mds-color-feedback-success-light`
- `--mds-table-cell-padding-y`

### Using Tokens

Always reference tokens in your CSS, never hardcode values:

```css
/* ✅ GOOD - Use tokens */
.my-button {
  background-color: var(--mds-button-primary-background);
  padding: var(--mds-spacing-md);
  font-family: var(--mds-font-body);
}

/* ❌ BAD - Hardcoded values */
.my-button {
  background-color: #2251FF;
  padding: 16px;
  font-family: 'McKinsey Sans', sans-serif;
}
```

---

## UI Components

UI components are React wrappers that consume design tokens and expose a clean API to application code.

### Location

```
src/ui/
├── index.ts              # Central export file
├── Button.tsx            # Button component
├── button.css            # Button styles
├── Badge.tsx             # Badge component
├── badge-component.css   # Badge styles
└── ...
```

### Component Structure

Each component follows this pattern:

1. **TypeScript Component File** (`.tsx`)
   - Defines props interface
   - Implements component logic
   - Imports component-specific CSS

2. **Component Stylesheet** (`.css`)
   - Uses tokens from `src/styles/mds/`
   - Defines component-specific styles

3. **Export from `index.ts`**
   - Exports component and types
   - Provides single import source

### Example: Button Component

**`Button.tsx`**

```tsx
import * as React from 'react'
import './button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`ui-Button ui-Button--${variant} ui-Button--${size} ${className || ''}`}
    />
  )
}
```

**`button.css`**

```css
.ui-Button {
  /* Use tokens from button.tokens.css */
  font-family: var(--mds-button-font-family);
  font-weight: var(--mds-button-font-weight);
  border-radius: var(--mds-button-border-radius);
  transition: var(--mds-button-transition-property) var(--mds-button-transition-duration);
}

.ui-Button--primary {
  background: var(--mds-button-primary-background);
  color: var(--mds-button-primary-text);
}

.ui-Button--primary:hover {
  background: var(--mds-button-primary-background-hover);
}

.ui-Button--md {
  height: var(--mds-button-size-md-height);
  padding: var(--mds-button-size-md-padding-y) var(--mds-button-size-md-padding-x);
  font-size: var(--mds-button-size-md-font-size);
}
```

**`index.ts`**

```typescript
export { Button } from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'
```

### Using Components in Application Code

```tsx
// In any page or component file
import { Button, Badge, Input } from '@ui'

function MyPage() {
  return (
    <div>
      <Button variant="primary" size="lg">Save</Button>
      <Badge variant="success">Active</Badge>
      <Input placeholder="Enter name" />
    </div>
  )
}
```

---

## Cursor Rules

Cursor rules are AI-enforced design guidelines that ensure consistency during development. They are automatically applied when using Cursor AI features.

### Location

```
.cursor/rules/
├── mds-ui-usage.mdc                  # Core UI usage rules
├── mds-bower-typography.mdc          # Bower font restrictions
├── mds-banner-dashboard-sizing.mdc   # Standard sizing for UI elements
├── mds-button-spacing.mdc            # Button spacing requirements
├── mds-dashboard-background.mdc      # Dashboard background guidelines
├── mds-data-visualization.mdc        # Chart and graph styling
└── mds-table-patterns.mdc            # Table layout best practices
```

### Rule Format

Rules are written in Markdown with clear sections:

```markdown
# Rule Title

## Critical Rule
[Main guideline statement]

## Requirements
- Requirement 1
- Requirement 2

## Examples

### ✅ GOOD
[Good example with code]

### ❌ BAD
[Bad example with code]

## Why This Matters
[Explanation of the reasoning]
```

### Key Rules Overview

#### 1. **UI Usage** (`mds-ui-usage.mdc`)

**Golden Rule:** Never introduce raw interactive controls in application code

```tsx
// ✅ GOOD
import { Button } from '@ui'
export function SaveAction() {
  return <Button type="submit">Save</Button>
}

// ❌ BAD
export function SaveAction() {
  return <button type="submit">Save</button>
}
```

#### 2. **Bower Typography** (`mds-bower-typography.mdc`)

Bower (display font) is strictly limited:
- **Only for display text** at 2.75rem (44px) or larger
- **Exception:** Application name in banner (minimum 1.5rem)
- **Weights 500 or 700 only**
- **Never for:** data, quantities, dashboard widgets, body text, tables

```css
/* ✅ GOOD - Large display text */
.hero-title {
  font-family: var(--mds-font-display);
  font-size: var(--mds-font-size-display-3);  /* 3.5rem */
  font-weight: var(--mds-font-weight-medium);  /* 500 */
}

/* ❌ BAD - Too small for Bower */
.page-title {
  font-family: var(--mds-font-display);
  font-size: var(--mds-font-size-heading-5);  /* 1.75rem - too small! */
}

/* ✅ GOOD - Use McKinsey Sans instead */
.page-title {
  font-family: var(--mds-font-body);
  font-size: var(--mds-font-size-heading-3);
  font-weight: var(--mds-font-weight-bold);
}
```

#### 3. **Banner & Dashboard Sizing** (`mds-banner-dashboard-sizing.mdc`)

Standard sizing conventions:
- **Banner application name:** 1.5em
- **Dashboard title:** 2em
- **Dashboard subtitle:** 1.2em
- **Full-width widget title:** 1.4em

```css
.banner__app-name {
  font-size: 1.5em;
}

.dashboard__title {
  font-size: 2em;
}

.dashboard__subtitle {
  font-size: 1.2em;
}
```

#### 4. **Button Spacing** (`mds-button-spacing.mdc`)

Buttons must never be flush against adjacent content:
- **Section headers:** 1.5rem margin below
- **Button groups:** 0.75-1rem gap between buttons
- **Table actions:** 0.5rem margin-right

```css
.section-header {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}
```

#### 5. **Dashboard Background** (`mds-dashboard-background.mdc`)

When using elevated white cards, use subtle background:

```css
/* Dashboard with white cards needs subtle background */
.dashboard {
  background: var(--mds-color-background-subtle);
}

.card {
  background: var(--mds-color-white);
  border: 1px solid var(--mds-color-border-default);
}
```

#### 6. **Data Visualization** (`mds-data-visualization.mdc`)

All charts use solid colors only:
- **No gradients, fades, or transitions**
- Use flat, solid fills from MDS color tokens

```css
/* ✅ GOOD - Solid color */
.bar-chart__bar {
  background-color: var(--mds-color-electric-blue-500);
}

/* ❌ BAD - Gradient */
.bar-chart__bar {
  background: linear-gradient(to top, #2251FF, #5B7FFF);
}
```

#### 7. **Table Patterns** (`mds-table-patterns.mdc`)

**Critical:** Never use `display: flex` or `display: grid` inside table cells

```css
/* ✅ GOOD - Natural inline flow */
.table-actions {
  white-space: nowrap;
}

.table-actions .ui-Button {
  margin-right: 0.5rem;
}

/* ❌ BAD - Flexbox in table cell */
.table-actions {
  display: flex;  /* Causes border misalignment! */
  gap: 0.5rem;
}
```

**Default alignment:** All table content is left-aligned (text, badges, icons)

### Why Rules Matter

1. **Consistency** - Ensures uniform implementation across all developers
2. **Quality** - Prevents common mistakes and anti-patterns
3. **Maintainability** - Codifies best practices for future reference
4. **Automation** - Cursor AI automatically applies these guidelines
5. **Documentation** - Serves as living documentation of design decisions

---

## File Hierarchy

```
Blue-Cheese/
├── .cursor/
│   └── rules/                          # AI-enforced design rules
│       ├── mds-ui-usage.mdc
│       ├── mds-bower-typography.mdc
│       ├── mds-banner-dashboard-sizing.mdc
│       ├── mds-button-spacing.mdc
│       ├── mds-dashboard-background.mdc
│       ├── mds-data-visualization.mdc
│       └── mds-table-patterns.mdc
│
├── src/
│   ├── styles/
│   │   └── mds/                        # MDS Design Tokens
│   │       ├── colors.css              # Color palette
│   │       ├── typography.css          # Font system
│   │       ├── elevation.css           # Shadows
│   │       ├── grid.css                # Spacing
│   │       ├── button.tokens.css       # Button tokens
│   │       ├── badge.tokens.css        # Badge tokens
│   │       ├── table.tokens.css        # Table tokens
│   │       └── ...                     # Other component tokens
│   │
│   ├── ui/                             # UI Component Library (@ui)
│   │   ├── index.ts                    # Central export
│   │   ├── Button.tsx                  # Button component
│   │   ├── button.css                  # Button styles
│   │   ├── Badge.tsx                   # Badge component
│   │   ├── badge-component.css         # Badge styles
│   │   └── ...                         # Other components
│   │
│   ├── components/                     # Application components
│   │   ├── Navigation.tsx
│   │   └── navigation.css
│   │
│   ├── pages/                          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── dashboard.css
│   │   ├── UserManagement.tsx
│   │   └── ...
│   │
│   ├── index.css                       # Global styles (imports all tokens)
│   ├── App.tsx                         # Root component
│   └── main.tsx                        # Entry point
│
├── AGENTS.md                           # MDS + Cursor workflow guide
├── vite.config.ts                      # Vite config (@ui alias)
├── tsconfig.app.json                   # TypeScript config (@ui alias)
└── package.json
```

### Directory Purposes

| Directory | Purpose | Import From |
|-----------|---------|-------------|
| `.cursor/rules/` | AI-enforced design guidelines | N/A (auto-applied) |
| `src/styles/mds/` | Design tokens (CSS variables) | Global via `index.css` |
| `src/ui/` | Reusable UI components | `@ui` alias |
| `src/components/` | Application-specific components | Relative imports |
| `src/pages/` | Page-level components | Relative imports |

---

## Development Workflow

### 1. Starting Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### 2. Building Pages

When creating a new page:

```tsx
// src/pages/MyPage.tsx
import { Button, Card, Badge } from '@ui'
import './my-page.css'

export function MyPage() {
  return (
    <div className="my-page">
      <h1 className="my-page__title">My Page</h1>
      <Card>
        <Button variant="primary">Action</Button>
        <Badge variant="success">Active</Badge>
      </Card>
    </div>
  )
}
```

```css
/* src/pages/my-page.css */
.my-page {
  padding: var(--mds-spacing-xl);
  background: var(--mds-color-background-subtle);
}

.my-page__title {
  font-family: var(--mds-font-body);
  font-size: 2em;
  font-weight: var(--mds-font-weight-bold);
  margin-bottom: var(--mds-spacing-lg);
}
```

### 3. Working with Tokens

Always reference tokens for visual properties:

```css
/* Colors */
color: var(--mds-color-text-headings);
background: var(--mds-color-electric-blue-500);

/* Spacing */
margin: var(--mds-spacing-lg);
padding: var(--mds-spacing-md) var(--mds-spacing-xl);

/* Typography */
font-family: var(--mds-font-body);
font-size: var(--mds-font-size-heading-3);
font-weight: var(--mds-font-weight-bold);

/* Elevation */
box-shadow: var(--mds-elevation-200);
```

### 4. Using Cursor AI

The Cursor rules automatically enforce design standards. When you:
- Use raw HTML controls → AI suggests using `@ui` components
- Use wrong font → AI suggests correct font tokens
- Create tables → AI prevents flexbox in cells
- Add buttons → AI ensures proper spacing

---

## Adding New Components

Follow this workflow when adding a new UI component:

### Step 1: Check for Token File

Look in `src/styles/mds/` for a token file (e.g., `dropdown.tokens.css`). If it doesn't exist, create it:

```css
/* src/styles/mds/dropdown.tokens.css */
:root {
  --mds-dropdown-background: var(--mds-color-white);
  --mds-dropdown-border: var(--mds-color-border-default);
  --mds-dropdown-item-padding: var(--mds-spacing-sm) var(--mds-spacing-md);
  --mds-dropdown-item-hover: var(--mds-color-neutral-5);
}
```

### Step 2: Create Component Files

Create the component and its stylesheet in `src/ui/`:

**`src/ui/Dropdown.tsx`**

```tsx
import * as React from 'react'
import './dropdown.css'

export type DropdownProps = {
  options: string[]
  value?: string
  onChange?: (value: string) => void
}

export function Dropdown({ options, value, onChange }: DropdownProps) {
  return (
    <select 
      className="ui-Dropdown"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}
```

**`src/ui/dropdown.css`**

```css
.ui-Dropdown {
  background: var(--mds-dropdown-background);
  border: 1px solid var(--mds-dropdown-border);
  padding: var(--mds-dropdown-item-padding);
  font-family: var(--mds-font-body);
}

.ui-Dropdown:hover {
  background: var(--mds-dropdown-item-hover);
}
```

### Step 3: Export from `index.ts`

Add exports to `src/ui/index.ts`:

```typescript
export { Dropdown } from './Dropdown'
export type { DropdownProps } from './Dropdown'
```

### Step 4: Use in Application Code

```tsx
import { Dropdown } from '@ui'

function MyPage() {
  return <Dropdown options={['Option 1', 'Option 2']} />
}
```

### Step 5: Import Tokens Globally

Add the token file to `src/index.css` if it's new:

```css
/* src/index.css */
@import './styles/mds/dropdown.tokens.css';
```

---

## Migration to Official MDS Package

When the official MDS NPM package becomes available:

### Step 1: Install Package

```bash
npm install @mckinsey/mds
```

### Step 2: Update `src/ui/` Components

Modify components to re-export from the official package:

```typescript
// src/ui/Button.tsx
export { Button } from '@mckinsey/mds'
export type { ButtonProps } from '@mckinsey/mds'
```

### Step 3: Application Code Unchanged

Because application code uses the `@ui` alias, no changes are needed:

```tsx
// This stays the same
import { Button } from '@ui'
```

### Benefits

- **Zero refactoring** in application code
- **Single update location** (`src/ui/`)
- **Gradual migration** (update components one at a time)
- **Type safety maintained** through re-exports

---

## Additional Resources

- **`AGENTS.md`** - MDS + Cursor workflow guide
- **`USER_MANAGEMENT_DOCS.md`** - User management page documentation
- **`PROJECT_PORTFOLIO_DOCS.md`** - Project portfolio documentation
- **`DATA_IMPORT_DOCUMENTATION.md`** - Data import functionality
- **`ROUTING_GUIDE.md`** - Application routing setup

---

## Quick Reference

### Import Pattern

```tsx
// ✅ Always use @ui
import { Button, Badge, Input, Select } from '@ui'

// ❌ Never use raw HTML
<button>Click</button>
```

### Token Usage

```css
/* ✅ Use tokens */
color: var(--mds-color-text-headings);

/* ❌ Never hardcode */
color: #000000;
```

### Typography

```css
/* Display text (large) */
font-family: var(--mds-font-display);  /* Bower */
font-size: var(--mds-font-size-display-3);

/* Everything else */
font-family: var(--mds-font-body);  /* McKinsey Sans */
```

### Spacing

```css
/* Use spacing tokens */
margin: var(--mds-spacing-lg);
padding: var(--mds-spacing-md);
gap: var(--mds-spacing-sm);
```

### Colors

```css
/* Semantic colors */
background: var(--mds-color-electric-blue-500);
color: var(--mds-color-text-headings);
border: 1px solid var(--mds-color-border-default);
```

---

## License

Private - McKinsey & Company
