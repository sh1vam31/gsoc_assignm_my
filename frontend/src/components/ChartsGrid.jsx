

import TemperatureChart from './charts/TemperatureChart'
import AirQualityChart from './charts/AirQualityChart'
import WeatherPieChart from './charts/WeatherPieChart'

const ChartsGrid = ({ weatherData, airQualityData, forecastData, loading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <TemperatureChart data={forecastData} loading={loading} />
      <AirQualityChart data={airQualityData} loading={loading} />
      <WeatherPieChart data={weatherData} loading={loading} />
    </div>
  )
}

export default ChartsGrid
