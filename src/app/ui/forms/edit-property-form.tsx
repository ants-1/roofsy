'use client';

import { useState } from "react";
import Image from "next/image";
import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";
import { Button } from "@/app/ui/components/button";
import { Upload } from "lucide-react";
import { Property } from "@/app/lib/types";

interface Props {
  property: Property;
}

export default function EditPropertyForm({ property }: Props) {
  const [formData, setFormData] = useState<Property>(property);
  const [imagePreviews, setImagePreviews] = useState<string[]>(property?.imgs || []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with actual update API call
    console.log("Updated property:", formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-green-50 px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200"
        >
          <h1 className="text-3xl font-bold text-green-700 mb-6">Edit Property</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Details</label>
              <input
                type="text"
                name="details"
                value={formData.details || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price (£)</label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Property Type</label>
              <select
                name="property_type"
                value={formData.property_type || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              >
                <option value="">Select Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={formData.beds || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={formData.baths || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Receptions</label>
              <input
                type="number"
                name="receptions"
                value={formData.receptions || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="property_address"
                value={formData.property_address || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Postcode</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Agent</label>
              <input
                type="text"
                name="agent"
                value={formData.agent || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">Upload New Images</label>
            <input
              id="edit-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="edit-upload">
              <Button
                type="button"
                className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
              >
                <Upload size={18} />
                Upload Images
              </Button>
            </label>
          </div>

          {/* Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-32 rounded-lg overflow-hidden border"
                >
                  <Image src={src} alt={`preview-${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="mt-8 w-full justify-center">
            Save Changes
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
