'use client';

import DropdownMenu from "../ui/components/dropdown";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import SearchBar from "../ui/components/search";
import PropertyList from "../ui/property/property-list";
import Image from "next/image";
import { useEffect, useState } from "react"
import { Property } from "../lib/types";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";

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

export default function RentPageClient() {
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
        status: "Rent",
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
            src="/house-large.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50 z-0"
            priority
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-5">Rent</h1>
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
              options={maxRentOptions}
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