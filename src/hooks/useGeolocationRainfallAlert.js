import { useState, useEffect, useCallback } from 'react'
import { reverseGeocode } from '../services/apiService'
import { fetchOneCallData, analyzeRainfallForecast } from '../services/rainfallService'

export const useGeolocationRainfallAlert = (enabled = true) => {
  const [rainfallAnalysis, setRainfallAnalysis] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => {
          if (err.code === err.PERMISSION_DENIED) setPermissionDenied(true)
          reject(err)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      )
    })
  }

  const checkRainfallAlert = useCallback(async () => {
    if (!enabled) return

    try {
      const coords = await getUserLocation()
      
      try {
        const name = await reverseGeocode(coords.lat, coords.lon)
        setLocationName(name)
      } catch {
        setLocationName('Your Location')
      }
      
      const data = await fetchOneCallData(coords.lat, coords.lon)
      const analysis = analyzeRainfallForecast(data.hourly)
      
      if (analysis) {
        analysis.locationName = locationName || 'Your Location'
      }
      
      setRainfallAnalysis(analysis)
    } catch (err) {
      console.error('Rainfall alert error:', err)
      setRainfallAnalysis(null)
    }
  }, [enabled, locationName])

  const requestLocationAndCheck = useCallback(async () => {
    setPermissionDenied(false)
    await checkRainfallAlert()
  }, [checkRainfallAlert])

  useEffect(() => {
    if (enabled) checkRainfallAlert()
  }, [enabled, checkRainfallAlert])

  return {
    rainfallAnalysis,
    locationName,
    permissionDenied,
    recheckRainfallAlert: checkRainfallAlert,
    requestLocationAndCheck
  }
}
