"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/about", labelKey: "about" },
  { href: "/menu/coffee", labelKey: "menu" },
  { href: "/hours-and-location", labelKey: "hoursAndLocation" },
  { href: "/events", labelKey: "events" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const otherLocale = locale === "en" ? "it" : "en";

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const clickedOutside =
        isMenuOpen &&
        window.innerWidth < 768 &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target);

      if (clickedOutside) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const switchLanguage = () => {
    const segments = pathname.split("/").filter(Boolean);
    const knownLocales = ["en", "it"];
    if (knownLocales.includes(segments[0])) segments.shift();

    const pathWithoutLocale = "/" + segments.join("/");
    router.replace(pathWithoutLocale, { locale: otherLocale });
  };

  const DesktopNavItem = ({ href, label }: { href: string; label: string }) => (
    <li>
      <Link
        href={href}
        className="hover-underline hover:text-opacity-80 transition-colors"
      >
        {label}
      </Link>
    </li>
  );

  const MobileNavItem = ({ href, label }: { href: string; label: string }) => (
    <li>
      <Link
        href={href}
        onClick={() => setIsMenuOpen(false)}
        className="block w-full px-8 py-4 text-lg font-light text-first"
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="sticky top-0 z-50 shadow-sm bg-light-cream text-deep-teal">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="transition-transform duration-300 hover:scale-105"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative w-30 h-10">
            <Image
              src="/images/gbname.png"
              alt="GreenBean Café"
              width={120}
              height={40}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-lg font-light text-first items-center">
          {NAV_LINKS.map((item) => (
            <DesktopNavItem
              key={item.href}
              href={item.href}
              label={t(item.labelKey)}
            />
          ))}
          <li>
            <button
              onClick={switchLanguage}
              className="uppercase text-sm border border-deep-teal px-3 py-1 rounded-full transition-colors hover:bg-deep-teal hover:text-light-cream"
            >
              {otherLocale}
            </button>
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={switchLanguage}
            className="uppercase text-sm border border-deep-teal px-3 py-1 rounded-full transition-colors hover:bg-deep-teal hover:text-light-cream"
          >
            {otherLocale}
          </button>

          <button
            ref={toggleButtonRef}
            onClick={toggleMenu}
            className="flex flex-col gap-1 p-2 transition-all duration-300 hover:bg-opacity-10 hover:bg-deep-teal rounded-md"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-light-cream border-t border-deep-teal/20 divide-y divide-deep-teal/10">
          {NAV_LINKS.map((item) => (
            <MobileNavItem
              key={item.href}
              href={item.href}
              label={t(item.labelKey)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
