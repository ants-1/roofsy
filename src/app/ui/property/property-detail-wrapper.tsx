'use client';

import { useState, useEffect } from "react";
import PropertyDetail from "./property-details";
import { PropertyDetailSkeleton } from "../components/skeletons";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Property } from "@/app/lib/types";

export default function PropertyDetailWrapper({ property }: { property: Property }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col bg-green-50">
        {loading ? <PropertyDetailSkeleton /> : <PropertyDetail property={property} />}
      </main>
      <Footer />
    </div>
  );
}
