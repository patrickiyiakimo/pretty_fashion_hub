"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Cart", href: "/cart", badge: cartCount }, // add badge
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-satisfy font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-600">
          Kingz_World
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-yellow-400 font-semibold text-lg group flex items-center"
            >
              <span className="hover:text-purple-400 transition-colors duration-300">{link.name}</span>

              {/* Badge for cart */}
              {link.badge > 0 && (
                <span className="ml-2 bg-yellow-400 text-purple-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {link.badge}
                </span>
              )}

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-400 focus:outline-none transition-colors duration-300"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-r from-black/80 via-purple-900/40 to-black/80 overflow-hidden transition-all duration-700 ${isOpen ? "max-h-96 py-6" : "max-h-0 py-0"}`}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-100 font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 flex items-center"
            >
              {link.name}

              {/* Mobile badge */}
              {link.badge > 0 && (
                <span className="ml-2 bg-yellow-400 text-purple-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
