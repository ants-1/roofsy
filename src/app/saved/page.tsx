import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { fetchSavedProperties } from "../lib/data";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";

export default async function SavedPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userInfo = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  };
  const properties = await fetchSavedProperties(userInfo.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
    <div className="mt-6">
          <h2 className="text-center font-bold text-3xl">Saved</h2>
          <PropertyList properties={properties}/>
        </div>
      </main>
      <Footer />
    </div>
  )
}