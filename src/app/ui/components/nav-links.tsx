'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CircleUserRound, Heart, UserRound } from "lucide-react";

const links = [
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Sell', href: '/sell' },
];

const iconLinks = [
  { name: 'Saved', href: '/saved', icon: Heart },
  { name: 'Login', href: '/login', icon: UserRound },
  { name: 'Profile', href: '/profile', icon: CircleUserRound }
]

export const NavLinks = () => {
  const isUser: boolean = true;
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/">
        <h2 className="text-green-500 underline text-2xl font-bold">Roofsy.</h2>
      </Link>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className={clsx(
            "hover:underline hover:text-green-600 transition-all",
            pathname === link.href && "underline text-green-700 font-semibold"
          )}>
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {iconLinks.map((link) => {
          if (isUser && link.name === 'Login') return null;
          if (!isUser && link.name == 'Profile') return null;

          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "hover:underline hover:text-green-600 transition-all flex flex-col items-center justify-center",
                pathname === link.href && "underline text-green-700 font-semibold"
              )}
            >

              <LinkIcon className="w-12" />
              <p className="text-sm">{link.name}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

