"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiShieldCheck, HiLockClosed, HiDatabase, HiUserGroup, HiMail } from "react-icons/hi";
import { FaCookie } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();

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
            <HiShieldCheck className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
              Privacy & Security
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Privacy Matters</h2>
              <p className="text-gray-600 leading-relaxed">
                At Vefiri, your privacy is our priority. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our marketplace platform. 
                Please read this policy carefully to understand our views and practices regarding your 
                personal data.
              </p>
            </div>

            {/* Section 1 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiDatabase className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    We may collect the following types of information:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Full name, email address, and phone number</li>
                    <li>Delivery address and location data</li>
                    <li>Payment-related information (processed securely through our payment partners)</li>
                    <li>Usage data (how you interact with our platform)</li>
                    <li>Device information and IP address</li>
                    <li>Communication preferences and feedback</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiUserGroup className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Process and fulfill your orders and deliveries</li>
                    <li>Verify vendors and users on our platform</li>
                    <li>Improve and personalize your shopping experience</li>
                    <li>Communicate order updates, promotions, and support messages</li>
                    <li>Prevent fraud and enhance platform security</li>
                    <li>Analyze platform usage and optimize performance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiUserGroup className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Data Sharing</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Verified vendors to fulfill your orders</li>
                    <li>Logistics partners for delivery services</li>
                    <li>Payment processors to handle transactions securely</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    <strong className="text-orange-600">We do NOT sell your personal data</strong> to third parties for marketing purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiLockClosed className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We implement industry-standard security measures to protect your information, 
                    including encryption, secure servers, and regular security audits. However, no 
                    method of transmission over the internet is 100% secure. While we strive to protect 
                    your personal data, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <FaCookie className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your browsing experience, 
                    analyze platform usage, and personalize content. You can control cookie preferences 
                    through your browser settings. Disabling cookies may affect certain features of our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Request deletion of your personal data (subject to legal obligations)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Links</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for the 
                privacy practices or content of these external sites. We encourage you to read their 
                privacy policies before providing any personal information.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Vefiri does not knowingly collect personal information from individuals under 18 years 
                of age. If you become aware that a child has provided us with personal data, please 
                contact us immediately.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Policy Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or legal requirements. Any updates will be posted on this page with a revised "Last Updated" 
                date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HiMail className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about this Privacy Policy or how we handle your data, 
                    please contact us:
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

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            By using Vefiri, you agree to our{" "}
            <Link href="/terms" className="text-orange-600 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}