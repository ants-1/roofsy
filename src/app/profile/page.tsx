'use client';
import { useState } from "react";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import PropertyList from "../ui/property/property-list";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: "Anthony Smith",
    email: "anthony@example.com"
  });

  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    oldPassword: "",
    newPassword: ""
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy password check — replace with actual logic
    if (formData.oldPassword !== "123456") {
      alert("Old password is incorrect.");
      return;
    }

    // Update info
    setUserInfo({
      name: formData.name,
      email: formData.email
    });

    alert("Profile updated!");
    setShowForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-green-50 py-10 px-6">
        <div className="max-w-[45rem] mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Profile</h1>

          <div className="mb-6">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>

          <button
            onClick={() => setShowForm(prev => !prev)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showForm ? "Hide Edit Form" : "Edit Profile"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <h2 className="text-xl font-semibold mb-2">Update Info</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium">Old Password</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">My Properties</h2>
          <PropertyList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
