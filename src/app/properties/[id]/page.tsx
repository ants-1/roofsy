import { propertyData } from "@/app/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BedDouble, Toilet, Armchair, House, Pin } from "lucide-react";
import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";

export default async function PropertyDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const property = propertyData.find((p) => p.id === Number(id));

  if (!property) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md my-8 border border-gray-200">
          <h1 className="text-3xl font-bold mb-4 text-green-800">{property.details}</h1>

          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={property["feature-img"]}
              alt={`Image of ${property.details}`}
              fill
              className="object-cover"
              priority />
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
              <House width={24} /> <span>{property["property-type"].charAt(0).toUpperCase() + property["property-type"].slice(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Pin width={24} /> <span>{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
            </div>
          </div>

          <p className="mb-4"><strong>Price:</strong> £{property.price.toLocaleString()}</p>
          <p className="mb-2"><strong>Address:</strong> {property.address}, {property.postcode}</p>
          <p className="mb-2"><strong>Agent:</strong> {property.agent}</p>

          {/* Example for showing other images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {property.imgs.map((imgUrl, idx) => (
              <div key={idx} className="relative w-full h-32 rounded overflow-hidden bg-gray-200">
                <Image
                  src={imgUrl}
                  alt={`Property image ${idx + 1}`}
                  fill
                  className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}