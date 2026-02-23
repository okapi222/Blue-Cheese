## MDS + Cursor workflow

### What we're optimizing for
- **Consistent usage of the MDS design system** in all UI code.
- **Minimal refactors later** when we connect the real MDS NPM package.

### The `@ui` facade (important)
- Application code imports UI components from `@ui`.
  - Example: `import { Button } from '@ui'`
- `@ui` maps to `src/ui/` (configured in `vite.config.ts` and `tsconfig.app.json`).
- `src/ui/**` is the only place allowed to wrap raw HTML controls (so ESLint can block them elsewhere).

### Vanilla mode (pure HTML/CSS/JS)
- For vanilla implementations, do not use `@ui`, TSX, or `src/ui` wrappers.
- Consume token files directly from `src/styles/mds/*.css`.
- Use `.cursor/skills/mds-vanilla-core/SKILL.md` and `.cursor/skills/mds-vanilla-components/SKILL.md`.
- Keep universal MDS constraints (table semantics, typography restrictions, token-first styling).

### Design System Structure

#### Token Files (`src/styles/mds/`)
All MDS design tokens are stored as CSS variables in `:root`:
- **Core tokens**: `colors.css`, `typography.css`, `elevation.css`, `grid.css`
- **Component tokens**: `button.tokens.css`, `badge.tokens.css`, `table.tokens.css`, etc.
- These are imported globally in `src/index.css`

Vanilla token import order (recommended):
1. `colors.css`
2. `typography.css`
3. `elevation.css`
4. `grid.css`
5. required component token files (`*.tokens.css`)
6. app/page CSS that consumes tokens

#### Component Styles (`src/ui/`)
Component-specific CSS that consumes the tokens:
- `button.css` - Styles for `Button.tsx`
- `badge-component.css` - Styles for `Badge.tsx`
- Each component imports its own CSS file

### Adding a new UI component
1. Check if token file exists in `src/styles/mds/componentname.tokens.css`
2. Create a wrapper in `src/ui/` (e.g., `src/ui/Checkbox.tsx`)
3. Create component CSS in `src/ui/checkbox.css` using `var(--mds-checkbox-*)` tokens
4. Export it from `src/ui/index.ts`
5. Use it from app code via `@ui`

### Critical Design Rules

#### Typography Sizing Standards
Standard sizing for banners and dashboards:
- **Banner application name**: 1.5em
- **Dashboard title**: 2em
- **Dashboard subtitle**: 1.2em
- **Full-screen width widget title**: 1.4em
- See `.cursor/skills/mds-layout-patterns/SKILL.md` for full guidance

#### Bower Typography Restrictions
Bower (--mds-font-display) is strictly limited:
- **Display sizes only** (display-1 through display-6, minimum 2.75rem/44px)
- **Exception**: Application name in top banner may use Bower at minimum 1.5rem
- **Weight 500 or 700 only** (never 300 or 400)
- **Never for**: data/quantities, dashboard widget titles, headings below 2.75rem, body text, table content
- Use McKinsey Sans (--mds-font-body) for everything else
- See .cursor/rules/mds-bower-typography.mdc for full guidance

#### Badge Colors
Badges use **feedback semantic colors** (not data visualization colors):
- Success: --mds-color-feedback-success (#117E1A) / --mds-color-feedback-success-light (#E6FEE8)
- Warning: --mds-color-feedback-warning (#FFD048) / --mds-color-feedback-warning-light (#FFF9D6)
- Error/Danger: --mds-color-feedback-danger (#CD3030) / --mds-color-feedback-danger-light (#FEEBEB)
- Info: --mds-color-informational (#2251FF) / --mds-color-informational-light (#E5F0FF)
- Neutral: --mds-color-feedback-neutral (#333333) / --mds-color-feedback-neutral-light (#F2F2F2)

#### Tables
- **NEVER use display flex or display grid inside table cells (td, th).** This causes border misalignment.
- Use natural inline-block flow for buttons; margin-right instead of gap
- **All text, badges, and icons in tables are left-aligned by default**
- See .cursor/rules/mds-table-patterns.mdc for full guidance

#### Data Visualization
- **Bar charts and all graphical representations use solid colors only**
- **NO gradients, fades, or color transitions**
- Use flat, solid fills from MDS color tokens
- **Color system**: See `.cursor/skills/mds-dataviz-color-system/SKILL.md` for categorical, linear, and diverging palette guidance
- **Chart selection and best practices**: See `.cursor/skills/mds-dataviz-chart-guide/SKILL.md` for per-chart-type rules
- **Labeling and annotations**: See `.cursor/skills/mds-dataviz-labeling/SKILL.md` for legends, axes, callouts, and icon usage

### Connecting the real MDS package later
Once you know the exact package name/import style (e.g., `@org/mds`), update `src/ui/**` to re-export or wrap the MDS components and add the dependency to `package.json`.

The goal is that **app code never changes**—only `src/ui/**` does.
