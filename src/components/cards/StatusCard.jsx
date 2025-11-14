/**
 * Status Card Component
 * Displays last update time and data source information
 */

import Card from '../ui/Card'
import { formatDateTime } from '../../utils/helpers'

const StatusCard = ({ lastUpdated, loading }) => {
  const hasRealAPI = import.meta.env.VITE_OPENWEATHER_API_KEY && 
                     import.meta.env.VITE_OPENWEATHER_API_KEY !== 'your_openweather_api_key_here'

  return (
    <Card 
      title="Status" 
      icon="fa-clock"
      gradient="from-orange-500 to-red-500"
    >
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
            <i className="fas fa-calendar"></i>
            <span className="font-medium">Last Updated:</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic pl-6">
            {loading ? 'Updating...' : lastUpdated ? formatDateTime(lastUpdated) : 'Not yet updated'}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
            <i className="fas fa-database"></i>
            <span className="font-medium">Data Source:</span>
          </div>
          <p className="text-sm pl-6">
            {hasRealAPI ? (
              <span className="text-green-600 dark:text-green-400 font-semibold">
                <i className="fas fa-check-circle"></i> Live API Data
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                <i className="fas fa-exclamation-triangle"></i> Mock Data
              </span>
            )}
          </p>
          {!hasRealAPI && (
            <p className="text-xs text-gray-500 dark:text-gray-400 pl-6 mt-1">
              Configure API keys in .env
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default StatusCard
