"use client";

import { useState } from "react";
import { updateUserInfo, updateUserPassword } from "@/app/lib/actions";
import { Button } from "../components/button";


interface ProfileFormProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ProfileForm({ userInfo }: ProfileFormProps) {
  const [infoData, setInfoData] = useState({
    name: userInfo.name,
    email: userInfo.email,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInfoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  }

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", userInfo.id);
    formData.append("name", infoData.name);
    formData.append("email", infoData.email);

    const res = await updateUserInfo({ message: null }, formData);
    setMessage(res?.message || "Profile info updated.");
    setShowForm(false);

    if (!res?.errors) {
      userInfo.name = infoData.name;
      userInfo.email = infoData.email;
      setInfoData({ name: userInfo.name, email: userInfo.email });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", userInfo.id);
    formData.append("oldPassword", passwordData.oldPassword);
    formData.append("newPassword", passwordData.newPassword);

    const res = await updateUserPassword({ message: null }, formData);
    setMessage(res?.message || "Password updated.");
    setShowForm(false);

    if (!res?.errors) {
      setPasswordData({ oldPassword: "", newPassword: "" });
    }
  }

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

      <Button
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Hide Edit Form" : "Edit Profile"}
      </Button>
      {showForm && (
        <>
          <form onSubmit={handleInfoSubmit} className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Update Info</h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={infoData.name}
                onChange={handleInfoChange}
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
                value={infoData.email}
                onChange={handleInfoChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <Button
              type="submit"
            >
              Save Info
            </Button>
          </form>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold mb-2">Update Password</h2>

            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium">
                Old Password
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
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
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <Button
              type="submit"
            >
              Change Password
            </Button>
          </form>
        </>
      )}

      {message && (
        <div className="mt-6 text-green-700 font-semibold">{message}</div>
      )}
    </>
  );
}
