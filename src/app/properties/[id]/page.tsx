import { notFound } from "next/navigation";
import PropertyDetailWrapper from "@/app/ui/property/property-detail-wrapper";
import { fetchProperty } from "@/app/lib/data";

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const property = await fetchProperty(id);
  
  if (!property) return notFound();

  return <PropertyDetailWrapper property={property} />;
}
