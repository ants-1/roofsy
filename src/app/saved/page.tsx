import { fetchSavedProperties } from "../lib/data";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";

export default async function SavedPage() {
    const userInfo = {
    id: "b3e7d9a9-9f10-4bc7-95f4-13d4a5824f26",
    name: "Bob Smith",
    email: "bob@example.com",
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