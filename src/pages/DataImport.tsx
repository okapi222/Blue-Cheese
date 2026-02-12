import { useState, useMemo, useRef } from 'react'
import {
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
  Modal,
  Breadcrumb,
  TabNav,
  Icon
} from '@ui'
import type {
  BadgeVariant,
  SelectOption,
  BreadcrumbItem,
  TabNavItem,
  IconName
} from '@ui'
import './data-import.css'

// ============================================
// TYPE DEFINITIONS
// ============================================

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

// ============================================
// MOCK DATA
// ============================================

const MOCK_DESTINATION_FIELDS: SelectOption[] = [
  { value: 'customer_id', label: 'Customer ID' },
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'email', label: 'Email Address' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'signup_date', label: 'Signup Date' },
  { value: 'revenue', label: 'Revenue Amount' },
  { value: 'is_active', label: 'Active Status' },
  { value: 'country', label: 'Country' },
  { value: 'state', label: 'State/Province' }
]

const MOCK_IMPORT_HISTORY: ImportVersion[] = [
  {
    id: '1',
    timestamp: '2026-02-10 14:32:00',
    fileName: 'customers_feb_2026.csv',
    recordCount: 1547,
    status: 'success',
    errorCount: 0,
    warningCount: 3
  },
  {
    id: '2',
    timestamp: '2026-02-09 09:15:00',
    fileName: 'customers_jan_2026.xlsx',
    recordCount: 1423,
    status: 'partial',
    errorCount: 12,
    warningCount: 45
  },
  {
    id: '3',
    timestamp: '2026-02-08 16:20:00',
    fileName: 'customers_dec_2025.csv',
    recordCount: 2103,
    status: 'success',
    errorCount: 0,
    warningCount: 8
  },
  {
    id: '4',
    timestamp: '2026-02-05 11:45:00',
    fileName: 'bad_data.csv',
    recordCount: 0,
    status: 'failed',
    errorCount: 234,
    warningCount: 0
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

function getColumnTypeIcon(type: ColumnType): IconName {
  const icons: Record<ColumnType, IconName> = {
    text: 'text',
    number: 'number',
    date: 'calendar',
    boolean: 'boolean',
    email: 'email',
    currency: 'currency'
  }
  return icons[type] || 'document'
}

function getValidationBadgeVariant(type: ValidationResult['type']): BadgeVariant {
  const variants: Record<ValidationResult['type'], BadgeVariant> = {
    error: 'error',
    warning: 'warning',
    info: 'info'
  }
  return variants[type]
}

function getStatusBadgeVariant(status: ImportVersion['status']): BadgeVariant {
  const variants: Record<ImportVersion['status'], BadgeVariant> = {
    success: 'success',
    partial: 'warning',
    failed: 'error'
  }
  return variants[status]
}

// ============================================
// MAIN COMPONENT
// ============================================

export function DataImport() {
  // State management
  const [activeTab, setActiveTab] = useState<string>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle')
  const [processingProgress, setProcessingProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Data state
  const [detectedColumns, setDetectedColumns] = useState<DataColumn[]>([])
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([])
  const [transformationRules, setTransformationRules] = useState<TransformationRule[]>([])
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [importHistory] = useState<ImportVersion[]>(MOCK_IMPORT_HISTORY)

  // Modal states
  const [showExportModal, setShowExportModal] = useState(false)
  const [showRollbackModal, setShowRollbackModal] = useState(false)
  const [selectedExportFormat, setSelectedExportFormat] = useState<ExportFormat>('csv')
  const [selectedVersion, setSelectedVersion] = useState<ImportVersion | null>(null)

  // Filters and search
  const [validationFilter, setValidationFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // ============================================
  // FILE UPLOAD HANDLERS
  // ============================================

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    simulateFileProcessing(file)
  }

  const simulateFileProcessing = (file: File) => {
    setProcessingStage('parsing')
    setProcessingProgress(0)
    setActiveTab('preview')

    // Simulate parsing progress
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessingStage('complete')
          generateMockData()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const generateMockData = () => {
    // Generate mock detected columns
    const columns: DataColumn[] = [
      { id: '1', name: 'customer_id', type: 'number', sample: '10234', nullCount: 0, uniqueCount: 150, isRequired: true },
      { id: '2', name: 'first_name', type: 'text', sample: 'John', nullCount: 2, uniqueCount: 148, isRequired: true },
      { id: '3', name: 'last_name', type: 'text', sample: 'Doe', nullCount: 2, uniqueCount: 145, isRequired: true },
      { id: '4', name: 'email_address', type: 'email', sample: 'john.doe@example.com', nullCount: 5, uniqueCount: 145, isRequired: true },
      { id: '5', name: 'phone_number', type: 'text', sample: '+1-555-0123', nullCount: 15, uniqueCount: 135, isRequired: false },
      { id: '6', name: 'signup_date', type: 'date', sample: '2026-01-15', nullCount: 0, uniqueCount: 87, isRequired: true },
      { id: '7', name: 'revenue', type: 'currency', sample: '$1,234.56', nullCount: 12, uniqueCount: 143, isRequired: false },
      { id: '8', name: 'is_active', type: 'boolean', sample: 'true', nullCount: 0, uniqueCount: 2, isRequired: true },
    ]
    setDetectedColumns(columns)

    // Auto-generate field mappings
    const mappings: FieldMapping[] = columns.map((col) => ({
      id: col.id,
      sourceField: col.name,
      destinationField: col.name.replace('_address', '').replace('_number', ''),
      transformation: 'none'
    }))
    setFieldMappings(mappings)

    // Generate mock validation results
    const validations: ValidationResult[] = [
      { id: '1', type: 'error', message: 'Invalid email format', rowNumber: 23, field: 'email_address', count: 1 },
      { id: '2', type: 'error', message: 'Duplicate customer_id found', rowNumber: 45, field: 'customer_id', count: 1 },
      { id: '3', type: 'error', message: 'Required field is empty', rowNumber: 67, field: 'first_name', count: 1 },
      { id: '4', type: 'warning', message: 'Revenue value exceeds typical range ($50,000)', rowNumber: 89, field: 'revenue', count: 1 },
      { id: '5', type: 'warning', message: 'Phone number format inconsistent', rowNumber: 102, field: 'phone_number', count: 1 },
      { id: '6', type: 'warning', message: 'Missing optional field', field: 'phone_number', count: 15 },
      { id: '7', type: 'info', message: 'Date format auto-detected as YYYY-MM-DD', field: 'signup_date', count: 1 },
      { id: '8', type: 'info', message: 'Boolean values normalized to true/false', field: 'is_active', count: 1 },
    ]
    setValidationResults(validations)
  }

  // ============================================
  // FIELD MAPPING HANDLERS
  // ============================================

  const handleMappingChange = (mappingId: string, field: 'destinationField' | 'transformation', value: string) => {
    setFieldMappings((prev) =>
      prev.map((mapping) =>
        mapping.id === mappingId ? { ...mapping, [field]: value } : mapping
      )
    )
  }

  const handleAddMapping = () => {
    const newMapping: FieldMapping = {
      id: `new-${Date.now()}`,
      sourceField: '',
      destinationField: '',
      transformation: 'none'
    }
    setFieldMappings([...fieldMappings, newMapping])
  }

  const handleRemoveMapping = (mappingId: string) => {
    setFieldMappings((prev) => prev.filter((m) => m.id !== mappingId))
  }

  // ============================================
  // TRANSFORMATION RULE HANDLERS
  // ============================================

  const handleAddRule = () => {
    const newRule: TransformationRule = {
      id: `rule-${Date.now()}`,
      field: '',
      condition: 'equals',
      conditionValue: '',
      action: 'set_value',
      actionValue: ''
    }
    setTransformationRules([...transformationRules, newRule])
  }

  const handleRemoveRule = (ruleId: string) => {
    setTransformationRules((prev) => prev.filter((r) => r.id !== ruleId))
  }

  const handleRuleChange = (ruleId: string, field: keyof TransformationRule, value: string) => {
    setTransformationRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule
      )
    )
  }

  // ============================================
  // IMPORT EXECUTION
  // ============================================

  const handleImport = () => {
    setProcessingStage('importing')
    setProcessingProgress(0)

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessingStage('complete')
          alert('Import completed successfully!')
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleRollback = (version: ImportVersion) => {
    setSelectedVersion(version)
    setShowRollbackModal(true)
  }

  const confirmRollback = () => {
    if (selectedVersion) {
      alert(`Rolling back to import from ${selectedVersion.timestamp}`)
      setShowRollbackModal(false)
      setSelectedVersion(null)
    }
  }

  // ============================================
  // FILTERED DATA
  // ============================================

  const filteredValidations = useMemo(() => {
    return validationResults.filter((validation) => {
      const matchesType = validationFilter === 'all' || validation.type === validationFilter
      const matchesSearch =
        searchQuery === '' ||
        validation.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        validation.field?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [validationResults, validationFilter, searchQuery])

  const validationSummary = useMemo(() => {
    return {
      errors: validationResults.filter((v) => v.type === 'error').length,
      warnings: validationResults.filter((v) => v.type === 'warning').length,
      info: validationResults.filter((v) => v.type === 'info').length
    }
  }, [validationResults])

  // ============================================
  // BREADCRUMB
  // ============================================

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Data Management', href: '#' },
    { label: 'Import & Transform' }
  ]

  // ============================================
  // TABS
  // ============================================

  const tabs: TabNavItem[] = [
    { id: 'upload', label: 'Upload' },
    { id: 'preview', label: 'Preview' },
    { id: 'mapping', label: 'Field Mapping' },
    { id: 'transformations', label: 'Transformations' },
    { id: 'validation', label: 'Validation' },
    { id: 'history', label: 'History' }
  ]

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="data-import-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Data Import & Transformation</h1>
        <p className="page-subtitle">Upload, map, transform, and validate your data with comprehensive tools</p>
      </div>

      {/* Tab Navigation */}
      <TabNav items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Processing Indicator (shown when processing) */}
      {processingStage !== 'idle' && processingStage !== 'complete' && (
        <div className="processing-banner">
          <div className="processing-info">
            <span className="processing-stage">
              {processingStage === 'parsing' && '📄 Parsing file...'}
              {processingStage === 'validating' && '✓ Validating data...'}
              {processingStage === 'transforming' && '🔄 Applying transformations...'}
              {processingStage === 'importing' && '⬆️ Importing records...'}
            </span>
            <span className="processing-percentage">{processingProgress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${processingProgress}%` }} />
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'upload' && (
        <div className="tab-content">
          <div
            className={`dropzone ${isDragging ? 'dropzone--active' : ''} ${uploadedFile ? 'dropzone--has-file' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="dropzone-content">
                <div className="file-icon">
                  <Icon name="document" size="xl" />
                </div>
                <p className="file-name">{uploadedFile.name}</p>
                <p className="file-size">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                <p className="file-type">Type: {uploadedFile.type || 'Unknown'}</p>
                <div className="file-actions">
                  <Button variant="tertiary" size="sm" onClick={() => setUploadedFile(null)}>
                    Remove File
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('preview')}>
                    Continue to Preview
                  </Button>
                </div>
              </div>
            ) : (
              <div className="dropzone-content">
                <h3 className="dropzone-title">Drag and drop your file here</h3>
                <p className="dropzone-subtitle">or</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="file-input"
                  accept=".csv,.tsv,.xlsx,.json"
                  onChange={handleFileSelect}
                />
                <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                  Browse Files
                </Button>
                <p className="supported-formats">
                  Supported formats: CSV, TSV, XLSX, JSON (Max 50MB)
                </p>
              </div>
            )}
          </div>

          {uploadedFile && (
            <div className="upload-info-panel">
              <h3 className="panel-title">Upload Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">File Name:</span>
                  <span className="info-value">{uploadedFile.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">File Size:</span>
                  <span className="info-value">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Modified:</span>
                  <span className="info-value">{new Date(uploadedFile.lastModified).toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Estimated Rows:</span>
                  <span className="info-value">~150 rows</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="tab-content">
          <div className="section-header">
            <div>
              <h2 className="section-title">Data Preview</h2>
              <p className="section-description">
                {detectedColumns.length} columns detected, 150 rows loaded
              </p>
            </div>
            <Button variant="primary" onClick={() => setActiveTab('mapping')}>
              Continue to Mapping
            </Button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Detected Type</th>
                  <th>Sample Value</th>
                  <th>Null Count</th>
                  <th>Unique Values</th>
                  <th>Required</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {detectedColumns.map((column) => (
                  <tr key={column.id}>
                    <td>
                      <code className="column-name">{column.name}</code>
                    </td>
                    <td>
                      <Badge variant="info" badgeStyle="outlined" size="sm">
                        <Icon name={getColumnTypeIcon(column.type)} size="sm" /> {column.type}
                      </Badge>
                    </td>
                    <td className="sample-value">{column.sample}</td>
                    <td>
                      {column.nullCount > 0 ? (
                        <Badge variant="warning" badgeStyle="outlined" size="sm">{column.nullCount}</Badge>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                    <td>{column.uniqueCount}</td>
                    <td>
                      <Checkbox
                        checked={column.isRequired}
                        onChange={() => {
                          setDetectedColumns((prev) =>
                            prev.map((col) =>
                              col.id === column.id ? { ...col, isRequired: !col.isRequired } : col
                            )
                          )
                        }}
                        label=""
                      />
                    </td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        Change Type
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'mapping' && (
        <div className="tab-content">
          <div className="section-header">
            <div>
              <h2 className="section-title">Field Mapping</h2>
              <p className="section-description">
                Map source columns to destination fields and apply transformations
              </p>
            </div>
            <div className="header-actions">
              <Button variant="tertiary" onClick={handleAddMapping}>
                + Add Mapping
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('transformations')}>
                Continue to Transformations
              </Button>
            </div>
          </div>

          <div className="mapping-list">
            {fieldMappings.map((mapping, index) => (
              <div key={mapping.id} className="mapping-row">
                <span className="mapping-number">{index + 1}</span>
                <div className="mapping-field">
                  <label className="field-label">Source Field</label>
                  <Select
                    value={mapping.sourceField}
                    onChange={(value) => handleMappingChange(mapping.id, 'destinationField', value)}
                    options={detectedColumns.map((col) => ({ value: col.name, label: col.name }))}
                  />
                </div>
                <div className="mapping-arrow">→</div>
                <div className="mapping-field">
                  <label className="field-label">Destination Field</label>
                  <Select
                    value={mapping.destinationField}
                    onChange={(value) => handleMappingChange(mapping.id, 'destinationField', value)}
                    options={MOCK_DESTINATION_FIELDS}
                  />
                </div>
                <div className="mapping-field">
                  <label className="field-label">Transformation</label>
                  <Select
                    value={mapping.transformation}
                    onChange={(value) => handleMappingChange(mapping.id, 'transformation', value)}
                    options={[
                      { value: 'none', label: 'None' },
                      { value: 'uppercase', label: 'UPPERCASE' },
                      { value: 'lowercase', label: 'lowercase' },
                      { value: 'trim', label: 'Trim Whitespace' },
                      { value: 'format_date', label: 'Format Date' },
                      { value: 'parse_number', label: 'Parse Number' }
                    ]}
                  />
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveMapping(mapping.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {fieldMappings.length === 0 && (
            <div className="empty-state">
              <p>No field mappings defined. Click "Add Mapping" to create one.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'transformations' && (
        <div className="tab-content">
          <div className="section-header">
            <div>
              <h2 className="section-title">Transformation Rules</h2>
              <p className="section-description">
                Define conditional logic to transform data during import
              </p>
            </div>
            <div className="header-actions">
              <Button variant="tertiary" onClick={handleAddRule}>
                + Add Rule
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('validation')}>
                Continue to Validation
              </Button>
            </div>
          </div>

          <div className="rules-list">
            {transformationRules.map((rule, index) => (
              <div key={rule.id} className="rule-card">
                <div className="rule-header">
                  <h4 className="rule-title">Rule {index + 1}</h4>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveRule(rule.id)}>
                    Delete Rule
                  </Button>
                </div>
                <div className="rule-content">
                  <div className="rule-row">
                    <div className="rule-field">
                      <label className="field-label">If Field</label>
                      <Select
                        value={rule.field}
                        onChange={(value) => handleRuleChange(rule.id, 'field', value)}
                        options={detectedColumns.map((col) => ({ value: col.name, label: col.name }))}
                      />
                    </div>
                    <div className="rule-field">
                      <label className="field-label">Condition</label>
                      <Select
                        value={rule.condition}
                        onChange={(value) => handleRuleChange(rule.id, 'condition', value)}
                        options={[
                          { value: 'equals', label: 'Equals' },
                          { value: 'contains', label: 'Contains' },
                          { value: 'greater_than', label: 'Greater Than' },
                          { value: 'less_than', label: 'Less Than' },
                          { value: 'is_empty', label: 'Is Empty' }
                        ]}
                      />
                    </div>
                    <div className="rule-field">
                      <label className="field-label">Value</label>
                      <Input
                        value={rule.conditionValue}
                        onChange={(value) => handleRuleChange(rule.id, 'conditionValue', value)}
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                  <div className="rule-row">
                    <div className="rule-field">
                      <label className="field-label">Then Action</label>
                      <Select
                        value={rule.action}
                        onChange={(value) => handleRuleChange(rule.id, 'action', value)}
                        options={[
                          { value: 'set_value', label: 'Set Value' },
                          { value: 'skip_row', label: 'Skip Row' },
                          { value: 'flag_warning', label: 'Flag Warning' }
                        ]}
                      />
                    </div>
                    <div className="rule-field">
                      <label className="field-label">Action Value</label>
                      <Input
                        value={rule.actionValue}
                        onChange={(value) => handleRuleChange(rule.id, 'actionValue', value)}
                        placeholder="Enter action value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {transformationRules.length === 0 && (
            <div className="empty-state">
              <p>No transformation rules defined. Click "Add Rule" to create conditional logic.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="tab-content">
          <div className="section-header">
            <div>
              <h2 className="section-title">Validation Results</h2>
              <p className="section-description">
                Review errors and warnings before importing
              </p>
            </div>
            <div className="validation-summary">
              <Badge variant="error">{validationSummary.errors} Errors</Badge>
              <Badge variant="warning">{validationSummary.warnings} Warnings</Badge>
              <Badge variant="info">{validationSummary.info} Info</Badge>
            </div>
          </div>

          <div className="validation-controls">
            <Input
              type="text"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search validations..."
            />
            <Select
              value={validationFilter}
              onChange={(value) => setValidationFilter(value as typeof validationFilter)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'error', label: 'Errors Only' },
                { value: 'warning', label: 'Warnings Only' },
                { value: 'info', label: 'Info Only' }
              ]}
            />
          </div>

          <div className="validation-list">
            {filteredValidations.map((validation) => (
              <div key={validation.id} className={`validation-item validation-item--${validation.type}`}>
                <div className="validation-icon">
                  {validation.type === 'error' && <Icon name="error" size="md" color="danger" />}
                  {validation.type === 'warning' && <Icon name="warning" size="md" color="warning" />}
                  {validation.type === 'info' && <Icon name="info" size="md" color="info" />}
                </div>
                <div className="validation-content">
                  <div className="validation-header">
                    <Badge variant={getValidationBadgeVariant(validation.type)} size="sm">
                      {validation.type.toUpperCase()}
                    </Badge>
                    {validation.field && (
                      <code className="validation-field">{validation.field}</code>
                    )}
                    {validation.rowNumber && (
                      <span className="validation-row">Row {validation.rowNumber}</span>
                    )}
                    {validation.count && validation.count > 1 && (
                      <Badge variant="neutral" size="sm">{validation.count}×</Badge>
                    )}
                  </div>
                  <p className="validation-message">{validation.message}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredValidations.length === 0 && (
            <div className="empty-state">
              <p>No validation results match your filters.</p>
            </div>
          )}

          <div className="validation-actions">
            <Button variant="tertiary" onClick={() => setShowExportModal(true)}>
              Export Results
            </Button>
            <Button
              variant="primary"
              onClick={handleImport}
              disabled={validationSummary.errors > 0}
            >
              {validationSummary.errors > 0 ? 'Fix Errors to Import' : 'Import Data'}
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="tab-content">
          <div className="section-header">
            <div>
              <h2 className="section-title">Import History</h2>
              <p className="section-description">
                View and rollback previous imports
              </p>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>File Name</th>
                  <th>Records</th>
                  <th>Status</th>
                  <th>Errors</th>
                  <th>Warnings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {importHistory.map((version) => (
                  <tr key={version.id}>
                    <td>{version.timestamp}</td>
                    <td className="file-name-cell">{version.fileName}</td>
                    <td>{version.recordCount.toLocaleString()}</td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(version.status)} badgeStyle="outlined">
                        {version.status}
                      </Badge>
                    </td>
                    <td>
                      {version.errorCount > 0 ? (
                        <Badge variant="error" badgeStyle="outlined" size="sm">{version.errorCount}</Badge>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                    <td>
                      {version.warningCount > 0 ? (
                        <Badge variant="warning" badgeStyle="outlined" size="sm">{version.warningCount}</Badge>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        View Details
                      </Button>
                      {version.status === 'success' && (
                        <Button
                          variant="tertiary"
                          size="sm"
                          onClick={() => handleRollback(version)}
                        >
                          Rollback
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Validation Results"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => { alert('Exported!'); setShowExportModal(false); }}>
              Export
            </Button>
          </>
        }
      >
        <div className="modal-content">
          <p className="modal-description">
            Choose the format for exporting validation results
          </p>
          <div className="export-options">
            <label className="export-option">
              <input
                type="radio"
                name="export-format"
                value="csv"
                checked={selectedExportFormat === 'csv'}
                onChange={() => setSelectedExportFormat('csv')}
              />
              <span>CSV - Comma-separated values</span>
            </label>
            <label className="export-option">
              <input
                type="radio"
                name="export-format"
                value="json"
                checked={selectedExportFormat === 'json'}
                onChange={() => setSelectedExportFormat('json')}
              />
              <span>JSON - JavaScript Object Notation</span>
            </label>
            <label className="export-option">
              <input
                type="radio"
                name="export-format"
                value="xlsx"
                checked={selectedExportFormat === 'xlsx'}
                onChange={() => setSelectedExportFormat('xlsx')}
              />
              <span>XLSX - Excel Spreadsheet</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* Rollback Confirmation Modal */}
      <Modal
        isOpen={showRollbackModal}
        onClose={() => setShowRollbackModal(false)}
        title="Confirm Rollback"
        size="sm"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setShowRollbackModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRollback}>
              Confirm Rollback
            </Button>
          </>
        }
      >
        <div className="modal-content">
          <p className="modal-warning">
            ⚠️ This will revert the database to the state from this import. Any subsequent changes will be lost.
          </p>
          {selectedVersion && (
            <div className="rollback-details">
              <p><strong>Import Date:</strong> {selectedVersion.timestamp}</p>
              <p><strong>File:</strong> {selectedVersion.fileName}</p>
              <p><strong>Records:</strong> {selectedVersion.recordCount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
