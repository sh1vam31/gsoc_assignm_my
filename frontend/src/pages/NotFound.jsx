

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-9xl mb-4">🔍</div>
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
