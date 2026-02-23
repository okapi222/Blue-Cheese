import { useState, useMemo } from 'react'
import { Button, Badge, Card, Select } from '@ui'
import { Icon } from '@ui'
import './analytics-dashboard.css'

type SortKey = 'name' | 'region' | 'revenue' | 'status'
type SortDir = 'asc' | 'desc'

const METRICS = [
  { label: 'Revenue', value: '$2.4M', trend: '+12.5%', trendUp: true, status: 'active' as const },
  { label: 'Active Users', value: '18,420', trend: '+8.2%', trendUp: true, status: 'active' as const },
  { label: 'Conversion Rate', value: '3.2%', trend: '-0.4%', trendUp: false, status: 'warning' as const },
  { label: 'Error Rate', value: '1.8%', trend: '+0.5%', trendUp: false, status: 'error' as const },
]

const BAR_DATA = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 65 },
  { label: 'Apr', value: 78 },
  { label: 'May', value: 88 },
  { label: 'Jun', value: 95 },
]
const BAR_MAX = Math.max(...BAR_DATA.map((d) => d.value))

const LINE_DATA = [
  { month: 'Jan', a: 30, b: 45 },
  { month: 'Feb', a: 42, b: 52 },
  { month: 'Mar', a: 38, b: 48 },
  { month: 'Apr', a: 55, b: 60 },
  { month: 'May', a: 62, b: 58 },
  { month: 'Jun', a: 70, b: 72 },
]
const LINE_MAX = 80
const LINE_W = 320
const LINE_H = 180

const DONUT_DATA = [
  { label: 'Product A', value: 35, color: 'var(--mds-color-electric-blue-900)' },
  { label: 'Product B', value: 28, color: 'var(--mds-color-cyan-500)' },
  { label: 'Product C', value: 22, color: 'var(--mds-color-electric-blue-500)' },
  { label: 'Product D', value: 15, color: 'var(--mds-color-crimson-red-300)' },
]
const DONUT_TOTAL = DONUT_DATA.reduce((s, d) => s + d.value, 0)

const TABLE_DATA = [
  { id: '1', name: 'North Region', region: 'North', revenue: 420, status: 'active' as const },
  { id: '2', name: 'South Region', region: 'South', revenue: 380, status: 'active' as const },
  { id: '3', name: 'East Region', region: 'East', revenue: 290, status: 'warning' as const },
  { id: '4', name: 'West Region', region: 'West', revenue: 510, status: 'active' as const },
  { id: '5', name: 'Central Region', region: 'Central', revenue: 195, status: 'error' as const },
  { id: '6', name: 'Coastal Region', region: 'Coastal', revenue: 340, status: 'active' as const },
  { id: '7', name: 'Inland Region', region: 'Inland', revenue: 268, status: 'warning' as const },
  { id: '8', name: 'Mountain Region', region: 'Mountain', revenue: 445, status: 'active' as const },
]

