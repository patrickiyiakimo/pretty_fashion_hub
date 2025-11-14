"use client";

import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const testimonials = [
  {
    id: 1,
    name: "Sophia Adebayo",
    role: "Fashion Director",
    company: "Vogue Nigeria",
    photo: "/images/profile-image-1.jpg",
    message: "Kingz World has completely redefined luxury fashion in Nigeria. Every piece tells a story of sophistication and attention to detail that's truly remarkable. The quality exceeds international standards while celebrating our rich cultural heritage.",
    rating: 5,
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Olivia Martins",
    role: "Lifestyle Influencer",
    company: "Style & Class",
    photo: "/images/profile-image-2.webp",
    message: "As a content creator, I'm constantly searching for brands that offer both style and substance. Kingz World delivers exceptional quality that photographs beautifully and wears even better. Their customer service is as premium as their products.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 3,
    name: "Amaka Eze",
    role: "Tech Entrepreneur",
    company: "Innovate Africa",
    photo: "/images/profile-image-3.webp",
    message: "The perfect fusion of contemporary design and traditional craftsmanship. I wear Kingz World to important meetings and consistently receive compliments. It's more than fashion—it's a statement of excellence and cultural pride.",
    rating: 5,
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: "David Chen",
    role: "Creative Director",
    company: "Global Brands Ltd",
    photo: "/images/profile-4.jpg",
    message: "Working with Kingz World has been exceptional. Their commitment to quality and innovative designs sets them apart in the fashion industry. Each collection tells a unique story that resonates with modern consumers.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 5,
    name: "Chiamaka Nwosu",
    role: "Business Executive",
    company: "Fortune 500 Company",
    photo: "/images/profile-5.jpg",
    message: "The attention to detail in every Kingz World piece is extraordinary. From fabric selection to finishing, they demonstrate what true luxury means. My wardrobe has been transformed since discovering this brand.",
    rating: 5,
    verified: true,
    featured: false
  },
  {
    id: 6,
    name: "Kunle Adeyemi",
    role: "Fashion Photographer",
    company: "Lens Culture",
    photo: "/images/profile-6.jpg",
    message: "Photographing Kingz World collections is always a pleasure. The garments have incredible texture, movement, and presence that translate beautifully through the lens. A brand that understands visual storytelling.",
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
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mb-6">
            <HiSparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
              Customer Love
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fashion Leaders
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why industry experts and fashion enthusiasts choose Kingz World for 
            premium quality, exceptional craftsmanship, and transformative style experiences.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonials */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative group"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full -translate-y-16 translate-x-16" />
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-5">
                  <FaQuoteLeft className="w-20 h-20 text-purple-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500 ml-2">{testimonial.rating}.0</span>
                  {testimonial.verified && (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full ml-2">
                      <HiSparkles className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.message}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-white p-0.5">
                        <Image
                          src={testimonial.photo}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="rounded-[12px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-purple-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {regularTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 h-full">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-600 leading-relaxed mb-6 text-sm line-clamp-4">
                  "{testimonial.message}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{testimonial.name}</div>
                    <div className="text-xs text-gray-500 truncate">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/10" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Excellence?
              </h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Kingz World for premium fashion that transforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Shop Collection
                </button>
                
                <button className="inline-flex items-center justify-center gap-3 border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Read More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}