"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiStar, HiClock, HiUserGroup, HiShieldCheck, HiTruck, HiSparkles, HiMiniStorefront, HiMiniShoppingBag, HiShoppingBag } from "react-icons/hi";
import { HiBuildingStorefront } from "react-icons/hi2";

// Sample marketplace data with vendors and sellers
const marketplaceCollections = [
  {
    id: 1,
    title: "Premium Footwear District",
    description: "Multiple trusted sellers offering handcrafted premium shoes, from luxury brands to affordable everyday wear.",
    image: "/images/shoe-1.webp",
    priceRange: "₦15,000 - ₦250,000",
    sellers: "24 Verified Sellers",
    rating: 4.9,
    reviews: 1.2,
    badge: "Top Rated District",
    gradient: "from-blue-500/20 to-purple-600/20",
    href: "/marketplace/footwear",
    sellerLogos: ["/images/seller-1.jpg", "/images/seller-2.jpg", "/images/seller-3.jpg"],
    featuredSellers: ["Luxury Kicks", "Sole Empire", "Urban Footwear"],
    categories: ["Sneakers", "Formal", "Sandals", "Boots"]
  },
  {
    id: 2,
    title: "Executive Wear Hub",
    description: "A curated collection of business attire from independent designers and established brands across Nigeria.",
    image: "/images/shoe-2.jpg",
    priceRange: "₦25,000 - ₦450,000",
    sellers: "18 Premium Vendors",
    rating: 4.8,
    reviews: 894,
    badge: "Business District",
    gradient: "from-emerald-500/20 to-cyan-600/20",
    href: "/marketplace/executive",
    sellerLogos: ["/images/seller-4.jpg", "/images/seller-5.jpg", "/images/seller-6.jpg"],
    featuredSellers: ["Executive Threads", "Corporate Style", "Boss Moves"],
    categories: ["Suits", "Blazers", "Dress Shirts", "Ties"]
  },
  {
    id: 3,
    title: "Urban Streetwear Market",
    description: "The largest collection of streetwear brands in one marketplace. Shop from emerging designers and established urban labels.",
    image: "/images/shoe-3.jpg",
    priceRange: "₦8,000 - ₦85,000",
    sellers: "42 Independent Brands",
    rating: 4.7,
    reviews: 2.1,
    badge: "Trending Now",
    gradient: "from-orange-500/20 to-red-600/20",
    href: "/marketplace/streetwear",
    sellerLogos: ["/images/seller-7.jpg", "/images/seller-8.jpg", "/images/seller-9.jpg"],
    featuredSellers: ["Street Kings", "Urban Culture", "Hype Beast"],
    categories: ["Hoodies", "Joggers", "T-shirts", "Jackets"]
  },
  {
    id: 4,
    title: "Evening & Formal Collective",
    description: "Multiple designers showcasing their finest evening wear. Compare styles, prices, and quality from different creators.",
    image: "/images/man-shoe-4.jpg",
    priceRange: "₦35,000 - ₦1.2M",
    sellers: "15 Luxury Designers",
    rating: 4.9,
    reviews: 687,
    badge: "Luxury Collective",
    gradient: "from-purple-500/20 to-pink-600/20",
    href: "/marketplace/formal",
    sellerLogos: ["/images/seller-10.jpg", "/images/seller-11.jpg", "/images/seller-12.jpg"],
    featuredSellers: ["Elegance by Design", "Red Carpet Ready", "Formal Affairs"],
    categories: ["Tuxedos", "Agbadas", "Senator styles", "Kaftans"]
  },
  {
    id: 5,
    title: "Casual Wear Marketplace",
    description: "Everyday essentials from multiple vendors. Compare prices, read reviews, and find the best deals from trusted sellers.",
    image: "/images/man-shoe-2.jpg",
    priceRange: "₦5,000 - ₦45,000",
    sellers: "56 Local Vendors",
    rating: 4.6,
    reviews: 3.4,
    badge: "Most Popular",
    gradient: "from-green-500/20 to-teal-600/20",
    href: "/marketplace/casual",
    sellerLogos: ["/images/seller-13.jpg", "/images/seller-14.jpg", "/images/seller-15.jpg"],
    featuredSellers: ["Comfort First", "Daily Basics", "Street Style NG"],
    categories: ["Polo shirts", "Jeans", "Shorts", "Activewear"]
  },
  {
    id: 6,
    title: "Accessories & Finishing",
    description: "A marketplace of accessory creators. From premium watches to handcrafted leather goods, all in one place.",
    image: "/images/man-shoe-3.jpg",
    priceRange: "₦3,000 - ₦150,000",
    sellers: "38 Artisans & Brands",
    rating: 4.8,
    reviews: 2.8,
    badge: "Artisan Hub",
    gradient: "from-amber-500/20 to-yellow-600/20",
    href: "/marketplace/accessories",
    sellerLogos: ["/images/seller-16.jpg", "/images/seller-17.jpg", "/images/seller-18.jpg"],
    featuredSellers: ["Watch Haven", "Leather Masters", "Jewelry Box"],
    categories: ["Watches", "Bags", "Belts", "Jewelry"]
  }
];

