import { useState } from 'react'
import { Button, Badge, Card, Select, Input } from '@ui'
import './analytics-dashboard.css'

type SortDirection = 'asc' | 'desc'
type SortField = 'project' | 'revenue' | 'completion' | 'team' | null

type Project = {
  id: string
  name: string
  client: string
  status: 'active' | 'pending' | 'completed' | 'at-risk'
  revenue: number
  completion: number
  team: number
  startDate: string
}

const mockProjects: Project[] = [
  { id: '1', name: 'Digital Transformation', client: 'Acme Corp', status: 'active', revenue: 450000, completion: 75, team: 12, startDate: '2024-01-15' },
  { id: '2', name: 'Market Analysis', client: 'TechStart Inc', status: 'pending', revenue: 280000, completion: 25, team: 6, startDate: '2024-02-01' },
  { id: '3', name: 'Operations Review', client: 'Global Ventures', status: 'completed', revenue: 620000, completion: 100, team: 8, startDate: '2023-11-10' },
  { id: '4', name: 'Risk Assessment', client: 'Finance Plus', status: 'at-risk', revenue: 190000, completion: 45, team: 4, startDate: '2024-01-20' },
  { id: '5', name: 'Strategy Consulting', client: 'Retail Giants', status: 'active', revenue: 520000, completion: 60, team: 10, startDate: '2023-12-05' },
  { id: '6', name: 'Process Optimization', client: 'Manufacturing Co', status: 'active', revenue: 380000, completion: 80, team: 7, startDate: '2024-01-08' },
  { id: '7', name: 'Customer Experience', client: 'Services Ltd', status: 'pending', revenue: 295000, completion: 15, team: 5, startDate: '2024-02-10' },
  { id: '8', name: 'Supply Chain Audit', client: 'Logistics Pro', status: 'completed', revenue: 410000, completion: 100, team: 9, startDate: '2023-10-20' },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30days')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  
  const itemsPerPage = 5

  // Filter projects
  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = !statusFilter || project.status === statusFilter
    const matchesSearch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0
    
    let aValue: string | number = ''
    let bValue: string | number = ''
    
    switch (sortField) {
      case 'project':
        aValue = a.name
        bValue = b.name
        break
      case 'revenue':
        aValue = a.revenue
        bValue = b.revenue
        break
      case 'completion':
        aValue = a.completion
        bValue = b.completion
        break
      case 'team':
        aValue = a.team
        bValue = b.team
        break
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  // Paginate
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleExport = () => {
    alert('Exporting data...')
  }

  // Calculate metrics
  const totalRevenue = filteredProjects.reduce((sum, p) => sum + p.revenue, 0)
  const activeProjects = filteredProjects.filter(p => p.status === 'active').length
  const avgCompletion = filteredProjects.reduce((sum, p) => sum + p.completion, 0) / filteredProjects.length || 0
  const totalTeamMembers = filteredProjects.reduce((sum, p) => sum + p.team, 0)

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" badgeStyle="outlined">Active</Badge>
      case 'pending':
        return <Badge variant="warning" badgeStyle="outlined">Pending</Badge>
      case 'completed':
        return <Badge variant="info" badgeStyle="outlined">Completed</Badge>
      case 'at-risk':
        return <Badge variant="error" badgeStyle="outlined">At Risk</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000).toFixed(0)}K`
  }

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <header className="analytics-header">
        <div className="analytics-header-content">
          <h2 className="analytics-logo">McKinsey Analytics</h2>
          <nav className="analytics-nav">
            <a href="#" className="nav-link nav-link--active">Dashboard</a>
            <a href="#" className="nav-link">Projects</a>
            <a href="#" className="nav-link">Reports</a>
            <a href="#" className="nav-link">Settings</a>
          </nav>
          <Button variant="secondary">Admin</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="analytics-main">
        <div className="analytics-content">
          {/* Page Title */}
          <div className="analytics-title-section">
            <div>
              <h1 className="analytics-title">Executive Dashboard</h1>
              <p className="analytics-subtitle">Real-time insights and performance metrics</p>
            </div>
            <div className="analytics-title-actions">
              <Select
                value={timeRange}
                onChange={setTimeRange}
                options={[
                  { value: '7days', label: 'Last 7 days' },
                  { value: '30days', label: 'Last 30 days' },
                  { value: '90days', label: 'Last 90 days' },
                  { value: 'year', label: 'This year' },
                ]}
              />
              <Button variant="primary" onClick={handleExport}>Export Data</Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <Card className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Revenue</span>
                <Badge variant="success" size="sm">+12.5%</Badge>
              </div>
              <div className="metric-value">{formatCurrency(totalRevenue)}</div>
              <div className="metric-chart">
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '100%' }}></div>
                </div>
              </div>
            </Card>

            <Card className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Active Projects</span>
                <Badge variant="info" size="sm">+3</Badge>
              </div>
              <div className="metric-value">{activeProjects}</div>
              <div className="metric-chart">
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '100%' }}></div>
                </div>
              </div>
            </Card>

            <Card className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg Completion</span>
                <Badge variant="neutral" size="sm">0%</Badge>
              </div>
              <div className="metric-value">{avgCompletion.toFixed(0)}%</div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${avgCompletion}%` }}></div>
                </div>
              </div>
            </Card>

            <Card className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Team Members</span>
                <Badge variant="warning" size="sm">-2</Badge>
              </div>
              <div className="metric-value">{totalTeamMembers}</div>
              <div className="metric-chart">
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '100%' }}></div>
                  <div className="chart-bar" style={{ height: '95%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Revenue Chart */}
          <section className="chart-section">
            <Card>
              <div className="chart-header">
                <h2 className="section-title">Revenue Trend</h2>
                <div className="chart-legend">
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--primary"></span>
                    Actual
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--secondary"></span>
                    Target
                  </span>
                </div>
              </div>
              <div className="revenue-chart">
                <div className="chart-bars">
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '60%' }}></div>
                    <div className="chart-bar-target" style={{ height: '55%' }}></div>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '75%' }}></div>
                    <div className="chart-bar-target" style={{ height: '70%' }}></div>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '65%' }}></div>
                    <div className="chart-bar-target" style={{ height: '75%' }}></div>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '85%' }}></div>
                    <div className="chart-bar-target" style={{ height: '80%' }}></div>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '90%' }}></div>
                    <div className="chart-bar-target" style={{ height: '85%' }}></div>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar-actual" style={{ height: '100%' }}></div>
                    <div className="chart-bar-target" style={{ height: '95%' }}></div>
                  </div>
                </div>
                <div className="chart-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </Card>
          </section>

          {/* Projects Table */}
          <section className="table-section">
            <Card>
              <div className="table-header">
                <div>
                  <h2 className="section-title">Project Portfolio</h2>
                  <p className="section-description">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="table-controls">
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search projects..."
                    className="table-search"
                  />
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'at-risk', label: 'At Risk' },
                    ]}
                    className="table-filter"
                  />
                  <Button variant="primary">New Project</Button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        <button 
                          className="sort-button" 
                          onClick={() => handleSort('project')}
                        >
                          Project Name
                          {sortField === 'project' && (
                            <span className="sort-indicator">
                              {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th>Client</th>
                      <th>Status</th>
                      <th>
                        <button 
                          className="sort-button" 
                          onClick={() => handleSort('revenue')}
                        >
                          Revenue
                          {sortField === 'revenue' && (
                            <span className="sort-indicator">
                              {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button" 
                          onClick={() => handleSort('completion')}
                        >
                          Completion
                          {sortField === 'completion' && (
                            <span className="sort-indicator">
                              {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button" 
                          onClick={() => handleSort('team')}
                        >
                          Team
                          {sortField === 'team' && (
                            <span className="sort-indicator">
                              {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProjects.map((project) => (
                      <tr key={project.id}>
                        <td className="table-cell-primary">{project.name}</td>
                        <td>{project.client}</td>
                        <td>{getStatusBadge(project.status)}</td>
                        <td>{formatCurrency(project.revenue)}</td>
                        <td>
                          <div className="completion-cell">
                            <span className="completion-text">{project.completion}%</span>
                            <div className="completion-bar">
                              <div 
                                className="completion-fill" 
                                style={{ width: `${project.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>{project.team}</td>
                        <td className="table-actions">
                          <Button variant="tertiary" size="sm">View</Button>
                          <Button variant="tertiary" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <div className="pagination-info">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedProjects.length)} of {sortedProjects.length} projects
                </div>
                <div className="pagination-controls">
                  <Button
                    variant="tertiary"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-button ${page === currentPage ? 'pagination-button--active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <Button
                    variant="tertiary"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
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
