'use client';

import { Search } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string[];
}

export default function SearchBar({
  placeholder = [
    "Search London homes...",
    "Search by postcode...",
    "Search by price or beds...",
    "Search buy or rent..."
  ],
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with filter:", query);
  };

  // Generate TypeAnimation sequence with delay
  const animationSequence: (string | number)[] = placeholder.flatMap((text) => [text, 2000]);

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl">
        <label htmlFor="search" className="text-sm font-medium hidden">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search width={20} />
          </div>

          {/* Animated Placeholder */}
          {query === "" && (
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
              <TypeAnimation
                sequence={animationSequence}
                speed={40}
                wrapper="span"
                repeat={Infinity}
              />
            </span>
          )}

          <input
            type="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="block w-[28rem] p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white"
          />

          <button
            type="submit"
            className="text-white absolute end-2 bottom-2 cursor-pointer border border-gray-200 bg-green-500 hover:bg-green-600 rounded-lg text-sm px-4 py-2 ">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
