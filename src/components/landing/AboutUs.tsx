"use client";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <motion.h2
        className="text-4xl font-bold text-green-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Our Marketplace
      </motion.h2>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
        We connect farmers directly with buyers, ensuring fair pricing and fresh produce. 
        Our platform helps farmers grow their businesses while giving consumers access to high-quality products.
      </p>
    </section>
  );
};

export default AboutUs;
