'use client';

import { motion } from "framer-motion";

interface ToggleSwitchProps {
  value: "buy" | "rent";
  onChange: (val: "buy" | "rent") => void;
}

export default function ToggleSwitch({ value, onChange }: ToggleSwitchProps) {
  return (
    <div className="relative flex w-48 border bg-white border-green-200 rounded-lg overflow-hidden mt-4">
      <motion.div
        layout
        className="absolute top-0 h-full w-1/2 bg-green-100 rounded-lg z-0"
        animate={{ x: value === "buy" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => onChange("buy")}
        className={`flex-1 relative z-10 px-5 py-2.5 text-sm
          ${value === "buy"
            ? "text-gray-900 font-bold"
            : "text-green-700 cursor-pointer"
          }`}
      >
        Buy
      </button>
      <button
        onClick={() => onChange("rent")}
        className={`flex-1 relative z-10 px-5 py-2.5 text-sm
          ${value === "rent"
            ? "text-gray-900 font-bold"
            : "text-green-700 cursor-pointer"
          }`}
      >
        Rent
      </button>
    </div>
  );
}
