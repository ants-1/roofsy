'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import Footer from '@/app/ui/components/footer';
import Navbar from '@/app/ui/components/navbar';
import { Button } from '@/app/ui/components/button';
import { Upload } from 'lucide-react';
import { Property } from '@/app/lib/types';
import { updateProperty, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  property: Property;
}

export default function EditPropertyForm({ property }: Props) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateProperty, initialState);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<Property>(property);
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(property?.imgs || []);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    setFiles(prev => [...prev, ...selected]);
    const previews = selected.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formDataPayload = new FormData(form);

    const urls: string[] = [...(property.imgs || [])];
    for (const file of files) {
      const data = new FormData();
      data.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const json = await res.json();

        if (json?.url) {
          urls.push(json.url);
        } 
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    formDataPayload.set('imgs', JSON.stringify(urls));
    formDataPayload.set('ownerId', property.owner_id);
    formDataPayload.set('id', property.id);

    startTransition(() => {
      formAction(formDataPayload);
    });
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
                defaultValue={formData.details}
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
                defaultValue={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Property Type</label>
              <select
                name="property_type"
                defaultValue={formData.property_type}
                onChange={handleChange}
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
                defaultValue={formData.beds}
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
                defaultValue={formData.baths}
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
                defaultValue={formData.receptions}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="property_address"
                defaultValue={formData.property_address}
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
                defaultValue={formData.postcode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-medium">Property Status</label>
              <select
                name="property_status"
                defaultValue={formData.property_status}
                onChange={handleChange}
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
              defaultValue={formData.agent}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Upload Button */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">Upload New Images</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              <Upload size={18} />
              Upload Images
            </Button>
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

          {/* Show server validation errors */}
          {state.errors &&
            typeof state.errors === 'object' &&
            Object.entries(state.errors).map(([field, messages]) =>
              Array.isArray(messages) &&
              messages.map((msg: string, i: number) => (
                <p key={`${field}-${i}`} className="text-red-600 mt-2">
                  {field}: {msg}
                </p>
              ))
            )}

          <input type="hidden" name="ownerId" value={userId ?? ""} />
          <input type="hidden" name="id" value={formData.id} />
          <Button type="submit" className="mt-8 w-full justify-center">
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
