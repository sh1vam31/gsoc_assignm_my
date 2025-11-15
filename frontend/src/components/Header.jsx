

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
          <div className="flex-1 flex justify-end items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-blue-200 dark:text-gray-300 hidden md:inline">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg 
                           font-medium transition-all duration-200 backdrop-blur-sm
                           border border-white/20 hover:border-white/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg 
                         font-medium transition-all duration-200 backdrop-blur-sm
                         border border-white/20 hover:border-white/30"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
