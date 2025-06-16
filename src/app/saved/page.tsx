import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";

export default function SavedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
    <div className="mt-6">
          <h2 className="text-center font-bold text-3xl">Saved</h2>
          <PropertyList />
        </div>
      </main>
      <Footer />
    </div>
  )
}