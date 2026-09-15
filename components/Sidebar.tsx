"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ownerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/transactions", label: "Transactions" },
  { href: "/simulator", label: "Simulator" },
  { href: "/settings", label: "Settings" },
];

const staffLinks = [
  { href: "/transactions", label: "Transactions" },
  { href: "/products", label: "Products" },
];

export function Sidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status !== "authenticated") return null;

  const role = session.user.role;
  const links = role === "OWNER" ? ownerLinks : staffLinks;

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <p className="font-bold text-gray-900">Katalyst</p>
        <p className="text-xs text-gray-400">{role === "OWNER" ? "Owner" : "Staff"} view</p>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-3 py-2 rounded-md text-sm font-medium",
              pathname.startsWith(link.href)
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
