import { Link, useLocation } from 'react-router-dom'
import './navigation.css'

export function Navigation() {
  const location = useLocation()

  const pages = [
    { path: '/', label: 'Home', description: 'Landing Page' },
    { path: '/dashboard', label: 'Dashboard', description: 'Basic Dashboard' },
    { path: '/analytics-dashboard', label: 'Analytics Dashboard', description: 'Advanced Analytics & Metrics' },
    { path: '/user-management', label: 'User Management', description: 'User & Team Management Interface' },
    { path: '/project-portfolio', label: 'Project Portfolio', description: 'Project Tracking & Resource Allocation' },
    { path: '/data-import', label: 'Data Import', description: 'Data Import & Transformation Tool' },
    {
      path: '/solar-industry-update',
      label: 'Solar Industry Update',
      description: 'NREL Fall 2024 PPTX-Style Presentation',
    },
    {
      path: '/presentation-scroll/index.html',
      label: 'Presentation Scroll',
      description: 'Vanilla Single-Page Slide Deck',
      external: true
    },
  ]

  return (
    <nav className="app-navigation">
      <div className="app-navigation__header">
        <h1 className="app-navigation__title">MDS Test Pages</h1>
      </div>
      <ul className="app-navigation__list">
        {pages.map((page) => (
          <li key={page.path} className="app-navigation__item">
            {page.external ? (
              <a className="app-navigation__link" href={page.path}>
                <span className="app-navigation__label">{page.label}</span>
                <span className="app-navigation__description">{page.description}</span>
              </a>
            ) : (
              <Link
                to={page.path}
                className={`app-navigation__link ${
                  location.pathname === page.path ? 'app-navigation__link--active' : ''
                }`}
              >
                <span className="app-navigation__label">{page.label}</span>
                <span className="app-navigation__description">{page.description}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
