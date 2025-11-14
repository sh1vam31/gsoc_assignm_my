/**
 * City Selector Component
 * Allows users to select a city, refresh data, and toggle auto-refresh
 */

import { CITIES } from '../utils/constants'

const CitySelector = ({ 
  selectedCity, 
  onCityChange, 
  onRefresh, 
  autoRefreshEnabled, 
  onAutoRefreshToggle,
  loading 
}) => {
  return (
    <section className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* City Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="citySelect" className="font-semibold text-gray-700 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-blue-600"></i>
              Select City:
            </label>
            <select
              id="citySelect"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2 border-2 border-gray-300 rounded-lg 
                       focus:border-blue-500 focus:outline-none transition-colors
                       bg-white cursor-pointer hover:border-blue-400"
              disabled={loading}
            >
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>

          {/* Auto-refresh Toggle */}
          <label className="flex items-center gap-2 cursor-pointer ml-auto w-full md:w-auto justify-center md:justify-start">
            <input
              type="checkbox"
              checked={autoRefreshEnabled}
              onChange={(e) => onAutoRefreshToggle(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-700 font-medium">
              Auto-refresh (60s)
            </span>
          </label>
        </div>
      </div>
    </section>
  )
}

export default CitySelector
