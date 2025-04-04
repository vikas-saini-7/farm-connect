"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-[#0F0F0F] text-white overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/farmers.jpg" // ✅ Corrected Path
          alt="Farm Field"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#0F0F0F]/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-[#00E87B] drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Connecting <span className="text-[#F47400]">Farmers</span> to the World
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Buy fresh products directly from farmers at the best prices. Sell and grow your business effortlessly!
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Link
              href="/marketplace"
              className="bg-[#F71616] hover:bg-[#8860F4] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
            >
              Explore Marketplace
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8 }}
          >
            <Link
              href="/farmers"
              className="bg-[#00E87B] hover:bg-[#F47400] text-black px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
            >
              Join as a Farmer
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
