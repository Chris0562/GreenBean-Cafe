"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/menu", label: "Menu" },
    { href: "/admin/events", label: "Events" },
    { href: "/en", label: "↗ Website" },
  ];

  return (
    <nav className="bg-deep-teal border-b border-light-cream shadow-sm">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-center h-14 gap-12 text-light-cream text-sm font-semibold">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`pb-1 transition-colors hover:text-soft-gold ${
                  isActive
                    ? "text-soft-gold border-b-2 border-soft-gold"
                    : "border-b-2 border-transparent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
