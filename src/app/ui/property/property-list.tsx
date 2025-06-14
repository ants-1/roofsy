'use client';

import { propertyData } from "../../lib/mock-data";
import PropertyCard from "./property-card";

export default function PropertyList() {
  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="flex flex-col items-center justify-center space-y-6">
        {propertyData.length > 0 ? (
          propertyData.map((property, idx) => (
            <PropertyCard key={idx} property={property} />
          ))
        ) : (
          <p className="text-gray-500">No properties match the selected filters.</p>
        )}
      </div>
    </div>
  );
}
