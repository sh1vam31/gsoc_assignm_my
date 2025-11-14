/**
 * Utility functions for fetching and processing historical data
 * Uses FREE APIs: Open-Meteo (weather) and OpenAQ (air quality)
 */

import axios from 'axios'

/**
 * Get coordinates for a city using Open-Meteo Geocoding API (FREE)
 * @param {string} cityName - Name of the city (can be full location string)
 * @returns {Promise<{lat: number, lon: number}>} - Latitude and longitude
 */
export const getCoordinates = async (cityName) => {
  try {
    // Extract just the city name if it's a full location string
    // e.g., "Kanpur, Kanpur Nagar, Uttar Pradesh, India" -> "Kanpur"
    const simpleCityName = cityName.split(',')[0].trim()
    
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: simpleCityName,
        count: 1,
        language: 'en',
        format: 'json'
      }
    })

    if (response.data.results && response.data.results.length > 0) {
      const { latitude, longitude } = response.data.results[0]
      return { lat: latitude, lon: longitude }
    }
    
    throw new Error('City not found')
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    throw error
  }
}

/**
 * Get timestamps for the last 24 hours
 * @returns {Array<string>} - Array of ISO timestamp strings
 */
export const getLast24HoursTimestamps = () => {
  const timestamps = []
  const now = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    timestamps.push(time.toISOString())
  }
  
  return timestamps
}

/**
 * Get timestamps for the last 7 days
 * @returns {Array<string>} - Array of ISO date strings
 */
export const getLast7DaysTimestamps = () => {
  const timestamps = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    timestamps.push(date.toISOString().split('T')[0])
  }
  
  return timestamps
}

/**
 * Fetch weather history from Open-Meteo API (FREE - no API key needed)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Weather history data
 */
export const fetchWeatherHistory = async (lat, lon) => {
  try {
    // Get date range for last 7 days
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const startDateStr = startDate.toISOString().split('T')[0]
    const endDateStr = endDate.toISOString().split('T')[0]

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,windspeed_10m,relativehumidity_2m',
        start_date: startDateStr,
        end_date: endDateStr,
        timezone: 'auto'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching weather history:', error)
    throw error
  }
}

/**
 * Fetch AQI history from Open-Meteo Air Quality API (FREE)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - AQI history data
 */
export const fetchAQIHistory = async (lat, lon) => {
  try {
    // Get date range for last 7 days
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const startDateStr = startDate.toISOString().split('T')[0]
    const endDateStr = endDate.toISOString().split('T')[0]

    const response = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'pm2_5,pm10,european_aqi',
        start_date: startDateStr,
        end_date: endDateStr,
        timezone: 'auto'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching AQI history:', error)
    // Return empty data instead of throwing to handle cities without AQI data
    return { hourly: { time: [], pm2_5: [], european_aqi: [] } }
  }
}

/**
 * Format weather response into 24h and 7d datasets
 * @param {Object} weatherData - Raw weather data from Open-Meteo
 * @returns {Object} - Formatted data with temp24h, temp7d, wind24h, wind7d
 */
export const formatWeatherResponse = (weatherData) => {
  if (!weatherData || !weatherData.hourly) {
    return {
      temp24h: { labels: [], data: [] },
      temp7d: { labels: [], data: [] },
      wind24h: { labels: [], data: [] },
      wind7d: { labels: [], data: [] }
    }
  }

  const { time, temperature_2m, windspeed_10m } = weatherData.hourly

  // Last 24 hours (last 24 data points)
  const last24Hours = time.slice(-24)
  const temp24hData = temperature_2m.slice(-24)
  const wind24hData = windspeed_10m.slice(-24)

  // Format labels for 24h (show hour only)
  const labels24h = last24Hours.map(t => {
    const date = new Date(t)
    return date.getHours() + ':00'
  })

  // Last 7 days (aggregate by day - take average of each day)
  const dailyData = {}
  
  time.forEach((timestamp, index) => {
    const date = timestamp.split('T')[0]
    
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        winds: []
      }
    }
    
    dailyData[date].temps.push(temperature_2m[index])
    dailyData[date].winds.push(windspeed_10m[index])
  })

  // Calculate daily averages
  const dates = Object.keys(dailyData).sort()
  const temp7dData = dates.map(date => {
    const temps = dailyData[date].temps.filter(t => t !== null)
    return temps.length > 0 
      ? temps.reduce((a, b) => a + b, 0) / temps.length 
      : null
  })
  
  const wind7dData = dates.map(date => {
    const winds = dailyData[date].winds.filter(w => w !== null)
    return winds.length > 0 
      ? winds.reduce((a, b) => a + b, 0) / winds.length 
      : null
  })

  // Format labels for 7d (show date)
  const labels7d = dates.map(date => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
  })

  return {
    temp24h: { labels: labels24h, data: temp24hData },
    temp7d: { labels: labels7d, data: temp7dData },
    wind24h: { labels: labels24h, data: wind24hData },
    wind7d: { labels: labels7d, data: wind7dData }
  }
}

/**
 * Format AQI response into 24h and 7d datasets
 * @param {Object} aqiData - Raw AQI data from Open-Meteo Air Quality API
 * @returns {Object} - Formatted data with aqi24h and aqi7d
 */
export const formatAqiResponse = (aqiData) => {
  if (!aqiData || !aqiData.hourly || !aqiData.hourly.time) {
    return {
      aqi24h: { labels: [], data: [] },
      aqi7d: { labels: [], data: [] }
    }
  }

  const { time, pm2_5, european_aqi } = aqiData.hourly
  
  // Use PM2.5 if available, otherwise use European AQI
  const aqiValues = pm2_5 || european_aqi

  if (!aqiValues || aqiValues.length === 0) {
    return {
      aqi24h: { labels: [], data: [] },
      aqi7d: { labels: [], data: [] }
    }
  }

  // Last 24 hours (last 24 data points)
  const last24Hours = time.slice(-24)
  const aqi24hData = aqiValues.slice(-24)

  // Format labels for 24h (show hour only)
  const labels24h = last24Hours.map(t => {
    const date = new Date(t)
    return date.getHours() + ':00'
  })

  // Last 7 days (aggregate by day - take average of each day)
  const dailyData = {}
  
  time.forEach((timestamp, index) => {
    const date = timestamp.split('T')[0]
    
    if (!dailyData[date]) {
      dailyData[date] = []
    }
    
    if (aqiValues[index] !== null && aqiValues[index] !== undefined) {
      dailyData[date].push(aqiValues[index])
    }
  })

  // Calculate daily averages
  const dates = Object.keys(dailyData).sort()
  const aqi7dData = dates.map(date => {
    const values = dailyData[date].filter(v => v !== null)
    return values.length > 0 
      ? values.reduce((a, b) => a + b, 0) / values.length 
      : null
  })

  // Format labels for 7d (show date)
  const labels7d = dates.map(date => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
  })

  return {
    aqi24h: { labels: labels24h, data: aqi24hData },
    aqi7d: { labels: labels7d, data: aqi7dData }
  }
}
