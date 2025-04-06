'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface WeatherData {
  location: { city: string; country: string }
  current_observation: {
    condition: { text: string; temperature: number },
    atmosphere: { humidity: number },
    wind: { speed: number }
  }
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://yahoo-weather5.p.rapidapi.com/weather', {
        params: {
          location: 'sunnyvale', // You can replace this with a dynamic value later
          format: 'json',
          u: 'c',
        },
        headers: {
          'x-rapidapi-key':  process.env.RAPIDAPI_KEY!,
          'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
        },
      })

      setWeather(response.data)
    } catch (err) {
      setError('Failed to fetch weather data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">🌤️ Current Weather</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading weather...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : weather ? (
          <div className="space-y-4 text-gray-800 text-center">
            <p className="text-lg font-medium">
              {weather.location.city}, {weather.location.country}
            </p>
            <p className="text-5xl font-bold text-blue-500">
              {weather.current_observation.condition.temperature}°C
            </p>
            <p className="text-xl">{weather.current_observation.condition.text}</p>
            <p>💧 Humidity: {weather.current_observation.atmosphere.humidity}%</p>
            <p>💨 Wind Speed: {weather.current_observation.wind.speed} km/h</p>
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
