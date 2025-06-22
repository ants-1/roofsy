import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";
import CreatePropertyForm from "@/app/ui/forms/create-property-form";

export default function CreateFormPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-green-50 px-4 py-8">
        <CreatePropertyForm />
      </main>
      <Footer />
    </div>
  );
}
