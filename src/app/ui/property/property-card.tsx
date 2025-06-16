'use client';

import { Property } from "@/app/lib/types";
import { Armchair, BedDouble, House, Pin, Toilet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow flex flex-col sm:flex-row gap-1 justify-between items-stretch border border-gray-200 hover:shadow-md transition max-w-[45rem] w-full h-[34rem] sm:h-[16rem]">
      <Link href={`/properties/${property.id}`} className="relative w-full sm:w-64 h-72 sm:h-full overflow-hidden cursor-pointer">
        <Image
          src={property["feature-img"]}
          alt="Property"
          fill
          className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-100"
        />
      </Link>


      <div className="flex-1 flex flex-col justify-between p-4 sm:p-2 space-y-1">
        <h2 className="text-xl font-semibold text-green-800">£{property.price.toLocaleString()}</h2>
        <p className="text-gray-700">{property.details}</p>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {property.address}, {property.postcode}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Agent:</strong> {property.agent}
        </p>
        <div className="text-sm text-gray-700 flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1"><BedDouble width={20} /> {property.beds} Beds</span>
          <span className="flex items-center gap-1"><Toilet width={20} /> {property.baths} Toilets</span>
          <span className="flex items-center gap-1"><Armchair width={20} /> {property.receptions} Receptions</span>
          <span className="flex items-center gap-1"><House width={20} /> {property["property-type"].charAt(0).toUpperCase() + property["property-type"].slice(1)}</span>
          <span className="flex items-center gap-1"><Pin width={20} /> {property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
        </div>
      </div>
    </div>
  );
}
