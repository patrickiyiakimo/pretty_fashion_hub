"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  HiEye, 
  HiVolumeUp, 
  HiKeyboard, 
  HiGlobeAlt,
  HiMail,
  HiShieldCheck,
  HiUserGroup,
  HiDesktopComputer,
  HiPhone,
  HiAdjustments,
  HiZoomIn,
  HiLightBulb
} from "react-icons/hi";
import { FaKeyboard } from "react-icons/fa";

export default function AccessibilityPage() {
  const currentYear = new Date().getFullYear();

  const accessibilityFeatures = [
    {
      icon: <HiEye className="w-5 h-5" />,
      title: "Visual Accessibility",
      description: "We support screen readers, high contrast modes, and text resizing for users with visual impairments.",
      items: ["Screen reader compatibility", "High contrast support", "Text resizing up to 200%", "Alternative text for images"]
    },
    {
      icon: <FaKeyboard className="w-5 h-5" />,
      title: "Keyboard Navigation",
      description: "Our website can be fully navigated using a keyboard for users with motor disabilities.",
      items: ["Tab key navigation", "Skip to content links", "Focus indicators", "No keyboard traps"]
    },
    {
      icon: <HiVolumeUp className="w-5 h-5" />,
      title: "Hearing Accessibility",
      description: "We provide alternatives for audio and video content to accommodate users with hearing impairments.",
      items: ["Captions for videos", "Transcripts for audio content", "Visual notifications", "Text alternatives"]
    },
    {
      icon: <HiDesktopComputer className="w-5 h-5" />,
      title: "Cognitive Accessibility",
      description: "We design our interface to be clear, consistent, and easy to understand for all users.",
      items: ["Simple language", "Consistent layout", "Clear error messages", "Predictable navigation"]
    }
  ];

  const complianceStandards = [
    {
      standard: "WCAG 2.1 Level AA",
      status: "Partially Compliant",
      color: "bg-yellow-100 text-yellow-800",
      description: "We strive to meet WCAG 2.1 Level AA standards across our platform."
    },
    {
      standard: "Section 508",
      status: "In Progress",
      color: "bg-blue-100 text-blue-800",
      description: "Working towards full Section 508 compliance for federal accessibility."
    },
    {
      standard: "EN 301 549",
      status: "In Progress",
      color: "bg-blue-100 text-blue-800",
      description: "Aligning with European accessibility standards."
    }
  ];

  const supportedAssistiveTech = [
    "NVDA Screen Reader",
    "JAWS",
    "VoiceOver (macOS/iOS)",
    "TalkBack (Android)",
    "ChromeVox",
    "ZoomText",
    "Dragon Naturally Speaking"
  ];

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
            <HiEye className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Inclusive Design
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Accessibility Statement
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
            {/* Our Commitment */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Commitment to Accessibility</h2>
                  <p className="text-gray-600 leading-relaxed">
                    At Vefiri, we are committed to ensuring that our marketplace is accessible to everyone, 
                    regardless of ability or technology. We believe that everyone deserves equal access to 
                    quality products and services. We continuously work to improve our platform's accessibility 
                    and welcome feedback from our users.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accessibilityFeatures.map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Standards */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Compliance Standards</h2>
              <div className="space-y-4">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-900">{standard.standard}</span>
                      <p className="text-sm text-gray-500 mt-1">{standard.description}</p>
                    </div>
                    <span className={`mt-2 sm:mt-0 inline-flex px-3 py-1 rounded-full text-xs font-medium ${standard.color}`}>
                      {standard.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Assistive Technologies */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supported Assistive Technologies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our platform is tested and optimized for compatibility with the following assistive technologies:
              </p>
              <div className="flex flex-wrap gap-2">
                {supportedAssistiveTech.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Browser & Device Support */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser & Device Support</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We support the latest versions of major browsers and ensure our platform works across various devices:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiDesktopComputer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Chrome</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiDesktopComputer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Firefox</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiDesktopComputer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Safari</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiDesktopComputer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Edge</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiPhone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">iOS</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiPhone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Android</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiAdjustments className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Tablets</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <HiZoomIn className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Screen Readers</p>
                </div>
              </div>
            </div>

            {/* Tips for Better Experience */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tips for Better Accessibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <HiZoomIn className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Zoom In/Out</p>
                    <p className="text-sm text-gray-500">Press Ctrl + (Windows) or Cmd + (Mac) to zoom in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaKeyboard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Keyboard Navigation</p>
                    <p className="text-sm text-gray-500">Use Tab to navigate, Enter to select</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <HiLightBulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">High Contrast</p>
                    <p className="text-sm text-gray-500">Enable high contrast in your device settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <HiVolumeUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Screen Reader</p>
                    <p className="text-sm text-gray-500">Use built-in screen readers on your device</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback & Contact */}
            <div className="border-t border-gray-100 pt-6">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HiMail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback & Assistance</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      We are continuously working to improve our accessibility. If you experience any 
                      difficulties accessing our platform or have suggestions for improvement, please contact us.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">📧 Email: accessibility@vefiri.com</p>
                      <p className="text-sm text-gray-700">📞 Phone: +234 800 000 0000</p>
                      <p className="text-sm text-gray-700">📍 Address: Lagos, Nigeria</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 italic">
                      We aim to respond to accessibility feedback within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ongoing Improvements */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing Improvements</h2>
              <p className="text-gray-600 leading-relaxed">
                We are actively working on the following accessibility improvements:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
                <li>Enhanced screen reader support for product descriptions</li>
                <li>Improved color contrast for better readability</li>
                <li>Alternative text for all product images</li>
                <li>Simplified checkout process</li>
                <li>Voice navigation support</li>
                <li>Customizable text sizing options</li>
              </ul>
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
          <span className="text-gray-300">•</span>
          <Link 
            href="/cookies" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            Cookies Policy
          </Link>
        </motion.div>
      </div>
    </div>
  );
}