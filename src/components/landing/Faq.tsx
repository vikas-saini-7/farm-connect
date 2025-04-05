'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How do farmers find the best market prices?',
    answer:
      'Our platform shows real-time price comparisons from nearby mandis, helping farmers choose the most profitable market.',
  },
  {
    question: 'Can buyers directly contact farmers?',
    answer:
      'Yes, verified buyers and farmers can message each other directly through the platform.',
  },
  {
    question: 'Is the platform free to use?',
    answer: 'Yes, the core features of the platform are completely free for both farmers and buyers.',
  },
  {
    question: 'Do I need to create separate accounts as a buyer and farmer?',
    answer:
      'You can register as either a buyer or a farmer. If you want to use both roles, you can easily switch from your dashboard.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-green-700 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition hover:shadow-lg"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-800">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-green-500" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="text-gray-700 mt-4 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
