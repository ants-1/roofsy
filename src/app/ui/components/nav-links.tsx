'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CircleUserRound, Heart, LogOut, User, UserRound } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const links = [
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Sell', href: '/sell' },
];

export const NavLinks = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isUser = !!session;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/">
        <h2 className="text-green-500 underline text-2xl font-bold">Roofsy.</h2>
      </Link>

      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hover:underline hover:text-green-600 transition-all",
              pathname === link.href && "underline text-green-700 font-semibold"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-2 items-center relative" ref={dropdownRef}>
        <Link
          href="/saved"
          className={clsx(
            "hover:underline hover:text-green-600 transition-all flex flex-col items-center justify-center",
            pathname === "/saved" && "underline text-green-700 font-semibold"
          )}
        >
          <Heart className="w-12" />
          <p className="text-sm">Saved</p>
        </Link>

        {!isUser ? (
          <Link
            href="/login"
            className={clsx(
              "hover:underline hover:text-green-600 transition-all flex flex-col items-center justify-center",
              pathname === "/login" && "underline text-green-700 font-semibold"
            )}
          >
            <UserRound className="w-12" />
            <p className="text-sm">Login</p>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={clsx("flex flex-col items-center justify-center hover:text-green-600 transition-all cursor-pointer", pathname === "/profile" && "underline text-green-700 font-semibold")}
            >
              <CircleUserRound className="w-12" />
              <p className="text-sm">Profile</p>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                <Link
                  href="/profile"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex gap-1 items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                 <User width={15} /> 
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex gap-1 items-center"
                >
                  <LogOut width={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
