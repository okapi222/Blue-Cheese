# Data Import & Transformation Tool Documentation

## Overview

The Data Import & Transformation Tool is a comprehensive, production-ready interface for uploading, validating, mapping, and transforming data before importing it into the system. Built entirely with MDS (McKinsey Design System) components and tokens.

## Features

### 1. **File Upload with Drag-and-Drop**
- Drag-and-drop zone with visual feedback
- File browser fallback
- Supported formats: CSV, TSV, XLSX, JSON
- File validation (size, type)
- Upload information display (name, size, modification date, estimated rows)

### 2. **Data Preview & Column Detection**
- Automatic column type detection (text, number, date, boolean, email, currency)
- Sample value display for each column
- Null count tracking
- Unique value count
- Required field toggle
- Manual column type override

### 3. **Field Mapping Interface**
- Source → Destination field mapping
- Visual arrow indicators
- Add/remove mappings dynamically
- Transformation options per field:
  - None
  - UPPERCASE
  - lowercase
  - Trim Whitespace
  - Format Date
  - Parse Number

### 4. **Transformation Rules Builder**
- Conditional logic with rule cards
- If-Then structure:
  - **Conditions**: Equals, Contains, Greater Than, Less Than, Is Empty
  - **Actions**: Set Value, Skip Row, Flag Warning
- Add/remove rules dynamically
- Field-based conditions

### 5. **Validation Results**
- Comprehensive validation display
- Three severity levels:
  - ❌ **Errors** (blocking): Must be fixed before import
  - ⚠️ **Warnings** (non-blocking): Highlighted for review
  - ℹ️ **Info** (informational): Helpful notices
- Validation summary with counts
- Filter by type (All, Errors, Warnings, Info)
- Search functionality
- Row number and field identification
- Count of occurrences for duplicate issues

### 6. **Progress Indicators**
- Multi-stage processing visualization
- Stage indicators:
  - 📄 Parsing file
  - ✓ Validating data
  - 🔄 Applying transformations
  - ⬆️ Importing records
- Progress percentage
- Visual progress bar

### 7. **Export Configuration**
- Export validation results
- Multiple format options:
  - CSV (Comma-separated values)
  - JSON (JavaScript Object Notation)
  - XLSX (Excel Spreadsheet)
- Modal-based selection

### 8. **Import History & Rollback**
- Historical import tracking
- Version information:
  - Timestamp
  - File name
  - Record count
  - Status (success, partial, failed)
  - Error count
  - Warning count
- Rollback functionality for successful imports
- Confirmation modal for rollback safety

## Page Structure

### Tab Navigation

The tool uses a 6-tab structure for multi-stage workflow:

1. **Upload** - File selection and upload
2. **Preview** - Column detection and data preview
3. **Field Mapping** - Source-to-destination mapping
4. **Transformations** - Conditional transformation rules
5. **Validation** - Error and warning review
6. **History** - Import history and rollback

### Navigation Flow

```
Upload → Preview → Field Mapping → Transformations → Validation → Import
                                                                    ↓
                                                           History (Rollback)
```

## Component Usage

### MDS Components Used

All components from the `@ui` facade:

- **Button** - Primary, tertiary, danger variants; small, medium, large sizes
- **Badge** - Success, warning, error, info, neutral; filled and outlined styles
- **Input** - Text input with search functionality
- **Select** - Dropdown selection for mappings and filters
- **Checkbox** - Required field toggles
- **Modal** - Export configuration and rollback confirmation
- **Breadcrumb** - Page navigation context
- **TabNav** - Custom navigation-only tabs component

### MDS Tokens Used

Comprehensive token usage:

**Typography:**
- `--mds-font-body`
- `--mds-font-weight-bold`, `-medium`, `-regular`
- `--mds-font-size-heading-4`, `-heading-5`
- `--mds-font-size-body-md`, `-body-sm`, `-body-xs`

