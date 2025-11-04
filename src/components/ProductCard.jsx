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
    onAddToCart(product, imgRect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative block overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900 via-purple-800/70 to-black text-white shadow-[0_0_25px_rgba(0,0,0,0.3)]"
    >
      {/* Product Image */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <Image
          ref={imageRef}
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-purple-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating label (e.g. New / Trending) */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-purple-900 font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
          New Arrival
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 text-center space-y-3 md:space-y-4 relative z-20">
        <h3 className="text-lg md:text-xl font-oswald font-semibold tracking-wide text-yellow-300 group-hover:text-yellow-400 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
          ₦{product.price.toLocaleString()}
        </p>

        <button
          onClick={handleAddToCart}
          className={`relative overflow-hidden w-full md:w-auto px-8 py-3 font-semibold text-sm tracking-wide shadow-lg transition-all duration-500 ${
            added
              ? "bg-green-500 text-white scale-110"
              : "bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-400 text-purple-900"
          }`}
        >
          <span className="relative z-10">{added ? "✔ Added" : "Add to Cart"}</span>
          {!added && (
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* Subtle glowing border animation */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-yellow-400/30 transition-all duration-700"></div>

      {/* Glow behind card */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-20 bg-yellow-400/20 blur-3xl opacity-0 group-hover:opacity-60 transition duration-700 rounded-full"></div>
    </Link>
  );
}
