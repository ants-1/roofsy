import Image from "next/image"
import Navbar from "../ui/components/navbar"
import SearchBar from "../ui/components/search"
import Footer from "../ui/components/footer"
import DropdownMenu from "../ui/components/dropdown"
import PropertyList from "../ui/property/property-list"
import { fetchProperties } from "../lib/data"

export default async function BuyPage() {
  const minBedOptions = ["No Min", "Studio", "1", "2", "3", "4", "5", "6", "7", "8+"];
  const maxPriceOptions = ["No Max", "£10,000", "£50,000", "£100,000", "£250,000", "£300,000", "£400,000", "£500,000", "£1,000,000", "£10,000,000"];
  const categoryOptions = ["No Location", "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Sheffield", "Edinburgh"];
  const properties = await fetchProperties('Sale');


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
          <Image
            src="/house-buy.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50 z-0"
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-5">Buy</h1>
          <SearchBar />
          <div className="flex justify-between w-[26rem]">
            <DropdownMenu options={minBedOptions} />
            <DropdownMenu options={categoryOptions} />
            <DropdownMenu options={maxPriceOptions} />
          </div>
        </div>
        <PropertyList properties={properties}/>
      </main>
      <Footer />
    </div>
  )
}