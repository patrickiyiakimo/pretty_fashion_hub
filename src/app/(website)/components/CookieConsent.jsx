"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiCookie, HiX, HiCheck, HiShieldCheck } from "react-icons/hi";
import { FaCookie } from "react-icons/fa";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    }));
    setShowBanner(false);
    // You can dispatch an event to load analytics scripts here
    window.dispatchEvent(new Event("cookiesAccepted"));
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    }));
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    setShowDetails(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookiePreferences", JSON.stringify({
      essential: true, // Essential cookies cannot be disabled
      functional: false,
      analytics: false,
      marketing: false
    }));
    setShowBanner(false);
  };

  const [preferences, setPreferences] = useState({
    essential: true, // Always true - cannot be disabled
    functional: true,
    analytics: false,
    marketing: false
  });

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
              {!showDetails ? (
                // Simple Banner View
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {/* <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCookie className="w-5 h-5 text-orange-600" />
                    </div> */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">We Value Your Privacy</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        We use cookies to enhance your browsing experience, serve personalized content, 
                        and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <Link 
                          href="/cookies" 
                                          className="text-xs text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                        >
                          Learn More
                        </Link>
                        <button
                          onClick={() => setShowDetails(true)}
                          className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors"
                        >
                          Customize Settings
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                      onClick={declineCookies}
                      className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap"
                    >
                      Decline
                    </button>
                    <button
                      onClick={acceptEssentialOnly}
                      className="px-5 py-2 text-sm border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                    >
                      Accept Essential Only
                    </button>
                    <button
                      onClick={acceptAllCookies}
                      className="px-6 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-400 transition-all shadow-md whitespace-nowrap"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              ) : (
                // Detailed Preferences View
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <FaCookie className="w-6 h-6 text-orange-600" /> */}
                      <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                    </div>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HiX className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Manage your cookie preferences below. Essential cookies are required for the website 
                    to function properly and cannot be disabled.
                  </p>

                  {/* Cookie Options */}
                  <div className="space-y-3">
                    {/* Essential Cookies - Always Required */}
                    <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <HiShieldCheck className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-900">Essential Cookies</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Always Active</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Required for core functionality like security, authentication, and shopping cart.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <HiCheck className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Functional Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Enhance functionality by remembering your preferences like language and location.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferences.functional ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.functional ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Analytics Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Help us understand how visitors interact with our website (Google Analytics, etc.).
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferences.analytics ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.analytics ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Marketing Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Used to deliver relevant advertisements and track campaign performance.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferences.marketing ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
                        savePreferences();
                      }}
                      className="px-6 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-400 transition-all shadow-md whitespace-nowrap"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={acceptAllCookies}
                      className="px-6 py-2 border border-orange-600 text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-50 transition-all"
                    >
                      Accept All
                    </button>
                    <Link
                      href="/cookies"
                      className="px-6 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Read Full Policy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}