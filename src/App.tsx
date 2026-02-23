import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { AnalyticsDashboard } from './pages/AnalyticsDashboard'
import { UserManagement } from './pages/UserManagement'
import { ProjectPortfolio } from './pages/ProjectPortfolio'
import { DataImport } from './pages/DataImport'
import { SolarIndustryUpdate } from './pages/SolarIndustryUpdate'

/** Full-page redirect so the browser loads the static HTML (fixes blank page from client-side Navigate). */
function RedirectToStatic({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url)
  }, [url])
  return null
}

function App() {
  const location = useLocation()
  const isPresentation = location.pathname === '/solar-industry-update'

  return (
    <>
      {!isPresentation && <Navigation />}
      <div className={`app-content${isPresentation ? ' app-content--full-bleed' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/project-portfolio" element={<ProjectPortfolio />} />
          <Route path="/data-import" element={<DataImport />} />
          <Route path="/solar-industry-update" element={<SolarIndustryUpdate />} />
          <Route
            path="/ai-superpower"
            element={<RedirectToStatic url="/ai-superpower.html" />}
          />
          <Route
            path="/presentation-scroll/*"
            element={<Navigate to="/presentation-scroll/index.html" replace />}
          />
        </Routes>
      </div>
    </>
  )
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWithRouter
