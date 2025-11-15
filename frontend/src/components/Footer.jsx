
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 
                       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                       text-white mt-12 transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-blue-200 dark:text-gray-300 mb-2">
          &copy; 2024 Smart City Dashboard | Data from OpenWeatherMap & AQICN APIs
        </p>
        <p className="text-blue-300 dark:text-gray-400 text-sm">
          Built with React, Tailwind CSS, and Chart.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
