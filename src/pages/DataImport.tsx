import { useState, useMemo } from 'react'
import {
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
  Modal,
  Breadcrumb,
  Tabs
} from '@ui'
import type {
  BadgeVariant,
  SelectOption,
  BreadcrumbItem,
  TabItem
} from '@ui'
import './data-import.css'

type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'email'

type DataColumn = {
  id: string
  name: string
  type: ColumnType
  sample: string
  nullCount: number
  uniqueCount: number
}

type FieldMapping = {
  sourceField: string
  destinationField: string
  transformation?: string
}

type TransformationRule = {
  id: string
  condition: string
  action: string
  field: string
}

type ValidationResult = {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  rowNumber?: number
  field?: string
}

type ImportVersion = {
  id: string
  timestamp: string
  fileName: string
  recordCount: number
  status: 'success' | 'failed' | 'partial'
}

const MOCK_COLUMNS: DataColumn[] = [
  { id: '1', name: 'customer_id', type: 'number', sample: '10234', nullCount: 0, uniqueCount: 150 },
  { id: '2', name: 'customer_name', type: 'text', sample: 'John Doe', nullCount: 2, uniqueCount: 148 },
  { id: '3', name: 'email_address', type: 'email', sample: 'john.doe@example.com', nullCount: 5, uniqueCount: 145 },
  { id: '4', name: 'signup_date', type: 'date', sample: '2026-01-15', nullCount: 0, uniqueCount: 87 },
  { id: '5', name: 'revenue', type: 'number', sample: '1234.56', nullCount: 12, uniqueCount: 143 },
  { id: '6', name: 'is_active', type: 'boolean', sample: 'true', nullCount: 0, uniqueCount: 2 },
]

const MOCK_VALIDATIONS: ValidationResult[] = [
  {
    id: '1',
    type: 'error',
    message: 'Invalid email format',
    rowNumber: 23,
    field: 'email_address'
  },
  {
    id: '2',
    type: 'error',
    message: 'Duplicate customer_id found',
    rowNumber: 45,
    field: 'customer_id'
  },
  {
    id: '3',
    type: 'warning',
    message: 'Revenue value exceeds typical range',
    rowNumber: 67,
    field: 'revenue'
  },
  {
    id: '4',
    type: 'warning',
    message: 'Missing email address',
    rowNumber: 89,
    field: 'email_address'
  },
  {
    id: '5',
    type: 'info',
    message: 'Date format auto-corrected',
    rowNumber: 12,
    field: 'signup_date'
  },
]

const MOCK_VERSIONS: ImportVersion[] = [
  {
    id: '1',
    timestamp: '2026-02-10 14:30:00',
    fileName: 'customers_feb_2026.csv',
    recordCount: 150,
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2026-02-09 09:15:00',
    fileName: 'customers_jan_2026.csv',
    recordCount: 145,
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2026-02-08 16:45:00',
    fileName: 'customers_dec_2025.csv',
    recordCount: 132,
    status: 'partial'
  },
  {
    id: '4',
    timestamp: '2026-02-07 11:20:00',
    fileName: 'customers_nov_2025.csv',
    recordCount: 0,
    status: 'failed'
  },
]

