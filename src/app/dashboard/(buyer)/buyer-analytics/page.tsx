"use client"

import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from "recharts"

const cropData = [
  { month: "Jan", wheat: 1800, rice: 1500 },
  { month: "Feb", wheat: 1900, rice: 1600 },
  { month: "Mar", wheat: 2000, rice: 1700 },
  { month: "Apr", wheat: 2200, rice: 1800 },
  { month: "May", wheat: 2400, rice: 1900 },
  { month: "Jun", wheat: 2100, rice: 1850 },
  { month: "Jul", wheat: 2500, rice: 2000 },
  { month: "Aug", wheat: 2700, rice: 2100 },
  { month: "Sep", wheat: 2600, rice: 2000 },
  { month: "Oct", wheat: 2300, rice: 1900 },
  { month: "Nov", wheat: 2100, rice: 1700 },
  { month: "Dec", wheat: 2000, rice: 1600 },
]

const nearbyCrops = [
  { name: "Tomato", price: "₹35/kg", trend: "↑ Rising in demand" },
  { name: "Potato", price: "₹18/kg", trend: "→ Stable" },
  { name: "Onion", price: "₹28/kg", trend: "↓ Decreasing" },
  { name: "Corn", price: "₹22/kg", trend: "↑ Seasonal high" },
]

const selfAnalysis = [
  { key: "Best Crop Sold", value: "Wheat" },
  { key: "Total Revenue", value: "₹2,45,000" },
  { key: "Top Market", value: "Nagpur" },
  { key: "Highest Month", value: "August" },
]

export default function AnalysisPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <motion.h1 className="text-3xl font-bold text-center text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Crop Market & Self Analysis
      </motion.h1>

      {/* Monthly Price Analysis */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-green-700">📈 Price Variation Over the Year</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cropData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="wheat" stroke="#82ca9d" name="Wheat" />
            <Line type="monotone" dataKey="rice" stroke="#8884d8" name="Rice" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Nearby Crop Analysis */}
      <motion.div
        className="bg-yellow-50 p-4 rounded-xl shadow-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-yellow-800">🌾 Nearby Crop Trends</h2>
        <div className="overflow-x-auto flex gap-4">
          {nearbyCrops.map((crop, i) => (
            <div key={i} className="bg-white min-w-[200px] p-4 rounded shadow">
              <h3 className="font-bold text-lg">{crop.name}</h3>
              <p className="text-green-700">{crop.price}</p>
              <p className="text-sm text-gray-600">{crop.trend}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Self Analysis */}
      <motion.div
        className="bg-blue-50 p-6 rounded-xl shadow-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-blue-800">🧑‍🌾 Your Performance Summary</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {selfAnalysis.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h3 className="font-medium">{item.key}</h3>
              <p className="text-green-700 text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
