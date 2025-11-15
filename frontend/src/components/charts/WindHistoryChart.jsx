

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
 * WindHistoryChart Component
 * @param {Object} props
 * @param {Array} props.labels - X-axis labels
 * @param {Array} props.data - Wind speed values
 * @param {string} props.timeRange - '24h' or '7d'
 */
const WindHistoryChart = ({ labels, data, timeRange }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Wind Speed (km/h)',
        data: data,
        borderColor: 'rgb(59, 130, 246)', // Blue color
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: timeRange === '24h' ? 2 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
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
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `Wind Speed: ${context.parsed.y.toFixed(1)} km/h`
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
            return value + ' km/h'
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

export default WindHistoryChart
