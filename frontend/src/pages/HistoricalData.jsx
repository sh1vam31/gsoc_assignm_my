

import HistoricalDataPanel from '../components/history/HistoricalDataPanel'
import { useCity } from '../contexts/CityContext'

function HistoricalData() {
  const { selectedCity } = useCity()

  return (
    <div className="flex-1">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Historical Data Analysis - {selectedCity}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              View temperature, wind, and air quality trends for the selected city
            </p>
          </div>
        </div>
      </div>

      {/* Historical Data Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <HistoricalDataPanel cityName={selectedCity} />
      </main>
    </div>
  )
}

export default HistoricalData
