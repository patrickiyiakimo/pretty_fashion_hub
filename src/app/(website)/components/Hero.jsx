// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const slides = [
//   {
//     id: 1,
//     title: "Elevate Your Style",
//     highlight: "Premium Collection",
//     description: "Discover curated fashion pieces that blend timeless elegance with contemporary trends. Experience luxury redefined.",
//     image: "/images/man-shoe-4.jpg",
//     cta: "Shop Now",
//     badge: "New Arrivals",
//     color: "from-blue-600/20 to-purple-600/20"
//   },
//   {
//     id: 2,
//     title: "Start Your Fashion Journey",
//     highlight: "Become a Seller",
//     description: "Join our marketplace and showcase your creations to thousands of style enthusiasts. Build your brand with us.",
//     image: "/images/man-shoe-2.jpg",
//     cta: "Start Selling",
//     badge: "Partner Program",
//     color: "from-emerald-600/20 to-cyan-600/20"
//   },
//   {
//     id: 3,
//     title: "Where Style Meets",
//     highlight: "Cultural Heritage",
//     description: "Celebrate African craftsmanship with modern luxury. Each piece tells a story of tradition and innovation.",
//     image: "/images/man-shoe-3.jpg",
//     cta: "Explore Collection",
//     badge: "Limited Edition",
//     color: "from-amber-600/20 to-orange-600/20"
//   },
// ];

// export default function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const slide = slides[currentSlide];

//   return (
//     <section className="relative h-screen min-h-[800px] lg:max-h-[50vh] 2xl:max-h-[60vh] overflow-hidden">
//       {/* Background Slides */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={slide.id}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.1 }}
//           transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className="absolute inset-0"
//         >
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <Image
//               src={slide.image}
//               alt={slide.title}
//               fill
//               priority
//               className="object-cover object-center"
//               quality={100}
//             />
//           </div>

//           {/* Gradient Overlay */}
//           <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} via-black/40`} />
          
//           {/* Additional Dark Overlay for Better Text Readability */}
//           <div className="absolute inset-0 bg-black/30" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
//         aria-label="Previous slide"
//       >
//         <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
//         aria-label="Next slide"
//       >
//         <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Content Container */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="max-w-2xl">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={slide.id}
//                 initial={{ opacity: 0, y: 60 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -60 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="space-y-6"
//               >
//                 {/* Badge */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
//                 >
//                   <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
//                   <span className="text-sm font-semibold text-white tracking-wide">
//                     {slide.badge}
//                   </span>
//                 </motion.div>

//                 {/* Title - Adjusted for smaller screens */}
//                 <div className="space-y-4">
//                   <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
//                     {slide.title}
//                     <br />
//                     <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
//                       {slide.highlight}
//                     </span>
//                   </h1>
                  
//                   {/* Description - Adjusted for smaller screens */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-lg"
//                   >
//                     {slide.description}
//                   </motion.p>
//                 </div>

//                 {/* CTA Buttons */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex flex-col sm:flex-row gap-4 pt-4"
//                 >
//                   <Link href={slide.cta === "Shop Now" ? "/shop" : "/partner"}>
//                     <button className="group relative bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 hover:from-yellow-300 hover:to-amber-400">
//                       <span className="relative z-10">{slide.cta}</span>
//                       <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
//                     </button>
//                   </Link>
//                 </motion.div>

//                 {/* Additional Info - Hide on very large screens if needed */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8 }}
//                   className="flex items-center gap-6 pt-8 text-sm text-gray-300 lg:flex"
//                 >
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     Free Shipping Nationwide
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     Secure Payment
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentSlide === idx
//                 ? 'bg-yellow-400 w-8'
//                 : 'bg-white/50 hover:bg-white/80'
//             }`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Marketplace Trust",
    highlight: "Verified Vendors Only",
    description: "Connect with 1,000+ verified sellers. Every vendor undergoes rigorous verification to ensure you get authentic products from trusted sources.",
    image: "/images/man-shoe-4.jpg",
    cta: "Explore Vendors",
    badge: "Trusted Marketplace",
    color: "from-blue-600/20 to-purple-600/20",
    stats: {
      vendors: "1,200+",
      ratings: "4.9",
      protected: "100%"
    }
  },
  {
    id: 2,
    title: "Join Our Community",
    highlight: "Start Selling Today",
    description: "Become a verified vendor and reach thousands of buyers. Get featured, build your reputation, and grow your business with our trusted platform.",
    image: "/images/man-shoe-2.jpg",
    cta: "Become a Vendor",
    badge: "Vendor Program",
    color: "from-emerald-600/20 to-cyan-600/20",
    stats: {
      vendors: "2,500+",
      ratings: "4.8",
      protected: "100%"
    }
  },
  {
    id: 3,
    title: "Shop With Confidence",
    highlight: "100% Buyer Protection",
    description: "Every purchase is protected. Get refunds, dispute resolution, and authentic products guaranteed by our comprehensive buyer protection program.",
    image: "/images/man-shoe-3.jpg",
    cta: "Learn More",
    badge: "Protected",
    color: "from-amber-600/20 to-orange-600/20",
    stats: {
      vendors: "3,000+",
      ratings: "4.9",
      protected: "100%"
    }
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[800px] lg:max-h-[50vh] 2xl:max-h-[60vh] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center"
              quality={100}
            />
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} via-black/40`} />
          
          {/* Additional Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Marketplace Trust Badge Row */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V10c0 4.418 3.422 8 7 8s7-3.582 7-8V4.517c0-1.103-.806-2.068-1.93-2.207A49.2 49.2 0 0010 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">
                      {slide.badge}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">
                      Verified Badge
                    </span>
                  </div>
                </motion.div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    {slide.title}
                    <br />
                    <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                      {slide.highlight}
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl"
                  >
                    {slide.description}
                  </motion.p>
                </div>

                {/* Marketplace Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-4 max-w-2xl pt-4"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white font-bold text-lg">{slide.stats.ratings}</span>
                    </div>
                    <p className="text-xs text-gray-300">Avg Vendor Rating</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
                    <div className="text-white font-bold text-lg mb-1">{slide.stats.vendors}</div>
                    <p className="text-xs text-gray-300">Trusted Vendors</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-bold text-lg">{slide.stats.protected}</span>
                    </div>
                    <p className="text-xs text-gray-300">Buyer Protection</p>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link href={slide.cta === "Explore Vendors" ? "/vendors" : slide.cta === "Become a Vendor" ? "/become-vendor" : "/protection"}>
                    <button className="group relative bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 hover:from-yellow-300 hover:to-amber-400">
                      <span className="relative z-10 flex items-center gap-2">
                        {slide.cta}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </button>
                  </Link>
                  
                  {/* <Link href="/how-it-works">
                    <button className="group border-2 border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/20 transition-all duration-300 hover:border-white/50">
                      How It Works
                    </button>
                  </Link> */}
                </motion.div>

                {/* Marketplace Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap items-center gap-6 pt-8 text-sm text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Vendor Verification Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Authenticity Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Secure Escrow Payments</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? 'bg-yellow-400 w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}