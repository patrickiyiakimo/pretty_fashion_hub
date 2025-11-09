"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { allProducts } from "@/common/ProductsContainer";

export default function ProductPage({ params: paramsPromise }) {
  // Unwrap params with React.use()
  const params = React.use(paramsPromise);
  const productId = parseInt(params.id);

  const product = allProducts.find((p) => p.id === productId);

  if (!product)
    return (
      <p className="text-center py-20 text-gray-400 text-xl font-medium">
        Product not found
      </p>
    );

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="py-40 px-3 md:px-12 text-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 items-start">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/90"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            priority
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold font-oswald text-purple-400 mb-3 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="capitalize">{product.category}</span>
              <span>•</span>
              <span>By {product.vendorName ?? "Partner Store"}</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-3xl md:text-4xl font-bold text-yellow-300">
              ₦{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="line-through text-gray-500 text-xl">
                ₦{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 text-purple-900 px-8 py-4 font-semibold shadow-lg hover:brightness-105 transition-all"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("addToCart", { detail: product }));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-28">
          <h2 className="text-3xl md:text-4xl font-extrabold font-satisfy text-yellow-400 mb-10 text-center">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="group relative bg-gradient-to-b from-gray-800/80 to-gray-900/90 rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all"
              >
                <Link href={`/shop/${item.id}`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold font-oswald text-yellow-300 mb-2">
                      {item.name}
                    </h3>
                    <span className="text-yellow-400 font-bold text-lg">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
