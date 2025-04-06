'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const experts = [
  { name: "Dr. Mehta", field: "Organic Farming", contact: "+91 98765 12345", img: "/expert1.jpg" },
  { name: "Prof. Iyer", field: "Smart Irrigation", contact: "+91 93456 78901", img: "/expert2.jpg" },
  { name: "Ms. Rekha", field: "Crop Planning", contact: "+91 99887 11223", img: "/expert3.jpg" },
  { name: "Mr. Arjun", field: "Soil Health", contact: "+91 90909 80808", img: "/arjun.jpg" },
]

const farmerStories = [
  { img: "/farmer1.jpg", name: "Ramesh", tip: "Organic wheat improved my yield by 30%." },
  { img: "/farmer2.jpg", name: "Samir", tip: "Dragon fruit gave me good income in 6 months." },
  { img: "/farmer3.jpg", name: "Lalita", tip: "Solar pumps reduced water costs drastically." },
  { img: "/farmer4.jpg", name: "Manoj", tip: "Broccoli exports helped expand my market." },
]

const doctors = [
  { name: "Dr. Kumar (Vet)", contact: "+91 98765 43210" },
  { name: "Dr. Anjali (Livestock Expert)", contact: "+91 91234 56789" },
  { name: "Dr. Rina (Poultry)", contact: "+91 99888 22334" },
  { name: "Dr. Suraj (Cattle Health)", contact: "+91 91111 33445" },
]

const modernCrops = [
  { img: "/brocally.jpg", name: "brocally", tip: "Cool-season crop, high market demand." },
  { img: "/dragonfruit.jpg", name: "Dragon Fruit", tip: "Low maintenance, high return." },
  { img: "/lettuce.jpg", name: "Lettuce", tip: "Fast-growing, popular in urban markets." },
  { img: "/zucchini.jpeg", name: "Zucchini", tip: "Great for greenhouse farming." },
]

export default function ContactPage() {
  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        👩‍🌾 Farmer's Contact & Guidance
      </motion.h1>

      {/* Expert Guidance */}
      <motion.section className="bg-green-100 p-4 rounded-xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-2">🧑‍🌾 Expert Guidance</h2>
        <p className="mb-4">Advice on organic farming, smart irrigation & crop planning from top experts.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {experts.map((expert, i) => (
            <div
              key={i}
              className="relative h-64 md:h-72 text-white flex items-end p-4 rounded shadow"
              style={{
                backgroundImage: `url(${expert.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/60 p-3 rounded">
                <h3 className="text-xl font-bold">{expert.name}</h3>
                <p>{expert.field}</p>
                <p className="text-sm">{expert.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Farmer Stories */}
      <motion.section className="bg-yellow-100 p-4 rounded-xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-2">📖 Farmer Stories</h2>
        <p>Inspiring journeys from farmers using modern & organic methods.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {farmerStories.map((story, i) => (
            <div
              key={i}
              className="relative h-64 md:h-72 text-white flex items-end p-4 rounded shadow"
              style={{
                backgroundImage: `url(${story.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/60 p-3 rounded">
                <h3 className="text-xl font-bold">{story.name}</h3>
                <p>{story.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Animal Doctors */}
      <motion.section className="bg-blue-100 p-4 rounded-xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-2">🐄 Animal Doctors</h2>
        <p>Nearby veterinary contacts for livestock health.</p>
        <div className="flex overflow-x-auto space-x-4 pt-3 pb-2">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white min-w-[220px] p-3 rounded shadow flex-shrink-0">
              <h3 className="font-bold">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.contact}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Modern Crops */}
      <motion.section className="bg-pink-100 p-4 rounded-xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-2">🌱 Modern Crops</h2>
        <p>Explore exotic high-demand crops like broccoli & dragon fruit.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {modernCrops.map((crop, i) => (
            <div
              key={i}
              className="relative h-64 md:h-72 text-white flex items-end p-4 rounded shadow"
              style={{
                backgroundImage: `url(${crop.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/60 p-3 rounded">
                <h3 className="text-xl font-bold">{crop.name}</h3>
                <p>{crop.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}
