import { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import "../../[locale]/globals.css";
import AdminNavbar from "@/components/AdminNavbar";
import { authOptions } from "@/utils/authOptions";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Admin Panel | GreenBean Café",
  description: "Admin dashboard for editing site content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <html lang="en" className={quicksand.variable}>
      <body
        className={`
          ${quicksand.className}
          antialiased
          flex flex-col
          min-h-screen
          bg-light-cream
          text-deep-teal
        `}
      >
        <AdminNavbar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
