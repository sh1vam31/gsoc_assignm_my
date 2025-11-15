

import { useState, useEffect } from 'react'
import {
  getCoordinates,
  fetchWeatherHistory,
  fetchAQIHistory,
  formatWeatherResponse,
  formatAqiResponse
} from '../utils/historyUtils'

export const useHistoricalData = (cityName) => {
  const [temp24h, setTemp24h] = useState({ labels: [], data: [] })
  const [temp7d, setTemp7d] = useState({ labels: [], data: [] })
  const [wind24h, setWind24h] = useState({ labels: [], data: [] })
  const [wind7d, setWind7d] = useState({ labels: [], data: [] })
  const [aqi24h, setAqi24h] = useState({ labels: [], data: [] })
  const [aqi7d, setAqi7d] = useState({ labels: [], data: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true)
      setError(null)

      try {
        const coordinates = await getCoordinates(cityName)
        const [weatherData, aqiData] = await Promise.all([
          fetchWeatherHistory(coordinates.lat, coordinates.lon),
          fetchAQIHistory(coordinates.lat, coordinates.lon)
        ])

        const formattedWeather = formatWeatherResponse(weatherData)
        const formattedAqi = formatAqiResponse(aqiData)

        setTemp24h(formattedWeather.temp24h)
        setTemp7d(formattedWeather.temp7d)
        setWind24h(formattedWeather.wind24h)
        setWind7d(formattedWeather.wind7d)
        setAqi24h(formattedAqi.aqi24h)
        setAqi7d(formattedAqi.aqi7d)
      } catch (err) {
        setError(err.message || 'Failed to fetch historical data')
        console.error('Error in useHistoricalData:', err)
      } finally {
        setLoading(false)
      }
    }

    if (cityName) {
      fetchHistoricalData()
    }
  }, [cityName])

  return {
    temp24h,
    temp7d,
    wind24h,
    wind7d,
    aqi24h,
    aqi7d,
    loading,
    error
  }
}
