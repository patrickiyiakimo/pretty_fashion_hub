"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/common/ProductsContainer";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products] = useState(allProducts);

  return (
    <section className="py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm min-h-screen">
      <h1 className="text-4xl font-extrabold text-purple-500 mb-12 text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}
