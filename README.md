# Smart City Dashboard

A modern, real-time dashboard for monitoring smart city metrics including weather, air quality, and historical data analysis.

## Features

- **Beautiful Home Page** - Engaging landing page with feature showcase
- **Multi-page Application** - Clean navigation with React Router
- **Enhanced Search** - Beautiful search interface with auto-suggestions
- **Real-time Weather Data** - Current temperature, humidity, wind speed, and conditions
- **Air Quality Monitoring** - Live AQI readings and pollutant levels
- **Historical Data Analysis** - 24-hour and 7-day trends for temperature, wind, and AQI
- **Interactive Charts** - Visualize data trends with Chart.js
- **Dark Mode** - Toggle between light and dark themes
- **Auto-refresh** - Automatic data updates every 5 minutes
- **Multi-city Support** - Monitor multiple cities worldwide
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

## Tech Stack

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client

## Free APIs Used

- **OpenWeatherMap API** - Current weather data
- **Open-Meteo API** - Historical weather data (no API key required)
- **Open-Meteo Air Quality API** - Air quality and historical AQI data (no API key required)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gsoc_assignm_my
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
gsoc_assignm_my/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard page
│   │   ├── HistoricalData.jsx   # Historical trends page
│   │   ├── About.jsx            # About page
│   │   └── NotFound.jsx         # 404 page
│   ├── components/
│   │   ├── charts/              # Chart components
│   │   ├── history/             # Historical data components
│   │   ├── Navigation.jsx       # Navigation bar
│   │   ├── Header.jsx
│   │   ├── Fojsx
│   │   └── ...
│   ├── hooks/
│   │   ├── usejs
│   │   ├── useHi
│   │   └── ...
│   ├── utils/
│   │   ├── conss.js
│   │   .js
│   │   └── ...
│   ├── conte/
│  sx

│   └── main.jsx
.env
├── package.json
└── README.md
```├── upter set Rou      #     jsx       ├── App.│   meContext.j └── The   │

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Historical Data Analysis

View temperature, wind speed, and AQI trends over:
- Last 24 hours (hourly data)
- Last 7 days (daily data)

Toggle between time ranges with interactive charts powered by Chart.js.

### Dark Mode

Click the theme toggle in the header to switch between light and dark modes. Preference is saved to localStorage.

### Auto-refresh

Enable auto-refresh to automatically update data every 5 minutes without manual intervention.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
