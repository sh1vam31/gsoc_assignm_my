

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { CityProvider } from './contexts/CityContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import HistoricalData from './pages/HistoricalData'
import NotFound from './pages/NotFound'
import RainfallAlertTest from './components/RainfallAlertTest'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CityProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                            dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
              {/* Header with Theme Toggle */}
              <Header />
              
              {/* Navigation Bar */}
              <Navigation />
            
            {/* Page Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/test-alert" element={<RainfallAlertTest />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/historical" 
                element={
                  <ProtectedRoute>
                    <HistoricalData />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
              {/* Footer */}
              <Footer />
            </div>
          </Router>
        </CityProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
