// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// export default function CTASection() {
//   return (
//     <section className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white py-24 px-6 md:px-12 overflow-hidden rounded-3xl shadow-xl mx-6 md:mx-12">
//       {/* Decorative Circles */}
//       <div className="absolute top-[-40px] left-[-40px] w-36 h-36 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

//       <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         {/* Left - Text */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center md:text-left"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
//             Elevate Your Wardrobe Today
//           </h2>
//           <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
//             Explore Pretty Fashion Hub’s luxurious collections and experience the perfect
//             blend of elegance, trendiness, and sophistication. Your style journey starts here.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link href="/shop">
//               <button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300">
//                 Shop Now
//               </button>
//             </Link>
//             <Link href="/contact">
//               <button className="bg-white/20 mb-10 backdrop-blur-md text-white border border-yellow-300 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-purple-900 transition-all duration-300">
//                 Contact Us
//               </button>
//             </Link>
//           </div>
//         </motion.div>

//         {/* Right - Overlapping Staggered Grid */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative hidden md:grid grid-cols-2 gap-4 md:gap-6 justify-items-center items-center"
//         >
//           <div className="relative w-36 h-52 md:w-44 md:h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 z-30">
//             <Image src="/images/hand-bag-1.webp" alt="Luxury Bag" fill className="object-cover" />
//           </div>
//           <div className="relative w-28 h-40 md:w-32 md:h-52 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -mt-10 md:-mt-16 z-20">
//             <Image src="/images/shoe-1.webp" alt="Luxury Shoes" fill className="object-cover" />
//           </div>
//           <div className="relative w-32 h-44 md:w-36 md:h-56 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -ml-6 md:-ml-12 z-10">
//             <Image src="/images/shoe-2.jpg" alt="Elegant Outfit" fill className="object-cover" />
//           </div>
//           <div className="relative w-40 h-56 md:w-44 md:h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -mt-16 md:-mt-24 z-0">
//             <Image src="/images/man-shoe-2.jpg" alt="Luxury Dress" fill className="object-cover" />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white py-24 px-6 md:px-12 overflow-hidden rounded-3xl shadow-xl mx-6 md:mx-12">
      {/* Decorative Circles */}
      <div className="absolute top-[-40px] left-[-40px] w-36 h-36 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
            Elevate Your Wardrobe Today
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Explore Pretty Fashion Hub’s luxurious collections and experience the perfect
            blend of elegance, trendiness, and sophistication. Your style journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/shop">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300">
                Shop Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white/20 mb-10 backdrop-blur-md text-white border border-yellow-300 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-purple-900 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right - Overlapping Staggered Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative hidden md:grid grid-cols-2 gap-4 md:gap-6 justify-items-center items-center"
        >
          <div className="relative w-36 h-52 md:w-44 md:h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 z-30">
            <Image src="/images/hand-bag-1.webp" alt="Luxury Bag" fill className="object-cover" />
          </div>
          <div className="relative w-28 h-40 md:w-32 md:h-52 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -mt-10 md:-mt-16 z-20">
            <Image src="/images/shoe-1.webp" alt="Luxury Shoes" fill className="object-cover" />
          </div>
          <div className="relative w-32 h-44 md:w-36 md:h-56 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -ml-6 md:-ml-12 z-10">
            <Image src="/images/shoe-2.jpg" alt="Elegant Outfit" fill className="object-cover" />
          </div>
          <div className="relative w-40 h-56 md:w-44 md:h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 -mt-16 md:-mt-24 z-0">
            <Image src="/images/man-shoe-2.jpg" alt="Luxury Dress" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
