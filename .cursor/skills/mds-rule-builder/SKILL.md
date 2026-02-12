---
name: mds-rule-builder
description: Analyzes ALL MDS design system corrections and proactively suggests rules to capture patterns. Triggers for any MDS-related fix, even one-off corrections. Automatically evaluates whether a correction is worth preserving as a rule.
---

# MDS Rule Builder

This skill helps you recognize when MDS design system corrections represent patterns worth capturing, then guides the creation or update of rules to preserve that knowledge.

## When to Use This Skill

### Automatic Trigger Conditions (Proactive Detection)

**Trigger for ANY MDS-related correction, including:**

1. **Single MDS Corrections**: Any one-off fix to MDS component usage, styling, or patterns
2. **Token Misuse**: Using wrong MDS tokens or hard-coded values instead of design tokens
3. **Component Pattern Violations**:
   - Flexbox/grid in table cells
   - Wrong badge variants (fill vs outline)
   - Incorrect button spacing
   - Component imports from wrong sources
   - Badge sizing in headers/sections
   - Component-specific styling adjustments
4. **Typography Violations**:
   - Bower font used incorrectly (wrong size, weight, or context)
   - Wrong sizing for banners/dashboards
   - Improper font family selection
   - Font size inconsistencies in UI elements
5. **Layout Anti-Patterns**:
   - Missing background colors on card-based dashboards
   - Incorrect alignment patterns
   - Spacing violations
   - DOM structure changes for layout purposes
6. **Styling Patterns**: Any CSS adjustment to MDS components or layouts
7. **Component Adjustments**: Size, spacing, color, or structural changes to UI components
8. **User Signals**: User explicitly mentions:
   - "This keeps happening"
   - "We should standardize this"
   - "Can we make a rule for this?"
   - "I don't want to keep fixing this"

### When NOT to Suggest

- Simple typos or naming inconsistencies (non-design related)
- Project-specific business logic (not design system related)
- Corrections already fully covered by existing rules (but mention which rule covers it)

### Evaluation Criteria for One-Off Corrections

When evaluating a single correction, ask:

1. **Is it MDS-related?** (component, token, pattern, layout)
2. **Could this pattern appear elsewhere?** (reusability potential)
3. **Does it reflect a design principle?** (not just a random fix)
4. **Is the pattern generalizable?** (applies beyond this specific instance)

If **YES** to 2+ questions → Suggest creating/updating a rule
If **NO** to most → Acknowledge the fix but skip rule suggestion

**Examples of worth capturing:**
- Badge sizing relative to adjacent text (reusable pattern)
- Spacing between specific component types (design principle)
- Token usage for specific contexts (generalizable)

**Examples of skip:**
- Fixing a specific margin value for one element
- Adjusting text for this specific page's content
- Bug fixes unrelated to design system

## Pattern Analysis Workflow

When you detect a potential pattern, follow these steps:

### Step 1: Identify the Correction

Determine what was corrected:
- Component usage (Button, Badge, Table, etc.)
- Layout pattern (flex, grid, alignment)
- Styling approach (tokens, colors, spacing)
- Typography (font family, size, weight)
- Import/usage pattern

### Step 2: Extract the Core Principle

Articulate the underlying rule being enforced:
- What is the correct pattern?
- What is the incorrect pattern being replaced?
- Why does this matter? (performance, consistency, maintainability)

### Step 3: Check Existing Rules

Before suggesting a new rule, check if it's already covered:

1. **Read all existing rules**: List and read `.cursor/rules/*.mdc` files
2. **Check AGENTS.md**: Review for related guidance in the main MDS documentation
3. **Classify the pattern**:
   - **Already fully covered**: No action needed, just mention which rule covers it
   - **Partially covered**: Consider updating existing rule with new example
   - **Not covered**: Propose creating a new rule

### Step 4: Determine Scope

Decide the rule's applicability:

**Always Apply** (`alwaysApply: true`):
- Universal MDS principles (token usage, component imports)
- Design system fundamentals that apply everywhere
- Critical anti-patterns to always prevent

**File-Specific** (`globs: pattern`, `alwaysApply: false`):
- Component-specific patterns (tables, forms, etc.)
- Language/framework-specific rules
- Use patterns like:
  - `**/*.{ts,tsx}` - TypeScript/React files
  - `**/*.css` - CSS files only
  - `**/*.{ts,tsx,css}` - Both code and styles

### Step 5: Classify Action

Determine what to do:
- **No Action**: Already covered by existing rule (inform user)
- **Update Existing**: Add example or clarification to existing rule
- **Create New**: Write a new rule file

