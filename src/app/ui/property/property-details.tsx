'use client';

import { Property } from "@/app/lib/types";
import { Armchair, BedDouble, House, Pin, Toilet } from "lucide-react";
import Image from "next/image"

interface PropertyDetailProps {
  property: Property;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const FALLBACK_IMAGE = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600";

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const imageSrc =
    property.imgs && property.imgs[0] && property.imgs[0].trim() !== ""
      ? property.imgs[0]
      : FALLBACK_IMAGE;


  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-md my-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-green-800">{property.details}</h1>

      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
        <Image
          src={imageSrc}
          alt={`Image of ${property.details}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-wrap gap-8 text-gray-700 mb-6">
        <div className="flex items-center gap-2">
          <BedDouble width={24} /> <span>{property.beds} Beds</span>
        </div>
        <div className="flex items-center gap-2">
          <Toilet width={24} /> <span>{property.baths} Baths</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair width={24} /> <span>{property.receptions} Receptions</span>
        </div>
        <div className="flex items-center gap-2">
          <House width={24} /> <span>{capitalize(property.property_type)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Pin width={24} /> <span>{capitalize(property.property_status)}</span>
        </div>
      </div>

      <p className="mb-4"><strong>Price:</strong> £{property.price.toLocaleString()}</p>
      <p className="mb-2"><strong>Address:</strong>{" "}{property.city} ,{" "}{property.property_address},{" "}
        {property.postcode}</p>
      <p className="mb-2"><strong>Agent:</strong> {property.agent}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {property.imgs.map((imgUrl: string, idx: number) => (
          <div key={idx} className="relative w-full h-32 rounded overflow-hidden bg-gray-200">
            <Image
              src={imgUrl}
              alt={`Property image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}