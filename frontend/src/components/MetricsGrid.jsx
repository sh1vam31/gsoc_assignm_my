

import WeatherCard from './cards/WeatherCard'
import AirQualityCard from './cards/AirQualityCard'
import AtmosphericCard from './cards/AtmosphericCard'
import StatusCard from './cards/StatusCard'

const MetricsGrid = ({ weatherData, airQualityData, lastUpdated, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <WeatherCard data={weatherData} loading={loading} />
      <AirQualityCard data={airQualityData} loading={loading} />
      <AtmosphericCard data={weatherData} loading={loading} />
      <StatusCard lastUpdated={lastUpdated} loading={loading} />
    </div>
  )
}

export default MetricsGrid
