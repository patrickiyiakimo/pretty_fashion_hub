"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Sophia Adebayo",
    role: "Fashion Director",
    company: "Vogue Nigeria",
    message: "Vefiri has completely redefined luxury fashion in Nigeria. Every piece tells a story of sophistication and attention to detail that's truly remarkable. The quality exceeds international standards while celebrating our rich cultural heritage.",
    rating: 5,
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Olivia Martins",
    role: "Lifestyle Influencer",
    company: "Style & Class",
    message: "As a content creator, I'm constantly searching for brands that offer both style and substance. Vefiri delivers exceptional quality that photographs beautifully and wears even better. Their customer service is as premium as their products.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 3,
    name: "Amaka Eze",
    role: "Tech Entrepreneur",
    company: "Innovate Africa",
    message: "The perfect fusion of contemporary design and traditional craftsmanship. I wear Vefiri to important meetings and consistently receive compliments. It's more than fashion—it's a statement of excellence and cultural pride.",
    rating: 5,
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: "David Chen",
    role: "Creative Director",
    company: "Global Brands Ltd",
    message: "Working with Vefiri has been exceptional. Their commitment to quality and innovative designs sets them apart in the fashion industry. Each collection tells a unique story that resonates with modern consumers.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 5,
    name: "Chiamaka Nwosu",
    role: "Business Executive",
    company: "Fortune 500 Company",
    message: "The attention to detail in every Vefiri piece is extraordinary. From fabric selection to finishing, they demonstrate what true luxury means. My wardrobe has been transformed since discovering this brand.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 6,
    name: "Kunle Adeyemi",
    role: "Fashion Photographer",
    company: "Lens Culture",
    message: "Photographing Vefiri collections is always a pleasure. The garments have incredible texture, movement, and presence that translate beautifully through the lens. A brand that understands visual storytelling.",
    rating: 5,
    verified: true,
    featured: true
  }
];

const stats = [
  { number: "10,000+", label: "Happy Customers" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "98%", label: "Recommend Us" },
  { number: "50+", label: "Countries Served" }
];

export default function Testimonials() {
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-orange-500 fill-current" : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white font-oswald">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by fashion enthusiasts and industry leaders across the globe
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                {/* Quote Icon */}
                <div className="mb-6">
                  <FaQuoteLeft className="w-8 h-8 text-orange-600/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  {testimonial.verified && (
                    <span className="text-xs text-orange-600 ml-2">Verified</span>
                  )}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{testimonial.message}"
                </blockquote>

                {/* Client Info */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="font-semibold text-gray-900 text-lg mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Regular Testimonials Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {regularTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.05) }}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 h-full">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-600 leading-relaxed mb-6 text-sm">
                  "{testimonial.message}"
                </blockquote>

                {/* Client Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-medium text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-blue-500 text-white rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing Community
            </h3>
            <p className="mb-8 max-w-2xl mx-auto">
              Experience the difference that thousands of satisfied customers trust
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="w-full sm:w-auto">
              <button className="w-full bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Shop Now
              </button>
            </Link>
            <button className="border-2 border-gray-300 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition-colors">
              Read More Reviews
            </button>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}