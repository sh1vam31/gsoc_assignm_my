

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

/**
 * Get AQI category and color based on PM2.5 value
 * @param {number} value - PM2.5 value
 * @returns {Object} - Category info with color
 */
const getAqiCategory = (value) => {
  if (value <= 12) return { label: 'Good', color: 'rgb(34, 197, 94)' }
  if (value <= 35.4) return { label: 'Moderate', color: 'rgb(234, 179, 8)' }
  if (value <= 55.4) return { label: 'Unhealthy for Sensitive', color: 'rgb(249, 115, 22)' }
  if (value <= 150.4) return { label: 'Unhealthy', color: 'rgb(239, 68, 68)' }
  if (value <= 250.4) return { label: 'Very Unhealthy', color: 'rgb(168, 85, 247)' }
  return { label: 'Hazardous', color: 'rgb(127, 29, 29)' }
}

/**
 * AqiHistoryChart Component
 * @param {Object} props
 * @param {Array} props.labels - X-axis labels
 * @param {Array} props.data - AQI/PM2.5 values
 * @param {string} props.timeRange - '24h' or '7d'
 */
const AqiHistoryChart = ({ labels, data, timeRange }) => {
  // Calculate average AQI to determine chart color
  const avgAqi = data.length > 0 
    ? data.reduce((a, b) => a + b, 0) / data.length 
    : 0
  const aqiCategory = getAqiCategory(avgAqi)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'PM2.5 (µg/m³)',
        data: data,
        borderColor: aqiCategory.color,
        backgroundColor: aqiCategory.color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: timeRange === '24h' ? 2 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: aqiCategory.color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#6b7280',
          font: {
            size: 12,
            weight: '500'
          },
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: aqiCategory.color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y
            const category = getAqiCategory(value)
            return [
              `PM2.5: ${value.toFixed(1)} µg/m³`,
              `Quality: ${category.label}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          },
          callback: function(value) {
            return value + ' µg/m³'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default AqiHistoryChart
