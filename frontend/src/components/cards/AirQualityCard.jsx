

import Card from '../ui/Card'
import MetricRow from '../ui/MetricRow'
import { getAQIClass, getAQIColor } from '../../utils/helpers'

const AirQualityCard = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card 
        title="Air Quality" 
        icon="fa-lungs"
        gradient="from-green-500 to-emerald-500"
        description="Air Quality Index (AQI) measures pollution levels. Lower values indicate better air quality. PM2.5 and PM10 are particulate matter measurements."
      >
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </Card>
    )
  }

  const aqiClass = getAQIClass(data.level)
  const aqiColor = getAQIColor(data.level)

  return (
    <Card 
      title="Air Quality" 
      icon="fa-lungs"
      gradient="from-green-500 to-emerald-500"
      description="Air Quality Index (AQI) measures pollution levels. Lower values indicate better air quality. PM2.5 and PM10 are particulate matter measurements."
    >
      <div className="text-center mb-4">
        <div className="text-5xl font-bold" style={{ color: aqiColor }}>
          {data.aqi}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">AQI Level:</span>
          <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${aqiClass}`}>
            {data.level}
          </span>
        </div>
        <MetricRow icon="fa-smog" label="PM2.5" value={`${data.pm25} µg/m³`} />
        <MetricRow icon="fa-wind" label="PM10" value={`${data.pm10} µg/m³`} />
      </div>
    </Card>
  )
}

export default AirQualityCard
