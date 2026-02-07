// components/PreOrderProduct.jsx
'use client';

import { useState } from 'react';

export default function PreOrderProduct({ product, selectedVariant, onVariantSelect, quantity, onQuantityChange }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Product Images */}
      <div className="mb-6">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4">
          <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
            {/* Replace with actual image:
            <img 
              src={product.images[currentImage]} 
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            */}
          </div>
        </div>
        <div className="flex space-x-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-16 h-16 rounded border-2 ${
                currentImage === index ? 'border-blue-500' : 'border-gray-300'
              } bg-gray-200 flex items-center justify-center`}
            >
              <span className="text-xs text-gray-500">{index + 1}</span>
              {/* Replace with actual thumbnail:
              <img src={image} alt="" className="w-full h-full object-cover rounded" />
              */}
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {/* Price */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-3xl font-bold text-gray-900">₦{product.price}</span>
          <span className="text-xl text-gray-500 line-through">₦{product.originalPrice}</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
            Save ₦{(product.originalPrice - product.price).toFixed(2)}
          </span>
        </div>

        {/* Variants */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
          <div className="flex space-x-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => variant.available && onVariantSelect(variant)}
                disabled={!variant.available}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedVariant?.id === variant.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300'
                } ${
                  !variant.available
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-gray-400'
                }`}
                style={{ backgroundColor: variant.color }}
                title={variant.available ? variant.name : `${variant.name} - Out of Stock`}
              />
            ))}
          </div>
          {selectedVariant && (
            <p className="text-sm text-gray-600 mt-2">Selected: {selectedVariant.name}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Release Info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Pre-Order Information</span>
          </div>
          <div className="text-blue-700 text-sm space-y-1">
            <p className="flex justify-between">
              <span>Expected Release:</span>
              <span className="font-medium">{new Date(product.releaseDate).toLocaleDateString()}</span>
            </p>
            <p className="flex justify-between">
              <span>Estimated Shipping:</span>
              <span className="font-medium">{new Date(product.estimatedShipping).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}