---
name: badge-variant-selection
description: Determines whether to use outline or fill badge variants based on their relationship to buttons in organizing units. Use when implementing badges alongside buttons in tables, cards, widgets, or other UI components.
---

# Badge Variant Selection

## Core Rule

Badge variant selection depends on whether the badge shares an organizing unit with a button:

- **Outline variant**: Badge is in the SAME organizing unit as a button
- **Fill variant**: Badge is NOT in the same organizing unit as a button

## Organizing Units

An organizing unit is a distinct visual container or grouping that holds related elements:

- **Table row**: A single row in a data table
- **Card**: A card component containing related information
- **Dashboard widget**: A panel or widget on a dashboard
- **List item**: An item in a list component
- **Form section**: A section within a form

## Examples

### ✅ Use Outline Variant (Same Organizing Unit)

**Table row with badge and action buttons:**
```tsx
<tr>
  <td>Project Alpha</td>
  <td>
    <Badge variant="outline-success">Active</Badge>
  </td>
  <td className="table-actions">
    <Button variant="tertiary" size="sm">View</Button>
    <Button variant="tertiary" size="sm">Edit</Button>
  </td>
</tr>
```

**Card with status badge and action button:**
```tsx
<Card>
  <div className="card-header">
    <h3>User Profile</h3>
    <Badge variant="outline-warning">Pending</Badge>
  </div>
  <div className="card-body">
    <p>User information...</p>
  </div>
  <div className="card-footer">
    <Button variant="primary">Approve</Button>
  </div>
</Card>
```

**Dashboard widget with badge and controls:**
```tsx
<div className="widget">
  <div className="widget-header">
    <h3>System Status</h3>
    <Badge variant="outline-success">Online</Badge>
    <Button variant="tertiary" size="sm">Refresh</Button>
  </div>
  <div className="widget-content">
    {/* widget content */}
  </div>
</div>
```

### ✅ Use Fill Variant (Different Organizing Units)

**Table with badges but no action buttons in rows:**
```tsx
<tr>
  <td>Project Beta</td>
  <td>
    <Badge variant="success">Completed</Badge>
  </td>
  <td>2025-02-11</td>
</tr>
```

**Status list without action buttons:**
```tsx
<ul className="status-list">
  <li>
    <span>Service A</span>
    <Badge variant="success">Running</Badge>
  </li>
  <li>
    <span>Service B</span>
    <Badge variant="danger">Stopped</Badge>
  </li>
</ul>
```

**Badge in one card, button in a different card:**
```tsx
<div className="dashboard">
  <Card>
    <h3>Status Overview</h3>
    <Badge variant="success">All Systems Operational</Badge>
  </Card>
  
  <Card>
    <h3>Quick Actions</h3>
    <Button variant="primary">Deploy</Button>
  </Card>
</div>
```

## Decision Flow

When implementing a badge:

1. **Identify the organizing unit** - What container holds this badge? (row, card, widget, etc.)
2. **Check for buttons** - Are there any buttons within the SAME organizing unit?
3. **Select variant**:
   - Buttons in same unit → `outline` variant
   - No buttons in same unit → `fill` variant

## Common Patterns

### Table Rows
- **With action column**: Use `outline` variants for status badges
- **Without action column**: Use `fill` variants for status badges

### Cards
- **With card actions**: Use `outline` variants for status badges
- **Without card actions**: Use `fill` variants for status badges

### Dashboard Widgets
- **With widget controls**: Use `outline` variants
- **Display-only widgets**: Use `fill` variants

## Why This Matters

- **Visual Hierarchy**: Outline badges are subtler when competing with buttons for attention
- **Consistency**: Predictable pattern across the application
- **Balance**: Fill badges stand out more in button-free contexts where they're the primary interactive visual element