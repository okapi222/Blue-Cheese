# MDS Rules -> Skills Migration Matrix

## Goal

Shift MDS style guidance from always-on Rules to discoverable Skills while keeping critical guardrails as Rules.

## Decision Matrix

| Rule | Decision | Destination |
|---|---|---|
| `mds-ui-usage.mdc` | Keep as Rule (critical guardrail) | Rule remains |
| `mds-table-patterns.mdc` | Keep as Rule (critical guardrail) | Rule remains |
| `mds-bower-typography.mdc` | Keep as Rule (critical guardrail) | Rule remains |
| `mds-banner-dashboard-sizing.mdc` | Convert to Skill | `mds-layout-patterns` |
| `mds-dashboard-background.mdc` | Convert to Skill | `mds-layout-patterns` |
| `mds-button-spacing.mdc` | Convert to Skill | `mds-layout-patterns` |
| `mds-tab-nav-spacing.mdc` | Convert to Skill | `mds-layout-patterns` |
| `mds-tabs-usage.mdc` | Convert to Skill | `mds-token-usage` |
| `mds-progress-bar-usage.mdc` | Convert to Skill | `mds-token-usage` |
| `mds-data-visualization.mdc` | Convert to Skill | `mds-data-visualization` |
| `mds-badge-table-rows.mdc` | Convert to Skill (plus existing badge skill update) | `badge-variant-selection` |

## New/Updated Skills

- `.cursor/skills/mds-layout-patterns/SKILL.md`
- `.cursor/skills/mds-token-usage/SKILL.md`
- `.cursor/skills/mds-data-visualization/SKILL.md`
- `.cursor/skills/badge-variant-selection/SKILL.md` (updated)
- `.cursor/skills/mds-vanilla-core/SKILL.md` (new)
- `.cursor/skills/mds-vanilla-components/SKILL.md` (new)

## Retained Rules (Guardrails)

- `.cursor/rules/mds-ui-usage.mdc`
- `.cursor/rules/mds-table-patterns.mdc`
- `.cursor/rules/mds-bower-typography.mdc`

## Removed Rules

- `.cursor/rules/mds-banner-dashboard-sizing.mdc`
- `.cursor/rules/mds-dashboard-background.mdc`
- `.cursor/rules/mds-button-spacing.mdc`
- `.cursor/rules/mds-tab-nav-spacing.mdc`
- `.cursor/rules/mds-tabs-usage.mdc`
- `.cursor/rules/mds-progress-bar-usage.mdc`
- `.cursor/rules/mds-data-visualization.mdc`
- `.cursor/rules/mds-badge-table-rows.mdc`

## Expected Impact

- Better context-aware guidance through Skills for design decisions.
- Lower prompt noise from long always-on rules.
- No regression on critical constraints due to retained guardrails.

## Validation Snapshot

- Vanilla skills include HTML/CSS/JS examples and no TSX or `@ui` usage examples.
- `mds-rule-builder` now routes by framework target first (React path vs Vanilla path).
- Guardrail rules remain limited to universal constraints.
