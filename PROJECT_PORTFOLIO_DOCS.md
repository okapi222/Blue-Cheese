# Project Portfolio Manager

A comprehensive project tracking and resource allocation interface with drag-and-drop capabilities and multiple view modes.

## Features

### 1. Kanban Board View
- **Drag-and-Drop**: Cards can be dragged between status columns (Planning, In Progress, Review, Completed)
- **Status Columns**: Four columns representing project lifecycle stages
- **Card Reordering**: Projects can be reordered within the same column
- **Visual Feedback**: Smooth animations and drag overlay

### 2. Project Cards
Each project card displays:
- **Header**: Checkbox for selection, project name, update notifications badge, conflict warning icon
- **Description**: Brief project description
- **Client Information**: Client name
- **Priority Badge**: High/Medium/Low with color coding
- **Budget Tracking**: Spent vs total budget with formatted currency
- **Progress Bar**: Visual completion percentage
- **Team Members**: List of team members (first 3 shown, "+X more" for additional)
- **Timeline**: Start and end dates

### 3. List View Toggle
- **Kanban View**: Visual board with draggable cards
- **List View**: Sortable table with comprehensive project data
- **View Toggle Buttons**: Easy switching between views

### 4. Filtering & Sorting
- **Search**: Filter by project name or client
- **Status Filter**: Filter by project status (All, Planning, In Progress, Review, Completed)
- **Priority Filter**: Filter by priority level (All, High, Medium, Low)
- **Sort Options**: Sort by name, budget, completion, or end date

### 5. Project Detail Modal
Modal with tabbed interface:
- **Overview Tab**:
  - Project information grid (client, status, priority, timeline, budget, spent)
  - Full description
  - Progress bar with percentage
- **Team Tab**:
  - Resource allocation table
  - Team member names and roles
  - Allocation percentages
  - Status indicators (Available, At Capacity, Overallocated)
  - Conflict warnings for overallocated resources
- **Files Tab**:
  - File upload interface
  - Empty state with upload button
- **Activity Tab**:
  - Recent activity feed
  - User actions with timestamps
  - Visual activity items with icons

### 6. Resource Allocation Tracking
- **Allocation Percentages**: Track team member time allocation across projects
- **Status Badges**: 
  - Available (green): Under 80% allocated
  - At Capacity (yellow): 80-100% allocated
  - Overallocated (red): Over 100% allocated
- **Conflict Warnings**: Warning icons on cards with overallocated team members
- **Resource Table**: Detailed view in project modal

### 7. Notifications Badge
- **Update Counter**: Badge showing total number of unread updates across all projects
- **Project-Level Badges**: Individual badges on cards with updates
- **Visual Prominence**: Red error-style badge for visibility

### 8. Bulk Status Updates
- **Multi-Select**: Checkbox on each card for bulk selection
- **Select All**: Header checkbox to select all visible projects
- **Bulk Actions Bar**: Appears when projects are selected
  - Move to Planning
  - Move to In Progress
  - Move to Review
  - Move to Completed
  - Clear Selection
- **Selection Counter**: Shows number of selected projects

### 9. Responsive Design
- **Desktop**: Four-column kanban board, full table layout
- **Tablet**: Two-column kanban board, adjusted table
- **Mobile**: Single-column layout, stacked action buttons

## Technical Implementation

### Technologies Used
- **React 19**: Latest React features and hooks
- **@dnd-kit**: Modern drag-and-drop library
  - `@dnd-kit/core`: Core drag-and-drop functionality
  - `@dnd-kit/sortable`: Sortable list support
  - `@dnd-kit/utilities`: CSS transform utilities
- **MDS UI Components**: Button, Badge, Input, Select, Checkbox, Modal, Tabs
- **React Router**: Navigation and routing

### Key Components
1. **ProjectPortfolio**: Main page component
2. **SortableProjectCard**: Draggable project card with useSortable hook
3. **Tabs**: Reusable tabbed interface component (newly created)
4. **Modal**: Detail view with tabs and footer actions

### Data Structure
```typescript
type Project = {
  id: string
  name: string
  description: string
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed'
  priority: 'High' | 'Medium' | 'Low'
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: TeamMember[]
  completion: number
  client: string
  updates: number
}

type TeamMember = {
  id: string
  name: string
  role: string
  allocation: number
  status: 'Available' | 'At Capacity' | 'Overallocated'
}
```

### State Management
- **Local State**: All state managed with React useState
- **Derived State**: useMemo for filtered and sorted projects
- **Drag State**: @dnd-kit sensors and event handlers

### MDS Compliance
- **Typography**: McKinsey Sans for all text, proper sizing hierarchy
- **Colors**: MDS color tokens for all UI elements
- **Tables**: Proper table styling with MDS tokens, left-aligned content
- **Badges**: Semantic feedback colors (success, warning, error, info, neutral)
- **Spacing**: Consistent spacing using rem units
- **No Gradients**: Solid colors only for data visualization (progress bars)

## Usage

### Navigate to Page
1. Click "Project Portfolio" in the navigation sidebar
2. Or navigate to `/project-portfolio`

### View Projects
- Default view is Kanban board with all projects
- Use filters to narrow down projects
- Toggle to List view for tabular data

### Drag Projects
1. Click and hold on a project card
2. Drag to a different status column or reorder within column
3. Release to drop

### Select Multiple Projects
1. Click checkbox on project cards
2. Or use "Select All" checkbox in List view
3. Use bulk action buttons to update status
4. Click "Clear Selection" to deselect

### View Project Details
1. Click on a project card (anywhere except checkbox)
2. Modal opens with tabbed interface
3. Navigate tabs to see different information
4. Click "Close" or press Escape to exit

### Filter and Sort
1. Use search box to find projects by name or client
2. Select status filter to show specific statuses
3. Select priority filter to show specific priorities
4. Select sort option to reorder projects

## Accessibility
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader Labels**: Proper ARIA labels on controls
- **Focus Indicators**: Visible focus states on all controls
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Modal Management**: Escape key to close, focus trap

## Future Enhancements
- Real-time collaboration indicators
- File upload and management
- Advanced resource conflict resolution
- Project timeline Gantt chart view
- Export to PDF/Excel
- Project templates
- Custom fields and metadata
- Integration with external project management tools
