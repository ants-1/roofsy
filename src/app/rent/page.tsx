import DropdownMenu from "../ui/components/dropdown";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import SearchBar from "../ui/components/search";
import PropertyList from "../ui/property/property-list";
import Image from "next/image";
import { fetchProperties } from "../lib/data";

const minBedOptions = ["No Min", "Studio", "1", "2", "3", "4", "5", "6", "7", "8+"];
const maxRentOptions = [
  "No Max",
  "£500 pcm",
  "£750 pcm",
  "£1,000 pcm",
  "£1,250 pcm",
  "£1,500 pcm",
  "£2,000 pcm",
  "£2,500 pcm",
  "£3,000 pcm",
  "£5,000 pcm",
  "£10,000 pcm"
];
const categoryOptions = ["No Location", "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Sheffield", "Edinburgh"];

export default async function RentPage() {
  const properties = await fetchProperties('Rent');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
          <Image
            src="/house-large.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50 z-0"
            priority
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-5">Rent</h1>
          <SearchBar />
          <div className="flex justify-between w-[26rem]">
            <DropdownMenu options={minBedOptions} />
            <DropdownMenu options={categoryOptions} />
            <DropdownMenu options={maxRentOptions} />
          </div>
        </div>
        <PropertyList properties={properties} />
      </main>
      <Footer />
    </div>
  )
}