## Rule Drafting Templates

Use these templates based on the pattern type:

### Component Usage Rule

```markdown
---
description: [Component] usage patterns and requirements
globs: **/*.{ts,tsx}
alwaysApply: false
---

# [Component Name] [Aspect]

## Critical Rule

[One-sentence core principle]

## Requirements

1. [First requirement with specifics]
2. [Second requirement]
3. [Third requirement]

## Examples

### ✅ GOOD - [Description]

\`\`\`tsx
[Code example showing correct usage]
\`\`\`

### ❌ BAD - [Description]

\`\`\`tsx
[Code example showing violation]
\`\`\`

## Why This Matters

- [Reason 1: e.g., visual consistency]
- [Reason 2: e.g., accessibility]
- [Reason 3: e.g., maintainability]
```

### Token Usage Rule

```markdown
---
description: MDS [category] token usage requirements
globs: **/*.{ts,tsx,css}
alwaysApply: true
---

# MDS [Category] Token Usage

## Rule

**Always use [specific token category]** when [context/situation].

## Applies To

- [Component or file type 1]
- [Component or file type 2]
- [Component or file type 3]

## Correct Token Usage

\`\`\`css
/* ✅ GOOD */
.component {
  property: var(--mds-specific-token);
}
\`\`\`

\`\`\`css
/* ❌ BAD */
.component {
  property: var(--wrong-token);
  /* or */
  property: #hardcoded;
}
\`\`\`

## Why This Matters

[Explanation of consequences: theme support, consistency, etc.]
```

### Layout/Pattern Rule

```markdown
---
description: [Pattern] layout and structure requirements
globs: **/*.{ts,tsx,css}
alwaysApply: [true/false]
---

# [Pattern Name] Requirements

## Critical Rule

**[Core restriction or requirement]**

## The Problem

[Describe what happens when the rule is violated]

## The Solution

[Describe the correct approach]

### ✅ GOOD - [Approach Description]

\`\`\`tsx/css
[Correct implementation]
\`\`\`

### ❌ BAD - [What Not To Do]

\`\`\`tsx/css
[Incorrect implementation]
\`\`\`

## Common Patterns

### [Pattern 1]
[Implementation example]

### [Pattern 2]
[Implementation example]
```

### Typography Rule

```markdown
---
description: [Font/typography aspect] usage restrictions
globs: **/*.{ts,tsx,css}
alwaysApply: true
---

# [Font Name] Typography Rules

## Allowed Usage

[Font] may ONLY be used when ALL conditions are met:

1. [Condition 1]
2. [Condition 2]
3. [Condition 3]

### Exception: [If Any]

[Description of exception case]

## Prohibited Usage

[Font] must NEVER be used for:

- [Prohibited use 1]
- [Prohibited use 2]
- [Prohibited use 3]

## What to Use Instead

For [use case], use [alternative]:

\`\`\`css
/* ✅ GOOD */
.element {
  font-family: var(--correct-token);
  font-size: var(--correct-size);
}
\`\`\`
```

## User Approval Process

Before creating or updating any rule file, ALWAYS follow this process:

### 1. Announce the Suggestion

State clearly:
```
I've detected a pattern that might be worth capturing as a rule:
[Brief description of the pattern]

This appears to be [NEW / an UPDATE to existing rule "filename.mdc"]
```

### 2. Present the Proposed Rule

Show the complete rule in a markdown code block:

````markdown
Here's the proposed rule:

```markdown
---
description: [description]
globs: [pattern]
alwaysApply: [true/false]
---

# [Rule Title]

[Full rule content]
```
````

### 3. For Updates: Show What's Being Added

If updating an existing rule:
```
I propose adding this section to `.cursor/rules/existing-rule.mdc`:

[Show the new content being added]

This will be added after the [section name] section.
```

### 4. Ask for Approval

Always ask explicitly:
```
Should I create/update this rule?
```

### 5. Wait for Response

Do NOT write any files until the user responds with approval.

Possible responses:
- "Yes" / "Approve" / "Go ahead" → Proceed with creation/update
- "No" / "Skip" → Acknowledge and don't create the rule
- Feedback/changes → Revise the rule and present again
- Questions → Answer and wait for approval

## File Creation and Update Logic

### Creating a New Rule

1. **Generate filename**:
   - Use kebab-case
   - Prefix with `mds-` for MDS-specific patterns
   - Keep under 40 characters
   - Examples: `mds-badge-colors.mdc`, `mds-form-validation.mdc`

2. **Set frontmatter correctly**:
   - `description`: Clear, concise description (shows in rule picker)
   - `globs`: File pattern if file-specific, or omit if always apply
   - `alwaysApply`: `true` for universal rules, `false` for file-specific

