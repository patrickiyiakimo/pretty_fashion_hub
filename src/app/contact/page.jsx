"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 overflow-hidden rounded-b-3xl flex items-center justify-center">
        {/* Decorative floating circles */}
        <div className="absolute top-[-30px] left-[-30px] w-36 h-36 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-center px-6"
        >
          <h1 className="text-4xl md:text-5xl font-satisfy font-extrabold text-white mb-2">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Have questions or need styling advice? We’re here for you.
          </p>
        </motion.div>

        {/* Additional abstract shapes */}
        <div className="absolute top-10 right-20 w-20 h-20 bg-purple-800/50 rounded-full blur-2xl animate-animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-16 w-28 h-28 bg-yellow-300/40 rounded-full blur-2xl animate-animate-pulse-slow"></div>
      </div>

      {/* Contact Form + Info Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-extrabold text-purple-700 mb-4">
            Send Us a Message
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
             className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Send Message
          </button>
        </motion.form>

        {/* Boutique Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col justify-center gap-8"
        >
          <h2 className="text-3xl font-extrabold text-purple-700">
            Our Boutique
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Pretty Fashion Hub</strong> — Luxury Women & Men Clothing
            <br />
            🛍️ Open Monday to Saturday
            <br />
            🛍️ Shop online or via DM
            <br />
            📍 RVS MALL Shop 18, 3rd Avenue, Gwarimpa, Abuja
            <br />
            ☎️ 09166049481
          </p>

          {/* Google Map Embed */}
          <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.862630971242!2d7.3928421!3d9.0530481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e16ee7cbe6d49%3A0xabcdef1234567890!2sRVS%20Mall%2C%20Gwarimpa%2C%20Abuja!5e0!3m2!1sen!2sng!4v1693456789012!5m2!1sen!2sng"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-purple-700 hover:text-yellow-400 transition text-2xl"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-purple-700 hover:text-yellow-400 transition text-2xl"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-purple-700 hover:text-yellow-400 transition text-2xl"
            >
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
