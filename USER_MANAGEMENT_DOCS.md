# User & Team Management Interface

A comprehensive admin panel for managing users, roles, and permissions built with the MDS design system.

## Features Implemented

### 1. Searchable & Filterable Data Table

- **Search Functionality**: Real-time search by user name or email
- **Status Filter**: Filter users by status (Active, Pending, Suspended, or All)
- **Responsive Table**: Horizontally scrollable on smaller screens with proper MDS table tokens
- **Empty State**: Displays friendly message when no users match the criteria

### 2. Inline Editing Capabilities

- **Role Assignment**: Inline dropdown in the table for quick role changes
- **Immediate Updates**: Changes reflect instantly in the data model
- **Validation**: Form validation ensures data integrity

### 3. Modal Dialogs

- **Add User Modal**: Full form for creating new users with validation
- **Edit User Modal**: Pre-populated form for editing existing user details
- **Form Validation**: Real-time validation with error messages for:
  - Required fields (name, email, role, team)
  - Email format validation
- **Keyboard Support**: ESC key closes modal, proper focus management

### 4. Nested Dropdowns for Role Assignment

- **Role Options**: Admin, Manager, Member, Viewer
- **Team Options**: Engineering, Product, Design, Operations, Marketing
- **Inline Updates**: Role changes directly in the table
- **Modal Forms**: Comprehensive role and team selection in add/edit modals

### 5. Batch Actions (Multi-Select)

- **Select All**: Checkbox in header to select/deselect all visible users
- **Individual Selection**: Checkbox for each user row
- **Indeterminate State**: Header checkbox shows indeterminate when some users are selected
- **Batch Operations**:
  - **Activate**: Set selected users to Active status
  - **Suspend**: Set selected users to Suspended status
  - **Delete**: Remove multiple users with confirmation
- **Selection Counter**: Shows number of selected users

### 6. Status Badges

Uses MDS feedback semantic colors for account states:

- **Active**: Success badge (green)
- **Pending**: Warning badge (yellow)
- **Suspended**: Error badge (red)

Badges are left-aligned in table cells following MDS table patterns.

### 7. Breadcrumb Navigation

- **Team Hierarchy**: Shows navigation path through nested team structures
- **Interactive**: Clickable breadcrumb items for navigation
- **Current Location**: Last item displayed as current page
- **Visual Separator**: Customizable separator character (default: `/`)

### 8. CRUD Operations

- **Create**: Add new users via modal form
- **Read**: View all users in searchable/filterable table
- **Update**: Edit user details via modal or inline role changes
- **Delete**: Remove individual users or batch delete with confirmation

## Component Architecture

### New UI Components Created

All components follow the MDS design system and are exported from `@ui`:

#### 1. Checkbox (`src/ui/Checkbox.tsx`)
- Size variants: `sm`, `md`
- States: checked, unchecked, indeterminate
- Fully accessible with keyboard support
- Uses MDS checkbox tokens

#### 2. Modal (`src/ui/Modal.tsx`)
- Size variants: `sm`, `md`, `lg`, `xl`
- Overlay with click-to-close
- ESC key support
- Header, body, and footer sections
- Animations for smooth transitions
- Uses MDS modal tokens

#### 3. Breadcrumb (`src/ui/Breadcrumb.tsx`)
- Interactive navigation items
- Customizable separator
- Keyboard accessible
- Uses MDS breadcrumb tokens

## File Structure

```
src/
├── ui/
│   ├── Checkbox.tsx          # Multi-select checkbox component
│   ├── checkbox.css          # Checkbox styles using MDS tokens
│   ├── Modal.tsx             # Modal dialog component
│   ├── modal.css             # Modal styles using MDS tokens
│   ├── Breadcrumb.tsx        # Breadcrumb navigation component
│   ├── breadcrumb.css        # Breadcrumb styles using MDS tokens
│   └── index.ts              # Updated exports
│
└── pages/
    ├── UserManagement.tsx    # Main user management page
    └── user-management.css   # Page-specific styles using MDS tokens
```

## Design System Compliance

### MDS Token Usage

- **Typography**: Uses `--mds-font-body` for all text (no Bower, as per rules)
- **Colors**: Feedback semantic colors for badges
- **Tables**: Follows MDS table patterns (no flexbox/grid in cells)
- **Spacing**: Consistent use of MDS spacing tokens
- **Elevation**: Modal uses MDS elevation tokens

### Accessibility

- Semantic HTML throughout
- ARIA labels and attributes where needed
- Keyboard navigation support
- Focus management in modals
- Proper form labels and error messages

### Table Best Practices

Following `.cursor/rules/mds-table-patterns.mdc`:

- ✅ No flexbox or grid in table cells
- ✅ Uses natural inline flow for action buttons
- ✅ Left-aligned badges and content (default)
- ✅ Vertical-align: middle for all cells
- ✅ Uses margin instead of gap for button spacing
- ✅ All MDS table tokens properly applied

## Usage

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or next available port).

### Importing Components

```typescript
import {
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
  Modal,
  Breadcrumb
} from '@ui'
```

### Sample Data

The page includes 8 mock users with various roles, teams, and statuses for demonstration purposes.

## Key Features Demonstrated

### Form Validation

- Required field validation
- Email format validation
- Real-time error display
- Error clearing on valid input

### State Management

- React hooks for all state management
- Efficient filtering with `useMemo`
- Controlled components throughout
- Proper form state handling

### Permission Logic

The foundation is in place for permission-based UI:
- Role-based data structure
- Status-based user access control
- Team hierarchy support via breadcrumbs

## Future Enhancements

Potential additions to extend functionality:

- Role-based permissions for actions
- Advanced filtering (by team, role, date range)
- Sorting by column headers
- Pagination for large datasets
- Export functionality
- Audit log for user changes
- Team hierarchy tree view
- User profile images/avatars
- Last login tracking
- Bulk import/export

## Testing Recommendations

1. **Search**: Test search with various queries
2. **Filtering**: Verify status filter combinations
3. **Batch Operations**: Select multiple users and test batch actions
4. **Form Validation**: Test all validation rules
5. **Modal Interactions**: Test keyboard shortcuts and overlay clicks
6. **Inline Editing**: Change roles directly in the table
7. **Responsive**: Test on different screen sizes

## Notes

- All UI components use raw HTML controls only in `src/ui/` (following MDS facade pattern)
- Application code imports exclusively from `@ui` alias
- No custom HTML controls in page code
- Ready for MDS NPM package integration (minimal refactoring needed)
