"use client";
import { useState } from "react";

interface ProfileFormProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ProfileForm({ userInfo }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    oldPassword: "",
    newPassword: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.oldPassword !== "123456") {
      alert("Old password is incorrect.");
      return;
    }

    alert("Profile updated!");
    setShowForm(false);
  };

  return (
    <>
      <div className="mb-6">
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
      </div>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        {showForm ? "Hide Edit Form" : "Edit Profile"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Update Info</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
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
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
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
            <label htmlFor="oldPassword" className="block text-sm font-medium">
              Old Password
            </label>
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
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
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
    </>
  );
}
