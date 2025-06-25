import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";
import { fetchMyProperties } from "../lib/data";
import ProfileForm from "../ui/forms/profile-form";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userInfo = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  };

  const properties = await fetchMyProperties(userInfo.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-green-50 py-10 px-6">
        <div className="max-w-[45rem] mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Profile</h1>
          <ProfileForm userInfo={userInfo} />
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">My Properties</h2>
          <PropertyList properties={properties} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
