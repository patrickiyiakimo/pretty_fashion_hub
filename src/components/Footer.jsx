"use client";
import Link from "next/link";
import Image from "next/image";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaPinterestP,
  FaTiktok
} from "react-icons/fa";
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker, 
  HiShieldCheck,
  HiTruck,
  HiCreditCard,
  HiSupport
} from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/prettyfashionhub_/", label: "Instagram" },
    { icon: <FaFacebookF size={16} />, href: "#", label: "Facebook" },
    { icon: <FaTwitter size={16} />, href: "#", label: "Twitter" },
    { icon: <FaPinterestP size={16} />, href: "#", label: "Pinterest" },
    { icon: <FaTiktok size={16} />, href: "#", label: "TikTok" },
  ];

  const quickLinks = [
    { name: "New Arrivals", href: "/shop?category=new" },
    { name: "Best Sellers", href: "/shop?category=bestsellers" },
    { name: "Men's Collection", href: "/shop?category=men" },
    { name: "Women's Collection", href: "/shop?category=women" },
    { name: "Accessories", href: "/shop?category=accessories" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Sustainability", href: "/sustainability" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Care Instructions", href: "/care" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ];

  const trustBadges = [
    { icon: <HiShieldCheck className="w-5 h-5" />, text: "Secure Payment" },
    { icon: <HiTruck className="w-5 h-5" />, text: "Free Shipping Over ₦50k" },
    { icon: <HiCreditCard className="w-5 h-5" />, text: "Flexible Payment Options" },
    { icon: <HiSupport className="w-5 h-5" />, text: "24/7 Customer Support" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/50 via-transparent to-transparent" />
      </div>

      {/* Trust Bar */}
      <div className="relative border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="text-blue-400">
                  {badge.icon}
                </div>
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-blue-600 transition-all duration-500 shadow-lg">
                  <Image
                    src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
                    alt="Kingz World - Premium Fashion"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Kingz World
                </h3>
                <p className="text-sm text-gray-400">Premium Fashion & Lifestyle</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Where exceptional craftsmanship meets timeless elegance. We're dedicated to 
              transforming your style journey with premium quality and unparalleled service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <HiMail className="w-5 h-5 text-blue-400" />
                <span>support@kingzworld.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiPhone className="w-5 h-5 text-blue-400" />
                <span>+234 *** *** ****</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiLocationMarker className="w-5 h-5 text-blue-400" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:scale-110 hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Shop Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Join the Kingz World
              </h4>
              <p className="text-gray-400">
                Be the first to access exclusive collections, premium content, and special offers.
              </p>
            </div>
            <form className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Kingz World. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Accepted Payments:</span>
              <div className="flex gap-1">
                <span>Visa</span>
                <span>•</span>
                <span>Mastercard</span>
                <span>•</span>
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}