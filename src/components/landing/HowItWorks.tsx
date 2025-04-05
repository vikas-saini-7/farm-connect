'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    title: '1. Sign Up',
    description: 'Create your free account as a farmer or buyer to get started.',
    image: '/signup.png',
  },
  {
    title: '2. Connect & Explore',
    description: 'See live prices, locate nearby markets, and interact with others.',
    image: '/connect.png',
  },
  {
    title: '3. Grow Together',
    description: 'Sell, buy, review and earn trust and profits in your farming journey.',
    image: '/grow.png',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-yellow-50 via-white to-green-50 py-20 md:py-28 border-t border-yellow-100"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-700 mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🌾 How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition duration-300 border border-emerald-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Large Image */}
              <div className="w-full h-64 relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain p-6"
                />
              </div>

              {/* Text Content */}
              <div className="px-6 pb-8 text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
