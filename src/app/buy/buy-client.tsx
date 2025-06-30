'use client';

import Image from "next/image"
import Navbar from "../ui/components/navbar"
import SearchBar from "../ui/components/search"
import Footer from "../ui/components/footer"
import DropdownMenu from "../ui/components/dropdown"
import PropertyList from "../ui/property/property-list"
import { useEffect, useState } from "react"
import { Property } from "../lib/types";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";

const minBedOptions = ["No Min", "Studio", "1", "2", "3", "4", "5", "6", "7", "8+"];
const maxPriceOptions = ["No Max", "£10,000", "£50,000", "£100,000", "£250,000", "£300,000", "£400,000", "£500,000", "£1,000,000", "£10,000,000"];
const categoryOptions = ["No Location", "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Sheffield", "Edinburgh"];

export default function BuyPageClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [properties, setProperties] = useState<Property[]>([]);
  const [debouncedQuery] = useDebounce(query, 500);
  const [minBeds, setMinBeds] = useState("No Min");
  const [maxPrice, setMaxPrice] = useState("No Max");
  const [category, setCategory] = useState("No Location");

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams({
        status: "Sale",
        query: debouncedQuery,
        minBeds,
        maxPrice,
        category
      });

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data);

      if (!Array.isArray(data)) {
        console.error("API error or unexpected response:", data);
        setProperties([]);
        return;
      }
    }

    fetchData();
  }, [debouncedQuery, minBeds, maxPrice, category]);

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
          <SearchBar query={query} setQuery={setQuery} />
          <div className="flex justify-between w-[26rem]">
            <DropdownMenu
              options={minBedOptions}
              selected={minBeds}
              onSelect={setMinBeds}
            />
            <DropdownMenu
              options={categoryOptions}
              selected={category}
              onSelect={setCategory}
            />
            <DropdownMenu
              options={maxPriceOptions}
              selected={maxPrice}
              onSelect={setMaxPrice}
            />
          </div>
        </div>
        <PropertyList properties={properties} />
      </main>
      <Footer />
    </div>
  )
}