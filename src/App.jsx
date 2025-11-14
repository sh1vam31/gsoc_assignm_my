/**
 * Main App Component
 * Multi-page Smart City Dashboard with React Router
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import HistoricalData from './pages/HistoricalData'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/historical" element={<HistoricalData />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
