'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export default function DropdownMenu({ options, selected, onSelect }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left mt-2 ">
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-gray-900 bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center min-w-20"
      >
        {selected}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}