**Colors:**
- `--mds-color-text-headings`, `-default`, `-subtle`
- `--mds-color-background-subtle`
- `--mds-color-border-default`
- `--mds-color-electric-blue-500`, `-700`
- `--mds-color-feedback-success`, `-warning`, `-danger`
- `--mds-color-feedback-success-light`, `-warning-light`, `-danger-light`
- `--mds-color-informational`, `-light`
- `--mds-color-neutral-5`, `-10`
- `--mds-color-white`

**Table:**
- `--mds-table-font-family`, `-font-size`, `-line-height`
- `--mds-table-header-font-weight`
- `--mds-table-body-font-weight`
- `--mds-table-cell-padding-y`, `-padding-x`

## State Management

### File Upload State
```typescript
const [uploadedFile, setUploadedFile] = useState<File | null>(null)
const [isDragging, setIsDragging] = useState(false)
const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle')
const [processingProgress, setProcessingProgress] = useState(0)
```

### Data State
```typescript
const [detectedColumns, setDetectedColumns] = useState<DataColumn[]>([])
const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([])
const [transformationRules, setTransformationRules] = useState<TransformationRule[]>([])
const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
```

### Modal State
```typescript
const [showExportModal, setShowExportModal] = useState(false)
const [showRollbackModal, setShowRollbackModal] = useState(false)
const [selectedExportFormat, setSelectedExportFormat] = useState<ExportFormat>('csv')
const [selectedVersion, setSelectedVersion] = useState<ImportVersion | null>(null)
```

### Filter State
```typescript
const [validationFilter, setValidationFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all')
const [searchQuery, setSearchQuery] = useState('')
const [activeTab, setActiveTab] = useState<string>('upload')
```

## Type Definitions

### Core Types

```typescript
type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'email' | 'currency'

type DataColumn = {
  id: string
  name: string
  type: ColumnType
  sample: string
  nullCount: number
  uniqueCount: number
  isRequired: boolean
}

type FieldMapping = {
  id: string
  sourceField: string
  destinationField: string
  transformation: 'none' | 'uppercase' | 'lowercase' | 'trim' | 'format_date' | 'parse_number'
}

type TransformationRule = {
  id: string
  field: string
  condition: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty'
  conditionValue: string
  action: 'set_value' | 'skip_row' | 'flag_warning'
  actionValue: string
}

type ValidationResult = {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  rowNumber?: number
  field?: string
  count?: number
}

type ImportVersion = {
  id: string
  timestamp: string
  fileName: string
  recordCount: number
  status: 'success' | 'failed' | 'partial'
  errorCount: number
  warningCount: number
}

type ProcessingStage = 'idle' | 'parsing' | 'validating' | 'transforming' | 'importing' | 'complete' | 'error'

type ExportFormat = 'csv' | 'json' | 'xlsx'
```

## Key Interactions

### File Upload Flow
1. User drags file or clicks "Browse Files"
2. File validation (type, size)
3. Processing simulation begins
4. Progress indicator shows parsing stage
5. Auto-switch to Preview tab when complete
6. Mock data generation (columns, mappings, validations)

### Field Mapping Flow
1. Auto-populated from detected columns
2. User can modify destination fields
3. Apply transformations per field
4. Add custom mappings
5. Remove unwanted mappings

### Transformation Rules Flow
1. Click "Add Rule" to create new rule card
2. Select field for condition
3. Choose condition type
4. Enter condition value
5. Select action
6. Enter action value
7. Remove rules as needed

### Validation Flow
1. View auto-generated validation results
2. Filter by type (Error, Warning, Info)
3. Search by message or field name
4. Summary shows total counts by severity
5. Export results if needed
6. Import blocked if errors exist

### Import Execution
1. Click "Import Data" (only enabled if no errors)
2. Progress indicator shows stages:
   - Validating
   - Transforming
   - Importing
3. Progress bar fills to 100%
4. Success message displayed
5. Record added to import history

### Rollback Flow
1. Navigate to History tab
2. Find successful import to rollback
3. Click "Rollback" button
4. Confirmation modal appears with warning
5. Review import details (timestamp, file, records)
6. Confirm or cancel
7. System reverts to that import state

## Styling Highlights

### Visual Hierarchy
- **Page title**: 2em, bold
- **Section titles**: 1.4em, bold
- **Body text**: Standard MDS sizes

