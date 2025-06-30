'use client';

import { useEffect, useState, useTransition } from "react";
import { Property } from "@/app/lib/types";
import {
  Armchair,
  BedDouble,
  Heart,
  House,
  Pin,
  Toilet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropertyDropdownMenu from "./property-dropdown-menu";
import { useSession } from "next-auth/react";

interface PropertyCardProps {
  property: Property;
}

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600";

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageSrc =
    property.imgs && property.imgs[0] && property.imgs[0].trim() !== ""
      ? property.imgs[0]
      : FALLBACK_IMAGE;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function checkSaved() {
      const res = await fetch("/api/is-saved", {
        method: "POST",
        body: JSON.stringify({ userId, propertyId: property.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setIsSaved(data.saved);
    }

    checkSaved();
  }, [userId, property.id]);

  const handleToggle = () => {
    startTransition(async () => {
      const res = await fetch("/api/toggle-saved", {
        method: "POST",
        body: JSON.stringify({ userId, propertyId: property.id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setIsSaved(data.saved);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow flex flex-col sm:flex-row gap-1 justify-between items-stretch border border-gray-200 hover:shadow-md transition max-w-[45rem] w-full h-[34rem] sm:h-[16rem]">
      <Link
        href={`/properties/${property.id}`}
        className="relative w-full sm:w-64 h-72 sm:h-full overflow-hidden cursor-pointer"
      >
        <Image
          src={imageSrc}
          alt="Property"
          fill
          className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-100"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between p-4 sm:p-3 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-green-800">
            £{property.price.toLocaleString()}
          </h2>
          <div className="flex items-center">
            {userId === property.owner_id ? (
              <PropertyDropdownMenu propertyId={property.id} />
            ) : (
              <button
                onClick={handleToggle}
                disabled={isPending}
                className={`cursor-pointer p-2 rounded-full transition ${isSaved ? "text-red-400" : "text-black hover:text-red-400"
                  } hover:bg-gray-100`}
                title={isSaved ? "Unsave Property" : "Save Property"}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${isSaved ? "fill-red-400 hover:fill-none" : "fill-none"
                    }`}
                />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-700">{property.details}</p>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong>{" "}{property.city} ,{" "}{property.property_address},{" "}
          {property.postcode}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Agent:</strong> {property.agent}
        </p>
        <div className="text-sm text-gray-700 flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1">
            <BedDouble width={20} />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <Toilet width={20} />
            {property.baths} Toilets
          </span>
          <span className="flex items-center gap-1">
            <Armchair width={20} />
            {property.receptions} Receptions
          </span>
          <span className="flex items-center gap-1">
            <House width={20} />
            {property.property_type.charAt(0).toUpperCase() +
              property.property_type.slice(1)}
          </span>
          <span className="flex items-center gap-1">
            <Pin width={20} />
            {property.property_status.charAt(0).toUpperCase() +
              property.property_status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
