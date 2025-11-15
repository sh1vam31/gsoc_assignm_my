

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
 * TemperatureHistoryChart Component
 * @param {Object} props
 * @param {Array} props.labels - X-axis labels (time/date)
 * @param {Array} props.data - Temperature values
 * @param {string} props.timeRange - '24h' or '7d'
 */
const TemperatureHistoryChart = ({ labels, data, timeRange }) => {
  // Chart configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data,
        borderColor: 'rgb(239, 68, 68)', // Red color
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth curves
        pointRadius: timeRange === '24h' ? 2 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }

  // Chart options
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
        borderColor: 'rgba(239, 68, 68, 0.5)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `Temperature: ${context.parsed.y.toFixed(1)}°C`
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
            return value + '°C'
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

export default TemperatureHistoryChart
