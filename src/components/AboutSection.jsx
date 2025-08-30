"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-purple-50 via-purple-100 to-white overflow-hidden"
    >
      {/* Floating Decorative Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-satisfy font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 mb-6">
            About Pretty Fashion Hub
          </h2>

          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 space-y-4">
            <p className="text-gray-800 text-lg leading-relaxed">
              At <span className="font-semibold">Pretty Fashion Hub</span>, fashion is more than clothing — it's a statement of your personality.
              Our curated collections merge elegance, trendiness, and timeless style to make you stand out effortlessly.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed">
              From luxurious evening gowns to chic everyday wear, each piece is carefully handpicked for quality, style, and sophistication.
              Elevate your wardrobe with fashion that speaks to your individuality and confidence.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 relative w-full h-96 rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <Image
              src="/images/hand-bag-1.webp"
              alt="About Pretty Fashion Hub"
              fill
              className="object-cover w-full h-full"
            />
          </div>

          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-yellow-200/10 via-pink-200/10 to-transparent opacity-60 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
