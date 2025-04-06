"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const topFarmers = [
  { img: "/farmer1.jpg", name: "Ramesh", crop: "Organic Wheat", tip: "Yield improved by 30%.", contact: "+91 98765 43210" },
  { img: "/farmer2.jpg", name: "Samir", crop: "Dragon Fruit", tip: "Good income in 6 months.", contact: "+91 91234 56789" },
  { img: "/farmer3.jpg", name: "Lalita", crop: "Solar Farming", tip: "Reduced water cost.", contact: "+91 99887 77665" },
  { img: "/farmer4.jpg", name: "Manoj", crop: "Broccoli Export", tip: "Expanded my market.", contact: "+91 92345 88990" },
]

const modernCropProducers = [
  { img: "/dragonfruit.jpg", name: "Dragon Fruit", location: "Maharashtra", contact: "+91 91234 56789" },
  { img: "/brocally.jpg", name: "Broccoli", location: "Punjab", contact: "+91 99887 77665" },
  { img: "/zucchini.jpeg", name: "Zucchini", location: "Haryana", contact: "+91 98765 44321" },
  { img: "/lettuce.jpg", name: "Lettuce", location: "Karnataka", contact: "+91 92345 88990" },
]

const transportContacts = [
  { name: "AgriTrans Logistics", vehicle: "Refrigerated Truck", contact: "+91 98765 55555" },
  { name: "FarmMove", vehicle: "Mini Tempo", contact: "+91 93456 12345" },
  { name: "Green Haulers", vehicle: "Open Truck", contact: "+91 90123 45678" },
  { name: "RuralFast Transport", vehicle: "Closed Van", contact: "+91 99887 33445" },
]

const bulkSellers = [
  { name: "GreenGrow Farmers Co-op", location: "Nashik, Maharashtra", contact: "+91 98765 43210", email: "contact@greengrow.in" },
  { name: "AgriHarvest Group", location: "Indore, MP", contact: "+91 91234 56789", email: "sales@agriharvest.org" },
  { name: "Organic Roots Collective", location: "Jaipur, Rajasthan", contact: "+91 99887 77665", email: "organicroots@gmail.com" },
  { name: "CropCare Alliance", location: "Coimbatore, Tamil Nadu", contact: "+91 92345 88990", email: "info@cropcare.in" },
]

export default function BuyersPortal() {
  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-10">
      <motion.h1
        className="text-3xl font-bold text-center text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🚲 Buyer's Portal – Connect with Farmers, Crops & Transport
      </motion.h1>

      {/* Top Farmers */}
      <motion.section
        className="relative grid md:grid-cols-2 gap-4 bg-cover bg-center rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {topFarmers.map((farmer, i) => (
          <div
            key={i}
            className="relative h-64 md:h-80 text-white flex items-end p-4"
            style={{ backgroundImage: `url(${farmer.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="bg-black/60 p-3 rounded">
              <h3 className="text-xl font-bold">{farmer.name}</h3>
              <p><strong>Crop:</strong> {farmer.crop}</p>
              <p>{farmer.tip}</p>
              <p className="text-sm">Contact: {farmer.contact}</p>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Modern Crop Producers */}
      <motion.section className="bg-pink-100 p-4 rounded-xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-2">🌱 Modern Crop Producers</h2>
        <p>Connect with farmers growing exotic and profitable crops.</p>
        <div className="flex overflow-x-auto space-x-4 pb-2 pt-3">
          {modernCropProducers.map((crop, i) => (
            <div key={i} className="bg-white min-w-[250px] p-3 rounded shadow flex-shrink-0">
              <Image src={crop.img} alt={crop.name} width={250} height={180} className="rounded mb-2" />
              <h3 className="font-bold">{crop.name}</h3>
              <p><strong>Location:</strong> {crop.location}</p>
              <p className="text-sm text-gray-600">{crop.contact}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Transport Options */}
      <motion.section
        className="bg-blue-100 p-4 rounded-xl shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h2 className="text-2xl font-semibold mb-2">🚚 Transport Vehicles</h2>
        <p>Logistics partners for smooth delivery of your produce.</p>
        <div className="flex overflow-x-auto space-x-4 pt-3 pb-2">
          {transportContacts.map((vehicle, i) => (
            <motion.div
              key={i}
              className="bg-white min-w-[250px] p-3 rounded shadow flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-bold">{vehicle.name}</h3>
              <p><strong>Vehicle:</strong> {vehicle.vehicle}</p>
              <p className="text-sm text-gray-600">{vehicle.contact}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Bulk Seller Contact Info */}
      <motion.section
        className="bg-green-100 p-4 rounded-xl shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-2">📞 Bulk Seller Contact Information</h2>
        <p>
          Verified farmer groups and producers offering large quantity crops for direct purchase.
        </p>
        <div className="grid md:grid-cols-2 gap-4 pt-3">
          {bulkSellers.map((seller, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              <h3 className="font-bold">{seller.name}</h3>
              <p><strong>Location:</strong> {seller.location}</p>
              <p><strong>Phone:</strong> {seller.contact}</p>
              <p><strong>Email:</strong> {seller.email}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}
