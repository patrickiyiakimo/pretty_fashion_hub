"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/common/ProductsContainer";

export default function ProductPage({ params: paramsPromise }) {
  // Unwrap params with React.use()
  const params = React.use(paramsPromise);
  const productId = parseInt(params.id);

  const product = allProducts.find(p => p.id === productId);

  if (!product)
    return (
      <p className="text-center py-20 text-gray-700 text-xl">
        Product not found
      </p>
    );

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Product Image */}
        <div className="relative w-full lg:w-1/2 h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl font-oswald font-extrabold text-purple-500 mb-4">
            {product.name}
          </h1>
          <span className="text-yellow-300 font-bold text-2xl mb-6 block">
            ₦{product.price.toLocaleString()}
          </span>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          {/* <button className="bg-purple-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-purple-600 transition">
            Add to Cart
          </button> */}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-satisfy font-extrabold text-purple-500 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 relative rounded-t-3xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center bg-white/20 backdrop-blur-sm -mt-12 mx-4 rounded-b-3xl shadow-inner">
                  <h3 className="text-lg font-semibold font-oswald text-purple-400">
                    {item.name}
                  </h3>
                  <span className="text-yellow-300 font-bold">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
