"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="bg-[var(--black)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            <Link href="/" className="flex items-center gap-3 text-white no-underline hover:no-underline">
              <span className="font-bold text-lg">
                Universal Digital Services
              </span>
            </Link>
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-4 text-sm font-bold">
              <Link href="/" className="text-white no-underline hover:underline">Home</Link>
              <Link href="/services" className="text-white no-underline hover:underline">Services</Link>
              <Link href="/tracker" className="text-white no-underline hover:underline">Tracker</Link>
              <Link href="/about" className="text-white no-underline hover:underline">About</Link>
            </nav>
            {/* Mobile hamburger button */}
            <button
              className="sm:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <nav className="sm:hidden border-t border-gray-700">
            <div className="max-w-[960px] mx-auto px-4 py-3 flex flex-col gap-3 text-sm font-bold">
              <Link href="/" className="text-white no-underline hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/services" className="text-white no-underline hover:underline" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link href="/tracker" className="text-white no-underline hover:underline" onClick={() => setMenuOpen(false)}>Tracker</Link>
              <Link href="/about" className="text-white no-underline hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
            </div>
          </nav>
        )}
      </div>
      <div className="h-[10px] bg-[var(--green)]" />
    </header>
  );
}
