'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    title: '1. Sign Up',
    description: 'Create your free account as a farmer or buyer to get started.',
    image: '/images/signup.png',
  },
  {
    title: '2. Explore the Marketplace',
    description: 'Browse real-time prices, connect with nearby markets and buyers/farmers.',
    image: '/images/marketplace.png',
  },
  {
    title: '3. Grow Together',
    description: 'Buy, sell, review, and grow your trust and profits with every deal.',
    image: '/images/grow.png',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-yellow-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-700 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-green-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
