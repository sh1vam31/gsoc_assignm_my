/**
 * Footer Component
 * Displays footer information
 */

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-blue-200 mb-2">
          &copy; 2024 Smart City Dashboard | Data from OpenWeatherMap & AQICN APIs
        </p>
        <p className="text-blue-300 text-sm">
          Built with React, Tailwind CSS, and Chart.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
