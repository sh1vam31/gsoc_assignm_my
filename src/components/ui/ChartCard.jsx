/**
 * Reusable Chart Card Component
 * Wrapper for chart components
 */

const ChartCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <i className={`fas ${icon}`}></i>
          {title}
        </h3>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default ChartCard
