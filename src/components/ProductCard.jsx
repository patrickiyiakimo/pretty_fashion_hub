"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageWrapperRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Product data with fallbacks
  const rating = product.rating ?? 4.7;
  const reviews = product.reviews ?? 24;
  const vendor = product.vendorName ?? "Premium Partner";
  const inStock = product.inStock !== false;
  const isVerifiedPartner = product.isVerifiedPartner ?? true;
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  // Fix image URL - handle both absolute and relative paths
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder-product.jpg';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path starting with /uploads, make it absolute
    if (imagePath.startsWith('/uploads')) {
      return `http://localhost:4000${imagePath}`;
    }
    
    return imagePath;
  };

  const imageUrl = getImageUrl(product.image);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value ?? 0);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
        stroke={i < rating ? "#F59E0B" : "#D1D5DB"}
        strokeWidth="1.5"
        className="transition-colors duration-200"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.902 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z" />
      </svg>
    ));
  };

  // Fallback image component
  const renderImage = () => {
    if (imageError) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Product Image</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          priority={false}
          unoptimized={true} // Bypass Next.js image optimization
        />
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
      </>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
    >
      <Link
        href={`/shop/${product.id}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
      >
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gray-50">
          <div 
            ref={imageWrapperRef} 
            className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700"
          >
            {renderImage()}
          </div>

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-red-500 text-white px-3 py-1.5 text-sm font-bold rounded-full shadow-lg">
                -{discount}%
              </span>
            </div>
          )}

          {/* Stock Status */}
          <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1.5 text-sm font-semibold rounded-full shadow-lg ${
              inStock 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-500 text-white'
            }`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Vendor Badge with Verification */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
            <span className="bg-black/80 text-white px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1 max-w-fit">
              {vendor}
              {isVerifiedPartner && (
                <svg 
                  className="w-3 h-3 text-blue-400 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  title="Verified Partner"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            
            {isVerifiedPartner && (
              <span className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1 max-w-fit shadow-lg">
                <svg 
                  className="w-3 h-3 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Partner
              </span>
            )}
          </div>

          {/* Hover Overlay with Actions */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
              >
                <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(
                        new CustomEvent("openQuickView", { detail: product })
                      );
                    }}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Quick view"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </motion.button>

                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(
                        new CustomEvent("wishlistToggle", { detail: product })
                      );
                    }}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({reviews})</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            disabled={!inStock || added}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              !inStock
                ? 'bg-gray-400 cursor-not-allowed'
                : added
                ? 'bg-green-500 cursor-default'
                : 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {!inStock ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Out of Stock
              </>
            ) : added ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </>
            )}
          </motion.button>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              2-Year Warranty
            </div>
          </div>
        </div>
      </Link>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-green-500/90 backdrop-blur-sm z-30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-white text-center"
            >
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xl font-semibold">Added to Cart!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
