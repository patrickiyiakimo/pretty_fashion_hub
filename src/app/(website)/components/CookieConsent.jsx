// components/CookieConsent.jsx - Updated version with API call
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiCookie, HiX, HiCheck, HiShieldCheck } from "react-icons/hi";
import { FaCookie } from "react-icons/fa";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkCookieConsent();
  }, []);

  const checkCookieConsent = async () => {
    try {
      // First check localStorage
      const localConsent = localStorage.getItem("cookieConsent");
      
      if (localConsent) {
        setShowBanner(false);
        return;
      }

      // If user is logged in, check backend preferences
      const response = await fetch("/api/users/cookie-preferences", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.preferences) {
          localStorage.setItem("cookieConsent", "accepted");
          localStorage.setItem("cookiePreferences", JSON.stringify(data.preferences));
          setShowBanner(false);
          return;
        }
      }
      
      // Show banner if no consent found
      setTimeout(() => setShowBanner(true), 1000);
      
    } catch (error) {
      console.error("Error checking cookie consent:", error);
      setTimeout(() => setShowBanner(true), 1000);
    }
  };

  const savePreferencesToBackend = async (preferences) => {
    try {
      const response = await fetch("/api/users/cookie-preferences", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences })
      });
      return response.ok;
    } catch (error) {
      console.error("Error saving preferences:", error);
      return false;
    }
  };

  const acceptAllCookies = async () => {
    setLoading(true);
    const preferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
    await savePreferencesToBackend(preferences);
    
    setShowBanner(false);
    setLoading(false);
    window.dispatchEvent(new Event("cookiesAccepted"));
  };

  const acceptEssentialOnly = async () => {
    setLoading(true);
    const preferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
    await savePreferencesToBackend(preferences);
    
    setShowBanner(false);
    setLoading(false);
  };

  const savePreferences = async () => {
    setLoading(true);
    const preferences = {
      essential: true,
      functional: preferencesState.functional,
      analytics: preferencesState.analytics,
      marketing: preferencesState.marketing
    };
    
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
    await savePreferencesToBackend(preferences);
    
    setShowBanner(false);
    setShowDetails(false);
    setLoading(false);
  };

  const declineCookies = async () => {
    setLoading(true);
    const preferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
    await savePreferencesToBackend(preferences);
    
    setShowBanner(false);
    setLoading(false);
  };

  const [preferencesState, setPreferencesState] = useState({
    essential: true,
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
          <div className="bg-white/95 font-grotesk backdrop-blur-md shadow-2xl border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
              {!showDetails ? (
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
                        <Link href="/cookies" className="text-xs text-orange-600 hover:text-orange-700 hover:underline">
                          Learn More
                        </Link>
                        <button
                          onClick={() => setShowDetails(true)}
                          className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
                        >
                          Customize Settings
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                      onClick={declineCookies}
                      disabled={loading}
                      className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Decline"}
                    </button>
                    <button
                      onClick={acceptEssentialOnly}
                      disabled={loading}
                      className="px-5 py-2 text-sm border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Accept Essential Only"}
                    </button>
                    <button
                      onClick={acceptAllCookies}
                      disabled={loading}
                      className="px-6 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-400 transition-all shadow-md whitespace-nowrap disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Accept All"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <HiCookie className="w-6 h-6 text-orange-600" /> */}
                      <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                    </div>
                    <button onClick={() => setShowDetails(false)} className="p-1 text-gray-400 hover:text-gray-600">
                      <HiX className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Manage your cookie preferences below. Essential cookies are required for the website 
                    to function properly and cannot be disabled.
                  </p>

                  <div className="space-y-3">
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

                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Functional Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Enhance functionality by remembering your preferences like language and location.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferencesState(prev => ({ ...prev, functional: !prev.functional }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferencesState.functional ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferencesState.functional ? "translate-x-6" : "translate-x-1"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Analytics Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferencesState(prev => ({ ...prev, analytics: !prev.analytics }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferencesState.analytics ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferencesState.analytics ? "translate-x-6" : "translate-x-1"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-gray-900">Marketing Cookies</span>
                        <p className="text-xs text-gray-500 mt-1">
                          Used to deliver relevant advertisements and track campaign performance.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferencesState(prev => ({ ...prev, marketing: !prev.marketing }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          preferencesState.marketing ? "bg-orange-600" : "bg-gray-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferencesState.marketing ? "translate-x-6" : "translate-x-1"
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={savePreferences}
                      disabled={loading}
                      className="px-6 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-400 transition-all shadow-md whitespace-nowrap disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Preferences"}
                    </button>
                    <button
                      onClick={acceptAllCookies}
                      disabled={loading}
                      className="px-6 py-2 border border-orange-600 text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-50 transition-all disabled:opacity-50"
                    >
                      Accept All
                    </button>
                    <Link href="/cookies" className="px-6 py-2 text-sm text-gray-500 hover:text-gray-700">
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