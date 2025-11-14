/**
 * Theme Toggle Component
 * Button to switch between dark and light themes
 */

import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 
                 dark:bg-gray-700/50 dark:hover:bg-gray-600/50
                 transition-all duration-200 focus:outline-none 
                 focus:ring-2 focus:ring-white/50 
                 backdrop-blur-sm shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <i className="fas fa-moon text-white text-xl"></i>
      ) : (
        <i className="fas fa-sun text-yellow-300 text-xl"></i>
      )}
    </button>
  )
}

export default ThemeToggle
