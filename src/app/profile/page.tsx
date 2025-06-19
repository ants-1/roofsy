import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";
import { fetchMyProperties } from "../lib/data";
import ProfileForm from "../ui/forms/profile-form";

export default async function ProfilePage() {
  const userInfo = {
    id: "b3e7d9a9-9f10-4bc7-95f4-13d4a5824f26",
    name: "Bob Smith",
    email: "bob@example.com",
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
