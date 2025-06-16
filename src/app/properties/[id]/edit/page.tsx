import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";

export default function EditFormPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col  bg-green-50">
        <div className="flex flex-col items-center justify-center relative h-[24.5em] w-full">
        </div>
      </main>
      <Footer />
    </div>
  )
}