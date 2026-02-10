import { Button, Badge } from '@ui'
import './dashboard.css'

export function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h2 className="dashboard-logo">McKinsey MDS</h2>
          <nav className="dashboard-nav">
            <a href="#" className="nav-link">Overview</a>
            <a href="#" className="nav-link">Analytics</a>
            <a href="#" className="nav-link">Reports</a>
          </nav>
          <Button variant="secondary">Profile</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Page Title */}
          <div className="dashboard-title-section">
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <p className="dashboard-subtitle">Monitor key metrics and performance indicators</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Revenue</p>
              <p className="stat-value">$2.4M</p>
              <p className="stat-change stat-change--positive">+12.5%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Active Projects</p>
              <p className="stat-value">148</p>
              <p className="stat-change stat-change--positive">+8</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Client Satisfaction</p>
              <p className="stat-value">94%</p>
              <p className="stat-change stat-change--neutral">0%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Team Members</p>
              <p className="stat-value">32</p>
              <p className="stat-change stat-change--negative">-2</p>
            </div>
          </div>

          {/* Data Table */}
          <section className="table-section">
            <div className="section-header">
              <h2 className="section-title">Recent Projects</h2>
              <Button variant="primary">New Project</Button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-cell-primary">Digital Transformation</td>
                    <td>Acme Corp</td>
                    <td><Badge variant="success">Active</Badge></td>
                    <td>$450K</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">View</Button>
                      <Button variant="tertiary" size="sm">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell-primary">Market Analysis</td>
                    <td>TechStart Inc</td>
                    <td><Badge variant="warning">Pending</Badge></td>
                    <td>$280K</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">View</Button>
                      <Button variant="tertiary" size="sm">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell-primary">Operations Review</td>
                    <td>Global Ventures</td>
                    <td><Badge variant="info">Completed</Badge></td>
                    <td>$620K</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">View</Button>
                      <Button variant="tertiary" size="sm">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell-primary">Risk Assessment</td>
                    <td>Finance Plus</td>
                    <td><Badge variant="error">Cancelled</Badge></td>
                    <td>$190K</td>
                    <td className="table-actions">
                      <Button variant="tertiary" size="sm">View</Button>
                      <Button variant="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Action Panel */}
          <section className="action-panel">
            <h2 className="section-title">Button Variants & Sizes</h2>
            <p className="section-description">
              All button variants and sizes using MDS tokens - hover and click to test states
            </p>
            
            <div className="button-showcase">
              <h3 className="showcase-subtitle">Variants (Medium Size)</h3>
              <div className="button-group">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="contrast">Contrast</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
              
              <h3 className="showcase-subtitle">Sizes (Primary Variant)</h3>
              <div className="button-group button-group--aligned">
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="primary" size="md">Medium Button</Button>
                <Button variant="primary" size="lg">Large Button</Button>
              </div>
              
              <h3 className="showcase-subtitle">Sizes (Secondary Variant)</h3>
              <div className="button-group button-group--aligned">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </div>
          </section>

          {/* Badge Showcase */}
          <section className="action-panel">
            <h2 className="section-title">Badge Variants & Styles</h2>
            <p className="section-description">
              Status badges using MDS semantic tokens
            </p>
            
            <div className="button-showcase">
              <h3 className="showcase-subtitle">Filled Badges</h3>
              <div className="button-group button-group--aligned">
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
              
              <h3 className="showcase-subtitle">Outlined Badges</h3>
              <div className="button-group button-group--aligned">
                <Badge variant="info" badgeStyle="outlined">Info</Badge>
                <Badge variant="success" badgeStyle="outlined">Success</Badge>
                <Badge variant="warning" badgeStyle="outlined">Warning</Badge>
                <Badge variant="error" badgeStyle="outlined">Error</Badge>
                <Badge variant="neutral" badgeStyle="outlined">Neutral</Badge>
              </div>
              
              <h3 className="showcase-subtitle">Badge Sizes (Success Variant)</h3>
              <div className="button-group button-group--aligned">
                <Badge variant="success" size="sm">Small</Badge>
                <Badge variant="success" size="md">Medium</Badge>
                <Badge variant="success" size="lg">Large</Badge>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