3. **Write the file**:
   ```
   .cursor/rules/[pattern-name].mdc
   ```

4. **Confirm creation**:
   ```
   ✓ Created rule: .cursor/rules/[filename].mdc
   
   This rule will now [always apply / apply when working with [file types]].
   ```

### Updating an Existing Rule

1. **Read the current rule**:
   - Load the existing `.cursor/rules/[filename].mdc`
   - Parse its structure

2. **Identify insertion point**:
   - Add new examples to existing sections
   - Add new sections if the content is distinct
   - Preserve all existing content

3. **Make the update**:
   - Use StrReplace to add content
   - Don't remove or modify existing examples unless they're wrong
   - Maintain consistent formatting

4. **Confirm update**:
   ```
   ✓ Updated rule: .cursor/rules/[filename].mdc
   
   Added: [brief description of what was added]
   ```

## Naming Conventions

Follow these patterns based on existing rules in `.cursor/rules/`:

### Prefix Patterns
- `mds-` → MDS design system patterns
- `mds-[component]-` → Component-specific rules (e.g., `mds-table-patterns`, `mds-button-spacing`)
- `mds-[category]-` → Category rules (e.g., `mds-bower-typography`, `mds-data-visualization`)

### Name Structure
- `[prefix]-[what]-[aspect].mdc`
- Examples:
  - `mds-table-patterns.mdc` (component patterns)
  - `mds-button-spacing.mdc` (component spacing)
  - `mds-bower-typography.mdc` (typography rules)
  - `mds-dashboard-background.mdc` (layout rules)
  - `mds-tabs-usage.mdc` (component usage)

### Naming Guidelines
- Use descriptive, specific names
- Avoid vague terms like "helper", "utils", "misc"
- Keep under 40 characters
- Use kebab-case (hyphens, not underscores or spaces)

## Integration with Existing System

### Reference Files

When analyzing patterns, reference:

1. **AGENTS.md**: Core MDS workflow and design system structure
2. **Existing rules**: `.cursor/rules/*.mdc` (currently 10 MDS rules)
3. **Skills**: `.cursor/skills/badge-variant-selection/SKILL.md` (example skill)

### Current MDS Rules (Reference)

Existing rules you should be aware of:
- `mds-table-patterns.mdc` - Table layout, no flex in cells
- `mds-ui-usage.mdc` - Component imports from @ui
- `mds-bower-typography.mdc` - Bower font restrictions
- `mds-banner-dashboard-sizing.mdc` - Typography sizing standards
- `mds-tabs-usage.mdc` - Tabs token usage
- `mds-dashboard-background.mdc` - Dashboard backgrounds with cards
- `mds-button-spacing.mdc` - Button spacing requirements
- `mds-data-visualization.mdc` - Solid colors for charts
- `mds-tab-nav-spacing.mdc` - Tab navigation spacing
- `mds-badge-table-rows.mdc` - Badge patterns in tables

## Example Workflows

### Example 1: Pattern Already Covered

**Scenario**: You correct a table by removing `display: flex` from cells

**Workflow**:
1. ✓ Detection: Recognize this is an MDS table violation
2. ✓ Analysis: Check `.cursor/rules/mds-table-patterns.mdc` - exists and covers this
3. ✓ Decision: Pattern already covered
4. ✓ Response to user:
   ```
   Note: This pattern is already covered by the existing rule:
   .cursor/rules/mds-table-patterns.mdc
   
   No new rule needed.
   ```

### Example 2: One-Off Correction (New Behavior)

**Scenario**: You adjust badge font size in a kanban column header to match the title (1.1rem)

**Workflow**:
1. ✓ Detection: Single MDS component styling adjustment
2. ✓ Analysis:
   - Check existing rules: No rule covers badge sizing in headers
   - This could be a reusable pattern (badges in headers should match adjacent text)
   - File-specific pattern (kanban/card layouts)
3. ✓ Decision: Evaluate if worth documenting
4. ✓ Presentation:
   ```
   I've made an MDS correction that might be worth capturing:
   **Badge Sizing in Headers**: Adjusted badge to match adjacent title text size.
   
   Pattern: When badges appear next to titles/headers, they should use the same font size for visual harmony.
   
   This appears to be NEW - no existing rule covers badge sizing relative to adjacent elements.
   
   Should I create a rule for this pattern?
   ```

5. ✓ Wait for user decision:
   - If "Yes" → Draft and present full rule
   - If "No" → Acknowledge and continue
   - If "Not sure" → Explain benefits and ask again

