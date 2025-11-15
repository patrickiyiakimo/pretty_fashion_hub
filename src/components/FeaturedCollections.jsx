"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiStar, HiClock, HiShoppingBag } from "react-icons/hi";

// Sample collections data with enhanced information
const featuredCollections = [
  {
    id: 1,
    title: "Luxury Footwear",
    description: "Handcrafted premium shoes combining traditional artistry with contemporary design for the modern gentleman.",
    image: "/images/shoe-1.webp",
    price: "From ₦45,000",
    items: "24 Products",
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    gradient: "from-blue-500/20 to-purple-600/20",
    href: "/collections/luxury-footwear"
  },
  {
    id: 2,
    title: "Executive Wear",
    description: "Sophisticated business attire that commands respect and reflects your professional excellence.",
    image: "/images/shoe-2.jpg",
    price: "From ₦32,000",
    items: "18 Products",
    rating: 4.8,
    reviews: 94,
    badge: "New",
    gradient: "from-emerald-500/20 to-cyan-600/20",
    href: "/collections/executive-wear"
  },
  {
    id: 3,
    title: "Urban Streetwear",
    description: "Bold, expressive street fashion that merges urban culture with premium craftsmanship.",
    image: "/images/shoe-3.jpg",
    price: "From ₦28,000",
    items: "32 Products",
    rating: 4.7,
    reviews: 156,
    badge: "Trending",
    gradient: "from-orange-500/20 to-red-600/20",
    href: "/collections/urban-streetwear"
  },
  {
    id: 4,
    title: "Evening Elegance",
    description: "Stunning formal wear for special occasions, designed to make you stand out with grace and style.",
    image: "/images/man-shoe-4.jpg",
    price: "From ₦65,000",
    items: "15 Products",
    rating: 4.9,
    reviews: 87,
    badge: "Luxury",
    gradient: "from-purple-500/20 to-pink-600/20",
    href: "/collections/evening-elegance"
  },
  {
    id: 5,
    title: "Casual Comfort",
    description: "Everyday essentials that don't compromise on style, perfect for your relaxed yet refined lifestyle.",
    image: "/images/man-shoe-2.jpg",
    price: "From ₦18,000",
    items: "28 Products",
    rating: 4.6,
    reviews: 203,
    badge: "Popular",
    gradient: "from-green-500/20 to-teal-600/20",
    href: "/collections/casual-comfort"
  },
  {
    id: 6,
    title: "Accessory Collection",
    description: "Curated accessories that complete your look, from premium watches to elegant leather goods.",
    image: "/images/man-shoe-3.jpg",
    price: "From ₦12,000",
    items: "45 Products",
    rating: 4.8,
    reviews: 167,
    badge: "Essential",
    gradient: "from-amber-500/20 to-yellow-600/20",
    href: "/collections/accessories"
  }
];

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Premium Products" },
  { number: "50+", label: "Designer Brands" },
  { number: "24/7", label: "Customer Support" }
];

export default function FeaturedCollections() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <HiStar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Premium Collections
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Curated{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover handpicked collections that redefine luxury fashion. Each piece is meticulously selected 
            to elevate your style and reflect your unique personality.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuredCollections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    collection.badge === "Bestseller" ? "bg-orange-500 text-white" :
                    collection.badge === "New" ? "bg-green-500 text-white" :
                    collection.badge === "Trending" ? "bg-purple-500 text-white" :
                    collection.badge === "Luxury" ? "bg-yellow-500 text-white" :
                    collection.badge === "Popular" ? "bg-blue-500 text-white" :
                    "bg-gray-500 text-white"
                  }`}>
                    {collection.badge}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <HiShoppingBag className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <HiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{collection.rating}</span>
                        <span className="text-sm text-gray-500">({collection.reviews})</span>
                      </div>
                      <span className="text-sm text-gray-500">{collection.items}</span>
                    </div>
                    <Link
                      href={collection.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Explore Collection
                      <HiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {collection.title}
                  </h3>
                  <span className="text-lg font-bold text-blue-600">{collection.price}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* Features */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <HiClock className="w-4 h-4" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-yellow-400" />
                    <span>Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/10" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Elevate Your Style?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Kingz World for their premium fashion needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <HiShoppingBag className="w-5 h-5" />
                  Explore All Products
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-3 border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  View Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}