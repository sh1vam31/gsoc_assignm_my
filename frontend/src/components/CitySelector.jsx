

import { useState, useRef, useEffect } from 'react'
import { searchLocations, reverseGeocode } from '../services/apiService'

const CitySelector = ({ 
  selectedCity, 
  onCityChange, 
  onRefresh, 
  autoRefreshEnabled, 
  onAutoRefreshToggle,
  loading 
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const dropdownRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    if (searchInput.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }


    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const results = await searchLocations(searchInput)
        setSuggestions(results)
        setShowSuggestions(results.length > 0)
      } catch (error) {
        console.error('Error searching locations:', error)
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchInput])

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocationSelect = (locationName) => {
    onCityChange(locationName)
    setSearchInput('')
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onCityChange(searchInput.trim())
      setSearchInput('')
      setShowSuggestions(false)
      setSuggestions([])
    }
  }


  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsDetectingLocation(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
         
          const locationName = await reverseGeocode(latitude, longitude)
          
         
          onCityChange(locationName)
        } catch (error) {
          console.error('Error getting location name:', error)
          alert('Could not determine your location name')
        } finally {
          setIsDetectingLocation(false)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Could not access your location. Please enable location permissions.')
        setIsDetectingLocation(false)
      }
    )
  }

  return (
    <section className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-5 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Location Search Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1" ref={dropdownRef}>
            {/* Location Label */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">
              <span className="text-2xl">📍</span>
              <span>Location:</span>
            </div>

            {/* Use My Location Button */}
            <button
              onClick={handleDetectLocation}
              disabled={loading || isDetectingLocation}
              className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl 
                       hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg
                       transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 
                       disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium
                       transform hover:-translate-y-0.5 active:translate-y-0"
              title="Use my current location"
            >
              <i className={`fas fa-crosshairs ${isDetectingLocation ? 'fa-spin' : ''}`}></i>
              <span className="hidden sm:inline">{isDetectingLocation ? 'Detecting...' : 'My Location'}</span>
            </button>
            
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-2xl">
              {/* Search Input with Enhanced Styling */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 
                              group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                <div className="relative flex items-center">
                  <i className="fas fa-search absolute left-4 text-gray-400 dark:text-gray-500 z-10"></i>
                  <input
                    type="text"
                    placeholder="Search any city or state..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    disabled={loading}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 
                             rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                             focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                             dark:focus:ring-blue-900 focus:outline-none transition-all duration-200
                             hover:border-blue-400 dark:hover:border-blue-500 
                             disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
                             placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                  />
                  {isSearching && (
                    <i className="fas fa-spinner fa-spin absolute right-4 text-blue-500 z-10"></i>
                  )}
                </div>
              </div>

              {/* Current Location Display with Badge */}
              <div className="mt-2 flex items-center gap-2 pl-11">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  <i className="fas fa-map-marker-alt text-xs"></i>
                  {selectedCity}
                </span>
              </div>

              {/* Enhanced Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 
                              dark:border-gray-600 rounded-xl shadow-2xl overflow-hidden animate-slide-down">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2">
                    <p className="text-white text-sm font-medium">
                      {suggestions.length} location{suggestions.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="overflow-y-auto max-h-80 scrollbar-thin">
                    {suggestions.map((location, index) => (
                      <div
                        key={index}
                        onClick={() => handleLocationSelect(location.name)}
                        className="px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 
                                 transition-all duration-150 border-b border-gray-100 dark:border-gray-700 
                                 last:border-b-0 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center 
                                        justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 
                                        transition-colors">
                            <i className="fas fa-map-pin text-blue-600 dark:text-blue-400 text-sm"></i>
                          </div>
                          <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 
                                       dark:group-hover:text-blue-400 transition-colors">
                            {location.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl 
                       hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg
                       transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 
                       disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium
                       transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
              <span>{loading ? 'Loading...' : 'Refresh Data'}</span>
            </button>

            {/* Auto-refresh Toggle */}
            <label className="flex items-center gap-3 cursor-pointer px-4 py-2.5 bg-gray-100 dark:bg-gray-700 
                            rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200
                            border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600">
              <input
                type="checkbox"
                checked={autoRefreshEnabled}
                onChange={(e) => onAutoRefreshToggle(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                         dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                Auto-refresh (60s)
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CitySelector
