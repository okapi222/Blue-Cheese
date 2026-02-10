# Table Layout Pattern - Codification

## Problem Solved
Horizontal row borders in the Actions column were not aligning with the rest of the table because `display: flex` was used inside table cells.

## Root Cause
Flexbox creates a different formatting context inside table cells that interferes with:
- Border rendering and alignment
- Natural table cell height calculations
- Cross-browser consistency

## Solution Applied
Removed flexbox from table cells and used natural inline-block flow:

```css
/* ❌ OLD - Caused misalignment */
.table-actions {
  display: flex;
  gap: 0.5rem;
}

/* ✅ NEW - Proper alignment */
.table-actions {
  white-space: nowrap;
}

.table-actions .ui-Button {
  margin-right: 0.5rem;
}
```

## How It's Codified in the Design System

### 1. Cursor Rule (`.cursor/rules/mds-table-patterns.mdc`)
- **Scope**: All TypeScript, TSX, and CSS files
- **Always applies**: Yes
- **Content**: 
  - Explicit prohibition of flexbox/grid in table cells
  - Code examples showing correct patterns
  - Full guidance on using MDS table tokens
  - Common patterns for action columns, badges, responsive design

### 2. Documentation (`AGENTS.md`)
- Added "Critical Layout Patterns" section
- Explicit warning about table cell flexbox
- Reference to the Cursor rule for full guidance

### 3. Existing Table Tokens (`src/styles/mds/table.tokens.css`)
- Already contains proper MDS table tokens
- Defines standard spacing, typography, colors, borders
- Ready to use in all table implementations

## Benefits

1. **AI Guidance**: Cursor will always suggest the correct pattern for tables
2. **Developer Reference**: New team members can read the rule file
3. **Searchable**: Pattern is documented and easily findable
4. **Maintainable**: Future tables will follow the same pattern
5. **Consistent**: All tables across projects will have aligned borders

## Future Table Development

When creating new tables:
1. Cursor will automatically suggest the correct pattern (via `alwaysApply` rule)
2. Use MDS table tokens for all styling
3. Avoid flexbox/grid in cells
4. Use `margin-right` for button spacing in action columns
5. Apply `table-layout: fixed` for complex tables with action columns

## Files Modified

- `.cursor/rules/mds-table-patterns.mdc` (created)
- `AGENTS.md` (updated with table guidance)
- `src/pages/dashboard.css` (fixed table-actions class)
