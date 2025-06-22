import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";

export default function notFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-green-50">
        <h1>Property Not Found</h1>
      </main>
      <Footer />
    </div>
  )
}