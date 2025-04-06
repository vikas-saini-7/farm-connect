'use client'

import { motion } from 'framer-motion'
import { BadgePercent, MapPin, Handshake } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    title: 'Compare Market Prices',
    description: 'Get real-time prices from nearby mandis and make smarter crop-selling decisions.',
    image: 'pricecompare.jpg',
    icon: BadgePercent,
  },
  {
    title: 'Find Nearby Markets',
    description: 'Use smart GPS-based mapping to locate best markets to sell or buy your produce efficiently.',
    image: 'gps.jpg',
    icon: MapPin,
  },
  {
    title: 'Connect with Buyers & Farmers',
    description: 'Build trusted networks with verified farmers and bulk buyers to expand your reach.',
    image: 'trust.jpg',
    icon: Handshake,
  },
]

export default function Explore() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-lime-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-yellow-400 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🌿 Explore What You Can Do
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="relative h-96 rounded-3xl overflow-hidden shadow-xl group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={`/images/${feature.image}`}
                    alt={feature.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* Content */}
                <motion.div
                  className="relative z-10 p-6 flex flex-col items-center justify-end h-full text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-4 shadow-md">
                    <Icon className="h-8 w-8 text-lime-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-200 max-w-xs">{feature.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
