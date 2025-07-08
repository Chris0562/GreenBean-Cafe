"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const locale = useLocale();
  const router = useRouter();
  const otherLocale = locale === "en" ? "it" : "en";

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        window.innerWidth < 768 &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
    const currentLocale = segments[0];
    const knownLocales = ["en", "it"];

    if (knownLocales.includes(currentLocale)) {
      segments.shift(); // Remove locale
    }

    const pathWithoutLocale = "/" + segments.join("/");
    router.replace(pathWithoutLocale, { locale: otherLocale });
  };

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
              fill
              sizes="fill"
              alt="GreenBean Café Logo"
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-lg font-light text-first items-center">
          <li>
            <Link
              href="/about"
              className="hover-underline hover:text-opacity-80 transition-colors"
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              href="/menu/coffee"
              className="hover-underline hover:text-opacity-80 transition-colors"
            >
              {t("menu")}
            </Link>
          </li>
          <li>
            <Link
              href="/hours-and-location"
              className="hover-underline hover:text-opacity-80 transition-colors"
            >
              {t("hoursAndLocation")}
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className="hover-underline hover:text-opacity-80 transition-colors"
            >
              {t("events")}
            </Link>
          </li>
          <li>
            <button
              onClick={switchLanguage}
              className="hidden md:block uppercase text-sm border border-deep-teal px-3 py-1 rounded-full transition-colors hover:bg-deep-teal hover:text-light-cream cursor-pointer"
            >
              {otherLocale}
            </button>
          </li>
        </ul>

        {/* Mobile Language Switcher */}
        <button
          onClick={switchLanguage}
          className="md:hidden block uppercase text-sm border border-deep-teal px-3 py-1 rounded-full transition-colors hover:bg-deep-teal hover:text-light-cream"
        >
          {otherLocale}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1 p-2 transition-all duration-300 hover:bg-opacity-10 hover:bg-deep-teal rounded-md"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
              isMounted && isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
              isMounted && isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-deep-teal transition-all duration-300 ${
              isMounted && isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMounted && (
        <div
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="bg-light-cream border-t border-deep-teal/20 divide-y divide-deep-teal/10">
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/menu/coffee"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                {t("menu")}
              </Link>
            </li>
            <li>
              <Link
                href="/hours-and-location"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                {t("hoursAndLocation")}
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                {t("events")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
