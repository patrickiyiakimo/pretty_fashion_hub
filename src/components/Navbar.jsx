"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiOutlineShoppingCart, HiSearch, HiUser, HiChevronDown } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safely calculate cart count
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  // Navigation links with categories
  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Shop", 
      href: "/shop",
      dropdown: [
        { name: "New Arrivals", href: "/shop?category=new" },
        { name: "Best Sellers", href: "/shop?category=bestsellers" },
        { name: "Men's Fashion", href: "/shop?category=men" },
        { name: "Women's Fashion", href: "/shop?category=women" },
        { name: "Accessories", href: "/shop?category=accessories" },
      ]
    },
    { name: "Collections", href: "/collections" },
    { name: "Brands", href: "/brands" },
    { name: "Partner", href: "/partner" },
  ];

  const authLinks = [
    { name: "Account", href: "/account", icon: <HiUser size={18} /> },
    { 
      name: "Cart", 
      href: "/cart", 
      badge: cartCount,
      icon: <HiOutlineShoppingCart size={20} /> 
    },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-blue-600 transition-all duration-500 shadow-lg">
                  <Image
                    src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
                    alt="Kingz World - Premium Fashion"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}>
                    Kingz World
                  </span>
                  <span className="text-xs text-yellow-400 font-medium tracking-wider">
                    PREMIUM FASHION
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 font-semibold transition-all duration-300 py-2 ${
                          isScrolled 
                            ? "text-gray-700 hover:text-blue-600" 
                            : "text-white hover:text-yellow-300"
                        }`}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        <span>{link.name}</span>
                        <HiChevronDown className={`transform transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-semibold transition-all duration-300 py-2 relative ${
                        isScrolled 
                          ? "text-gray-700 hover:text-blue-600" 
                          : "text-white hover:text-yellow-300"
                      }`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:text-yellow-300 hover:bg-white/10"
                }`}
              >
                <HiSearch size={22} />
              </button>

              {/* Auth & Cart Links */}
              {authLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 font-medium transition-all duration-300 relative ${
                    isScrolled 
                      ? "text-gray-700 hover:text-blue-600" 
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  {link.icon}
                  <span className="hidden sm:block">{link.name}</span>
                  {link.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Cart Icon for Mobile */}
              <Link href="/cart" className="relative">
                <HiOutlineShoppingCart 
                  size={24} 
                  className={isScrolled ? "text-gray-700" : "text-white"} 
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-900 px-3 py-2">
                          {link.name}
                        </div>
                        <div className="pl-4 space-y-2 border-l-2 border-blue-200">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Auth Links for Mobile */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {authLinks.filter(link => link.name !== "Cart").map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <HiSearch size={24} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands, and collections..."
                  className="flex-1 text-lg py-3 outline-none placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiX size={24} />
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Popular searches: Sneakers, Dresses, Accessories, Summer Collection
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}