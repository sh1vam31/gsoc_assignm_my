/**
 * Header Component
 * Displays the dashboard title and subtitle
 */

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
          <i className="fas fa-city text-blue-400"></i>
          Smart City Dashboard
        </h1>
        <p className="text-lg md:text-xl text-blue-200">
          Real-time City Metrics & Insights
        </p>
      </div>
    </header>
  )
}

export default Header
