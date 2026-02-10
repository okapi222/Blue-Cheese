# Data Import & Transformation Tool - Documentation

## Overview
A comprehensive data import and transformation interface that demonstrates complex MDS patterns including file handling, data transformation, validation feedback, error handling, and multi-stage processing.

## URL
`http://localhost:5173/data-import`

## Features Implemented

### 1. File Upload with Drag-and-Drop Zone
- Visual drag-and-drop interface with active state styling
- File input fallback for traditional file selection
- Supported formats: CSV, TSV, XLSX, JSON
- File information display (name, size)
- Remove file functionality

### 2. Data Preview Table with Column Type Detection
- Automatic column type detection (text, number, date, boolean, email)
- Preview of sample values from each column
- Null count and unique value statistics
- Visual type indicators with icons and badges
- Column type editing capability

### 3. Field Mapping Interface (Source → Destination)
- Table-based mapping interface
- Editable destination field names
- Transformation selection per field
- Add/remove mapping capabilities
- Inline transformation options:
  - No Transformation
  - Trim Whitespace
  - Convert to Uppercase/Lowercase/Title Case
  - Remove Special Characters

### 4. Transformation Rules Builder with Conditional Logic
- Rule-based transformation system
- Conditional expressions (e.g., "revenue > 1000")
- Action specifications (e.g., "flag_high_value", "skip_record")
- Field-specific rules
- Add/edit/delete rule functionality

### 5. Validation Results with Error/Warning Badges
- Comprehensive validation feedback
- Three severity levels:
  - **Error** (danger badge): Critical issues requiring fixes
  - **Warning** (warning badge): Issues to review
  - **Info** (info badge): Informational messages
- Filter by validation type
- Row number and field identification
- Detailed error messages
- "View Details" and "Fix" actions

### 6. Progress Indicator for Processing
- Visual progress bar with percentage
- Animated progress display
- Processing status messages
- Automatic navigation to preview on completion

### 7. Export Configuration with Format Options
- Modal-based export configuration
- Multiple export formats:
  - CSV (Comma-Separated)
  - TSV (Tab-Separated)
  - JSON
  - Excel (XLSX)
  - Parquet
- Header inclusion option
- Export summary with record counts

### 8. Rollback/Versioning for Imports
- Import history tracking
- Version details:
  - Timestamp
  - File name
  - Record count
  - Status (success/failed/partial)
- Rollback functionality for successful imports
- Download previous versions
- View details for each import

## Tab-Based Navigation
The interface uses a multi-stage tab workflow:

1. **Upload** - File selection and upload
2. **Preview** - Data preview with column analysis
3. **Mapping** - Field mapping configuration
4. **Transform** - Transformation rules setup
5. **Validate** - Validation results review
6. **History** - Import history and rollback

## MDS Components Used

### From @ui
- **Button** - Various states (primary, secondary, tertiary, danger) and sizes
- **Badge** - Status indicators with semantic colors (success, warning, danger, info, neutral)
- **Input** - Text input for destination field mapping
- **Select** - Dropdown for transformation and format selection
- **Checkbox** - Options like "Include headers"
- **Modal** - Export configuration dialog
- **Breadcrumb** - Navigation trail
- **Tabs** - Multi-stage workflow navigation

### MDS Design Patterns

#### Typography
- Page title: 2em (McKinsey Sans Bold)
- Page subtitle: 1.2em (McKinsey Sans Regular)
- Section title: 1.4em (McKinsey Sans Bold)
- Follows left-aligned layout pattern

#### Tables
- Uses MDS table tokens for consistent styling
- Left-aligned content (text, badges, icons)
- Natural inline-block flow (no flexbox in cells)
- Margin-based spacing for action buttons
- Fixed table layout for complex data

#### Badge Colors
Uses feedback semantic colors:
- Success: `--mds-color-feedback-success`
- Warning: `--mds-color-feedback-warning`
- Danger: `--mds-color-feedback-danger`
- Info: `--mds-color-informational`
- Neutral: `--mds-color-feedback-neutral`

#### Spacing
- Consistent use of MDS spacing tokens
- Responsive padding and margins
- Visual hierarchy through spacing

## Code Structure

### Files Created
1. `/src/pages/DataImport.tsx` - Main component (764 lines)
2. `/src/pages/data-import.css` - Component styles

### Files Modified
1. `/src/App.tsx` - Added route and import
2. `/src/components/Navigation.tsx` - Added navigation link

## Mock Data
The page uses realistic mock data to demonstrate functionality:
- 6 data columns with varied types
- 150 records
- 5 validation results (2 errors, 2 warnings, 1 info)
- 4 import versions with different statuses

## Complexity Highlights

### Multi-Stage Processing
The page demonstrates a complete data import workflow:
1. Upload → 2. Parse → 3. Preview → 4. Map → 5. Transform → 6. Validate → 7. Export

### State Management
Complex state handling including:
- File upload state
- Processing progress
- Tab navigation
- Modal visibility
- Filter states
- Form data (mappings, rules)

### Interactive Features
- Drag-and-drop file handling
- Dynamic filtering
- Inline editing
- Modal dialogs
- Progress tracking

### Error Handling
- Validation feedback at multiple levels
- Disabled states for invalid actions
- Visual error indicators
- Detailed error messages

## Responsive Design
Mobile-friendly responsive breakpoints:
- Stacked action buttons on small screens
- Horizontal scroll for data tables
- Flexible filters and controls

## Testing Scenarios

### Upload Flow
1. Visit `/data-import`
2. Drag a file or click "Browse Files"
3. Watch progress indicator
4. Automatically navigate to Preview tab

### Mapping Workflow
1. Navigate to Mapping tab
2. Edit destination field names
3. Select transformations
4. Add/remove mappings

### Validation Filtering
1. Go to Validation tab
2. Click filter buttons (All/Errors/Warnings/Info)
3. Review filtered results

### Export Configuration
1. Complete validation (or have no errors)
2. Click "Export Data"
3. Configure format and options
4. Review summary and export

### Version History
1. Navigate to History tab
2. View past imports
3. Test Rollback and Download buttons

## Design System Compliance

✅ Uses `@ui` imports exclusively
✅ No raw HTML controls in component code
✅ MDS typography tokens (McKinsey Sans for all text)
✅ MDS color tokens (feedback colors for badges)
✅ MDS spacing tokens
✅ MDS table patterns (no flexbox in cells, left-aligned)
✅ Semantic HTML and accessibility
✅ Consistent button variants and sizes

## Browser Compatibility
Tested patterns work in modern browsers:
- Chrome/Edge
- Firefox
- Safari

## Next Steps (Future Enhancements)
- Real file parsing integration
- Backend API connections
- Advanced transformation expressions
- Real-time validation during mapping
- Undo/redo functionality
- Batch import capabilities
- Data quality scoring
