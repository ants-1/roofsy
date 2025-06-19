import Image from "next/image";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import SearchBar from "../ui/components/search";
import { fetchSoldProperties } from "../lib/data";
import PropertyList from "../ui/property/property-list";
import SellSection from "../ui/components/sell-section";

export default async function SellPage() {
  const placeholder = ["Search sold homes", "Search by postcode"];
  const properties = await fetchSoldProperties();

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
          <SellSection />
        </div>
        <div className="mt-10">
          <h2 className="text-center font-bold text-3xl">Sold Homes</h2>
          <PropertyList properties={properties} />
        </div>
      </main>
      <Footer />
    </div>
  )
}