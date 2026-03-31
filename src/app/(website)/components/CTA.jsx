"use client";
import Link from "next/link";
import { HiSparkles, HiShoppingBag, HiChatAlt2, HiArrowRight, HiShieldCheck, HiTruck, HiStar } from "react-icons/hi";
import { motion } from "framer-motion";

export default function CTASection() {
  const features = [
    { 
      icon: <HiShieldCheck className="w-6 h-6" />, 
      title: "Quality Guaranteed", 
      description: "Every product meets our premium standards" 
    },
    { 
      icon: <HiTruck className="w-6 h-6" />, 
      title: "Fast Delivery", 
      description: "Free shipping on orders over ₦50,000" 
    },
    { 
      icon: <HiStar className="w-6 h-6" />, 
      title: "Trusted by Thousands", 
      description: "Join our community of satisfied customers" 
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white font-oswald overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/30 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-8"
          >
            <HiSparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">
              Limited Time Offer
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Elevate Your Style
              <br />
              <span className="text-orange-600">with Confidence</span>
            </h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto mb-8" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Discover premium products from trusted sellers across Nigeria. 
            Shop with confidence and experience the best in quality and service.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
        >
          <Link href="/shop">
            <button className="group bg-orange-600 text-white font-semibold p-10 py-4 rounded-xl hover:bg-orange-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl">
              <HiShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
              <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href="/consultation">
            <button className="group bg-white text-gray-700 font-semibold p-10 py-4 rounded-xl border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 transition-all duration-300 flex items-center gap-3">
              <HiChatAlt2 className="w-5 h-5" />
              <span>Book Consultation</span>
            </button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-12 border-t border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Customer Count */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">1,000+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar key={star} className="w-5 h-5 text-orange-500 fill-current" />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">4.9/5</div>
                <div className="text-sm text-gray-500">Customer Rating</div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-3">
              <HiShieldCheck className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-semibold text-gray-900 text-lg">100% Secure</div>
                <div className="text-sm text-gray-500">Payment Protection</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}