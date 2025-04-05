'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Ravi Kumar',
    role: 'Farmer',
    image: 'farmer1.jpg',
    comment:
      'Thanks to this platform, I was able to compare market prices easily and got the best rate for my crops.',
    rating: 5,
    color: 'from-green-100 to-green-200',
  },
  {
    name: 'Anjali Sharma',
    role: 'Buyer',
    image: 'farmer3.jpg',
    comment:
      'Found reliable farmers and saved so much time. The interactive map is a game changer!',
    rating: 4,
    color: 'from-blue-100 to-blue-200',
  },
  {
    name: 'Sukhdev Singh',
    role: 'Farmer',
    image: 'farmer2.jpg',
    comment:
      'Very easy to connect with nearby buyers. I’ve built strong trade relationships here.',
    rating: 5,
    color: 'from-yellow-100 to-yellow-200',
  },
]

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-green-700 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Farmers & Buyers Share Their Experience
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl overflow-hidden shadow-md bg-gradient-to-br ${review.color} hover:shadow-xl transition`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Full Image */}
              <div className="relative w-full h-48">
                <Image
                  src={`/${review.image}`}
                  alt={review.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-3xl"
                />
              </div>

              <div className="p-6 text-left">
                <p className="text-xl font-semibold text-green-800">{review.name}</p>
                <p className="text-sm text-gray-600 mb-2">{review.role}</p>

                {/* Star Rating */}
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      fill={i < review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
