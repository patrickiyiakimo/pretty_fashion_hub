// app/kings-stylez/page.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Product data
const products = {
  shoes: [
    {
      id: 'ks-shoe-001',
      name: 'Kingz-Stylez Urban Pro',
      category: 'Shoes',
      price: 12000,
    //   originalPrice: 159.99,
      image: '/images/shoe-1.webp',
      colors: ['Black', 'White', 'Red'],
      features: ['Premium leather', 'Memory foam insole', 'Anti-slip sole'],
      badge: 'Best Seller'
    },
    {
      id: 'ks-shoe-002',
      name: 'Street King Sneakers',
      category: 'Shoes',
      price: 89000,
    //   originalPrice: 119.99,
      image: '/images/shoe-2.jpg',
      colors: ['Gray', 'Blue', 'Green'],
      features: ['Breathable mesh', 'Lightweight design', 'Cushioned heel'],
      badge: 'New'
    },
    {
      id: 'ks-shoe-003',
      name: 'Royal Edition Loafers',
      category: 'Shoes',
      price: 14000,
    //   originalPrice: 189.99,
      image: '/images/shoe-3.jpg',
      colors: ['Brown', 'Black', 'Burgundy'],
      features: ['Genuine leather', 'Hand-stitched', 'Premium finish']
    }
  ],
  caps: [
    {
      id: 'ks-cap-001',
      name: 'Kingz Crown Snapback',
      category: 'Caps',
      price: 34000,
    //   originalPrice: 44.99,
      image: '/images/bag-2.webp',
      colors: ['Black', 'White', 'Red'],
      features: ['Adjustable strap', 'Embroidered logo', 'Premium cotton'],
      badge: 'Limited Edition'
    },
    {
      id: 'ks-cap-002',
      name: 'Urban King Baseball Cap',
      category: 'Caps',
      price: 29000,
    //   originalPrice: 39.99,
      image: '/images/bag-3.webp',
      colors: ['Navy', 'Gray', 'Olive'],
      features: ['Curved brim', 'Moisture-wicking', 'Structured crown']
    }
  ],
  jackets: [
    {
      id: 'ks-jacket-001',
      name: 'Kingz Bomber Jacket',
      category: 'Jackets',
      price: 89000,
    //   originalPrice: 119.99,
      image: '/images/shirt-man-1.jpg',
      colors: ['Black', 'Olive', 'Navy'],
      features: ['Water-resistant', 'Ribbed cuffs', 'Multiple pockets'],
      badge: 'Popular'
    },
    {
      id: 'ks-jacket-002',
      name: 'Royal Puffer Jacket',
      category: 'Jackets',
      price: 12000,
    //   originalPrice: 159.99,
      image: '/images/shirt-man-2.jpg',
      colors: ['Black', 'Gray', 'Burgundy'],
      features: ['Thermal insulation', 'Detachable hood', 'Windproof']
    }
  ],
  trousers: [
    {
      id: 'ks-trouser-001',
      name: 'Kingz Signature Joggers',
      category: 'Trousers',
      price: 59000,
    //   originalPrice: 79.99,
      image: '/images/slippers-1.jpg',
      colors: ['Black', 'Gray', 'Navy'],
      features: ['Elastic waistband', 'Drawstring', 'Zipper pockets'],
      badge: 'Trending'
    },
    {
      id: 'ks-trouser-002',
      name: 'Urban Fit Chinos',
      category: 'Trousers',
      price: 69000,
    //   originalPrice: 89.99,
      image: '/images/shoe-4.jpg',
      colors: ['Khaki', 'Navy', 'Olive'],
      features: ['Slim fit', 'Stretch fabric', 'Modern cut']
    }
  ]
};

export default function KingzStylezPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'All Products', count: Object.values(products).flat().length },
    { id: 'shoes', name: 'Shoes', count: products.shoes.length },
    { id: 'caps', name: 'Caps', count: products.caps.length },
    { id: 'jackets', name: 'Jackets', count: products.jackets.length },
    { id: 'trousers', name: 'Trousers', count: products.trousers.length }
  ];

  const getFilteredProducts = () => {
    if (activeCategory === 'all') {
      return Object.values(products).flat();
    }
    return products[activeCategory] || [];
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Kingz<span className="text-purple-400">-</span>Stylez
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Elevate your streetwear game with premium quality, bold designs, and unmatched style. 
              Where urban fashion meets royal elegance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#products" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1">
                Shop Collection
              </a>
              <Link 
                href="/pre-order" 
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Pre-Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg transform -translate-y-1'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Product Image</span>
                    {/* Replace with actual Image component: */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                   
                  </div>
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs text-purple-600 font-semibold uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Colors:</span>
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                         color.toLowerCase() === 'white' ? '#fff' :
                                         color.toLowerCase() === 'red' ? '#ef4444' :
                                         color.toLowerCase() === 'gray' ? '#9ca3af' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'green' ? '#10b981' :
                                         color.toLowerCase() === 'brown' ? '#92400e' :
                                         color.toLowerCase() === 'burgundy' ? '#7f1d1d' :
                                         color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                         color.toLowerCase() === 'olive' ? '#3f6212' :
                                         color.toLowerCase() === 'khaki' ? '#d97706' : '#e5e7eb'
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₦{product.price}</span>
                      {/* {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )} */}
                    </div>
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our signature pieces that define the Kingz-Stylez aesthetic
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Street Royalty Collection</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Limited edition pieces featuring premium materials and exclusive designs. 
                    Each item is crafted for those who lead in style.
                  </p>
                  <Link 
                    href="/pre-order" 
                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    Pre-Order Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {products.shoes.slice(0, 2).map((shoe) => (
                <div key={shoe.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 flex items-center justify-center">
                    {/* <span className="text-gray-500 text-sm">Featured</span> */}
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      width={150}
                      height={150}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900">{shoe.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{shoe.features[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                description: 'Crafted with the finest materials for durability and comfort',
                icon: '🌟'
              },
              {
                title: 'Exclusive Designs',
                description: 'Unique patterns and styles you won\'t find anywhere else',
                icon: '🎨'
              },
              {
                title: 'Free Shipping',
                description: 'Free delivery on all orders over $100',
                icon: '🚚'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{quickViewProduct.name}</h3>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  {/* <span className="text-gray-500">Product Image</span> */}
                  <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    width={400}
                    height={400}
                    className="object-cover rounded-xl"
                  />
                </div>
                
                <div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">
                      Premium quality {quickViewProduct.category.toLowerCase()} featuring the latest in urban fashion design.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Features</h4>
                    <ul className="space-y-2">
                      {quickViewProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">₦{quickViewProduct.price}</div>
                      {quickViewProduct.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">₦{quickViewProduct.originalPrice}</div>
                      )}
                    </div>
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Rule the Streets?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of style kings who have elevated their wardrobe with Kingz-Stylez.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/pre-order" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
            <button className="border-2 border-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
              View Lookbook
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}