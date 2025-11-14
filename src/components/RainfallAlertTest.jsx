import { useState } from 'react'
import RainfallAlert from './RainfallAlert'

function RainfallAlertTest() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState('moderate')

  const mockAlerts = {
    moderate: {
      hasAlert: true,
      alertLevel: 'moderate',
      alertType: 'Moderate Rainfall Alert',
      message: 'Moderate rainfall expected. 70% probability, 1.2mm/h',
      maxPop: '70',
      maxRainfall: '1.2',
      locationName: 'San Francisco, CA',
      forecast: [
        { time: '2:00 PM', pop: '70', rainfall: '1.2', temp: 16, description: 'light rain' },
        { time: '3:00 PM', pop: '65', rainfall: '0.9', temp: 15, description: 'light rain' }
      ]
    },
    heavy: {
      hasAlert: true,
      alertLevel: 'heavy',
      alertType: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected! 90% probability, 4.5mm/h',
      maxPop: '90',
      maxRainfall: '4.5',
      locationName: 'Seattle, WA',
      forecast: [
        { time: '2:00 PM', pop: '90', rainfall: '4.5', temp: 13, description: 'heavy rain' },
        { time: '3:00 PM', pop: '88', rainfall: '3.8', temp: 12, description: 'heavy rain' }
      ]
    }
  }

  const handleShow = (type) => {
    setAlertType(type)
    setShowAlert(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🌧️ Rainfall Alert Test
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Test the rainfall alert popup with mock data
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleShow('moderate')}
              className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              ⚠️ Show Moderate Alert
              <span className="block text-sm font-normal mt-1 opacity-90">
                60%+ probability, 0.5mm+ rainfall
              </span>
            </button>
            
            <button
              onClick={() => handleShow('heavy')}
              className="w-full px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              🚨 Show Heavy Alert
              <span className="block text-sm font-normal mt-1 opacity-90">
                80%+ probability, 2mm+ rainfall
              </span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 How to test real alerts:
            </h3>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Go to Dashboard page</li>
              <li>Allow location permission when prompted</li>
              <li>Alert will show if rain is expected in your area</li>
            </ol>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              🔍 Check Console:
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Open DevTools (F12) → Console to see location detection and API calls
            </p>
          </div>
        </div>
      </div>

      {showAlert && (
        <RainfallAlert 
          rainfallAnalysis={mockAlerts[alertType]}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}

export default RainfallAlertTest
