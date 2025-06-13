'use client';
import { Search } from "lucide-react"
import Image from "next/image"

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center relative h-[24.5em] w-full">
      <Image
        src="/house-large.jpg"
        alt="Inside of house picture"
        fill
        className="object-cover"
      />
      <div
        className="flex items-center justify-center w-full bg-white border border-gray-200">
        <form>
          <label htmlFor="search" className="text-sm font-medium text-gray-900">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search width={20} />
            </div>
            <input
              type="search"
              id="search"
              placeholder="Search..."
              className="block w-92 p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white"
            />
            <button
              type="submit"
              className="text-white absolute end-2 bottom-2 cursor-pointer border border-gray-200 bg-green-500 hover:bg-green-600 rounded-lg text-sm px-4 py-2 ">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}