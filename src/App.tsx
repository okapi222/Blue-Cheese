import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { AnalyticsDashboard } from './pages/AnalyticsDashboard'
import { UserManagement } from './pages/UserManagement'
import { ProjectPortfolio } from './pages/ProjectPortfolio'
import { DataImport } from './pages/DataImport'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/project-portfolio" element={<ProjectPortfolio />} />
          <Route path="/data-import" element={<DataImport />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
