"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const events = [
  { title: "Organic Farming Workshop", date: "April 15", location: "Delhi", type: "🧑‍🏫" },
  { title: "Crop Planning Webinar", date: "April 20", location: "Online", type: "💻" },
  { title: "Soil Health Camp", date: "April 25", location: "Maharashtra", type: "🌱" },
]

const discussions = [
  { user: "Suresh", question: "How to protect crops from heat waves?", replies: 5 },
  { user: "Meena", question: "Best seeds for dragon fruit in Rajasthan?", replies: 3 },
]

const showcase = [
  { img: "/farmer1.jpg", name: "Ravi's Organic Wheat Field" },
  { img: "/farmer2.jpg", name: "Kiran's Broccoli Farm" }, // Fixed name
]

const videos = [
  { title: "Drip Irrigation Tutorial", url: "https://www.youtube.com/embed/dNlmdGZ4P9I" },
  { title: "Dragon Fruit Farming Tips", url: "https://www.youtube.com/embed/dq3U4cxMmrI" },
]

export default function CommunityPage() {
  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-10">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌾 Farmer Community Hub
      </motion.h1>

      {/* Community Support */}
      <motion.section
        className="bg-green-100 p-6 rounded-xl shadow space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold">👥 Community Support</h2>
        {discussions.map((d, i) => (
          <div key={i} className="bg-white p-4 rounded shadow-md">
            <p className="font-medium">{d.user}:</p>
            <p className="text-gray-700">{d.question}</p>
            <p className="text-sm text-gray-500">{d.replies} replies</p>
          </div>
        ))}
      </motion.section>

      {/* Announcements */}
      <motion.section
        className="bg-blue-100 p-6 rounded-xl shadow space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold">📢 Announcements & Events</h2>
        {events.map((event, i) => (
          <div key={i} className="bg-white p-4 rounded shadow-md">
            <p className="font-semibold">
              {event.type} {event.title}
            </p>
            <p className="text-sm text-gray-600">
              {event.date} - {event.location}
            </p>
          </div>
        ))}
      </motion.section>

      {/* Farmer Showcase */}
      <motion.section
        className="bg-yellow-100 p-6 rounded-xl shadow space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold">📸 Farmer Showcase</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {showcase.map((item, i) => (
            <div key={i} className="min-w-[200px] bg-white rounded shadow p-2">
              <Image
                src={item.img}
                alt={item.name}
                width={300}
                height={200}
                className="rounded mb-2 object-cover"
              />
              <p className="text-sm text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Video Tips */}
      <motion.section
        className="bg-pink-100 p-6 rounded-xl shadow space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold">🎥 Farming Tutorials</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {videos.map((vid, i) => (
            <div key={i} className="bg-white rounded shadow overflow-hidden">
              <iframe
                className="w-full aspect-video"
                src={vid.url}
                title={vid.title}
                allowFullScreen
              />
              <p className="p-2 text-sm font-medium">{vid.title}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}
