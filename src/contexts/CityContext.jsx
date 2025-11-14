/**
 * City Context - Share selected city across pages
 */

import { createContext, useContext, useState } from 'react'
import { CITIES } from '../utils/constants'

const CityContext = createContext()

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0].value)

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}
