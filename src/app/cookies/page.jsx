"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  HiCookie, 
  HiShieldCheck, 
  HiCog, 
  HiDatabase, 
  HiGlobeAlt,
  HiMail,
  HiInformationCircle,
  HiCheckCircle
} from "react-icons/hi";
import { FaCookie } from "react-icons/fa";

export default function CookiesPolicyPage() {
  const currentYear = new Date().getFullYear();

  const cookieTypes = [
    {
      name: "Essential Cookies",
      icon: <HiShieldCheck className="w-5 h-5 text-green-600" />,
      description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      examples: ["Authentication", "Shopping cart", "Session management", "CSRF protection"],
      required: true
    },
    {
      name: "Functional Cookies",
      icon: <HiCog className="w-5 h-5 text-blue-600" />,
      description: "These cookies enhance the functionality of our website by remembering your preferences and choices.",
      examples: ["Language preferences", "Location settings", "Saved items", "Recently viewed products"],
      required: false
    },
    {
      name: "Analytics Cookies",
      icon: <HiDatabase className="w-5 h-5 text-purple-600" />,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Page views", "Time spent on site", "Click tracking", "User flow analysis"],
      required: false
    },
    {
      name: "Marketing Cookies",
      icon: <HiGlobeAlt className="w-5 h-5 text-orange-600" />,
      description: "These cookies track your online activity to help us deliver more relevant advertising and limit how many times you see an ad.",
      examples: ["Personalized ads", "Retargeting", "Social media integration", "Campaign tracking"],
      required: false
    }
  ];

  return (
    <div className="min-h-screen font-grotesk bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
            <FaCookie className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
              Cookie Notice
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookies Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: January 1, {currentYear}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-8">
            {/* Introduction */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-start gap-3">
                <HiInformationCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">What Are Cookies?</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Cookies are small text files that websites place on your computer, phone, or tablet 
                    when you visit. They help us remember you and your preferences, making your experience 
                    smoother and more personalized.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Vefiri Uses Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Vefiri, we use cookies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Keep you logged in securely</li>
                <li>Remember items in your shopping cart</li>
                <li>Save your preferences (language, location, etc.)</li>
                <li>Understand how you use our platform</li>
                <li>Improve website performance and loading speed</li>
                <li>Show you relevant products and offers</li>
              </ul>
            </div>

            {/* Types of Cookies */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Types of Cookies We Use</h2>
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {cookie.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{cookie.name}</h3>
                          {cookie.required ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Required</span>
                          ) : (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Optional</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {cookie.description}
                    </p>
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Examples:</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-600">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We also use cookies from trusted third-party services to enhance your experience:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Google Analytics</p>
                  <p className="text-sm text-gray-600">Helps us understand how visitors use our site</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Paystack/Flutterwave</p>
                  <p className="text-sm text-gray-600">Secure payment processing</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Social Media Platforms</p>
                  <p className="text-sm text-gray-600">Allow sharing and social login features</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Cloudflare</p>
                  <p className="text-sm text-gray-600">Security and performance optimization</p>
                </div>
              </div>
            </div>

            {/* How to Control Cookies */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Control Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete all cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Receive notifications when a cookie is set</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-orange-600">Note:</strong> Disabling cookies may affect the functionality 
                of our website. Essential features like your shopping cart and login session may not work properly.
              </p>
            </div>

            {/* Browser Instructions */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Manage Cookies in Different Browsers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 text-sm">Google Chrome</p>
                  <p className="text-xs text-gray-500 mt-1">Settings → Privacy & Security → Cookies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 text-sm">Mozilla Firefox</p>
                  <p className="text-xs text-gray-500 mt-1">Options → Privacy & Security → Cookies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 text-sm">Safari</p>
                  <p className="text-xs text-gray-500 mt-1">Preferences → Privacy → Cookies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 text-sm">Microsoft Edge</p>
                  <p className="text-xs text-gray-500 mt-1">Settings → Privacy & Security → Cookies</p>
                </div>
              </div>
            </div>

            {/* Consent Banner Information */}
            <div className="border-t border-gray-100 pt-6">
              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Consent</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      When you first visit Vefiri, you will see a cookie banner asking for your consent. 
                      By continuing to use our website, you agree to our use of cookies as described in 
                      this policy. You can change your cookie preferences at any time through your browser 
                      settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in our practices 
                or legal requirements. Any updates will be posted on this page with a revised "Last Updated" 
                date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact Section */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiMail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Questions About Cookies?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">📧 Email: privacy@vefiri.com</p>
                    <p className="text-gray-700 mt-2">📞 Phone: +234 800 000 0000</p>
                    <p className="text-gray-700 mt-2">📍 Address: Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Policies Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Link 
            href="/privacy" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-300">•</span>
          <Link 
            href="/terms" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </div>
  );
}