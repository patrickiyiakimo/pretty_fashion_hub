"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white py-28 px-3 md:px-16 overflow-hidden rounded-3xl shadow-2xl mx-6 md:mx-12">
      {/* Subtle background lights */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-satisfy font-extrabold leading-tight tracking-wide"
        >
          Step Into Luxury. Define Your Style.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl font-oswald text-white/80 leading-relaxed max-w-3xl mx-auto"
        >
          Discover timeless fashion that speaks to confidence, class, and craftsmanship. 
          Every piece from <span className="text-yellow-400 font-semibold">Kingz_World</span> 
          is made to make you feel effortlessly royal.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-5 pt-6"
        >
          <Link href="/shop">
            <button className="bg-yellow-400 text-purple-900 font-bold text-lg px-10 py-4 shadow-lg hover:bg-yellow-300 transition-all duration-300">
              Explore the Collection
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-yellow-400/70 text-white text-lg font-semibold px-10 py-4 backdrop-blur-sm hover:bg-yellow-400 hover:text-purple-900 transition-all duration-300">
              Talk to a Stylist
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative underline line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-yellow-400 via-white/60 to-yellow-400 opacity-50"></div>
    </section>
  );
}
