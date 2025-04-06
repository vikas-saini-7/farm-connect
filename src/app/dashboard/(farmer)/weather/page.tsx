'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Droplets, ThermometerSun } from 'lucide-react'


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [location, setLocation] = useState('Pune')
  const [country, setCountry] = useState('IN')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY_WEATHER!
  console.log(API_KEY);

  useEffect(() => {
    fetchWeather(location, country)
  }, [])

  async function fetchWeather(city: string, country: string) {
    if (!city.trim()) {
      setError('Please enter a city name.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )},${country}&units=metric&appid=${API_KEY}`
      )
      const data = await res.json()
      if (data.cod === '200') {
        setWeatherData(data)
      } else {
        setWeatherData(null)
        setError(`City not found: ${city}, ${country}`)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch weather data.')
    }
    setLoading(false)
  }

  function getDailyForecast() {
    if (!weatherData) return []
    const dailyData: { [key: string]: any[] } = {}

    weatherData.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0]
      if (!dailyData[date]) dailyData[date] = []
      dailyData[date].push(item)
    })

    const result = Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
      const temps = items.map(i => i.main.temp)
      const humidities = items.map(i => i.main.humidity)
      const rains = items.map(i => i.pop * 100)

      const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b) / arr.length)
      return {
        date,
        temp: avg(temps),
        humidity: avg(humidities),
        rainChance: avg(rains),
        day: daysOfWeek[new Date(date).getDay()],
      }
    })

    return result
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-[#E6FFFA] to-[#CFFAFE] text-gray-800">
      <div className="max-w-xl mx-auto space-y-8">
        <motion.h1
          className="text-4xl font-bold text-center text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌾 Weather Forecast
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter city"
            className="p-2 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="Country code (e.g. IN)"
            className="p-2 rounded-xl border w-28 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => fetchWeather(location, country)}
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-lg animate-pulse text-green-700">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && weatherData && (
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-700">{weatherData.city.name}</h2>
              <p className="text-gray-500">{weatherData.city.country}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getDailyForecast().map((day, idx) => (
                <motion.div
                  key={idx}
                  className="bg-green-50 p-4 rounded-xl border border-green-200 shadow hover:shadow-md transition"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="font-bold text-lg text-green-700">
                    {idx === 0 ? 'Today' : day.day}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <ThermometerSun className="text-green-700 w-5 h-5" />
                    Temp: {day.temp}°C
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="text-green-700 w-5 h-5" />
                    Humidity: {day.humidity}%
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="text-green-700 w-5 h-5" />
                    Rain Chance: {day.rainChance}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
