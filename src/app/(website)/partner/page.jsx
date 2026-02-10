"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiBuildingStorefront, 
  HiCheckCircle, 
  HiClock, 
  HiXCircle,
  HiArrowPath,
  HiEnvelope,
  HiPhone,
  HiGlobeAlt,
  HiUserCircle,
  HiMapPin,
  HiIdentification,
  HiBriefcase,
  HiDocumentText,
  HiBanknotes
} from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    taxId: "",
    yearsInBusiness: "",
    
    // Contact Information
    email: "",
    phone: "",
    
    // Address Information
    address: {
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: ""
    },
    
    // Business Details
    description: "",
    category: "",
    website: "",
    productCategories: [],
    annualRevenue: "",
    numberOfEmployees: "",
    
    // Legal & Compliance
    businessRegistrationNumber: "",
    hasPhysicalStore: false,
    acceptTerms: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const [partnerData, setPartnerData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const formRef = useRef();

  const productCategories = [
    "Men's Fashion",
    "Women's Fashion",
    "Children's Clothing",
    "Footwear",
    "Accessories",
    "Jewelry & Watches",
    "Bags & Luggage",
    "Beauty & Cosmetics",
    "Sportswear",
    "Traditional Attire",
    "Luxury Items",
    "Other"
  ];

  const businessTypes = [
    "Retail Store",
    "Online Store",
    "Manufacturer",
    "Wholesaler",
    "Fashion Designer",
    "Boutique",
    "Distributor",
    "Other"
  ];

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  useEffect(() => {
    checkAuthAndStatus();
  }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkAuthAndStatus = async () => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      toast.error("You need to Log in");
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData(prev => ({ 
        ...prev, 
        email: parsedUser.email || prev.email 
      }));

      await checkPartnerStatus(parsedUser);
    } catch (error) {
      console.error("Auth check error:", error);
      toast.error("Authentication failed");
      setTimeout(() => window.location.href = "/login", 2000);
    }
  };

  const checkPartnerStatus = async (currentUser) => {
    setChecking(true);
    setError("");
    
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_ENDPOINT}/api/partners/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      // Handle 404 - endpoint doesn't exist, which means no application
      if (response.status === 404) {
        console.log("No partner application found (404)");
        setSubmitted(false);
        setStatus("");
        setChecking(false);
        return;
      }

      if (response.status === 401) {
        throw new Error("Authentication expired");
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        if (text.startsWith('<!DOCTYPE') || text.startsWith('<')) {
          throw new Error("Server returned HTML page. Check API endpoint.");
        }
        throw new Error(`Invalid response format: ${contentType}`);
      }

      const data = await response.json();

      if (data.hasApplication && data.partner) {
        setPartnerData(data.partner);
        setStatus(data.partner.status);
        setSubmitted(true);
      } else {
        setSubmitted(false);
        setStatus("");
      }
    } catch (err) {
      console.error("Status check error:", err);
      if (err.message === "Authentication expired") {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        setTimeout(() => window.location.href = "/login", 2000);
      } else if (err.message.includes("HTML") || err.message.includes("Invalid response")) {
        // Don't show error for 404, it's expected
        if (!err.message.includes("404")) {
          toast.error("Server configuration error. Please try again later.");
        }
      }
      // For 404 and other errors, assume no application exists
      setSubmitted(false);
      setStatus("");
    } finally {
      setChecking(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (type === 'checkbox' && name === 'productCategories') {
      setFormData(prev => ({
        ...prev,
        productCategories: checked
          ? [...prev.productCategories, value]
          : prev.productCategories.filter(cat => cat !== value)
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Authentication required");
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }

    // Validate required fields
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/api/partners/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        if (text.startsWith('<!DOCTYPE') || text.startsWith('<')) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error(`Invalid response: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        setPartnerData(data.partner);
        setStatus(data.partner.status);
        setSubmitted(true);
        toast.success("Application submitted successfully! 🎉");
      } else {
        throw new Error(data.error || "Failed to submit application");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (!user) return;
    setChecking(true);
    try {
      await checkPartnerStatus(user);
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to refresh status");
    } finally {
      setChecking(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: HiClock,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        label: "Under Review"
      },
      approved: {
        icon: HiCheckCircle,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        label: "Approved"
      },
      rejected: {
        icon: HiXCircle,
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        label: "Not Approved"
      }
    };
    return configs[status] || configs.pending;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <HiBuildingStorefront className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Business Information</h3>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            placeholder="Your official business name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Business Type *
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tax Identification Number
          </label>
          <div className="relative">
            <HiIdentification className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              placeholder="TIN or equivalent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Years in Business *
          </label>
          <select
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="">Select years</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Business Registration Number *
        </label>
        <input
          type="text"
          name="businessRegistrationNumber"
          value={formData.businessRegistrationNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          placeholder="CAC registration number"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <HiMapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Contact & Location</h3>
        <p className="text-gray-600">Where can we reach you?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Business Email *
          </label>
          <div className="relative">
            <HiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              placeholder="business@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
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
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              placeholder="+234 XXX XXX XXXX"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Street Address *
          </label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            placeholder="123 Business Street"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            placeholder="City"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            State *
          </label>
          <select
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="">Select state</option>
            {nigerianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            placeholder="Postal code"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <HiBriefcase className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Business Details</h3>
        <p className="text-gray-600">Tell us more about your operations</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Business Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
          placeholder="Describe your business, products, target market, and unique selling points..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Product Categories *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {productCategories.map(category => (
            <label key={category} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                name="productCategories"
                value={category}
                checked={formData.productCategories.includes(category)}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Annual Revenue Range
          </label>
          <select
            name="annualRevenue"
            value={formData.annualRevenue}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="">Select revenue range</option>
            <option value="0-1M">₦0 - ₦1 Million</option>
            <option value="1M-5M">₦1M - ₦5 Million</option>
            <option value="5M-10M">₦5M - ₦10 Million</option>
            <option value="10M-50M">₦10M - ₦50 Million</option>
            <option value="50M+">₦50M+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Number of Employees
          </label>
          <select
            name="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            <option value="">Select employees</option>
            <option value="1-5">1-5 employees</option>
            <option value="6-10">6-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-100">51-100 employees</option>
            <option value="100+">100+ employees</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Website or Social Media
        </label>
        <div className="relative">
          <HiGlobeAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            placeholder="https://yourwebsite.com or social media link"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl">
        <input
          type="checkbox"
          name="hasPhysicalStore"
          checked={formData.hasPhysicalStore}
          onChange={handleChange}
          className="rounded text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">I have a physical store location</span>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <HiDocumentText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Review & Submit</h3>
        <p className="text-gray-600">Review your information and accept terms</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h4 className="font-semibold text-gray-900">Application Summary</h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Business Name:</strong> {formData.businessName}
          </div>
          <div>
            <strong>Business Type:</strong> {formData.businessType}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Phone:</strong> {formData.phone}
          </div>
          <div>
            <strong>Location:</strong> {formData.address.city}, {formData.address.state}
          </div>
          <div>
            <strong>Years in Business:</strong> {formData.yearsInBusiness}
          </div>
        </div>

        <div className="text-sm">
          <strong>Product Categories:</strong> {formData.productCategories.join(', ')}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-xl">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="rounded text-blue-600 focus:ring-blue-500 mt-1"
          />
          <div className="text-sm text-gray-700">
            <strong>I agree to the Terms and Conditions</strong>
            <p className="mt-1">
              I confirm that all information provided is accurate and complete. 
              I understand that Vendly will review my application and may 
              contact me for additional information. I agree to comply with all 
              platform policies and requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (checking) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-gray-600 text-lg font-medium">Checking your application status...</p> */}
        </motion.div>
      </section>
    );
  }

  if (submitted && status === "approved") {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <Confetti 
          width={dimensions.width} 
          height={dimensions.height} 
          numberOfPieces={400} 
          recycle={false}
          gravity={0.15}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white/80 my-24 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <HiCheckCircle className="w-12 h-12 text-emerald-600" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to Vendly!
              </h1>
              <p className="text-emerald-100 text-xl">
                Your partnership application has been approved
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Congratulations, {partnerData?.businessName}! 🎉
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  You are now an official partner of Vendly. Start growing your business 
                  with our premium platform and reach thousands of fashion enthusiasts.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <HiBuildingStorefront className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Business Dashboard</h3>
                  <p className="text-gray-600 text-sm">Manage your products and track performance</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <HiUserCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Partner Support</h3>
                  <p className="text-gray-600 text-sm">Dedicated support for your business growth</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 text-center"
                >
                  Go to Dashboard
                </motion.a>
                <motion.button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 transition-all duration-300"
                >
                  Sign Out
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (submitted && status) {
    const statusConfig = getStatusConfig(status);
    const StatusIcon = statusConfig.icon;

    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full"
        >
          <div className={`bg-white rounded-3xl shadow-xl border-2 ${statusConfig.borderColor} overflow-hidden`}>
            <div className={`${statusConfig.bgColor} p-8 text-center`}>
              <StatusIcon className={`w-16 h-16 ${statusConfig.color} mx-auto mb-4`} />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Application {statusConfig.label}
              </h1>
              <p className="text-gray-600">
                {partnerData?.businessName}
              </p>
            </div>

            <div className="p-8">
              {status === "pending" && (
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Thank You for Applying!
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your application is currently under review by our team. 
                      We'll notify you via email once a decision has been made.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <p className="text-amber-800 text-sm">
                      <strong>Estimated review time:</strong> 2-3 business days
                    </p>
                  </div>

                  <motion.button
                    onClick={handleRefreshStatus}
                    disabled={checking}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 mx-auto"
                  >
                    <HiArrowPath className={`w-5 h-5 ${checking ? 'animate-spin' : ''}`} />
                    {checking ? "Checking..." : "Refresh Status"}
                  </motion.button>
                </div>
              )}

              {status === "rejected" && (
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Application Review Complete
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      After careful consideration, we're unable to approve your 
                      application at this time. You may reapply after 30 days.
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                    <p className="text-red-800 text-sm">
                      For more information about this decision, please contact our partner support team.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a 
                      href="/contact" 
                      className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 text-center"
                    >
                      Contact Support
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setStatus("");
                        setPartnerData(null);
                      }}
                      className="border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-gray-400 transition-all duration-300"
                    >
                      Apply Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200 shadow-sm mb-8">
            <HiBuildingStorefront className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Partner Program
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Vendly
            </span>
            <br />
            Partner Network
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Grow your fashion business with Nigeria's premier luxury marketplace. 
            Get verified, showcase your brand, and reach discerning customers nationwide.
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Partnership Application</h2>
            <p className="text-gray-300">Complete all steps to join our network</p>
          </div>

          {/* Progress Steps */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  } font-semibold`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm text-gray-600">
              <span>Business</span>
              <span>Contact</span>
              <span>Details</span>
              <span>Review</span>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
                whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
                >
                  Next Step
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading || !formData.acceptTerms}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                    loading || !formData.acceptTerms ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Application...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </motion.button>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
              >
                {error}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: HiUserCircle,
              title: "Verified Badge",
              description: "Gain customer trust with official verification"
            },
            {
              icon: HiBuildingStorefront,
              title: "Business Dashboard",
              description: "Manage inventory, orders, and analytics"
            },
            {
              icon: HiBanknotes,
              title: "Increased Sales",
              description: "Access premium customers across Nigeria"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center"
            >
              <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}