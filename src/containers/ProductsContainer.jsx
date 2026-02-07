"use client";
import { useState } from "react";
import { allProducts } from "@/common/ProductsContainer";
import ProductCard from "@/app/(website)/components/ProductCard";

export default function ProductsContainerUI() {
  const [category, setCategory] = useState("All");

  const filteredProducts = category === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === category);

  return (
    <section className="py-16 px-6 md:px-12 bg-white/5 backdrop-blur-sm">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["All", "Bags", "Shoes", "Clothes", "Polo"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full border-2 border-purple-400 font-semibold transition ${
              category === cat ? "bg-purple-500 text-white" : "bg-white/20 text-purple-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
