"use client";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sophia A.",
    role: "Fashion Enthusiast",
    photo: "/images/profile-image-1.jpg",
    message:
      "Pretty Fashion Hub has completely transformed my wardrobe! Every piece exudes elegance and class.",
  },
  {
    id: 2,
    name: "Olivia M.",
    role: "Lifestyle Blogger",
    photo: "/images/profile-image-2.webp",
    message:
      "I love the attention to detail and the luxurious feel of every outfit. Truly a one-of-a-kind fashion experience.",
  },
  {
    id: 3,
    name: "Amaka E.",
    role: "Entrepreneur",
    photo: "/images/profile-image-3.webp",
    message:
      "The perfect mix of trendiness and sophistication. I get compliments every time I wear their pieces!",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-purple-50 py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-satisfy font-extrabold text-purple-700 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 font-oswald max-w-2xl mx-auto text-3xl md:text-xl">
          Hear from our valued clients who love Pretty Fashion Hub's luxurious and timeless collections.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3 relative z-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gradient-to-tr from-white/80 via-white/60 to-white/70 rounded-3xl shadow-2xl p-8 relative overflow-hidden hover:scale-105 transition-transform duration-500 border border-purple-200"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-purple-200 text-6xl opacity-20 select-none">“</div>

            {/* Testimonial Text */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {testimonial.message}
            </p>

            {/* Client Info */}
            <div className="flex items-center gap-4 mt-6">
              <div className="w-16 h-16 relative rounded-full overflow-hidden shadow-lg border-2 border-yellow-400">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-purple-700 font-bold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
