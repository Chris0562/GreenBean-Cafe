"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  //All of those hooks are for the mobile version
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        <ul className="hidden md:flex gap-8 text-lg font-light text-first">
          <li>
            <Link
              href="/about"
              className="hover-underline transition-colors hover:text-opacity-80"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/menu/coffee"
              className="hover-underline transition-colors hover:text-opacity-80"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/hours-and-location"
              className="hover-underline transition-colors hover:text-opacity-80"
            >
              Hours and Location
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className="hover-underline transition-colors hover:text-opacity-80"
            >
              Events
            </Link>
          </li>
        </ul>

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
                About
              </Link>
            </li>
            <li>
              <Link
                href="/menu/coffee"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/hours-and-location"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                Hours and Location
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-8 py-4 text-lg font-light text-first"
              >
                Events
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
