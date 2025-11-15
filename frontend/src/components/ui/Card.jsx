

import Tooltip from './Tooltip'

const Card = ({ title, icon, gradient, children, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover 
                    border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-4 relative overflow-visible`}>
        <h3 className="text-lg font-semibold flex items-center">
          <i className={`fas ${icon} mr-2`}></i>
          {title}
          {description && <Tooltip description={description} />}
        </h3>
      </div>
      
      {/* Card Body */}
      <div className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200">
        {children}
      </div>
    </div>
  )
}

export default Card
