# Contributing to Blue-Cheese

Blue-Cheese is an internal McKinsey project. All content — including code, design tokens, Cursor skills, and fonts — is proprietary and must not be shared outside the firm.

---

## Getting Started

```bash
git clone https://github.com/okapi222/Blue-Cheese.git
cd Blue-Cheese
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, reviewed code only. No direct pushes. |
| `develop` | Shared integration branch. Merge features here first. |
| `feature/your-description` | New skills, components, or capabilities. |
| `fix/your-description` | Bug fixes and corrections. |

Branch names should be lowercase and hyphen-separated, e.g. `feature/dataviz-line-chart` or `fix/table-border-alignment`.

---

## Pull Request Process

1. Branch off `develop` (not `main`).
2. Open a PR into `develop` when your work is ready for review.
3. Fill in the PR template — it will appear automatically when you open a PR.
4. At least one approval is required before merging.
5. Periodically, `develop` is merged into `main` by the repo owner.

---

## Core MDS Rules

These apply to all contributions. Cursor will flag violations automatically, but please check before opening a PR.

**Components**
- Never use raw HTML interactive controls (`<button>`, `<input>`, `<select>`, etc.) in application code.
- Always import UI components from `@ui` — e.g. `import { Button } from '@ui'`.
- `src/ui/` is the only place that may wrap raw HTML controls.

**Styling**
- Never hardcode visual values (colors, spacing, font sizes). Always use MDS tokens — e.g. `var(--mds-color-electric-blue-500)`.
- Token files live in `src/styles/mds/`. If a token doesn't exist for what you need, add it there first.

**Typography**
- Bower (`--mds-font-display`) is for display text only, at 2.75rem (44px) or larger, weight 500 or 700.
- Use McKinsey Sans (`--mds-font-body`) for everything else — headings, body, tables, data, dashboards.

**Data Visualisation**
- Solid colors only. No gradients, fades, or color transitions in charts or graphs.

**Tables**
- Never use `display: flex` or `display: grid` inside table cells (`td`, `th`). Use `margin-right` instead of `gap` for inline elements.

---

## Working with Cursor Skills and Rules

Skills (`.cursor/skills/`) and rules (`.cursor/rules/`) are first-class assets in this repo — treat changes to them with the same care as changes to `src/ui/`.

**Adding a new skill**
1. Create a new folder under `.cursor/skills/your-skill-name/`.
2. Add a `SKILL.md` following the format of existing skills.
3. Reference it in `AGENTS.md` if relevant to the core workflow.

**Modifying an existing rule or skill**
- Changes to rules and skills affect how all future code is generated. Include a brief note in your PR explaining what changed and why.

---

## Example and Test Files

When building something to **test or demonstrate** a skill — a sample dashboard, a presentation, a chart, a data file — put it in the `examples/` folder at the root of the repo.

```
Blue-Cheese/
├── examples/        ← test and demo files only, never pushed
│   ├── pages/
│   ├── components/
│   ├── data/
│   └── ...
├── src/             ← core MDS model only
├── .cursor/
└── ...
```

The `examples/` folder is in `.gitignore` and will never be committed or pushed. This keeps the repo clean and makes it easy to tell core MDS work from one-off experiments.

**The rule:** if you're building a skill or component, it goes in `src/`. If you're testing whether a skill works, it goes in `examples/`.

---

## Adding a New UI Component

1. Check for an existing token file in `src/styles/mds/`. Create one if it doesn't exist.
2. Create the component (`.tsx`) and its stylesheet (`.css`) in `src/ui/`.
3. Export from `src/ui/index.ts`.
4. Import in application code via `@ui`.
5. Import the token file in `src/index.css` if it's new.

See `README.md` for a full walkthrough with code examples.

---

## Proprietary Assets

The following are McKinsey proprietary and must remain within this private repository:

- McKinsey fonts (Bower, McKinsey Sans)
- `McKinsey Data Visualization Guidelines V5.pdf`
- All MDS design tokens and component implementations

Do not fork this repository or copy these assets to any public or personal repository.
