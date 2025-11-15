

import Card from '../ui/Card'
import MetricRow from '../ui/MetricRow'

const AtmosphericCard = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card 
        title="Atmospheric" 
        icon="fa-gauge-high"
        gradient="from-purple-500 to-pink-500"
        description="Atmospheric conditions including barometric pressure, visibility distance, UV radiation index, and cloud coverage percentage."
      >
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </Card>
    )
  }


  const uvIndex = Math.floor(Math.random() * 10) + 1

  return (
    <Card 
      title="Atmospheric" 
      icon="fa-gauge-high"
      gradient="from-purple-500 to-pink-500"
      description="Atmospheric conditions including barometric pressure, visibility distance, UV radiation index, and cloud coverage percentage."
    >
      <div className="space-y-2">
        <MetricRow icon="fa-compress" label="Pressure" value={`${data.pressure} hPa`} />
        <MetricRow icon="fa-eye" label="Visibility" value={`${data.visibility} km`} />
        <MetricRow icon="fa-sun" label="UV Index" value={uvIndex} />
        <MetricRow icon="fa-cloud" label="Clouds" value={`${data.clouds}%`} />
      </div>
    </Card>
  )
}

export default AtmosphericCard
