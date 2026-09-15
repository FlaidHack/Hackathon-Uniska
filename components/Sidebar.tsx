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
    <aside className="w-56 shrink-0 border-r border-teal-800 bg-teal-900 text-teal-50 min-h-screen flex flex-col">
      <div className="p-4 border-b border-teal-800">
        <p className="font-bold text-white">Katalyst</p>
        <p className="text-xs text-teal-200/70">{role === "OWNER" ? "Owner" : "Staff"} view</p>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-3 py-2 rounded-md text-sm font-medium",
              pathname.startsWith(link.href)
                ? "bg-white/15 text-white font-semibold"
                : "text-teal-100/80 hover:bg-white/10 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-2 border-t border-teal-800">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full text-left px-3 py-2 rounded-md text-sm text-teal-100/70 hover:bg-white/10 hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
