"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury Fashion"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            Redefine{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Luxury Fashion
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 text-gray-200"
          >
            Step into timeless elegance with{" "}
            <span className="font-semibold">Pretty Fashion Hub</span>, where every outfit tells a story of confidence, sophistication, and class.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button className="bg-yellow-400 text-purple-900 font-bold px-8 py-4 text-lg rounded-2xl shadow-lg hover:bg-yellow-300 transition">
              Shop Now
            </button>
            <Link href="/shop">
              <button className="bg-white/10 backdrop-blur-md text-white border border-yellow-300 font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-purple-900 transition">
                Explore Collections
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Grid Images (Visible on all screens) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          {/* Column 1 */}
          <div className="space-y-4 md:space-y-6">
            <div className="relative w-full h-48 md:h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hand-bag-1.webp"
                alt="Luxury Bag"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/heels-1.webp"
                alt="Luxury Shoes"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4 md:space-y-6 mt-6 md:mt-12">
            <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/shoe-1.webp"
                alt="Fashion Shoe"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-48 md:h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/shoe-2.jpg"
                alt="Elegant Shoes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
