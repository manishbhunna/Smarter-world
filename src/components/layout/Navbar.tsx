"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#dbd8cf]/90 backdrop-blur-xl shadow-card border-b border-[#093103]/20 py-1"
          : "bg-[#dbd8cf]/70 backdrop-blur-md border-b border-[#093103]/15 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo - Left */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none z-10"
            aria-label="Acovate Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#093103] shadow-forest flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-black leading-none">
                Acovate
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-black/70 uppercase mt-1">
                Digital & AI Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <nav
            className="hidden md:flex items-center space-x-1 lg:space-x-2 absolute left-1/2 -translate-x-1/2 bg-[#dbd8cf] p-1.5 rounded-2xl border border-[#093103]/20 shadow-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-white bg-[#093103] font-semibold shadow-sm"
                      : "text-black hover:bg-[#093103]/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Contact Now Action Button & Mobile Menu - Right */}
          <div className="flex items-center gap-2.5 z-10">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white bg-[#093103] hover:bg-black shadow-forest transition-all duration-200 hover:scale-105"
            >
              Contact Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden p-2.5 rounded-xl text-white bg-[#093103] hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#093103] transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#093103]/20 bg-[#dbd8cf] px-4 pt-3 pb-6 shadow-card animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1.5 text-center" aria-label="Mobile Navigation">
            {[...navLinks, { href: "/contact", label: "Contact Now" }].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors text-center ${
                    isActive
                      ? "text-white bg-[#093103] font-semibold shadow-sm"
                      : "text-black hover:bg-[#093103]/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
