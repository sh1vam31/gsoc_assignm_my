/**
 * Reusable Metric Row Component
 * Displays a metric with icon, label, and value
 */

const MetricRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <i className={`fas ${icon} w-4 text-blue-500 dark:text-blue-400`}></i>
        {label}:
      </span>
      <span className="font-semibold text-gray-800 dark:text-gray-200">{value}</span>
    </div>
  )
}

export default MetricRow
