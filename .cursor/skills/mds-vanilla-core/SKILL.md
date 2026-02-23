---
name: mds-vanilla-core
description: Applies MDS guidance for pure HTML/CSS/JavaScript projects using token files directly (no React, no @ui). Use when the user asks for vanilla implementation, static HTML pages, or framework-agnostic MDS styling.
---

# MDS Vanilla Core

## Scope

Use this skill for pure vanilla implementations only:
- HTML templates
- CSS classes that consume `src/styles/mds/*.css` tokens
- JavaScript DOM behavior without framework components

Do not introduce React, TSX, `@ui`, or `src/ui` wrappers.

## Token Loading Order

Load token files first, then page/component CSS:

```html
<link rel="stylesheet" href="/src/styles/mds/colors.css">
<link rel="stylesheet" href="/src/styles/mds/typography.css">
<link rel="stylesheet" href="/src/styles/mds/elevation.css">
<link rel="stylesheet" href="/src/styles/mds/grid.css">
```

Add component token files only as needed (tabs, badge, table, button, progress-bar, etc.).

## Core Guardrails (Vanilla)

1. Use MDS tokens (`var(--mds-...)`) instead of hard-coded values.
2. No gradients/fades for chart marks.
3. In tables, never apply `display:flex` or `display:grid` directly to `td`/`th`.
4. Bower restrictions remain: only display contexts + approved sizes/weights.

## Vanilla Baseline Pattern

```html
<section class="dashboard">
  <header class="dashboard-header">
    <h1 class="dashboard-title">Project Portfolio</h1>
    <p class="dashboard-subtitle">Track delivery and resourcing</p>
  </header>
</section>
```

```css
.dashboard-title {
  font-family: var(--mds-font-body);
  font-size: 2em;
  font-weight: var(--mds-font-weight-bold);
}

.dashboard-subtitle {
  font-family: var(--mds-font-body);
  font-size: 1.2em;
}
```

## Decision Branch

- If task mentions React, `@ui`, TSX, or wrapper components: use React guidance skills/rules.
- If task mentions vanilla HTML/CSS/JS: stay in this skill and related vanilla skills.
