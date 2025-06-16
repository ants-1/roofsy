'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import { propertyData } from "../../lib/mock-data";
import { PropertyCardSkeleton } from "../components/skeletons";

const PropertyCard = dynamic(() => import("./property-card"), {
  loading: () => <PropertyCardSkeleton />,
  ssr: false, 
});

const ITEMS_PER_PAGE = 6;

export default function PropertyList() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleProperties = propertyData.slice(0, visibleCount);

  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="flex flex-col items-center justify-center space-y-6">
        {visibleProperties.length > 0 ? (
          visibleProperties.map((property, idx) => (
            <PropertyCard key={idx} property={property} />
          ))
        ) : (
          <p className="text-gray-500">No properties match the selected filters.</p>
        )}

        {visibleCount < propertyData.length && (
          <button
            onClick={handleLoadMore}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
