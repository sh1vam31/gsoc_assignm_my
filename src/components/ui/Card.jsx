/**
 * Reusable Card Component
 * Base card with header and body
 */

const Card = ({ title, icon, gradient, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-4`}>
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

export default Card
