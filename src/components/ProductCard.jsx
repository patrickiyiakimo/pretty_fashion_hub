"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const imageRef = useRef();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const imgRect = imageRef.current.getBoundingClientRect();
    onAddToCart(product, imgRect); // Pass image position to cart for animation
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative block rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 transform transition-all duration-500 hover:-translate-y-1 hover:scale-105"
    >
      <div className="relative h-72 md:h-80 overflow-hidden rounded-t-3xl">
        <Image
          ref={imageRef}
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition duration-700 rounded-t-3xl pointer-events-none" />
      </div>

      <div className="p-6 text-center space-y-3 md:space-y-4 relative z-20">
        <h3 className="text-lg md:text-xl font-bold text-purple-600 tracking-wide drop-shadow-lg">
          {product.name}
        </h3>
        <p className="text-xl md:text-2xl font-extrabold text-yellow-400 drop-shadow-md">
          ₦{product.price.toLocaleString()}
        </p>

        <button
          onClick={handleAddToCart}
          className={`w-full md:w-auto px-6 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 ${
            added
              ? "bg-green-500 text-white scale-110"
              : "bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 hover:shadow-xl hover:scale-105"
          }`}
        >
          {added ? "✔ Added" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
