// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function ContactPage() {
//   return (
//     <section className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
//       {/* Hero Section */}
//       <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 overflow-hidden rounded-b-3xl flex items-center justify-center">
//         {/* Decorative floating circles */}
//         <div className="absolute top-[-30px] left-[-30px] w-36 h-36 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="relative text-center px-6"
//         >
//           <h1 className="text-4xl md:text-5xl font-satisfy font-extrabold text-white mb-2">
//             Get in Touch
//           </h1>
//           <p className="text-lg md:text-xl text-white/90">
//             Have questions or need styling advice? We’re here for you.
//           </p>
//         </motion.div>

//         {/* Additional abstract shapes */}
//         <div className="absolute top-10 right-20 w-20 h-20 bg-purple-800/50 rounded-full blur-2xl animate-animate-pulse-slow"></div>
//         <div className="absolute bottom-10 left-16 w-28 h-28 bg-yellow-300/40 rounded-full blur-2xl animate-animate-pulse-slow"></div>
//       </div>

//       {/* Contact Form + Info Section */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-2 gap-12">
//         {/* Form */}
//         <motion.form
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
//         >
//           <h2 className="text-3xl font-extrabold text-purple-700 mb-4">
//             Send Us a Message
//           </h2>

//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-4 border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="p-4 border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
//           />
//           <input
//             type="text"
//             placeholder="Subject"
//             className="p-4 border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
//           />
//           <textarea
//             placeholder="Your Message"
//             rows={5}
//              className="p-4 border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
//           />
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-purple-400 to-purple-300 text-purple-900 font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             Send Message
//           </button>
//         </motion.form>

//         {/* Boutique Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           className="flex flex-col justify-center gap-8"
//         >
//           <h2 className="text-3xl font-extrabold text-purple-700">
//             Our Boutique
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             <strong>Kingz_World</strong> — Luxury Women & Men Clothing
//             <br />
//             🛍️ Open Monday to Saturday
//             <br />
//             🛍️ Shop online or via DM
//             <br />
//             📍 RVS MALL Shop 18, 3rd Avenue, Gwarimpa, Abuja
//             <br />
//             ☎️ 09166049481
//           </p>

//           {/* Google Map Embed */}
//           <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-xl">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.862630971242!2d7.3928421!3d9.0530481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e16ee7cbe6d49%3A0xabcdef1234567890!2sRVS%20Mall%2C%20Gwarimpa%2C%20Abuja!5e0!3m2!1sen!2sng!4v1693456789012!5m2!1sen!2sng"
//               width="100%"
//               height="100%"
//               className="border-0"
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>

//           {/* Social Links */}
//           <div className="flex gap-4 mt-4">
//             <a
//               href="#"
//               className="text-purple-700 hover:text-yellow-400 transition text-2xl"
//             >
//               Instagram
//             </a>
//             <a
//               href="#"
//               className="text-purple-700 hover:text-yellow-400 transition text-2xl"
//             >
//               Facebook
//             </a>
//             <a
//               href="#"
//               className="text-purple-700 hover:text-yellow-400 transition text-2xl"
//             >
//               TikTok
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }






"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MdLocationOn className="text-2xl" />,
      title: "Our Boutique",
      details: "RVS MALL Shop 18, 3rd Avenue, Gwarimpa, Abuja, Nigeria",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MdPhone className="text-2xl" />,
      title: "Call Us",
      details: "+234 916 604 9481",
      subtitle: "Mon-Sat: 9AM - 8PM",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MdEmail className="text-2xl" />,
      title: "Email Us",
      details: "info@kingz-world.com",
      subtitle: "Response within 24 hours",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <MdAccessTime className="text-2xl" />,
      title: "Business Hours",
      details: "Monday - Saturday",
      subtitle: "9:00 AM - 8:00 PM",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, label: "Instagram", color: "bg-gradient-to-r from-purple-600 to-pink-600", href: "https://instagram.com/kingz_world" },
    { icon: <FaFacebook />, label: "Facebook", color: "bg-gradient-to-r from-blue-600 to-blue-800", href: "https://facebook.com/kingzworld" },
    { icon: <FaTiktok />, label: "TikTok", color: "bg-gradient-to-r from-black to-gray-800", href: "https://tiktok.com/@kingz_world" },
    { icon: <FaWhatsapp />, label: "WhatsApp", color: "bg-gradient-to-r from-green-500 to-green-700", href: "https://wa.me/2349166049481" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50 text-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-60 -left-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700 px-3 py-1 rounded-full bg-white">
              Contact Us
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Let's Connect
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our luxury collections or need styling advice? 
            Our team is ready to help you shine with Kingz_World elegance.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <FaPaperPlane className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaEnvelope className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting Kingz_World. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="John Doe"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          👤
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="john@example.com"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          ✉️
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="How can we help?"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📝
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                      <div className="absolute left-4 top-4 text-gray-400">
                        💬
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/90 font-medium">{item.details}</p>
                      {item.subtitle && (
                        <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`${social.color} text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transform transition-all duration-300 hover:shadow-2xl`}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="font-semibold">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">Visit Our Boutique</h3>
                <p className="text-gray-600 mt-2">RVS MALL Shop 18, 3rd Avenue, Gwarimpa, Abuja</p>
              </div>
              <div className="relative h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6251559661197!2d7.464729175024195!3d9.028547891053192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0beefc0e5c43%3A0x5bc9c2e8f6c4b0f5!2sRVS%20Mall%20Gwarimpa!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kingz_World Location"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <span className="font-semibold text-gray-800">Open in Maps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Why Choose Kingz_World?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Premium Quality Fabrics & Craftsmanship</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Personalized Styling Consultations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Worldwide Shipping Available</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Exclusive VIP Client Benefits</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Visit our boutique or shop online for luxury fashion that makes a statement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+2349166049481"
                className="inline-flex items-center justify-center gap-3 bg-white text-purple-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaPhone />
                Call Now
              </a>
              <a
                href="https://wa.me/2349166049481"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}