

import { useState } from 'react'
import { useHistoricalData } from '../../hooks/useHistoricalData'
import TemperatureHistoryChart from '../charts/TemperatureHistoryChart'
import AqiHistoryChart from '../charts/AqiHistoryChart'
import WindHistoryChart from '../charts/WindHistoryChart'

/**
 * HistoricalDataPanel Component
 * @param {Object} props
 * @param {string} props.cityName - Name of the city to display data for
 */
const HistoricalDataPanel = ({ cityName }) => {
  // State for time range toggle (24h or 7d)
  const [timeRange, setTimeRange] = useState('24h')

  // Fetch historical data using custom hook
  const {
    temp24h,
    temp7d,
    wind24h,
    wind7d,
    aqi24h,
    aqi7d,
    loading,
    error
  } = useHistoricalData(cityName)


  const tempData = timeRange === '24h' ? temp24h : temp7d
  const windData = timeRange === '24h' ? wind24h : wind7d
  const aqiData = timeRange === '24h' ? aqi24h : aqi7d

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Historical Data Analysis
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View trends for {cityName}
          </p>
        </div>

        {/* Time Range Toggle Buttons */}
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              timeRange === '24h'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Last 24 Hours
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              timeRange === '7d'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Last 7 Days
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading historical data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.409 1.674 1.318 1.674.487 0 .953-.196 1.293-.536l.136-.136a1 1 0 011.414 0l.136.136c.34.34.806.536 1.293.536.909 0 1.568-.894 1.318-1.674l-.818-2.552a1 1 0 00-.95-.69H6.95a1 1 0 00-.95.69z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Temperature Trend
              </h3>
            </div>
            <div className="h-64">
              {tempData.data.length > 0 ? (
                <TemperatureHistoryChart
                  labels={tempData.labels}
                  data={tempData.data}
                  timeRange={timeRange}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No temperature data available
                </div>
              )}
            </div>
          </div>

          {/* Wind Speed Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Wind Speed Trend
              </h3>
            </div>
            <div className="h-64">
              {windData.data.length > 0 ? (
                <WindHistoryChart
                  labels={windData.labels}
                  data={windData.data}
                  timeRange={timeRange}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No wind data available
                </div>
              )}
            </div>
          </div>

          {/* AQI Chart - Full Width */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Air Quality Index (PM2.5)
              </h3>
            </div>
            <div className="h-64">
              {aqiData.data.length > 0 ? (
                <AqiHistoryChart
                  labels={aqiData.labels}
                  data={aqiData.data}
                  timeRange={timeRange}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <p>No AQI data available for this city</p>
                    <p className="text-sm mt-2">Some cities may not have air quality monitoring stations</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      {!loading && !error && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700 dark:text-blue-400">
              <p className="font-medium mb-1">Data Sources (100% Free APIs)</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Temperature & Wind: Open-Meteo Weather API (no API key required)</li>
                <li>Air Quality: Open-Meteo Air Quality API (no API key required)</li>
                <li>Data updates automatically when you change cities</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoricalDataPanel
