'use client'
import Image from "next/image";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import SearchBar from "../ui/components/search";
import { motion } from "framer-motion";
import PropertyList from "../ui/property/property-list";

export default function SellPage() {
  const placeholder = ["Search sold homes", "Search by postcode"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
          <Image
            src="/house-sell.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50 z-0"
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-2">Sell</h1>
          <p className="text-gray-900 z-10 mb-5 text-lg">Find out prices of sold houses in your area</p>
          <SearchBar placeholder={placeholder} />
        </div>
        <div className="bg-green-200">
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
        </div>
        <div className="mt-10">
          <h2 className="text-center font-bold text-3xl">Sold Homes</h2>
          <PropertyList />
        </div>
      </main>
      <Footer />
    </div>
  )
}