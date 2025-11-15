

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import CitySelector from '../components/CitySelector'
import StatusMessage from '../components/StatusMessage'
import MetricsGrid from '../components/MetricsGrid'
import ChartsGrid from '../components/ChartsGrid'
import RainfallAlert from '../components/RainfallAlert'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { useDashboardData } from '../hooks/useDashboardData'
import { useCity } from '../contexts/CityContext'
import { useGeolocationRainfallAlert } from '../hooks/useGeolocationRainfallAlert'
import { CITIES } from '../utils/constants'

function Dashboard() {
  const { selectedCity, setSelectedCity } = useCity()
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false)
  const [showRainfallAlert, setShowRainfallAlert] = useState(true)
  
  const { 
    weatherData, 
    airQualityData, 
    forecastData, 
    loading, 
    error, 
    lastUpdated,
    refreshData 
  } = useDashboardData(selectedCity)
  

  const { 
    rainfallAnalysis, 
    recheckRainfallAlert,
    locationName,
    permissionDenied,
    requestLocationAndCheck
  } = useGeolocationRainfallAlert(true)
  
  useAutoRefresh(refreshData, autoRefreshEnabled)

  const handleCityChange = (city) => {
    setSelectedCity(city)
    setShowRainfallAlert(true) 
  }

  const handleRefresh = () => {
    refreshData()
    recheckRainfallAlert() 
  }

  const handleAutoRefreshToggle = (enabled) => {
    setAutoRefreshEnabled(enabled)
  }

  const handleCloseRainfallAlert = () => {
    setShowRainfallAlert(false)
  }

  return (
    <div className="flex-1">
      {/* Rainfall Alert Popup */}
      {showRainfallAlert && (
        <RainfallAlert 
          rainfallAnalysis={rainfallAnalysis}
          locationName={locationName}
          onClose={handleCloseRainfallAlert}
        />
      )}

      {/* Location Permission Denied Message */}
      {permissionDenied && (
        <div className="container mx-auto px-4 pt-4 max-w-7xl">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Location Access Required
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  Rainfall alerts use your current location to provide accurate weather warnings. 
                  Please enable location access in your browser settings.
                </p>
                <button
                  onClick={requestLocationAndCheck}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
      <main className="container mx-auto px-4 py-8 max-w-7xl">
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
    </div>
  )
}

export default Dashboard
