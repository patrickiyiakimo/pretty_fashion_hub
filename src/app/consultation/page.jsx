"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HiCalendar, 
  HiClock, 
  HiUser, 
  HiMail, 
  HiPhone, 
  HiShieldCheck,
  HiStar,
  HiCheck,
  HiChatAlt2
} from "react-icons/hi";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    stylePreferences: "",
    budgetRange: "",
    occasion: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Use your backend server URL (adjust port if different)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      const response = await fetch(`${API_URL}/api/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          budgetRange: formData.budgetRange,
          stylePreferences: formData.stylePreferences,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          stylePreferences: "",
          budgetRange: "",
          occasion: "",
          message: ""
        });
      } else {
        // Handle validation errors
        const errorMessage = result.errors 
          ? result.errors.join(', ') 
          : result.message || 'Failed to book consultation. Please try again.';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationTypes = [
    {
      title: "Personal Styling",
      duration: "60 mins",
      price: "₦15,000",
      features: ["Wardrobe Assessment", "Style Personality Analysis", "Custom Outfit Recommendations"],
      bestFor: "Individuals seeking personal style transformation"
    },
    {
      title: "Professional Image",
      duration: "90 mins",
      price: "₦25,000",
      features: ["Business Attire Guidance", "Brand Alignment", "Confidence Building"],
      bestFor: "Professionals enhancing their corporate presence"
    },
    {
      title: "Special Occasion",
      duration: "45 mins",
      price: "₦10,000",
      features: ["Event-Specific Styling", "Accessory Coordination", "Fit & Silhouette Advice"],
      bestFor: "Weddings, galas, and important events"
    }
  ];

  const benefits = [
    {
      icon: <HiUser className="w-6 h-6" />,
      title: "Personalized Attention",
      description: "One-on-one sessions tailored to your unique style goals and preferences"
    },
    {
      icon: <HiStar className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Professional advice from our certified style consultants with years of experience"
    },
    {
      icon: <HiShieldCheck className="w-6 h-6" />,
      title: "Confidence Guarantee",
      description: "Walk away feeling confident and empowered in your style choices"
    },
    {
      icon: <HiChatAlt2 className="w-6 h-6" />,
      title: "Ongoing Support",
      description: "Follow-up guidance and recommendations after your consultation"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiCheck className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Consultation Request Received!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your interest in Kingz World styling services. Our team will contact you within 24 hours to confirm your appointment details.
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                What to Expect Next:
              </h3>
              <ul className="text-blue-800 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Confirmation call/email within 24 hours
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Pre-consultation style questionnaire
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Personalized session preparation
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Collections
              </Link>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Book Another Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent"
            >
              Kingz World
            </Link>
            <Link 
              href="/shop"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Personal Style
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Consultation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your wardrobe with expert guidance from our certified style consultants. 
              Discover your unique style identity and build confidence through personalized fashion.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Consultation Options */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Consultation Options</h2>
                
                <div className="space-y-6">
                  {consultationTypes.map((type, index) => (
                    <div 
                      key={index}
                      className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                        <span className="text-2xl font-bold text-purple-600">{type.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <HiClock className="w-4 h-4" />
                        <span className="text-sm">{type.duration}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                        <span className="font-medium">Best for:</span> {type.bestFor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Why Choose Our Consultation?</h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-purple-100 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <HiCalendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Book Your Consultation</h2>
                    <p className="text-gray-600">Complete the form below and we'll contact you to confirm</p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-700">
                      <HiCheck className="w-5 h-5 text-red-500" />
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      >
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      >
                        <option value="">Select budget range</option>
                        <option value="10k-30k">₦10,000 - ₦30,000</option>
                        <option value="30k-50k">₦30,000 - ₦50,000</option>
                        <option value="50k-100k">₦50,000 - ₦100,000</option>
                        <option value="100k+">₦100,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style Preferences
                    </label>
                    <textarea
                      name="stylePreferences"
                      value={formData.stylePreferences}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Tell us about your style preferences, favorite colors, comfort levels, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Any specific questions or requirements for your consultation?"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Consultation Process</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Initial discovery call to understand your needs
                      </li>
                      <li className="flex items-center gap-2">
                        <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Personalized style assessment and recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Follow-up support and wardrobe planning
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Book Consultation"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}