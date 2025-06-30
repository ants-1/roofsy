import { Suspense } from "react";
import BuyPageClient from "./buy-client";

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <BuyPageClient />
    </Suspense>
  );
}
