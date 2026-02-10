// app/pre-order/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import PreOrderProduct from '../components/PreOrderProduct';
import PreOrderBenefits from '../components/PreOrderBenefits';
import PreOrderForm from '../components/PreOrderForm';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function PreOrderPage() {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check authentication on page load
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      toast.error("Please login to place a pre-order");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setAuthChecked(true);
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => router.push("/login"), 1500);
    }
  };

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
  };

  const handlePreOrder = async (formData) => {
    if (!user) {
      toast.error("Please login to place a pre-order");
      router.push("/login");
      return;
    }

    // Validate form data
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const preOrderData = {
        product: product.name,
        productId: product.id,
        variant: selectedVariant,
        quantity,
        customer: {
          ...formData,
          userId: user._id || user.id,
          email: user.email,
          name: user.name || `${formData.firstName} ${formData.lastName}`
        },
        total: product.price * quantity,
        status: 'pending',
        estimatedShipping: product.estimatedShipping
      };

      console.log('Pre-order submitted:', preOrderData);
      
      // Add your API call here
      const response = await fetch(`${API_ENDPOINT}/api/pre-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preOrderData)
      });

      if (response.status === 401) {
        // Token expired
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setTimeout(() => router.push("/login"), 1500);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit pre-order: ${response.status}`);
      }

      const data = await response.json();
      
      toast.success('Pre-order submitted successfully!', {
        duration: 5000,
        icon: '🎉'
      });
      
      // You could redirect to a confirmation page
      // router.push(`/pre-order/confirmation/${data.orderId}`);

    } catch (error) {
      console.error('Pre-order submission error:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Toaster position="top-right" />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Checking authentication...</p> */}
        </div>
      </div>
    );
  }

  // Show message if not logged in
  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Toaster position="top-right" />
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to place a pre-order</p>
          <p className="text-gray-500 text-sm mb-6">Pre-orders are exclusive to registered members</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login to Continue
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <Toaster position="top-right" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Early Access Pre-Order</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pre-Order Now
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            Welcome back, <span className="font-semibold text-blue-600">{user.name || user.email}</span>!
          </p>
          <p className="text-gray-600">
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
            user={user}
            loading={loading}
            onSubmit={handlePreOrder}
          />
        </div>

        {/* Benefits Section */}
        <PreOrderBenefits />

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
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Do I need an account to pre-order?
              </h3>
              <p className="text-gray-600">
                Yes, pre-orders are exclusive to registered members. This helps us manage orders and provide better customer service.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}