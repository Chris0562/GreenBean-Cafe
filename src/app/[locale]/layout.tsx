import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Quicksand } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: "GreenBean Café",
      template: "%s | GreenBean Café",
    },
    description:
      "GreenBean Café — a cozy spot serving artisan coffee and fresh pastries. Warm atmosphere, friendly service, and your new favorite hangout.",
    keywords: [
      "coffee",
      "café",
      "artisan coffee",
      "pastries",
      "cozy café",
      "coffee shop",
    ],
    authors: [{ name: "GreenBean Café" }],
    creator: "GreenBean Café",
    publisher: "GreenBean Café",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: `https://green-bean-cafe.vercel.app/${locale}`,
      siteName: "GreenBean Café",
      title: "GreenBean Café - Artisan Coffee & Fresh Pastries",
      description:
        "A cozy spot serving artisan coffee and fresh pastries. Warm atmosphere, friendly service, and your new favorite hangout.",
      images: [
        {
          url: "/images/gbname.png",
          width: 1200,
          height: 630,
          alt: "GreenBean Café",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GreenBean Café - Artisan Coffee & Fresh Pastries",
      description:
        "A cozy spot serving artisan coffee and fresh pastries. Warm atmosphere, friendly service, and your new favorite hangout.",
      images: ["/images/gbname.png"],
    },
    metadataBase: new URL("https://green-bean-cafe.vercel.app"),
    alternates: {
      canonical: `/${locale}/`,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f6f1ed",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={quicksand.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </head>
      <body
        className={`
          ${quicksand.className}
          antialiased
          flex flex-col
          min-h-screen
          bg-light-cream
          text-deep-teal
          scroll-smooth
          selection:bg-deep-teal/20
          selection:text-deep-teal
        `}
      >
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <main className="flex-1 focus-within:outline-none">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
