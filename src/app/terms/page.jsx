"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  HiShieldCheck, 
  HiDocumentText, 
  HiUserGroup, 
  HiShoppingBag, 
  HiTruck, 
  HiRefresh, 
  HiBan, 
  HiExclamationCircle,
  HiMail
} from "react-icons/hi";

export default function TermsOfServicePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen font-grotesk bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-4">
            <HiDocumentText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
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
            {/* Welcome */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Welcome to Vefiri</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our marketplace platform, you agree to be bound by these 
                Terms of Service. Please read them carefully before using our services.
              </p>
            </div>

            {/* Section 1 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vefiri is an online marketplace that connects buyers with verified vendors. 
                    We provide a platform for discovering and purchasing quality products from 
                    trusted sellers across Nigeria. Our goal is to create a safe, transparent, 
                    and enjoyable shopping experience for all users.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiUserGroup className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. User Accounts</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>Any activity that occurs under your account is your responsibility</li>
                    <li>You must notify us immediately of any unauthorized account access</li>
                    <li>We reserve the right to suspend or terminate accounts with inaccurate information</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Vendor Verification</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Vefiri conducts thorough checks to verify vendors before onboarding to ensure 
                    product quality and authenticity. However, please note:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Vefiri does not manufacture or directly own the products listed</li>
                    <li>Product descriptions and images are provided by vendors</li>
                    <li>We encourage buyers to review product details, reviews, and ratings before purchase</li>
                    <li>Vendors are responsible for fulfilling orders accurately</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiShoppingBag className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Orders & Payments</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>All payments must be made through approved channels on the platform</li>
                    <li>Once an order is placed, it is subject to vendor confirmation and availability</li>
                    <li>Prices are displayed in Nigerian Naira (₦) and include applicable taxes</li>
                    <li>We use secure payment processors to protect your financial information</li>
                    <li>Vefiri does not store your full payment details on our servers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiTruck className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Delivery</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Delivery is handled by third-party logistics partners</li>
                    <li>Estimated delivery times are provided as a guide and are not guaranteed</li>
                    <li>Delivery fees are calculated based on location and order value</li>
                    <li>Free shipping is available for orders above ₦50,000</li>
                    <li>You will receive tracking information once your order ships</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiRefresh className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Refunds & Disputes</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Buyers may report issues with orders within 7 days of delivery</li>
                    <li>Vefiri will review disputes and may intervene where necessary</li>
                    <li>Refund eligibility depends on the nature of the complaint and evidence provided</li>
                    <li>We recommend contacting the vendor first to resolve any issues</li>
                    <li>Vefiri's decision on disputes is final and binding</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiBan className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Prohibited Use</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Users must not:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Engage in fraudulent activities or misrepresent products</li>
                    <li>Misuse the platform for illegal purposes</li>
                    <li>Attempt to bypass Vefiri systems for direct vendor transactions</li>
                    <li>Post false reviews or manipulate ratings</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiExclamationCircle className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To the fullest extent permitted by law, Vefiri is not liable for indirect, 
                    incidental, or consequential losses arising from your use of the platform. 
                    Our total liability shall not exceed the amount paid for the specific order 
                    giving rise to the claim. We are not responsible for vendor misconduct, 
                    product defects, or delivery delays beyond our control.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h3>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms, 
                engage in fraudulent activities, or pose a risk to other users. You may also 
                close your account at any time by contacting our support team.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Intellectual Property</h3>
              <p className="text-gray-600 leading-relaxed">
                All content on Vefiri, including logos, designs, text, graphics, and software, 
                is the property of Vefiri or its licensors and is protected by copyright and 
                trademark laws. You may not copy, modify, or distribute our content without 
                explicit permission.
              </p>
            </div>

            {/* Section 11 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h3>
              <p className="text-gray-600 leading-relaxed">
                Vefiri may update these Terms of Service at any time to reflect changes in our 
                practices or legal requirements. We will notify users of significant changes via 
                email or platform notification. Continued use of the platform after changes means 
                acceptance of the updated terms.
              </p>
            </div>

            {/* Section 12 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiMail className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">📧 Email: legal@vefiri.com</p>
                    <p className="text-gray-700 mt-2">📞 Phone: +234 800 000 0000</p>
                    <p className="text-gray-700 mt-2">📍 Address: Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            By using Vefiri, you agree to our{" "}
            <Link href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}