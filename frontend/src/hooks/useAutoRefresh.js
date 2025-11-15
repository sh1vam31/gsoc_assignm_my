

import { useEffect, useRef } from 'react'

const AUTO_REFRESH_INTERVAL = parseInt(import.meta.env.VITE_AUTO_REFRESH_INTERVAL) || 60000

export const useAutoRefresh = (callback, enabled) => {
  const intervalRef = useRef(null)

  useEffect(() => {
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }


    if (enabled) {
      console.log('🔄 Auto-refresh enabled')
      intervalRef.current = setInterval(() => {
        console.log('🔄 Auto-refreshing data...')
        callback()
      }, AUTO_REFRESH_INTERVAL)
    } else {
      console.log('⏸️ Auto-refresh disabled')
    }

   
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [callback, enabled])
}
