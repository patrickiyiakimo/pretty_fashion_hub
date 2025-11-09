"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ProductCard (Premium eCommerce Design)
 * Props:
 *  - product: { id, name, image, price, compareAtPrice?, vendorName?, rating?, reviews?, badges?, inStock? }
 *  - onAddToCart(product, imgRect)
 */

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imageWrapperRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const rect = imageWrapperRef.current?.getBoundingClientRect();
    onAddToCart?.(product, rect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const rating = product.rating ?? 4.7;
  const vendor = product.vendorName ?? "Partner Store";

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value ?? 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/70 via-gray-800/80 to-gray-900 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-300"
    >
      <Link
        href={`/shop/${product.id}`}
        className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400/60"
      >
        {/* Image */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <div ref={imageWrapperRef} className="absolute inset-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              priority={false}
              placeholder="blur"
              blurDataURL="/images/placeholder-blur.png"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 pointer-events-none" />

          {/* Vendor Badge */}
          <div className="absolute top-4 right-4 z-20 text-xs font-medium bg-black/50 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
            {vendor}
          </div>

          {/* Product Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {Array.isArray(product.badges) &&
              product.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-400 text-purple-900 px-3 py-1 text-xs font-semibold rounded-full shadow-md"
                >
                  {badge}
                </span>
              ))}
          </div>

          {/* Hover Actions */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-end justify-between p-4 z-30"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("openQuickView", { detail: product })
                    );
                  }}
                  className="bg-white/90 text-purple-900 text-sm font-medium px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="6" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Quick View
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("wishlistToggle", { detail: product })
                    );
                  }}
                  aria-label="Add to wishlist"
                  className="w-10 h-10 bg-black/60 text-white rounded-md shadow-md flex items-center justify-center hover:bg-black/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s-7-4.35-9.2-6.34C1.54 12.94 3.2 8 7 6.5 9.3 5.59 12 7 12 7s2.7-1.41 5-0.5c3.8 1.5 5.46 6.44 4.2 8.16C19 16.65 12 21 12 21z" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details */}
        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-50 leading-tight">
              {product.name}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                product.inStock === false
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {product.inStock === false ? "Out of stock" : "In stock"}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill={i + 1 <= Math.round(rating) ? "#FBBF24" : "none"}
                  stroke="#FBBF24"
                  strokeWidth="1.2"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.902 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-300">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({product.reviews ?? 24} reviews)</span>
          </div>

          {/* Price + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                {formatCurrency(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                type="button"
                aria-pressed={added}
                className={`px-6 py-3 rounded-lg font-semibold text-sm shadow-md transition-all duration-200 ${
                  added
                    ? "bg-green-500 text-white scale-105"
                    : "bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-400 text-purple-900 hover:brightness-105"
                }`}
              >
                {added ? "✓ Added" : "Add to cart"}
              </button>

            
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
