'use client';

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/app/ui/components/button";
import { Upload } from "lucide-react";
import { createProperty, State } from "@/app/lib/actions";
import { useActionState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePropertyForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    createProperty,
    initialState
  );
  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
    const previews = selected.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Upload each image
    const urls: string[] = [];
    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const json = await res.json();
        if (json?.url) {
          urls.push(json.url);
        }
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    formData.append("imgs", JSON.stringify(urls));
    if (userId) {
      formData.append("ownerId", userId);
    }

    startTransition(() => {
      formAction(formData);
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200"
    >
      <h1 className="text-3xl font-bold text-green-700 mb-6">Create Property</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Details</label>
          <input
            type="text"
            name="details"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (£)</label>
          <input
            type="number"
            name="price"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Property Type</label>
          <select
            name="property_type"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="Semi-Detached">Semi-Detached</option>
            <option value="Flat">Flat</option>
            <option value="Studio">Studio</option>
            <option value="Detached">Detached</option>
            <option value="Terraced">Terraced</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Bedrooms</label>
          <input
            type="number"
            name="beds"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bathrooms</label>
          <input
            type="number"
            name="baths"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Receptions</label>
          <input
            type="number"
            name="receptions"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="property_address"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Postcode</label>
          <input
            type="text"
            name="postcode"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium">Property Status</label>
          <select
            name="property_status"
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          >
            <option value="">Select Status</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Agent</label>
        <input
          type="text"
          name="agent"
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      {/* Upload Button */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Upload Images</label>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelection}
          className="hidden"
        />

        {/* Button that triggers file input click */}
        <Button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          <Upload size={18} />
          Upload Images
        </Button>


        {/* Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative w-full h-32 rounded-lg overflow-hidden border">
                <Image src={src} alt={`preview-${idx}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Errors */}
      {state.errors &&
        Object.entries(state.errors).map(([field, msgs]) =>
          msgs.map((msg, i) => (
            <p key={`${field}-${i}`} className="text-red-600 mt-2">
              {field}: {msg}
            </p>
          ))
        )}

      <input type="hidden" name="ownerId" value={userId ?? ""} />
      <Button type="submit" className="mt-8 w-full justify-center">
        {isPending ? "Creating..." : "Create Property"}
      </Button>
    </form>
  )
}