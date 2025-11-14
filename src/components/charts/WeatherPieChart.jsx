/**
 * Weather Pie Chart Component
 * Displays weather metrics distribution using Doughnut chart
 */

import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import ChartCard from '../ui/ChartCard'
import { useTheme } from '../../contexts/ThemeContext'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

const WeatherPieChart = ({ data, loading }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Colors for light/dark mode
  const textColor = isDark ? '#e5e7eb' : '#374151'
  if (loading || !data) {
    return (
      <ChartCard 
        title="Weather Metrics Distribution" 
        icon="fa-chart-pie"
      >
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500">
            {loading ? 'Loading chart...' : 'No data available'}
          </div>
        </div>
      </ChartCard>
    )
  }

  const humidity = data.humidity || 0
  const clouds = data.clouds || 0
  const clearSky = 100 - clouds

  const chartData = {
    labels: ['Humidity', 'Cloud Cover', 'Clear Sky'],
    datasets: [
      {
        data: [humidity, clouds, clearSky],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(148, 163, 184, 0.7)',
          'rgba(251, 191, 36, 0.7)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(148, 163, 184)',
          'rgb(251, 191, 36)'
        ],
        borderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDark ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      }
    }
  }

  return (
    <ChartCard 
      title="Weather Metrics Distribution" 
      icon="fa-chart-pie"
    >
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </ChartCard>
  )
}

export default WeatherPieChart
