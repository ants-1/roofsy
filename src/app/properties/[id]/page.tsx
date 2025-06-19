import { properties } from "@/app/lib/mock-data";
import { notFound } from "next/navigation";
import PropertyDetailWrapper from "@/app/ui/property/property-detail-wrapper";

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const property = properties.find((p) => String(p.id) === String(id));
  if (!property) return notFound();

  return <PropertyDetailWrapper property={property} />;
}
