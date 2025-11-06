"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Partner", href: "/partner" },
    { name: "Cart", href: "/cart", badge: cartCount },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-gradient-to-r from-black/70 via-purple-900/30 to-black/70 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 group"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 group-hover:border-purple-400 transition-all duration-500">
            <Image
              src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
              alt="kingz-world-logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-2xl md:text-3xl font-satisfy font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            Kingz_World
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-yellow-300 hover:text-purple-400 font-medium text-lg tracking-wide group transition-colors duration-300 flex items-center"
            >
              <span>{link.name}</span>

              {/* Cart badge */}
              {link.badge > 0 && (
                <span className="ml-2 bg-yellow-400 text-purple-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {link.badge}
                </span>
              )}

              {/* Underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-400 hover:text-purple-400 transition-colors duration-300"
          >
            {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-b from-black/95 via-purple-900/40 to-black/90 backdrop-blur-lg py-6 px-6 space-y-4 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-gray-100 font-medium text-lg hover:text-yellow-400 transition-colors duration-300"
            >
              <span>{link.name}</span>

              {link.badge > 0 && (
                <span className="bg-yellow-400 text-purple-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
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
