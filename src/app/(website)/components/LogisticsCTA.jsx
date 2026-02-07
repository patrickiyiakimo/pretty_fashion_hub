// components/LogisticsCTA.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LogisticsCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex md:items-center md:justify-between p-8 md:p-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Become a Kingz-World Logistics Partner
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-6 max-w-3xl">
                Earn money by delivering Kingz-Stylez products to customers in your area. 
                Join our growing network of logistics partners and help us provide exceptional 
                delivery service across the region.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-white mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold">1</span>
                    </div>
                    <h3 className="font-semibold">Flexible Schedule</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Work on your own time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-white mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold">2</span>
                    </div>
                    <h3 className="font-semibold">Good Earnings</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Competitive delivery fees</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-white mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold">3</span>
                    </div>
                    <h3 className="font-semibold">Easy Onboarding</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Quick and simple process</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 md:pl-8">
              <div 
                className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg 
                      className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Start Earning Today</h3>
                  <p className="text-gray-600 text-sm mt-1">Join our logistics team</p>
                </div>
                
                <Link 
                  href="/logistics"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </Link>
                
                <p className="text-gray-500 text-xs text-center mt-4">
                  Average earnings: ₦30,000 - ₦70,000 per Month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}