export function DataImport() {
  const [activeTab, setActiveTab] = useState<string>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showMappingModal, setShowMappingModal] = useState(false)
  const [showTransformModal, setShowTransformModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    { sourceField: 'customer_id', destinationField: 'id', transformation: 'none' },
    { sourceField: 'customer_name', destinationField: 'name', transformation: 'trim' },
    { sourceField: 'email_address', destinationField: 'email', transformation: 'lowercase' },
  ])
  const [transformationRules, setTransformationRules] = useState<TransformationRule[]>([
    { id: '1', condition: 'revenue > 1000', action: 'flag_high_value', field: 'revenue' },
    { id: '2', condition: 'is_active = false', action: 'skip_record', field: 'is_active' },
  ])
  const [selectedExportFormat, setSelectedExportFormat] = useState<string>('csv')
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [validationFilter, setValidationFilter] = useState<string>('all')

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Data Tools', href: '/data-import' },
    { label: 'Import & Transform' },
  ]

  const tabs: TabItem[] = [
    { id: 'upload', label: 'Upload' },
    { id: 'preview', label: 'Preview' },
    { id: 'mapping', label: 'Field Mapping' },
    { id: 'transform', label: 'Transformations' },
    { id: 'validate', label: 'Validation' },
    { id: 'history', label: 'History' },
  ]

  const transformationOptions: SelectOption[] = [
    { value: 'none', label: 'No Transformation' },
    { value: 'trim', label: 'Trim Whitespace' },
    { value: 'uppercase', label: 'Convert to Uppercase' },
    { value: 'lowercase', label: 'Convert to Lowercase' },
    { value: 'titlecase', label: 'Convert to Title Case' },
    { value: 'remove_special', label: 'Remove Special Characters' },
  ]

  const exportFormatOptions: SelectOption[] = [
    { value: 'csv', label: 'CSV (Comma-Separated)' },
    { value: 'tsv', label: 'TSV (Tab-Separated)' },
    { value: 'json', label: 'JSON' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
    { value: 'parquet', label: 'Parquet' },
  ]

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setUploadedFile(files[0])
      simulateProcessing()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFile(files[0])
      simulateProcessing()
    }
  }

  const simulateProcessing = () => {
    setIsProcessing(true)
    setProcessingProgress(0)
    
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setActiveTab('preview')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const filteredValidations = useMemo(() => {
    if (validationFilter === 'all') return MOCK_VALIDATIONS
    return MOCK_VALIDATIONS.filter(v => v.type === validationFilter)
  }, [validationFilter])

  const getStatusBadgeVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'success': return 'success'
      case 'failed': return 'danger'
      case 'partial': return 'warning'
      default: return 'neutral'
    }
  }

  const getValidationBadgeVariant = (type: string): BadgeVariant => {
    switch (type) {
      case 'error': return 'danger'
      case 'warning': return 'warning'
      case 'info': return 'info'
      default: return 'neutral'
    }
  }

  const getColumnTypeIcon = (type: ColumnType): string => {
    switch (type) {
      case 'text': return '📝'
      case 'number': return '🔢'
      case 'date': return '📅'
      case 'boolean': return '✓'
      case 'email': return '📧'
      default: return '❓'
    }
  }

  return (
    <div className="data-import-page">
      <Breadcrumb items={breadcrumbs} />
      
      <div className="page-header">
        <h1 className="page-title">Data Import & Transformation</h1>
        <p className="page-subtitle">Upload, map, transform, and validate your data</p>
      </div>

      <Tabs items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="upload-section">
          <div
            className={`dropzone ${isDragging ? 'dropzone--active' : ''} ${uploadedFile ? 'dropzone--has-file' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="dropzone-content">
                <div className="file-icon">📄</div>
                <p className="file-name">{uploadedFile.name}</p>
                <p className="file-size">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                <Button 
                  variant="tertiary" 
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="upload-icon">⬆️</div>
                <p className="dropzone-title">Drag and drop your file here</p>
                <p className="dropzone-subtitle">or</p>
                <label className="file-input-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".csv,.tsv,.xlsx,.json"
                    onChange={handleFileSelect}
                  />
                  <Button variant="primary" as="span">
                    Browse Files
                  </Button>
                </label>
                <p className="supported-formats">
                  Supported formats: CSV, TSV, XLSX, JSON
                </p>
              </div>
            )}
          </div>

          {isProcessing && (
            <div className="processing-indicator">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <p className="progress-text">Processing file... {processingProgress}%</p>
            </div>
          )}

          {uploadedFile && !isProcessing && (
            <div className="upload-actions">
              <Button variant="primary" onClick={() => setActiveTab('preview')}>
                Continue to Preview
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="preview-section">
          <div className="section-header">
            <h2 className="section-title">Data Preview</h2>
            <p className="section-description">
              Detected {MOCK_COLUMNS.length} columns and 150 rows
            </p>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COLUMNS.map((column) => (
                  <tr key={column.id}>
                    <td>
                      <code className="column-name">{column.name}</code>
                    </td>
                    <td>
                      <Badge variant="info" style="outlined">
                        {getColumnTypeIcon(column.type)} {column.type}
                      </Badge>
                    </td>
                    <td className="sample-value">{column.sample}</td>
                    <td>{column.nullCount}</td>
                    <td>{column.uniqueCount}</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        Edit Type
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="preview-actions">
            <Button variant="secondary" onClick={() => setActiveTab('upload')}>
              Back to Upload
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('mapping')}>
              Continue to Mapping
            </Button>
          </div>
        </div>
      )}

      {/* Field Mapping Tab */}
      {activeTab === 'mapping' && (
        <div className="mapping-section">
          <div className="section-header">
            <h2 className="section-title">Field Mapping</h2>
            <p className="section-description">
              Map source fields to destination schema
            </p>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Source Field</th>
                  <th>Destination Field</th>
                  <th>Transformation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fieldMappings.map((mapping, index) => (
                  <tr key={index}>
                    <td>
                      <code className="column-name">{mapping.sourceField}</code>
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={mapping.destinationField}
                        onChange={(e) => {
                          const newMappings = [...fieldMappings]
                          newMappings[index].destinationField = e.target.value
                          setFieldMappings(newMappings)
                        }}
                        size="sm"
                      />
                    </td>
                    <td>
                      <Select
                        options={transformationOptions}
                        value={mapping.transformation || 'none'}
                        onChange={(value) => {
                          const newMappings = [...fieldMappings]
                          newMappings[index].transformation = value
                          setFieldMappings(newMappings)
                        }}
                        size="sm"
                      />
                    </td>
                    <td className="table-actions">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => {
                          setFieldMappings(fieldMappings.filter((_, i) => i !== index))
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mapping-actions">
            <Button variant="tertiary" onClick={() => setShowMappingModal(true)}>
              Add Mapping
            </Button>
          </div>

          <div className="section-footer">
            <Button variant="secondary" onClick={() => setActiveTab('preview')}>
              Back to Preview
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('transform')}>
              Continue to Transformations
            </Button>
          </div>
        </div>
      )}

      {/* Transformations Tab */}
      {activeTab === 'transform' && (
        <div className="transform-section">
          <div className="section-header">
            <h2 className="section-title">Transformation Rules</h2>
            <p className="section-description">
              Define conditional transformation logic
            </p>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Condition</th>
                  <th>Action</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transformationRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>
                      <code className="column-name">{rule.field}</code>
                    </td>
                    <td>
                      <code className="condition-code">{rule.condition}</code>
                    </td>
                    <td>
                      <Badge variant="info">{rule.action}</Badge>
                    </td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => {
                          setTransformationRules(transformationRules.filter(r => r.id !== rule.id))
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="transform-actions">
            <Button variant="tertiary" onClick={() => setShowTransformModal(true)}>
              Add Transformation Rule
            </Button>
          </div>

          <div className="section-footer">
            <Button variant="secondary" onClick={() => setActiveTab('mapping')}>
              Back to Mapping
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('validate')}>
              Continue to Validation
            </Button>
          </div>
        </div>
      )}

      {/* Validation Tab */}
      {activeTab === 'validate' && (
        <div className="validation-section">
          <div className="section-header">
            <h2 className="section-title">Validation Results</h2>
            <p className="section-description">
              Review errors, warnings, and information messages
            </p>
          </div>

          <div className="validation-filters">
            <label className="filter-label">Filter by type:</label>
            <div className="filter-buttons">
              <Button
                variant={validationFilter === 'all' ? 'primary' : 'tertiary'}
                size="sm"
                onClick={() => setValidationFilter('all')}
              >
                All ({MOCK_VALIDATIONS.length})
              </Button>
              <Button
                variant={validationFilter === 'error' ? 'primary' : 'tertiary'}
                size="sm"
                onClick={() => setValidationFilter('error')}
              >
                Errors ({MOCK_VALIDATIONS.filter(v => v.type === 'error').length})
              </Button>
              <Button
                variant={validationFilter === 'warning' ? 'primary' : 'tertiary'}
                size="sm"
                onClick={() => setValidationFilter('warning')}
              >
                Warnings ({MOCK_VALIDATIONS.filter(v => v.type === 'warning').length})
              </Button>
              <Button
                variant={validationFilter === 'info' ? 'primary' : 'tertiary'}
                size="sm"
                onClick={() => setValidationFilter('info')}
              >
                Info ({MOCK_VALIDATIONS.filter(v => v.type === 'info').length})
              </Button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Field</th>
                  <th>Row</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredValidations.map((validation) => (
                  <tr key={validation.id}>
                    <td>
                      <Badge variant={getValidationBadgeVariant(validation.type)}>
                        {validation.type}
                      </Badge>
                    </td>
                    <td>
                      {validation.field && (
                        <code className="column-name">{validation.field}</code>
                      )}
                    </td>
                    <td>{validation.rowNumber}</td>
                    <td>{validation.message}</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        View Details
                      </Button>
                      <Button variant="tertiary" size="sm">
                        Fix
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-footer">
            <Button variant="secondary" onClick={() => setActiveTab('transform')}>
              Back to Transformations
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowExportModal(true)}
              disabled={filteredValidations.filter(v => v.type === 'error').length > 0}
            >
              Export Data
            </Button>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="history-section">
          <div className="section-header">
            <h2 className="section-title">Import History</h2>
            <p className="section-description">
              View and rollback previous imports
            </p>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>File Name</th>
                  <th>Records</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VERSIONS.map((version) => (
                  <tr key={version.id}>
                    <td>{version.timestamp}</td>
                    <td>{version.fileName}</td>
                    <td>{version.recordCount.toLocaleString()}</td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(version.status)}>
                        {version.status}
                      </Badge>
                    </td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">
                        View Details
                      </Button>
                      <Button 
                        variant="tertiary" 
                        size="sm"
                        disabled={version.status === 'failed'}
                      >
                        Rollback
                      </Button>
                      <Button variant="tertiary" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export Configuration Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Configuration"
        size="md"
      >
        <div className="export-config">
          <div className="form-group">
            <label className="form-label">Export Format</label>
            <Select
              options={exportFormatOptions}
              value={selectedExportFormat}
              onChange={setSelectedExportFormat}
            />
          </div>

          <div className="form-group">
            <Checkbox
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              label="Include column headers"
            />
          </div>

          <div className="export-summary">
            <h3 className="summary-title">Export Summary</h3>
            <ul className="summary-list">
              <li>Format: {exportFormatOptions.find(o => o.value === selectedExportFormat)?.label}</li>
              <li>Total Records: 150</li>
              <li>Valid Records: 147</li>
              <li>Skipped Records: 3</li>
            </ul>
          </div>

          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              setShowExportModal(false)
              alert('Export started successfully!')
            }}>
              Export Data
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
