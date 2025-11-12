"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiSparkles, HiShoppingBag, HiChatAlt2, HiArrowRight, HiShieldCheck, HiTruck, HiStar } from "react-icons/hi";

export default function CTASection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.9),rgba(255,255,255,0.9)),linear-gradient(90deg,#f1f5f9_1px,transparent_1px),linear-gradient(#f1f5f9_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Premium CTA Card with Glass Morphism */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-white/60">
            {/* Premium Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/30" />
            
            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600/5 to-transparent rounded-br-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-600/5 to-transparent rounded-tl-3xl" />

            <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-24 lg:px-20 lg:py-28">
              <div className="text-center max-w-5xl mx-auto">
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 rounded-2xl px-6 py-3 mb-12 backdrop-blur-sm shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <HiSparkles className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                      Exclusive Access
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-blue-300 rounded-full" />
                  <span className="text-sm font-medium text-blue-600">
                    Limited Availability
                  </span>
                </motion.div>

                {/* Master Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    Elevate Your
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Personal Legacy
                    </span>
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto" />
                </motion.div>

                {/* Sophisticated Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                >
                  Where exceptional craftsmanship meets timeless elegance. 
                  Join the discerning individuals who choose quality that transcends trends.
                </motion.p>

                {/* Premium Value Propositions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                  {[
                    { 
                      icon: <HiShieldCheck className="w-6 h-6" />, 
                      title: "Quality Assured", 
                      description: "Rigorous quality standards" 
                    },
                    { 
                      icon: <HiTruck className="w-6 h-6" />, 
                      title: "White Glove Delivery", 
                      description: "Premium packaging & handling" 
                    },
                    { 
                      icon: <HiStar className="w-6 h-6" />, 
                      title: "Personal Concierge", 
                      description: "Dedicated style consultation" 
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Premium CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
                >
                  {/* Primary Action */}
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 min-w-[240px] justify-center overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <HiShoppingBag className="w-6 h-6 relative z-10" />
                      <span className="relative z-10 text-lg">Explore Collection</span>
                      <HiArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>

                  {/* Secondary Action */}
                  <Link href="/consultation">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative bg-white text-gray-900 font-semibold px-12 py-5 rounded-2xl border-2 border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 min-w-[240px] justify-center backdrop-blur-sm"
                    >
                      <HiChatAlt2 className="w-6 h-6" />
                      <span>Book Consultation</span>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Elite Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="border-t border-gray-200/60 pt-12"
                >
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-2xl mx-auto">
                    {/* Client Avatars */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-lg" />
                        ))}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">15K+ Elite Clients</div>
                        <div className="text-sm text-gray-500">Trusted by professionals worldwide</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <HiStar key={star} className="w-5 h-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">4.9/5 Rating</div>
                        <div className="text-sm text-gray-500">Exceptional service</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating Premium Elements */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center"
          >
            <HiSparkles className="w-6 h-6 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-8 -left-8 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}