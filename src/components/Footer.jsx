"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black mt-20 text-white py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div className="space-y-4">
          <Link href="/">
            {/* <Image
              src="/images/logo.png"
              alt="Pretty Fashion Hub"
              width={150}
              height={50}
              className="object-contain"
            /> */}
          </Link>
          <p className="text-gray-300 text-sm">
            Pretty Fashion Hub brings you timeless luxury and elegance. Explore our curated collections and elevate your style.
          </p>
          <div className="flex space-x-4 mt-2">
            <Link href="#" className="text-white hover:text-yellow-400 transition">
              <FaFacebookF size={18} />
            </Link>
            <Link href="https://www.instagram.com/prettyfashionhub_/" className="text-white hover:text-yellow-400 transition">
              <FaInstagram size={18} />
            </Link>
            <Link href="#" className="text-white hover:text-yellow-400 transition">
              <FaTwitter size={18} />
            </Link>
            <Link href="#" className="text-white hover:text-yellow-400 transition">
              <FaYoutube size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-yellow-400 font-oswald mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/shop" className="hover:text-yellow-400 transition">Shop</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-yellow-400 transition">Sign Up</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold text-yellow-400 font-oswald mb-4">Customer Service</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="#" className="hover:text-yellow-400 transition">FAQ</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400 transition">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-400 transition">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold text-yellow-400 font-oswald mb-4">Subscribe to Our Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4">
            Get the latest updates on luxury collections, exclusive offers, and more.
          </p>
          <form className="flex flex-col lg:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full text-black flex-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold px-6 py-3 rounded-full transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pretty Fashion Hub. All rights reserved.
      </div>
    </footer>
  );
}
