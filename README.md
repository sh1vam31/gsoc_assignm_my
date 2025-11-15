# 🌆 Smart City Dashboard

A modern, full-stack web application for monitoring real-time environmental data including weather conditions, air quality metrics, and historical trends for cities worldwide.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)

# Live_Demo = https://gsoc-assignm.vercel.app/

## ✨ Features

### 🔐 Authentication System
- User registration and login with JWT authentication
- Protected routes for authenticated users
- MongoDB-based user management
- Email domain validation (Gmail, Yahoo, Outlook, etc.)
- Secure password hashing with bcrypt

### 🌍 Real-Time Environmental Monitoring
- **Current Weather Data**: Temperature, humidity, wind speed, pressure, visibility
- **Air Quality Index (AQI)**: PM2.5, PM10, NO2, O3, SO2, CO levels
- **Weather Forecasts**: 24-hour temperature predictions
- **Multi-City Support**: Search and monitor any city worldwide

### 📊 Data Visualization
- Interactive charts using Chart.js
- Temperature trends over time
- Wind speed analysis
- Air quality metrics visualization
- Responsive metric cards with real-time updates

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Auto-Refresh**: Configurable automatic data updates
- **City Search**: Intelligent location search with autocomplete
- **Geolocation**: Detect user's current location automatically
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Historical Data**: View and analyze past environmental trends

### 🛠️ Technical Features
- Custom React hooks for data management
- Context API for global state management
- Error handling with fallback mock data
- API caching for improved performance
- Loading states and error messages
- RESTful API architecture

## 🚀 Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router 7.9** - Client-side routing
- **Vite 5.0** - Build tool and dev server
- **TailwindCSS 3.3** - Utility-first CSS framework
- **Chart.js 4.4** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4.18** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### APIs
- **OpenWeatherMap API** - Weather data and forecasts
- **AQICN API** - Air quality information
- **Nominatim API** - Geocoding and location search (free, no API key required)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- OpenWeatherMap API key
- AQICN API key

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gsoc_assignm_my
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# OpenWeatherMap API Key
# Get yours at: https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# AQICN Air Quality API Key
# Get yours at: https://aqicn.org/data-platform/token/
VITE_AQICN_API_KEY=your_aqicn_api_key

# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Backend API URL
VITE_API_URL=http://localhost:5002/api

# Optional Configuration
VITE_DEFAULT_CITY=London
VITE_AUTO_REFRESH_INTERVAL=60000
```

### 4. Get API Keys

#### OpenWeatherMap API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add to `.env` file

#### AQICN API
1. Visit [AQICN Data Platform](https://aqicn.org/data-platform/token/)
2. Request a free API token
3. Add to `.env` file

#### MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add to `.env` file

## 🎯 Running the Application

### Option 1: Start Both Servers Together (Recommended)
```bash
./start-dev.sh
```

If you get a permission error:
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Start Servers Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
# or for development with auto-reload
npm run server:dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5002
- **API Health Check**: http://localhost:5002/api/health

## 📁 Project Structure

```
gsoc_assignm_my/
├── public/                 # Static assets
├── server/                 # Backend server
│   ├── models/            # MongoDB models
│   │   └── User.js        # User schema
│   ├── routes/            # API routes
│   │   └── auth.js        # Authentication endpoints
│   └── index.js           # Express server setup
├── src/                   # Frontend source
│   ├── assets/           # Images and static files
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── CitySelector.jsx
│   │   ├── MetricsGrid.jsx
│   │   ├── ChartsGrid.jsx
│   │   ├── StatusMessage.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── history/
│   │       └── HistoricalDataPanel.jsx
│   ├── contexts/         # React Context providers
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CityContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useDashboardData.js
│   │   ├── useHistoricalData.js
│   │   └── useAutoRefresh.js
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HistoricalData.jsx
│   │   └── NotFound.jsx
│   ├── services/         # API services
│   │   └── apiService.js
│   ├── utils/            # Utility functions
│   │   ├── mockData.js
│   │   └── historyUtils.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── start-dev.sh          # Development startup script
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Health Check
- `GET /api/health` - Server status

## 🎨 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run server           # Start backend server
npm run server:dev       # Start backend with nodemon

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
```

## 🌐 Features in Detail

### Dashboard Page
- Real-time weather metrics display
- Air quality monitoring with color-coded indicators
- Interactive charts for temperature and wind trends
- Manual refresh and auto-refresh options
- City search with autocomplete
- Geolocation support

### Historical Data Page
- View past environmental trends
- Temperature history charts
- Wind speed analysis
- Air quality trends over time
- Date range selection

### Authentication Flow
1. User signs up with name, email, and password
2. Email domain validation ensures allowed providers
3. Password is hashed before storage
4. JWT token generated on successful login
5. Token stored in localStorage
6. Protected routes verify token before access

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes
- CORS configuration for allowed origins
- Email domain validation
- Secure password requirements (minimum 6 characters)

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `VITE_AQICN_API_KEY` | AQICN API key | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_DEFAULT_CITY` | Default city on load | No |
| `VITE_AUTO_REFRESH_INTERVAL` | Auto-refresh interval (ms) | No |

## 🐛 Troubleshooting

### Backend Connection Issues
```
Error: ERR_CONNECTION_REFUSED on port 5002
```
**Solution**: Make sure the backend server is running with `npm run server`

### API Key Issues
```
Warning: API key not configured, using mock data
```
**Solution**: Add valid API keys to your `.env` file

### MongoDB Connection Errors
```
Error: MongoDB connection error
```
**Solution**: Check your `MONGODB_URI` in `.env` and ensure your IP is whitelisted in MongoDB Atlas

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for smart city monitoring

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- AQICN for air quality data
- Nominatim/OpenStreetMap for geocoding services
- Chart.js for data visualization
- TailwindCSS for styling utilities

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API provider documentation

---

**Note**: This application uses free tier APIs. Rate limits may apply. For production use, consider upgrading to paid API plans.
