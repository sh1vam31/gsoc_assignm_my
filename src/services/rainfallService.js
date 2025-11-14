import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall'

export const fetchOneCallData = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,daily`
  const response = await axios.get(url, { timeout: 10000 })
  return response.data
}

export const analyzeRainfallForecast = (hourlyData) => {
  if (!hourlyData?.length) return { hasAlert: false }

  const next2Hours = hourlyData.slice(0, 2)
  let maxPop = 0
  let maxRainfall = 0

  next2Hours.forEach(hour => {
    const pop = (hour.pop || 0) * 100
    const rainfall = hour.rain?.['1h'] || 0
    if (pop > maxPop) maxPop = pop
    if (rainfall > maxRainfall) maxRainfall = rainfall
  })

  let alertLevel = 'none'
  let alertType = ''
  let message = ''

  if (maxPop > 80 && maxRainfall > 2) {
    alertLevel = 'heavy'
    alertType = 'Heavy Rainfall Alert'
    message = `Heavy rainfall expected! ${maxPop.toFixed(0)}% probability, ${maxRainfall.toFixed(1)}mm/h`
  } else if (maxPop > 60 && maxRainfall > 0.5) {
    alertLevel = 'moderate'
    alertType = 'Moderate Rainfall Alert'
    message = `Moderate rainfall expected. ${maxPop.toFixed(0)}% probability, ${maxRainfall.toFixed(1)}mm/h`
  }

  return {
    hasAlert: alertLevel !== 'none',
    alertLevel,
    alertType,
    message,
    maxPop: maxPop.toFixed(0),
    maxRainfall: maxRainfall.toFixed(1),
    forecast: next2Hours.map((hour, i) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      pop: ((hour.pop || 0) * 100).toFixed(0),
      rainfall: (hour.rain?.['1h'] || 0).toFixed(1),
      temp: Math.round(hour.temp),
      description: hour.weather[0]?.description || 'N/A'
    }))
  }
}
