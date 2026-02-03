"use client";

import { useState, useEffect } from "react";
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
  HiChatAlt2,
  HiSearch,
  HiX,
  HiRefresh
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
  const [consultationId, setConsultationId] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showTrackingInterface, setShowTrackingInterface] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const savedConsultationId = localStorage.getItem('kingzworld_consultation_id');
    if (savedConsultationId) {
      setConsultationId(savedConsultationId);
      setShowTrackingInterface(true);
      // Auto-track the consultation
      setTrackingId(savedConsultationId);
      handleAutoTrack(savedConsultationId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
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
        const newConsultationId = result.data.consultationId;
        setConsultationId(newConsultationId);
        
        // Save to localStorage
        localStorage.setItem('kingzworld_consultation_id', newConsultationId);
        
        setShowTrackingInterface(true);
        setTrackingId(newConsultationId);
        
        // Auto-track the new consultation
        handleAutoTrack(newConsultationId);
        
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

  const handleAutoTrack = async (id) => {
    setIsTracking(true);
    setTrackingResult(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      const response = await fetch(`${API_URL}/api/consultations`);
      const result = await response.json();

      if (result.success) {
        const consultation = result.data.find(cons => cons.consultationId === id);
        
        if (consultation) {
          setTrackingResult({
            found: true,
            data: consultation
          });
        } else {
          setTrackingResult({
            found: false,
            message: "No consultation found with this ID. Please check your Consultation ID and try again."
          });
        }
      } else {
        setTrackingResult({
          found: false,
          message: "Unable to fetch consultation data. Please try again later."
        });
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setTrackingResult({
        found: false,
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsTracking(false);
    }
  };

  const handleTrackConsultation = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    await handleAutoTrack(trackingId.toUpperCase());
  };

  const handleNewConsultation = () => {
    // Clear everything and show the form again
    setShowTrackingInterface(false);
    setTrackingResult(null);
    setTrackingId("");
    setConsultationId("");
    localStorage.removeItem('kingzworld_consultation_id');
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show tracking interface if there's an active consultation
  if (showTrackingInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Consultation Status
                </h1>
                <p className="text-gray-600">
                  Track your consultation request and stay updated on its progress
                </p>
              </div>
              <button
                onClick={handleNewConsultation}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
              >
                <HiCalendar className="w-5 h-5" />
                Book New Consultation
              </button>
            </div>

            {/* Consultation ID Display */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Your Consultation ID
                </h3>
                <div className="text-3xl font-mono font-bold text-blue-700 mb-3">
                  {consultationId}
                </div>
                <p className="text-blue-700 mb-2">
                  ✅ Your Consultation ID has been sent to your email
                </p>
                <p className="text-sm text-blue-600">
                  Keep this ID safe! You'll need it to track your consultation status.
                </p>
              </div>
            </div>

            {/* Auto-tracking Section */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Current Status
                </h3>
                <button
                  onClick={() => handleAutoTrack(consultationId)}
                  disabled={isTracking}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <HiRefresh className="w-4 h-4" />
                  {isTracking ? "Refreshing..." : "Refresh"}
                </button>
              </div>

              {/* Tracking Results */}
              {isTracking ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Checking consultation status...</p>
                </div>
              ) : trackingResult ? (
                <div>
                  {trackingResult.found ? (
                    <div className={`rounded-2xl p-6 border-2 ${getStatusColor(trackingResult.data.status)}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">
                            {trackingResult.data.fullName}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span><strong>Date:</strong> {formatDate(trackingResult.data.preferredDate)}</span>
                            <span><strong>Time:</strong> {trackingResult.data.preferredTime}</span>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackingResult.data.status)}`}>
                          {trackingResult.data.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Status-specific messages */}
                      {trackingResult.data.status === 'pending' && (
                        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <HiClock className="w-4 h-4 text-yellow-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-yellow-800">Under Review</h5>
                              <p className="text-yellow-700 text-sm">
                                Your consultation request is being reviewed by our team. We'll contact you within 24 hours.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {trackingResult.data.status === 'confirmed' && (
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <HiCheck className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-green-800">Confirmed! 🎉</h5>
                              <p className="text-green-700 text-sm">
                                Your consultation has been confirmed! We're excited to help you transform your style.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {trackingResult.data.status === 'completed' && (
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <HiStar className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-blue-800">Completed Successfully!</h5>
                              <p className="text-blue-700 text-sm">
                                Thank you for choosing Vendly! We hope you enjoyed your consultation experience.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {trackingResult.data.status === 'cancelled' && (
                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <HiX className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-red-800">Consultation Cancelled</h5>
                              <p className="text-red-700 text-sm">
                                This consultation has been cancelled. Please book a new consultation if you'd like to reschedule.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Show booking form again if consultation is completed or cancelled */}
                      {(trackingResult.data.status === 'completed' || trackingResult.data.status === 'cancelled') && (
                        <div className="mt-6 text-center">
                          <button
                            onClick={handleNewConsultation}
                            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                          >
                            Book New Consultation
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-center">
                      <HiX className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-red-800 mb-2">Consultation Not Found</h4>
                      <p className="text-red-700">{trackingResult.message}</p>
                      <button
                        onClick={handleNewConsultation}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Book New Consultation
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Click refresh to check your consultation status
                </div>
              )}
            </div>

            {/* Manual Tracking for other consultations */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Another Consultation</h3>
              <form onSubmit={handleTrackConsultation} className="max-w-md">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter Consultation ID (e.g., CONS0001)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isTracking || !trackingId.trim()}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <HiSearch className="w-5 h-5" />
                    {isTracking ? "Checking..." : "Track"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show the original booking form if no active consultation
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
              Vendly
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

      {/* Rest of the original booking form remains exactly the same */}
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
                  {/* ... rest of the form fields remain exactly the same ... */}
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