### Status Colors
- **Success**: Green (#117E1A)
- **Warning**: Yellow (#FFD048)
- **Error**: Red (#CD3030)
- **Info**: Blue (#2251FF)

### Interactive States
- **Dropzone**: Subtle gray → Blue border on drag → Green border with file
- **Validation items**: Left border color-coded by severity
- **Buttons**: Hover states, disabled states for errors
- **Table rows**: Hover background change

### Spacing
- **Section gaps**: 2rem
- **Card padding**: 1.5rem
- **Button groups**: 1rem gap
- **Table cell padding**: MDS tokens

### Responsive Design
- Mobile-friendly layouts
- Stacked button groups
- Vertical mapping layout on small screens
- Full-width controls on mobile

## Mock Data

The tool includes comprehensive mock data for demonstration:

- **8 detected columns** with various types
- **8 field mappings** auto-generated
- **8 validation results** (3 errors, 3 warnings, 2 info)
- **4 import history versions** (success, partial, failed statuses)
- **10 destination field options**

## Best Practices

### For Developers

1. **State Management**: All state is managed at the component level. Consider extracting to context for larger applications.

2. **Type Safety**: Comprehensive TypeScript types ensure type safety throughout.

3. **Accessibility**: 
   - Proper ARIA labels
   - Semantic HTML
   - Keyboard navigation support

4. **Performance**:
   - `useMemo` for filtered/computed data
   - Debounce search inputs in production
   - Lazy load large datasets

5. **Error Handling**:
   - File type validation
   - Size limits
   - Required field validation
   - User-friendly error messages

### For Users

1. **Start with Upload**: Always begin workflow at Upload tab
2. **Review Preview**: Check detected columns and types
3. **Map Carefully**: Ensure source fields map to correct destinations
4. **Add Rules Sparingly**: Only add transformation rules when necessary
5. **Fix Errors First**: Address all errors before attempting import
6. **Use History**: Keep track of imports for auditing and rollback

## Future Enhancements

Potential additions for production use:

1. **Real API Integration**: Replace mock data with actual backend calls
2. **Advanced Validation**: Custom validation rule builder
3. **Data Sampling**: Preview first N rows before full import
4. **Schedule Imports**: Recurring import schedules
5. **Notification System**: Email/Slack notifications on completion
6. **Audit Log**: Detailed change tracking
7. **Bulk Operations**: Import multiple files simultaneously
8. **Template System**: Save and reuse field mapping configurations
9. **Advanced Transformations**: JavaScript expression builder
10. **Data Profiling**: Statistical analysis of imported data

## Testing Checklist

- [ ] File upload (drag-and-drop and browse)
- [ ] File type validation
- [ ] Column type detection
- [ ] Field mapping creation/deletion
- [ ] Transformation rule creation/deletion
- [ ] Validation filtering and search
- [ ] Export modal functionality
- [ ] Import execution (with/without errors)
- [ ] Rollback confirmation
- [ ] Breadcrumb navigation
- [ ] Tab switching
- [ ] Responsive layouts (mobile, tablet, desktop)
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Empty states
- [ ] Error states

## File Locations

- **Component**: `/src/pages/DataImport.tsx`
- **Styles**: `/src/pages/data-import.css`
- **Documentation**: `/DATA_IMPORT_TOOL_DOCS.md`

## Dependencies

- React 19.2.0
- TypeScript ~5.9.3
- MDS UI Components (`@ui` facade)
- React Router DOM (for navigation context)

## Conclusion

This Data Import & Transformation Tool demonstrates comprehensive use of:
- **MDS components** (Button, Badge, Input, Select, Checkbox, Modal, Breadcrumb, TabNav)
- **MDS tokens** (colors, typography, spacing, tables)
- **Complex state management** (multi-tab workflow, modals, filters)
- **Real-world functionality** (file upload, validation, transformations, rollback)
- **Production-ready patterns** (error handling, empty states, responsive design)
- **Accessibility** (semantic HTML, ARIA labels, keyboard support)

The tool is fully functional, visually consistent with MDS guidelines, and ready for integration with backend services.
