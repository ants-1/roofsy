'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProperty } from '@/app/lib/actions';
import { MoreVertical, Pencil, Trash } from 'lucide-react';

interface PropertyDropdownMenuProps {
  propertyId: string;
}

export default function PropertyDropdownMenu({ propertyId }: PropertyDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleDelete = () => {
    const confirmed = confirm('Are you sure you want to delete this property?');
    if (!confirmed) return;

    startTransition(async () => {
      await deleteProperty(propertyId);
      router.refresh();
      setOpen(false);
    });
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-5">
          <button
            onClick={() => router.push(`/properties/${propertyId}/edit`)}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
