/**
 * Header Component
 * Displays the dashboard title and subtitle
 */

import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 
                       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                       text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
              <i className="fas fa-city text-blue-400 dark:text-blue-300"></i>
              Smart City Dashboard
            </h1>
            <p className="text-lg md:text-xl text-blue-200 dark:text-gray-300">
              Real-time City Metrics & Insights
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
