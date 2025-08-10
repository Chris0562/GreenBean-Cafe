import { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import "../../../../app/[locale]/globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Admin Login | GreenBean Café",
  description: "Login to the admin panel of GreenBean Café.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body
        className={`
          ${quicksand.className}
          antialiased
          min-h-screen
          bg-light-cream
          text-deep-teal
          flex items-center justify-center
          px-4
        `}
      >
        {children}
      </body>
    </html>
  );
}
