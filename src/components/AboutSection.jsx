"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiSparkles, HiTrendingUp, HiHeart, HiStar } from "react-icons/hi";

export default function AboutSection() {
  const values = [
    {
      icon: <HiSparkles className="w-6 h-6" />,
      title: "Self Rediscovery",
      description: "Helping you reconnect with your inner strength and authentic self"
    },
    {
      icon: <HiTrendingUp className="w-6 h-6" />,
      title: "Continuous Growth",
      description: "Embracing the journey of becoming better every single day"
    },
    {
      icon: <HiHeart className="w-6 h-6" />,
      title: "Purpose Driven",
      description: "Transforming personal experiences into meaningful fashion"
    },
    {
      icon: <HiStar className="w-6 h-6" />,
      title: "Premium Excellence",
      description: "Quality that reflects the standard of your personal evolution"
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-pulse-slow delay-500" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-square relative">
                <Image
                  src="/images/shirt-man-1.jpg"
                  alt="Kingz Styles - Journey of Transformation"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3K+</div>
                  <div className="text-sm text-gray-600">Lives Transformed</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl rotate-12 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl -rotate-12 -z-10" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                Our Journey
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              More Than Fashion.
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                A Movement.
              </span>
            </h2>

            {/* Brand Story */}
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">Kingz Styles</span> was born from a deeply personal 
                journey of <span className="text-purple-600 font-medium">rebuilding self-trust</span>, rediscovering 
                confidence, and embracing disciplined growth. This isn't just a brand—it's the embodiment of 
                transformation.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-500">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  "Every design tells a story of rising, evolving, and choosing the life you were created for. 
                  It's about becoming better than who you were yesterday — mentally, emotionally, and personally."
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                We transform personal experiences into purposeful fashion, creating pieces that don't just dress 
                your body but <span className="font-semibold text-gray-900">empower your spirit</span>. Each 
                collection reflects the journey from pain to purpose, from doubt to determination.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-purple-200 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-purple-700 font-semibold px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <HiSparkles className="w-5 h-5" />
                Join the Movement
              </button>
              <button className="inline-flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 backdrop-blur-sm">
                Our Story
              </button>
            </div> */}
          </motion.div>
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200"
        >
          {[
            { number: "5K+", label: "Community Members" },
            { number: "2K+", label: "Products Sold" },
            { number: "98%", label: "Happy Customers" },
            { number: "50+", label: "Collections" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}