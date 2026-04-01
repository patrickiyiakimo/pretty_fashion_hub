"use client";

import { 
  HiSparkles, 
  HiTrendingUp, 
  HiHeart, 
  HiStar,
  HiShoppingBag,
  HiShieldCheck,
  HiTruck,
  HiCurrencyDollar,
  HiUsers,
  HiShoppingCart,
  HiClock,
  HiBadgeCheck
} from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  const values = [
    {
      icon: <HiShoppingBag className="w-6 h-6" />,
      title: "Curated Marketplace",
      description: "Handpicked products from trusted sellers across Nigeria"
    },
    {
      icon: <HiShieldCheck className="w-6 h-6" />,
      title: "Verified Sellers",
      description: "Every vendor undergoes rigorous verification for your safety"
    },
    {
      icon: <HiTruck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Reliable logistics network ensuring timely doorstep delivery"
    },
    {
      icon: <HiCurrencyDollar className="w-6 h-6" />,
      title: "Best Prices",
      description: "Competitive pricing with exclusive deals and discounts"
    }
  ];

  const marketplaceFeatures = [
    {
      number: "500+",
      label: "Active Sellers",
      icon: <HiUsers className="w-5 h-5" />
    },
    {
      number: "10K+",
      label: "Products Listed",
      icon: <HiShoppingCart className="w-5 h-5" />
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: <HiHeart className="w-5 h-5" />
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: <HiClock className="w-5 h-5" />
    }
  ];

  const trustBadges = [
    { icon: <HiShieldCheck className="w-5 h-5" />, label: "Secure Payments" },
    { icon: <HiTruck className="w-5 h-5" />, label: "Free Delivery on Orders ₦50,000+" },
    { icon: <HiHeart className="w-5 h-5" />, label: "30-Day Returns" },
    { icon: <HiBadgeCheck className="w-5 h-5" />, label: "Verified Vendors" }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-orange-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/10 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="relative max-w-7xl mx-auto">
        {/* Content Section - Full Width without Image */}
        <div className="space-y-12">
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2">
              <HiSparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                About Vefiri
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center font-oswald"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Nigeria's Premier
              <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                Online Marketplace
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Connecting trusted sellers with savvy shoppers across Nigeria for a seamless shopping experience
            </p>
          </motion.div>

          {/* Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <p className="text-xl font-grotesk text-gray-600 leading-relaxed text-center">
              <span className="font-semibold text-orange-600">Vefiri</span> is more than just an online marketplace — 
              we're creating a trusted ecosystem where <span className="text-blue-600 font-medium">quality meets convenience</span>.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8 border-l-4 border-orange-500">
              <p className="text-lg text-gray-700 italic leading-relaxed text-center">
                "We believe in empowering local businesses while providing shoppers with a curated selection of 
                authentic products. Every transaction is backed by our commitment to quality and customer satisfaction."
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-grotesk text-center">
              Whether you're looking for the latest fashion trends, electronics, home essentials, or unique gifts, 
              Vefiri brings you a curated selection from <span className="font-semibold text-gray-900">Nigeria's best vendors</span>. 
              We're building a community where local businesses thrive and shoppers find exactly what they need.
            </p>
          </motion.div>

          {/* Core Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 font-oswald"
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">{value.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Marketplace Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 font-grotesk"
          >
            {marketplaceFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-100 to-blue-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <div className="text-orange-600 text-2xl">{feature.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {feature.number}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {feature.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 pt-8 pb-4"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 hover:border-orange-200 transition-all duration-300"
              >
                <span className="text-orange-500">{badge.icon}</span>
                <span className="text-sm text-gray-600">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 font-grotesk"
          >
            <Link href="/shop">
            <button className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-orange-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <HiShoppingBag className="w-5 h-5" />
              Start Shopping
            </button>
            </Link>
            <Link href="/partner">
            <button className="inline-flex items-center justify-center gap-3 border-2 border-orange-200 bg-white/80 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all duration-300 backdrop-blur-sm">
              <HiUsers className="w-5 h-5" />
              Become a Seller
            </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}