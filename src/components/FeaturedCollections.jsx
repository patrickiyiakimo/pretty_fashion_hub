"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturedCollections({ collections }) {
  return (
    <section
      id="collections"
      className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-white via-purple-50 to-white"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent mb-4">
          Featured Collections
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover timeless fashion crafted with elegance, designed exclusively
          for you.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {collections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-200/50 transition-all"
          >
            {/* Image with Overlay */}
            <div className="relative h-80 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition duration-500" />
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                {item.description}
              </p>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold rounded-full shadow-md">
                {item.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
