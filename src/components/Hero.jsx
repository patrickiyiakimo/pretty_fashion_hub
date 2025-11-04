"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: (
      <>
        Redefine{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Luxury Fashion
        </span>
      </>
    ),
    subtitle: (
      <>
        Discover timeless pieces and bold statements.{" "}
        <span className="font-semibold">Kingz_World</span> blends heritage and
        modern elegance to inspire confidence, class, and power.
      </>
    ),
    image: "/images/shoe-1.webp",
  },
  {
    id: 2,
    title: (
      <>
        Build Your{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Fashion Empire
        </span>
      </>
    ),
    subtitle: (
      <>
        Turn your creativity into income. Open a store on{" "}
        <span className="font-semibold">Kingz_World Marketplace</span> and reach
        thousands of fashion lovers across Nigeria, all from your dashboard.
      </>
    ),
    image: "/images/shoe-2.jpg",
  },
  {
    id: 3,
    title: (
      <>
        Nigeria’s Home of{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Style & Culture
        </span>
      </>
    ),
    subtitle: (
      <>
        Celebrate local designers, global brands, and emerging talent in one
        vibrant community.{" "}
        <span className="font-semibold">Kingz_World</span> — where fashion meets
        purpose.
      </>
    ),
    image: "/images/shoe-3.jpg",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="
        relative 
        flex items-center justify-center overflow-hidden text-white
        h-[80vh] sm:h-[75vh] md:h-[70vh] lg:min-h-screen
      "
    >
      {/* Background Image + Purple Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, backgroundColor: "#6B21A8" }} // purple fade transition
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Slight zoom animation for depth */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt="Luxury Fashion"
              fill
              priority
              className="object-cover object-center brightness-[45%] saturate-125"
            />
          </motion.div>

          {/* Purple Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/40 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content Section */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          key={slide.id + '-title'}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-satisfy font-extrabold leading-tight mb-6"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          key={slide.id + '-text'}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 font-oswald text-gray-200"
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/shop">
            <button className="bg-yellow-400 text-purple-900 font-bold px-8 py-4 text-lg shadow-lg hover:bg-yellow-300 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/partner">
            <button className="bg-white/10 backdrop-blur-md text-white border border-yellow-300 font-semibold px-8 py-4 text-lg shadow-lg hover:bg-yellow-400 hover:text-purple-900 transition">
              Start Selling
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
