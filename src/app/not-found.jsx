"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-400 to-purple-500 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        {/* Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-96 mb-8"
        >
            <div className="flex items-center pt-20 justify-center">
  <Image
            src="/images/404-page.webp"
            alt="Page Not Found"
            width={400}
            height={300}
            className="object-cover rounded-3xl shadow-2xl"
          />

            </div>
        
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/90 text-lg md:text-xl mb-8"
        >
          The page you’re looking for doesn’t exist. But don’t worry, our fashion is always in style!
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="bg-yellow-300 text-purple-900 font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:bg-yellow-400 transition"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
