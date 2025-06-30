import Image from "next/image";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import SellSection from "../ui/components/sell-section";
import Link from "next/link";
import { Button } from "../ui/components/button";

export default async function SellPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
          <Image
            src="/house-sell.jpg"
            alt="Inside of house picture"
            fill
            className="object-cover opacity-50 z-0"
          />
          <h1 className="text-gray-900 z-10 text-5xl font-bold mb-2">Sell</h1>
          <p className="text-gray-900 z-10 mb-5 text-lg">Create a property listing to sell or rent</p>
          <Link href="/properties/create" className="flex items-center justify-center mt-2 z-10">
            <Button>Create Property</Button>
          </Link>
        </div>
        <div className="bg-green-200">
          <SellSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}