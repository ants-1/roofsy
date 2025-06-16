import { propertyData } from "@/app/lib/mock-data";
import { notFound } from "next/navigation";
import PropertyDetailWrapper from "@/app/ui/property/property-detail-wrapper";

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const property = propertyData.find((p) => p.id === Number(id));
  if (!property) return notFound();

  return <PropertyDetailWrapper property={property} />;
}
