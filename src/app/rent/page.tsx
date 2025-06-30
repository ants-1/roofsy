import { Suspense } from "react";
import RentPageClient from "./rent-client";

export default function RentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <RentPageClient />
    </Suspense>
  );
}