const marketplaceStats = [
  { number: "250+", label: "Verified Sellers", icon: HiUserGroup },
  { number: "5K+", label: "Unique Products", icon: HiMiniShoppingBag },
  { number: "15+", label: "Product Categories", icon: HiBuildingStorefront },
  { number: "24/7", label: "Seller Support", icon: HiShieldCheck }
];

const sellerFeatures = [
  {
    icon: HiBuildingStorefront,
    title: "Multi-Vendor Platform",
    description: "Shop from hundreds of independent sellers and brands in one place"
  },
  {
    icon: HiShieldCheck,
    title: "Verified Sellers Only",
    description: "Every seller is vetted and verified for quality and authenticity"
  },
  {
    icon: HiTruck,
    title: "Compare & Choose",
    description: "Compare prices, reviews, and shipping options from different sellers"
  }
];

export default function MarketplaceCollections() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Floating Marketplace Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header - Marketplace Style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <HiBuildingStorefront className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Nigeria's Premier Marketplace
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Shop from{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hundreds of Sellers
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Welcome to Vefiri Marketplace — where multiple vendors, independent designers, and premium brands 
            come together. Compare, choose, and shop with confidence from verified sellers across Nigeria.
          </p>
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {marketplaceStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {/* <stat.icon className="w-8 h-8 text-blue-600" /> */}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Marketplace Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {sellerFeatures.map((feature, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
              {/* <feature.icon className="w-10 h-10 text-blue-600 mb-4" /> */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Marketplace Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {marketplaceCollections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-200"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Marketplace Badge - Multiple Sellers Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                    <HiUserGroup className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">{collection.sellers}</span>
                  </div>
                </div>

                {/* Featured Sellers Preview */}
                <div className="absolute top-4 right-4 z-10 flex -space-x-2">
                  {collection.sellerLogos.slice(0, 3).map((logo, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>

                {/* Hover Content - Seller List */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="text-white w-full">
                    <p className="text-sm font-medium mb-2">Featured Sellers:</p>
                    <div className="space-y-1">
                      {collection.featuredSellers.map((seller, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          <span>{seller}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Marketplace Style */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {collection.title}
                    </h3>
                    <p className="text-sm text-gray-500">{collection.sellers} • {collection.categories.length} categories</p>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* Category Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {collection.categories.slice(0, 3).map((category, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                  {collection.categories.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{collection.categories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price Range & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-500 block">Price Range</span>
                    <span className="text-lg font-bold text-blue-600">{collection.priceRange}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <HiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{collection.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({collection.reviews}k+ reviews)</span>
                  </div>
                </div>

                {/* Shop from Sellers Button */}
                {/* <Link
                  href={`/marketplace/${collection.id}`}
                  className="inline-flex items-center justify-between w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group-hover:shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <HiBuildingStorefront className="w-5 h-5" />
                    Browse {collection.sellers.split(' ')[0]} sellers
                  </span>
                  <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link> */}
              </div>
            </div>
          ))}
        </div>

        {/* Marketplace CTA - Become a Seller */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* For Buyers */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <HiShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Shop Multiple Sellers</h3>
              <p className="text-blue-100 mb-6">
                Compare prices, read reviews, and find the best deals from hundreds of verified sellers.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Start Shopping
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* For Sellers */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <HiBuildingStorefront className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Become a Seller</h3>
              <p className="text-gray-300 mb-6">
                Join our marketplace and reach thousands of customers across Nigeria. Start selling today.
              </p>
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Apply as Seller
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-500">
            <HiShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-sm">Verified Sellers</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <HiSparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm">Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <HiTruck className="w-5 h-5 text-blue-500" />
            <span className="text-sm">Secure Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <HiClock className="w-5 h-5 text-orange-500" />
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}