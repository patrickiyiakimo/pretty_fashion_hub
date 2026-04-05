"use client";

import { 
  HiSparkles, 
  HiHeart, 
  HiStar,
  HiShoppingBag,
  HiShieldCheck,
  HiTruck,
  HiCurrencyDollar,
  HiUsers,
  HiShoppingCart,
  HiClock,
  HiBadgeCheck,
  HiArrowRight
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
      icon: <HiStar className="w-5 h-5" />
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center font-oswald gap-2 bg-orange-50 rounded-full px-4 py-2">
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
          className="text-center mb-8 font-oswald"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Nigeria's Premier
            <span className="block text-orange-600">
              Online Marketplace
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connecting trusted sellers with savvy shoppers across Nigeria for a seamless shopping experience
          </p>
        </motion.div>

        {/* Brand Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 font-grotesk"
        >
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-6">
            <span className="font-semibold text-orange-600">Vefiri</span> is more than just an online marketplace — 
            we're creating a trusted ecosystem where <span className="text-blue-600 font-medium">quality meets convenience</span>.
          </p>

          <div className="bg-orange-50 rounded-2xl p-8 border-l-4 border-orange-500 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              "We believe in empowering local businesses while providing shoppers with a curated selection of 
              authentic products. Every transaction is backed by our commitment to quality and customer satisfaction."
            </p>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed text-center">
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
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 font-oswald"
        >
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 font-oswald"
        >
          {marketplaceFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
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
          className="flex flex-wrap justify-center gap-4 mb-16 font-oswald"
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200"
            >
              <span className="text-orange-500">{badge.icon}</span>
              <span className="text-sm text-gray-600">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}