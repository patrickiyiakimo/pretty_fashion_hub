// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { HiArrowRight, HiShoppingBag, HiStar, HiUsers } from "react-icons/hi";
// import { motion } from "framer-motion";

// const marketplaceCollections = [
//   {
//     id: 1,
//     title: "Premium Footwear District",
//     description: "Multiple trusted sellers offering handcrafted premium shoes, from luxury brands to affordable everyday wear.",
//     image: "/images/shoe-1.webp",
//     priceRange: "₦15,000 - ₦250,000",
//     sellers: "24 Verified Sellers",
//     rating: 4.9,
//     reviews: 1.2,
//     href: "/marketplace/footwear",
//     categories: ["Sneakers", "Formal", "Sandals", "Boots"]
//   },
//   {
//     id: 2,
//     title: "Executive Wear Hub",
//     description: "A curated collection of business attire from independent designers and established brands across Nigeria.",
//     image: "/images/shoe-2.jpg",
//     priceRange: "₦25,000 - ₦450,000",
//     sellers: "18 Premium Vendors",
//     rating: 4.8,
//     reviews: 894,
//     href: "/marketplace/executive",
//     categories: ["Suits", "Blazers", "Dress Shirts", "Ties"]
//   },
//   {
//     id: 3,
//     title: "Urban Streetwear Market",
//     description: "The largest collection of streetwear brands in one marketplace. Shop from emerging designers and established urban labels.",
//     image: "/images/shoe-3.jpg",
//     priceRange: "₦8,000 - ₦85,000",
//     sellers: "42 Independent Brands",
//     rating: 4.7,
//     reviews: 2.1,
//     href: "/marketplace/streetwear",
//     categories: ["Hoodies", "Joggers", "T-shirts", "Jackets"]
//   },
//   {
//     id: 4,
//     title: "Evening & Formal Collective",
//     description: "Multiple designers showcasing their finest evening wear. Compare styles, prices, and quality from different creators.",
//     image: "/images/man-shoe-4.jpg",
//     priceRange: "₦35,000 - ₦1.2M",
//     sellers: "15 Luxury Designers",
//     rating: 4.9,
//     reviews: 687,
//     href: "/marketplace/formal",
//     categories: ["Tuxedos", "Agbadas", "Senator styles", "Kaftans"]
//   },
//   {
//     id: 5,
//     title: "Casual Wear Marketplace",
//     description: "Everyday essentials from multiple vendors. Compare prices, read reviews, and find the best deals from trusted sellers.",
//     image: "/images/man-shoe-2.jpg",
//     priceRange: "₦5,000 - ₦45,000",
//     sellers: "56 Local Vendors",
//     rating: 4.6,
//     reviews: 3.4,
//     href: "/marketplace/casual",
//     categories: ["Polo shirts", "Jeans", "Shorts", "Activewear"]
//   },
//   {
//     id: 6,
//     title: "Accessories & Finishing",
//     description: "A marketplace of accessory creators. From premium watches to handcrafted leather goods, all in one place.",
//     image: "/images/man-shoe-3.jpg",
//     priceRange: "₦3,000 - ₦150,000",
//     sellers: "38 Artisans & Brands",
//     rating: 4.8,
//     reviews: 2.8,
//     href: "/marketplace/accessories",
//     categories: ["Watches", "Bags", "Belts", "Jewelry"]
//   }
// ];

// const stats = [
//   { number: "250+", label: "Verified Sellers" },
//   { number: "5K+", label: "Unique Products" },
//   { number: "15+", label: "Product Categories" },
//   { number: "98%", label: "Customer Satisfaction" }
// ];

// export default function MarketplaceCollections() {
//   return (
//     <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 font-oswald"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             Shop from{" "}
//             <span className="text-orange-600">Hundreds of Sellers</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Discover products from verified sellers across Nigeria. Compare, choose, and shop with confidence.
//           </p>
//         </motion.div>

//         {/* Stats */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 font-oswald"
//         >
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//               <div className="text-sm text-gray-500">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Collections Grid */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-2 font-oswald lg:grid-cols-3 gap-8"
//         >
//           {marketplaceCollections.map((collection, index) => (
//             <motion.div
//               key={collection.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group"
//             >
//               {/* <Link href={collection.href}> */}
//                 <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-100">
//                   <Image
//                     src={collection.image}
//                     alt={collection.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   {/* Simple overlay on hover */}
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
//                 </div>
                
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
//                       {collection.title}
//                     </h3>
//                     <div className="flex items-center gap-1">
//                       <HiStar className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-medium text-gray-700">{collection.rating}</span>
//                     </div>
//                   </div>
                  
