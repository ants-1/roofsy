'use client';
import { Filter, Search } from "lucide-react"
import { useState } from "react";

export default function SearchBar() {
  const [filter, setFilter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with filter:", filter);
  };

  return (
    <div
      className="flex items-center justify-center w-full bg-white border border-gray-200">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" className="text-sm font-medium hidden">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search width={20} />
          </div>
          <input
            type="search"
            id="search"
            placeholder="Search..."
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
  )
}