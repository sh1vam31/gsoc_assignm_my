
import { useState } from 'react'

const Tooltip = ({ description }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block ml-2">
      <button
        className="text-white/80 hover:text-white transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label="More information"
        type="button"
      >
        <i className="fas fa-question-circle text-sm"></i>
      </button>
      
      {isVisible && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white text-gray-800 text-sm 
                     rounded-lg shadow-2xl border border-gray-200 p-3 z-[9999] animate-fade-in"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          {description}
        </div>
      )}
    </div>
  )
}

export default Tooltip
