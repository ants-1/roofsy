import { fetchProperty } from "@/app/lib/data";
import { Property } from "@/app/lib/types";
import EditPropertyForm from "@/app/ui/forms/edit-property-form";

export default async function EditPropertyPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const property: Property | null = await fetchProperty(id);

  if (!property) {
    return <div className="p-8 text-center text-red-600">Property not found</div>;
  }

  return <EditPropertyForm property={property} />;
}
