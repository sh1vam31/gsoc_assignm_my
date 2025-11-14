/**
 * Weather Card Component
 * Displays current weather information
 */

import Card from '../ui/Card'
import MetricRow from '../ui/MetricRow'

const WeatherCard = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card 
        title="Weather" 
        icon="fa-cloud-sun"
        gradient="from-blue-500 to-cyan-500"
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

  return (
    <Card 
      title="Weather" 
      icon="fa-cloud-sun"
      gradient="from-blue-500 to-cyan-500"
    >
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
          {data.temperature}°C
        </div>
      </div>
      <div className="space-y-2">
        <MetricRow icon="fa-tint" label="Humidity" value={`${data.humidity}%`} />
        <MetricRow icon="fa-wind" label="Wind" value={`${data.windSpeed} m/s`} />
        <MetricRow 
          icon="fa-eye" 
          label="Condition" 
          value={data.condition.charAt(0).toUpperCase() + data.condition.slice(1)} 
        />
      </div>
    </Card>
  )
}

export default WeatherCard
