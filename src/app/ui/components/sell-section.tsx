'use client';

import { motion } from "framer-motion";

export default function SellSection() {
  return (
    <div
      className="flex flex-col gap-8 max-w-3xl sm:w-full p-8 mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="self-end sm:max-w-96 bg-green-50 p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">Search Sold Home</h3>
        <p>Explore a wide range of sold properties across the UK to find the right price for you.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="self-start sm:max-w-96 bg-green-50 p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">Sell Smarter</h3>
        <p>List your home with ease and reach thousands of potential buyers with smart marketing tools.</p>
      </motion.div>
    </div>
  )
}