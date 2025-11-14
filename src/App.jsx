/**
 * Main App Component
 * Orchestrates the entire Smart City Dashboard
 */

import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import StatusMessage from './components/StatusMessage'
import MetricsGrid from './components/MetricsGrid'
import ChartsGrid from './components/ChartsGrid'
import Footer from './components/Footer'
import { useAutoRefresh } from './hooks/useAutoRefresh'
import { useDashboardData } from './hooks/useDashboardData'
import { CITIES } from './utils/constants'

function App() {
  // State management
  const [selectedCity, setSelectedCity] = useState(CITIES[0].value)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false)
  
  // Custom hooks for data fetching and auto-refresh
  const { 
    weatherData, 
    airQualityData, 
    forecastData, 
    loading, 
    error, 
    lastUpdated,
    refreshData 
  } = useDashboardData(selectedCity)
  
  useAutoRefresh(refreshData, autoRefreshEnabled)

  // Handle city change
  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  // Handle manual refresh
  const handleRefresh = () => {
    refreshData()
  }

  // Handle auto-refresh toggle
  const handleAutoRefreshToggle = (enabled) => {
    setAutoRefreshEnabled(enabled)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        {/* Header */}
        <Header />
        
        {/* City Selector */}
        <CitySelector
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          onRefresh={handleRefresh}
          autoRefreshEnabled={autoRefreshEnabled}
          onAutoRefreshToggle={handleAutoRefreshToggle}
          loading={loading}
        />
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {/* Status Message */}
          <StatusMessage 
            error={error} 
            loading={loading}
            lastUpdated={lastUpdated}
          />
          
          {/* Metrics Cards Grid */}
          <MetricsGrid
            weatherData={weatherData}
            airQualityData={airQualityData}
            lastUpdated={lastUpdated}
            loading={loading}
          />
          
          {/* Charts Grid */}
          <ChartsGrid
            weatherData={weatherData}
            airQualityData={airQualityData}
            forecastData={forecastData}
            loading={loading}
          />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
