'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-100 via-yellow-50 to-white py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight mb-4">
            Welcome to <span className="text-yellow-500">FarmConnect</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            A digital bridge between <strong>farmers</strong> and <strong>buyers</strong>. Compare prices, explore nearby markets, and grow with technology—made simple for rural communities.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 60 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
        >
          <img
            src="farmer-hero.jpg"  // Replace with your image
            alt="Farmer standing in field"
            width={600}
            height={400}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
