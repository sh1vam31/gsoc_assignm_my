

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
import ChartCard from '../ui/ChartCard'
import { useTheme } from '../../contexts/ThemeContext'


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

const TemperatureChart = ({ data, loading }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  

  const textColor = isDark ? '#e5e7eb' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'
  if (loading || !data || data.length === 0) {
    return (
      <ChartCard 
        title="Temperature Trend (24h Forecast)" 
        icon="fa-chart-line"
      >
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500">
            {loading ? 'Loading chart...' : 'No data available'}
          </div>
        </div>
      </ChartCard>
    )
  }

  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(item => item.temp),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(37, 99, 235)',
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
          color: textColor
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDark ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Temperature: ${context.parsed.y}°C`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColor
        },
        grid: {
          color: gridColor
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: textColor,
          callback: function(value) {
            return value + '°C'
          }
        },
        grid: {
          color: gridColor
        }
      }
    }
  }

  return (
    <ChartCard 
      title="Temperature Trend (24h Forecast)" 
      icon="fa-chart-line"
    >
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </ChartCard>
  )
}

export default TemperatureChart