### Example 3: Create New Rule (Multiple Instances)

**Scenario**: You fix multiple instances of using data visualization colors for badges instead of feedback colors

**Workflow**:
1. ✓ Detection: Repeated pattern across multiple files
2. ✓ Analysis:
   - Check existing rules: Badge colors mentioned in AGENTS.md but no dedicated rule
   - This is a universal pattern (always apply)
3. ✓ Decision: Create new rule `mds-badge-colors.mdc`
4. ✓ Presentation (more confident since pattern is repeated):
   ````
   I've detected a recurring pattern worth capturing:
   **Badge Color Usage**: Badges should use feedback semantic colors, not data visualization colors.
   
   This appears to be NEW - no existing rule covers this specifically.
   
   Here's the proposed rule:
   
   ```markdown
   ---
   description: MDS badge semantic color usage requirements
   globs: **/*.{ts,tsx}
   alwaysApply: true
   ---
   
   # MDS Badge Colors
   
   ## Rule
   
   Badges use **feedback semantic colors** (not data visualization colors).
   
   ## Correct Colors
   
   - Success: --mds-color-feedback-success / --mds-color-feedback-success-light
   - Warning: --mds-color-feedback-warning / --mds-color-feedback-warning-light
   - Error/Danger: --mds-color-feedback-danger / --mds-color-feedback-danger-light
   - Info: --mds-color-informational / --mds-color-informational-light
   - Neutral: --mds-color-feedback-neutral / --mds-color-feedback-neutral-light
   
   ## Examples
   
   ### ✅ GOOD
   
   \`\`\`tsx
   <Badge variant="success">Active</Badge>
   <Badge variant="warning">Pending</Badge>
   \`\`\`
   
   ### ❌ BAD
   
   \`\`\`tsx
   <Badge style={{ color: 'var(--mds-color-electric-blue-500)' }}>Active</Badge>
   \`\`\`
   ```
   
   Should I create this rule?
   ````

5. ✓ Wait for approval
6. ✓ After "yes": Create `.cursor/rules/mds-badge-colors.mdc`
7. ✓ Confirm:
   ```
   ✓ Created rule: .cursor/rules/mds-badge-colors.mdc
   
   This rule will always apply to ensure consistent badge color usage.
   ```

### Example 4: Update Existing Rule

**Scenario**: You discover a new table pattern (responsive behavior) not covered in the existing table rule

**Workflow**:
1. ✓ Detection: New table-related pattern
2. ✓ Analysis: `.cursor/rules/mds-table-patterns.mdc` exists but doesn't cover responsive patterns
3. ✓ Decision: Update existing rule with new section
4. ✓ Presentation:
   ```
   I've detected a table pattern that should be documented:
   **Responsive Table Behavior**: How tables should adapt on mobile devices
   
   This is an UPDATE to existing rule: .cursor/rules/mds-table-patterns.mdc
   
   I propose adding this section:
   
   ## Responsive Tables
   
   ```css
   .table-container {
     overflow-x: auto;
   }
   
   @media (max-width: 768px) {
     .table-actions {
       display: block;
       /* Stack buttons on mobile */
     }
   }
   ```
   
   This will be added as a new section in the "Common Patterns" area.
   
   Should I update this rule?
   ```

5. ✓ Wait for approval
6. ✓ After "yes": Update the file
7. ✓ Confirm:
   ```
   ✓ Updated rule: .cursor/rules/mds-table-patterns.mdc
   
   Added: Responsive table patterns section
   ```

## Quality Checklist

Before presenting a rule, verify:

- [ ] Description is clear and specific (under 200 characters)
- [ ] Frontmatter is correct (description, globs, alwaysApply)
- [ ] Rule name follows conventions (mds- prefix, kebab-case, under 40 chars)
- [ ] Includes both ✅ GOOD and ❌ BAD examples
- [ ] Examples show actual code, not pseudocode
- [ ] "Why This Matters" section explains consequences
- [ ] Rule is concise (under 200 lines preferred)
- [ ] No redundancy with existing rules
- [ ] Scope is appropriate (always apply vs file-specific)

## Remember

- **Never write files without explicit user approval**
- **Always check existing rules first** to avoid duplication
- **Be proactive**: Evaluate ALL MDS corrections for rule potential, even single instances
- **Use evaluation criteria**: Apply the 4-question test for one-off corrections
- **Be specific**: Good examples make rules actionable
- **Be consistent**: Follow established naming and structure conventions
- **Be helpful**: Explain why patterns matter, not just what they are
- **Ask, don't assume**: Present the suggestion and let the user decide
