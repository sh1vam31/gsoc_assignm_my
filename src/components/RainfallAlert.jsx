import { useEffect, useState } from 'react'
import { X, CloudRain, AlertTriangle, Droplets } from 'lucide-react'

function RainfallAlert({ rainfallAnalysis, onClose, locationName }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (rainfallAnalysis?.hasAlert) setIsVisible(true)
  }, [rainfallAnalysis])

  if (!rainfallAnalysis?.hasAlert || !isVisible) return null

  const { alertLevel, alertType, message, maxPop, maxRainfall, forecast } = rainfallAnalysis
  const displayLocation = rainfallAnalysis.locationName || locationName || 'Your Location'

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const styles = {
    moderate: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-400', text: 'text-yellow-800 dark:text-yellow-200', badge: 'bg-yellow-500' },
    heavy: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-400', text: 'text-red-800 dark:text-red-200', badge: 'bg-red-500' }
  }
  const s = styles[alertLevel] || styles.moderate

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4">
        <div className={`${s.bg} ${s.border} border-2 rounded-2xl shadow-2xl`}>
          <div className={`${s.badge} px-6 py-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {alertLevel === 'heavy' ? <AlertTriangle className="w-6 h-6 text-white" /> : <CloudRain className="w-6 h-6 text-white" />}
                <h3 className="text-xl font-bold text-white">{alertType}</h3>
              </div>
              <button onClick={handleClose} className="text-white hover:bg-white/20 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/90 text-sm ml-9">📍 {displayLocation}</p>
          </div>

          <div className="p-6 space-y-4">
            <p className={`${s.text} text-lg font-medium`}>{message}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${s.bg} border ${s.border} rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className={`w-5 h-5 ${s.text}`} />
                  <span className={`${s.text} text-sm font-medium`}>Probability</span>
                </div>
                <p className={`${s.text} text-2xl font-bold`}>{maxPop}%</p>
              </div>
              
              <div className={`${s.bg} border ${s.border} rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className={`w-5 h-5 ${s.text}`} />
                  <span className={`${s.text} text-sm font-medium`}>Rainfall</span>
                </div>
                <p className={`${s.text} text-2xl font-bold`}>{maxRainfall} mm/h</p>
              </div>
            </div>

            <div className={`border ${s.border} rounded-lg p-4`}>
              <h4 className={`${s.text} font-semibold mb-3`}>Next 2 Hours</h4>
              <div className="space-y-2">
                {forecast?.map((hour, i) => (
                  <div key={i} className={`flex justify-between p-3 rounded-lg ${parseFloat(hour.pop) > 60 ? `${s.bg}` : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <div>
                      <span className={`${s.text} font-medium`}>{hour.time}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{hour.description}</span>
                    </div>
                    <div className="text-sm">
                      <span className={`${s.text} font-medium`}>{hour.pop}% • {hour.rainfall}mm</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">{hour.temp}°C</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleClose} className={`w-full ${s.badge} text-white font-semibold py-3 rounded-lg hover:opacity-90`}>
              Got it!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RainfallAlert
