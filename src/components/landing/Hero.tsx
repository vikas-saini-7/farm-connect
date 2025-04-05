'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const scrollToSection = () => {
    const section = document.getElementById('how-it-works')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-white py-20 md:py-28 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-amber-100/40 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-green-200/40 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-yellow-100/30 blur-2xl rounded-full animate-ping-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24 relative z-10">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight mb-6">
            Empowering <span className="text-amber-500">Farmers</span>,<br />
            Connecting <span className="text-green-600">Markets</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0 mb-8">
            A simple, smart way for <strong className="text-green-700">farmers</strong> and <strong className="text-green-700">buyers</strong> to grow together.
            Compare real-time prices, connect with markets, and transform your farming journey.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToSection}
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              🌿 How It Works
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-br from-green-100 to-amber-100 blur-2xl opacity-70 rounded-3xl -z-10" />
            <Image
              src="/farmer-hero.jpg"
              alt="Farmer in field"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg ring-1 ring-white/50 group-hover:ring-emerald-300 transition duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