//                   <p className="text-sm text-gray-500">{collection.sellers}</p>
//                   <p className="text-gray-600 line-clamp-2">{collection.description}</p>
                  
//                   <div className="flex flex-wrap gap-2 pt-2">
//                     {collection.categories.slice(0, 3).map((category, i) => (
//                       <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                         {category}
//                       </span>
//                     ))}
//                   </div>
                  
//                   <div className="pt-3">
//                     <span className="text-lg font-bold text-orange-600">{collection.priceRange}</span>
//                   </div>
//                 </div>
//               {/* </Link> */}
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Simple CTA Section */}
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8 font-grotesk w-full max-w-4xl mx-auto px-4"
//           >
//             {/* Start Shopping Section */}
//             <div className="flex flex-col items-center gap-4 sm:flex-1">
//               <Image 
//                 src="/images/Successful purchase-cuate.png" 
//                 alt="Successful shopping experience" 
//                 width={200}
//                 height={200}
//                 className="w-full max-w-[200px] h-auto"
//               />
//               <Link href="/shop" className="w-full">
//                 <button className="w-full whitespace-nowrap inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-500 hover:to-orange-600 duration-300 shadow-lg hover:shadow-xl">
//                   <HiShoppingBag className="w-5 h-5" />
//                   Start Shopping
//                 </button>
//               </Link>
//             </div>

//             {/* Become a Seller Section */}
//             <div className="flex flex-col items-center gap-4 sm:flex-1">
//               <Image 
//                 src="/images/In no time-amico.png" 
//                 alt="Become a seller quickly" 
//                 width={200}
//                 height={200}
//                 className="w-full max-w-[200px] h-auto"
//               />
//               <Link href="/partner" className="w-full">
//                 <button className="w-full whitespace-nowrap inline-flex items-center justify-center gap-3 border-2 border-orange-200 bg-white/80 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all duration-300 backdrop-blur-sm">
//                   <HiUsers className="w-5 h-5" />
//                   Become a Seller
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//       </div>
//     </section>
//   );
// }





"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiShoppingBag, HiStar, HiUsers } from "react-icons/hi";
import { motion } from "framer-motion";

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
    href: "/marketplace/footwear",
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
    href: "/marketplace/executive",
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
    href: "/marketplace/streetwear",
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
    href: "/marketplace/formal",
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
    href: "/marketplace/casual",
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
    href: "/marketplace/accessories",
    categories: ["Watches", "Bags", "Belts", "Jewelry"]
  }
];

const stats = [
  { number: "250+", label: "Verified Sellers" },
  { number: "5K+", label: "Unique Products" },
  { number: "15+", label: "Product Categories" },
  { number: "98%", label: "Customer Satisfaction" }
];

export default function MarketplaceCollections() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 font-oswald"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Shop from{" "}
            <span className="text-orange-600">Hundreds of Sellers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover products from verified sellers across Nigeria. Compare, choose, and shop with confidence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 font-oswald"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Collections Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 font-oswald lg:grid-cols-3 gap-8"
        >
          {marketplaceCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {collection.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{collection.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">{collection.sellers}</p>
                <p className="text-gray-600 line-clamp-2">{collection.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {collection.categories.slice(0, 3).map((category, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
                
                <div className="pt-3">
                  <span className="text-lg font-bold text-orange-600">{collection.priceRange}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - ENLARGED IMAGES TO TAKE FULL WIDTH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 justify-center items-stretch pt-16 font-grotesk w-full mx-auto"
        >
          {/* Start Shopping Section */}
          <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center h-full">
              <div className="w-full max-w-xs mx-auto mb-6">
                <Image 
                  src="/images/Successful purchase-cuate.png" 
                  alt="Successful shopping experience" 
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Ready to Shop?</h3>
              <p className="text-gray-600 text-center mb-6">
                Discover quality products from thousands of trusted sellers
              </p>
              <Link href="/shop" className="w-full mt-auto">
                <button className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold px-6 py-4 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <HiShoppingBag className="w-5 h-5" />
                  Start Shopping
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Become a Seller Section */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center h-full">
              <div className="w-full max-w-xs mx-auto mb-6">
                <Image 
                  src="/images/In no time-amico.png" 
                  alt="Become a seller quickly" 
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Join Our Marketplace</h3>
              <p className="text-gray-600 text-center mb-6">
                Reach thousands of customers and grow your business with us
              </p>
              <Link href="/partner" className="w-full mt-auto">
                <button className="w-full inline-flex items-center justify-center gap-3 border-2 border-blue-600 bg-white text-blue-600 font-semibold px-6 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <HiUsers className="w-5 h-5" />
                  Become a Seller
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}