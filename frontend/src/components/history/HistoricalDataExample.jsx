

import { useState } from 'react'
import HistoricalDataPanel from './HistoricalDataPanel'


const HistoricalDataExample = () => {

  const [selectedCity, setSelectedCity] = useState('London')


  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Mumbai']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Example City Selector */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Historical Data Example
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a city to view its historical weather and air quality data
          </p>
          
          {/* City Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCity === city
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Historical Data Panel - This is what you'll use in your app */}
        <HistoricalDataPanel cityName={selectedCity} />

        {/* Usage Instructions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
            How to Use in Your App
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// 1. Import the component
import HistoricalDataPanel from './components/history/HistoricalDataPanel'

// 2. Use it in your component
function MyApp() {
  const [city, setCity] = useState('London')
  
  return (
    <div>
      <HistoricalDataPanel cityName={city} />
    </div>
  )
}

// That's it! The component handles:
// - Data fetching from free APIs
// - Loading states
// - Error handling
// - Chart rendering
// - Time range toggling (24h/7d)`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricalDataExample
