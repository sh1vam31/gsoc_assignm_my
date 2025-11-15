

import { Link } from 'react-router-dom'
import { useState } from 'react'

function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      id: 1,
      icon: '🌡️',
      title: 'Real-time Weather',
      description: 'Get live weather updates including temperature, humidity, wind speed, and conditions for cities worldwide.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: '💨',
      title: 'Air Quality Monitoring',
      description: 'Track air quality index (AQI), PM2.5, PM10 levels, and receive health recommendations based on current conditions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Interactive Charts',
      description: 'Visualize weather patterns and air quality trends with beautiful, interactive Chart.js visualizations.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      icon: '📈',
      title: 'Historical Analysis',
      description: 'View historical data trends over 24 hours and 7 days to understand weather and air quality patterns.',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      icon: '🌍',
      title: 'Multi-city Support',
      description: 'Monitor multiple cities around the world including London, New York, Tokyo, Paris, Mumbai, and Sydney.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Seamless dark mode support for comfortable viewing in any lighting condition with smooth transitions.',
      color: 'from-gray-700 to-gray-900'
    }
  ]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32 max-w-7xl">
          <div className="text-center">
            {/* Animated Icon */}
            <div className="mb-8 animate-bounce">
              <span className="text-8xl md:text-9xl drop-shadow-2xl">🏙️</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in drop-shadow-2xl">
              Smart City Dashboard
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl mb-8 text-white font-medium max-w-3xl mx-auto animate-slide-down drop-shadow-lg">
              Monitor real-time weather, air quality, and environmental data for cities worldwide
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link
                to="/dashboard"
                className="group relative px-10 py-5 bg-white text-blue-700 rounded-xl font-bold text-lg 
                         shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
                         transition-all duration-300 flex items-center gap-2"
              >
                <span>Get Started</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link
                to="/historical"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white 
                         rounded-xl font-bold text-lg hover:bg-white hover:text-blue-700 
                         transform hover:-translate-y-1 hover:scale-105 transition-all duration-300
                         flex items-center gap-2 shadow-xl"
              >
                <span>View Trends</span>
                <span>📈</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 
                            hover:bg-white/30 transition-all duration-300 shadow-xl">
                <div className="text-5xl font-bold mb-2 drop-shadow-lg">🌍</div>
                <div className="text-white text-base font-bold drop-shadow-md">Global</div>
                <div className="text-white/90 text-xs font-medium mt-1">Coverage</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 
                            hover:bg-white/30 transition-all duration-300 shadow-xl">
                <div className="text-5xl font-bold mb-2 drop-shadow-lg">24/7</div>
                <div className="text-white text-base font-bold drop-shadow-md">Monitoring</div>
                <div className="text-white/90 text-xs font-medium mt-1">Always Active</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 
                            hover:bg-white/30 transition-all duration-300 shadow-xl">
                <div className="text-5xl font-bold mb-2 drop-shadow-lg">💯</div>
                <div className="text-white text-base font-bold drop-shadow-md">Free</div>
                <div className="text-white/90 text-xs font-medium mt-1">No Cost</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 
                            hover:bg-white/30 transition-all duration-300 shadow-xl">
                <div className="text-5xl font-bold mb-2 drop-shadow-lg">⚡</div>
                <div className="text-white text-base font-bold drop-shadow-md">Real-time</div>
                <div className="text-white/90 text-xs font-medium mt-1">Live Updates</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                  fill="currentColor" 
                  className="text-gray-50 dark:text-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium">
              Everything you need to monitor and analyze environmental data in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`
                  relative group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg
                  transform transition-all duration-300 cursor-pointer
                  ${hoveredFeature === feature.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'}
                `}
              >
                {/* Gradient Background on Hover */}
                <div className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0
                  group-hover:opacity-10 transition-opacity duration-300
                `}></div>
                
                {/* Icon */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 font-medium">
              Simple, fast, and powerful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full 
                            flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6
                            shadow-2xl">
                1
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                Select Your City
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                Choose from major cities worldwide or search for your location
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full 
                            flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6
                            shadow-2xl">
                2
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                View Real-time Data
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                Get instant access to weather conditions and air quality metrics
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full 
                            flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6
                            shadow-2xl">
                3
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                Analyze Trends
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                Explore historical data and visualize patterns over time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-2xl">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white font-medium drop-shadow-lg">
            Start monitoring your city's environmental data today
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-12 py-6 bg-white text-blue-800 rounded-2xl font-bold text-xl
                     shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 
                     transition-all duration-300 border-4 border-white/20"
          >
            Launch Dashboard →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
