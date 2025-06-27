'use client';
import Navbar from "./ui/components/navbar";
import Footer from "./ui/components/footer";
import SearchBar from "./ui/components/search";
import { motion } from "framer-motion";
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
          <Image
            src="/house-large.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50"
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-5">Home</h1>
          <SearchBar />
        </div>

        {/* Roofsy Info Section */}
        <section className="px-6 py-12 bg-white">
          <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Why Roofsy?</h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Buy with Confidence</h3>
              <p>Explore a wide range of properties across the UK with detailed listings and verified agents.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Sell Smarter</h3>
              <p>List your home with ease and reach thousands of potential buyers with smart marketing tools.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Rent with Ease</h3>
              <p>Find rental homes that fit your lifestyle and budget, with flexible options for short or long term.</p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
