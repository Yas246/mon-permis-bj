"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    const baseClasses =
      "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors";
    const activeClasses = "font-semibold text-blue-600 dark:text-blue-400";
    return `${baseClasses} ${isActive ? activeClasses : ""}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            prefetch={false}
            scroll={false}
            className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            PermiX
          </Link>

          {/* Menu hamburger pour mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu pour desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              href="/sommaire"
              prefetch={false}
              scroll={false}
              className={getLinkClasses("/sommaire")}
            >
              Sommaire
            </Link>
            <Link
              href="/revision"
              prefetch={false}
              scroll={false}
              className={getLinkClasses("/revision")}
            >
              Révision
            </Link>
            <Link
              href="/examen"
              prefetch={false}
              scroll={false}
              className={getLinkClasses("/examen")}
            >
              Examen
            </Link>
            <Link
              href="/historique"
              prefetch={false}
              scroll={false}
              className={getLinkClasses("/historique")}
            >
              Historique
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={
                isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"
              }
            >
              {mounted ? isDarkMode ? "🌞" : "🌙" : <span>🌙</span>}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "py-2 max-h-48 opacity-100"
              : "overflow-hidden max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/revision"
              prefetch={false}
              scroll={false}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Révision
            </Link>
            <Link
              href="/examen"
              prefetch={false}
              scroll={false}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Examen
            </Link>
            <Link
              href="/historique"
              prefetch={false}
              scroll={false}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Historique
            </Link>
            <Link
              href="/sommaire"
              prefetch={false}
              scroll={false}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sommaire
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mounted ? (
                isDarkMode ? (
                  <span>Mode clair 🌞</span>
                ) : (
                  <span>Mode sombre 🌙</span>
                )
              ) : (
                <span>Thème 🌙</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
