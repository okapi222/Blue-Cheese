import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <>
      <Navigation />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
