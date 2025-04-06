'use client'

import { motion } from 'framer-motion'
import { BadgePercent, MapPin, Handshake } from 'lucide-react'

const features = [
  {
    title: 'Compare Market Prices',
    description: 'Get real-time prices from nearby mandis and make the best selling decision for your crops.',
    image: 'compare.jpg',
    icon: BadgePercent,
  },
  {
    title: 'Find Nearby Markets',
    description: 'Use our smart map to locate the best nearby markets to sell or buy produce efficiently.',
    image: 'nearbyfarmer.jpg',
    icon: MapPin,
  },
  {
    title: 'Connect with Buyers & Farmers',
    description: 'Seamlessly interact with verified buyers and farmers, build trust, and grow your network.',
    image: 'connect.jpg',
    icon: Handshake,
  },
]

export default function Explore() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-yellow-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-yellow-400 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🌟 Explore What You Can Do
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="relative h-80 rounded-3xl overflow-hidden shadow-xl group transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(/images/${feature.image})` }}
                />

                {/* Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent backdrop-blur-md" />

                {/* Content */}
                <motion.div
                  className="relative z-10 p-6 flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/70 backdrop-blur-xl p-3 rounded-full mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-700 max-w-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