const PAGE_SIZE = 4
const DATE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'ytd', label: 'Year to date' },
]
const COMPARE_OPTIONS = [
  { value: 'none', label: 'No comparison' },
  { value: 'prev', label: 'Previous period' },
  { value: 'yoy', label: 'Year over year' },
]

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('30d')
  const [comparePeriod, setComparePeriod] = useState('prev')
  const [sortKey, setSortKey] = useState<SortKey>('revenue')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(0)

  const statusOptions = [
    { value: 'all', label: 'All statuses' },
    { value: 'active', label: 'Active' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ]

  const filteredAndSorted = useMemo(() => {
    let rows = [...TABLE_DATA]
    if (statusFilter !== 'all') {
      rows = rows.filter((r) => r.status === statusFilter)
    }
    rows.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      const s = String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? s : -s
    })
    return rows
  }, [statusFilter, sortKey, sortDir])

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE)
  const paginatedRows = filteredAndSorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const handleExport = () => {
    // Placeholder: in real app would trigger CSV/PDF export
    console.log('Export triggered', { dateRange, comparePeriod })
  }

  return (
    <div className="analytics-dashboard">
      <header className="analytics-dashboard-header">
        <div className="analytics-dashboard-header-content">
          <h2 className="analytics-dashboard-logo">Analytics</h2>
          <nav className="analytics-dashboard-nav">
            <a href="#metrics" className="analytics-nav-link">Metrics</a>
            <a href="#charts" className="analytics-nav-link">Charts</a>
            <a href="#data" className="analytics-nav-link">Data</a>
          </nav>
          <Button variant="secondary">Profile</Button>
        </div>
      </header>

      <main className="analytics-dashboard-main">
        <div className="analytics-dashboard-content">
          <div className="analytics-title-section">
            <h1 className="analytics-title">Analytics Dashboard</h1>
            <p className="analytics-subtitle">Executive view of key metrics, trends, and performance data</p>
          </div>

          {/* Filters */}
          <section className="analytics-filters" aria-label="Filters">
            <div className="analytics-filters-row">
              <div className="filter-group">
                <label className="filter-label" htmlFor="date-range">Date range</label>
                <Select
                  id="date-range"
                  value={dateRange}
                  onChange={setDateRange}
                  options={DATE_OPTIONS}
                  placeholder="Select range"
                />
              </div>
              <div className="filter-group">
                <label className="filter-label" htmlFor="compare">Compare to</label>
                <Select
                  id="compare"
                  value={comparePeriod}
                  onChange={setComparePeriod}
                  options={COMPARE_OPTIONS}
                  placeholder="Comparison"
                />
              </div>
              <div className="filter-actions">
                <Button variant="primary" onClick={handleExport}>
                  <Icon name="download" size="sm" aria-hidden />
                  Export CSV
                </Button>
                <Button variant="secondary" onClick={handleExport}>
                  Export PDF
                </Button>
              </div>
            </div>
          </section>

          {/* Key metrics cards */}
          <section id="metrics" className="analytics-section">
            <h2 className="analytics-section-title">Key metrics</h2>
            <div className="analytics-metrics-grid">
              {METRICS.map((m) => (
                <Card key={m.label} className="metric-card">
                  <div className="metric-card-inner">
                    <div className="metric-header">
                      <span className="metric-label">{m.label}</span>
                      <Badge
                        variant={
                          m.status === 'active' ? 'success' : m.status === 'warning' ? 'warning' : 'error'
                        }
                        badgeStyle="outlined"
                        size="sm"
                      >
                        {m.status === 'active' ? 'Active' : m.status === 'warning' ? 'Warning' : 'Error'}
                      </Badge>
                    </div>
                    <p className="metric-value">{m.value}</p>
                    <p className={`metric-trend metric-trend--${m.trendUp ? 'up' : 'down'}`}>
                      {m.trendUp ? (
                        <Icon name="arrow-up" size="xs" aria-hidden />
                      ) : (
                        <Icon name="arrow-down" size="xs" aria-hidden />
                      )}
                      {m.trend}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Charts */}
          <section id="charts" className="analytics-section">
            <h2 className="analytics-section-title">Performance overview</h2>
            <div className="analytics-charts-grid">
              <Card className="chart-card">
                <h3 className="chart-card-title">Revenue by month</h3>
                <div className="chart-wrap bar-chart-wrap">
                  <svg className="bar-chart" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet">
                    {BAR_DATA.map((d, i) => {
                      const h = (d.value / BAR_MAX) * 140
                      const x = 40 + i * 52
                      const y = 160 - h
                      return (
                        <g key={d.label}>
                          <rect
                            x={x}
                            y={y}
                            width={40}
                            height={h}
                            fill="var(--mds-color-deep-blue-900)"
                            rx="2"
                          />
                          <text
                            x={x + 20}
                            y={y - 6}
                            textAnchor="middle"
                            className="bar-label"
                            fill="var(--mds-color-text-default)"
                          >
                            {d.value}
                          </text>
                          <text
                            x={x + 20}
                            y={178}
                            textAnchor="middle"
                            className="bar-axis-label"
                            fill="var(--mds-color-text-subtle)"
                          >
                            {d.label}
                          </text>
                        </g>
                      )
                    })}
                    <line
                      x1="36"
                      y1="160"
                      x2="352"
                      y2="160"
                      stroke="var(--mds-color-neutral-20)"
                      strokeWidth="1"
                    />
                    <text
                      x="36"
                      y="172"
                      className="axis-zero"
                      fill="var(--mds-color-text-subtle)"
                    >
                      0
                    </text>
                  </svg>
                </div>
              </Card>

              <Card className="chart-card">
                <h3 className="chart-card-title">Trend comparison</h3>
                <div className="chart-wrap line-chart-wrap">
                  <svg className="line-chart" viewBox={`0 0 ${LINE_W} ${LINE_H}`} preserveAspectRatio="xMidYMid meet">
                    {[0.25, 0.5, 0.75].map((q) => (
                      <line
                        key={q}
                        x1={0}
                        y1={LINE_H * (1 - q)}
                        x2={LINE_W}
                        y2={LINE_H * (1 - q)}
                        stroke="var(--mds-color-neutral-20)"
                        strokeWidth="0.75"
                      />
                    ))}
                    <polyline
                      points={LINE_DATA.map((d, i) => {
                        const px = (i / (LINE_DATA.length - 1)) * (LINE_W - 40) + 20
                        const py = LINE_H - 20 - (d.a / LINE_MAX) * (LINE_H - 40)
                        return `${px},${py}`
                      }).join(' ')}
                      fill="none"
                      stroke="var(--mds-color-deep-blue-900)"
                      strokeWidth="1.5"
                    />
                    <polyline
                      points={LINE_DATA.map((d, i) => {
                        const px = (i / (LINE_DATA.length - 1)) * (LINE_W - 40) + 20
                        const py = LINE_H - 20 - (d.b / LINE_MAX) * (LINE_H - 40)
                        return `${px},${py}`
                      }).join(' ')}
                      fill="none"
                      stroke="var(--mds-color-neutral-30)"
                      strokeWidth="1.5"
                    />
                    {LINE_DATA.map((d, i) => (
                      <text
                        key={d.month}
                        x={(i / (LINE_DATA.length - 1)) * (LINE_W - 40) + 20}
                        y={LINE_H - 4}
                        textAnchor="middle"
                        className="line-axis-label"
                        fill="var(--mds-color-text-subtle)"
                      >
                        {d.month}
                      </text>
                    ))}
                  </svg>
                  <div className="line-legend">
                    <span className="line-legend-item">
                      <span className="line-legend-color" style={{ background: 'var(--mds-color-deep-blue-900)' }} />
                      Current
                    </span>
                    <span className="line-legend-item">
                      <span className="line-legend-color" style={{ background: 'var(--mds-color-neutral-30)' }} />
                      Prior
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="chart-card chart-card--donut">
                <h3 className="chart-card-title">Share by product</h3>
                <div className="donut-wrap">
                  <div className="donut-chart-wrapper">
                    <svg className="donut-chart" viewBox="0 0 120 120">
                      {(() => {
                        const radius = 48
                        const circumference = 2 * Math.PI * radius
                        let offset = 0
                        return DONUT_DATA.map((d) => {
                          const pct = d.value / DONUT_TOTAL
                          const segmentLength = circumference * pct
                          const strokeDasharray = `${segmentLength} ${circumference - segmentLength}`
                          const strokeDashoffset = -offset
                          offset += segmentLength
                          return (
                            <circle
                              key={d.label}
                              cx="60"
                              cy="60"
                              r={radius}
                              fill="none"
                              stroke={d.color}
                              strokeWidth="20"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              transform="rotate(-90 60 60)"
                            />
                          )
                        })
                      })()}
                    </svg>
                    <div className="donut-center">
                      <span className="donut-total">{DONUT_TOTAL}%</span>
                    </div>
                  </div>
                  <ul className="donut-legend" aria-hidden>
                    {DONUT_DATA.map((d) => (
                      <li key={d.label}>
                        <span className="donut-legend-color" style={{ background: d.color }} />
                        {d.label} {d.value}%
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* Data table */}
          <section id="data" className="analytics-section">
            <div className="analytics-section-header">
              <h2 className="analytics-section-title">Regional performance</h2>
              <div className="analytics-table-toolbar">
                <div className="filter-group filter-group--inline">
                  <label className="filter-label filter-label--sr" htmlFor="status-filter">Filter by status</label>
                  <Select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(v) => {
                      setStatusFilter(v)
                      setPage(0)
                    }}
                    options={statusOptions}
                  />
                </div>
                <Button variant="secondary" size="sm" onClick={handleExport}>
                  Export
                </Button>
              </div>
            </div>
            <Card className="table-card">
              <div className="table-container">
                <table className="data-table analytics-table">
                  <thead>
                    <tr>
                      <th>
                        <Button
                          type="button"
                          variant="tertiary"
                          size="sm"
                          className="sortable-th"
                          onClick={() => toggleSort('name')}
                          aria-sort={sortKey === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                        >
                          Name
                          {sortKey === 'name' && (
                            <Icon name={sortDir === 'asc' ? 'arrow-up' : 'arrow-down'} size="xs" aria-hidden />
                          )}
                        </Button>
                      </th>
                      <th>
                        <Button
                          type="button"
                          variant="tertiary"
                          size="sm"
                          className="sortable-th"
                          onClick={() => toggleSort('region')}
                          aria-sort={sortKey === 'region' ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                        >
                          Region
                          {sortKey === 'region' && (
                            <Icon name={sortDir === 'asc' ? 'arrow-up' : 'arrow-down'} size="xs" aria-hidden />
                          )}
                        </Button>
                      </th>
                      <th>
                        <Button
                          type="button"
                          variant="tertiary"
                          size="sm"
                          className="sortable-th"
                          onClick={() => toggleSort('revenue')}
                          aria-sort={sortKey === 'revenue' ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                        >
                          Revenue ($K)
                          {sortKey === 'revenue' && (
                            <Icon name={sortDir === 'asc' ? 'arrow-up' : 'arrow-down'} size="xs" aria-hidden />
                          )}
                        </Button>
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.map((row) => (
                      <tr key={row.id}>
                        <td className="table-cell-primary">{row.name}</td>
                        <td>{row.region}</td>
                        <td>{row.revenue}</td>
                        <td>
                          <Badge
                            variant={
                              row.status === 'active' ? 'success' : row.status === 'warning' ? 'warning' : 'error'
                            }
                            badgeStyle="outlined"
                          >
                            {row.status === 'active' ? 'Active' : row.status === 'warning' ? 'Warning' : 'Error'}
                          </Badge>
                        </td>
                        <td className="table-actions">
                          <Button variant="tertiary" size="sm">View</Button>
                          <Button variant="tertiary" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination-bar">
                <span className="pagination-info">
                  Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredAndSorted.length)} of{' '}
                  {filteredAndSorted.length}
                </span>
                <div className="pagination-controls">
                  <Button
                    variant="tertiary"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                    aria-label="Previous page"
                  >
                    <Icon name="arrow-left" size="sm" aria-hidden />
                  </Button>
                  <span className="pagination-page" aria-current="page">
                    Page {page + 1} of {totalPages || 1}
                  </span>
                  <Button
                    variant="tertiary"
                    size="sm"
                    disabled={page >= totalPages - 1 || totalPages === 0}
                    onClick={() => setPage((p) => p + 1)}
                    aria-label="Next page"
                  >
                    <Icon name="arrow-right" size="sm" aria-hidden />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
