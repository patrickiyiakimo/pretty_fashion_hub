// app/pre-order/page.jsx
'use client';

import { useState } from 'react';
import Footer from '../components/Footer';
import PreOrderProduct from '../components/PreOrderProduct';
import PreOrderBenefits from '../components/PreOrderBenefits';
import PreOrderForm from '../components/PreOrderForm';

export default function PreOrderPage() {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Sample product data - replace with your actual product data
  const product = {
    id: 'prod-001',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our next-generation wireless headphones featuring advanced noise cancellation and 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      '/images/bag-3.webp',
      '/images/bag-2.webp',
      '/images/bag-2.jpg'
    ],
    variants: [
      { id: 'var-1', name: 'Black', color: '#000000', available: true },
      { id: 'var-2', name: 'Silver', color: '#C0C0C0', available: true },
      { id: 'var-3', name: 'Space Gray', color: '#717378', available: false }
    ],
    releaseDate: '2026-03-15',
    estimatedShipping: '2026-03-20',
    // features: [
    //   'Active Noise Cancellation',
    //   '30-hour battery life',
    //   'Quick charge (15 min = 5 hours)',
    //   'Premium build materials',
    //   'Voice assistant compatible'
    // ]
  };

  const handlePreOrder = async (formData) => {
    // Handle pre-order submission
    console.log('Pre-order submitted:', {
      product: product.name,
      variant: selectedVariant,
      quantity,
      customer: formData
    });
    
    // Add your API call here
    try {
      const response = await fetch('/api/pre-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product.name,
          variant: selectedVariant,
          quantity,
          customer: formData,
          total: product.price * quantity
        })
      });

      if (response.ok) {
        // Handle success
        alert('Pre-order submitted successfully!');
      } else {
        // Handle error
        alert('Failed to submit pre-order. Please try again.');
      }
    } catch (error) {
      console.error('Pre-order submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pre-Order Now
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be the first to experience our latest innovation. Reserve your unit today and enjoy exclusive early-bird benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Display */}
          <PreOrderProduct 
            product={product}
            selectedVariant={selectedVariant}
            onVariantSelect={setSelectedVariant}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          {/* Pre-order Form */}
          <PreOrderForm 
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            onSubmit={handlePreOrder}
          />
        </div>

        {/* Benefits Section */}
        <PreOrderBenefits />

        {/* Product Features */}
        {/* <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                When will my pre-order ship?
              </h3>
              <p className="text-gray-600">
                All pre-orders are expected to ship on {new Date(product.estimatedShipping).toLocaleDateString()}. You will receive a tracking email as soon as your order ships.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                When will I be charged?
              </h3>
              <p className="text-gray-600">
                Your payment method will be authorized when you place your pre-order, but you won't be charged until your order actually ships.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I cancel my pre-order?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your pre-order at any time before it ships by contacting our customer service team.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}