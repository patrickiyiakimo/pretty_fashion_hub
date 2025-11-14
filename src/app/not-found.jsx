"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Animated Number */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="mb-8"
        >
          <div className="relative">
            <div className="text-9xl font-black text-gray-900 opacity-5 absolute inset-0 -z-10">
              404
            </div>
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              404
            </h1>
          </div>
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to familiar territory.
          </p>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              HTTP 404 - Not Found
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm mb-4">
            Need assistance?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/help"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Help Center
            </Link>
            <Link
              href="/sitemap"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Site Map
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>
    </section>
  );
}