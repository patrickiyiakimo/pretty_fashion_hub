"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you ${formData.name}! Your order of ₦${total.toLocaleString()} has been received.`
    );
    // Here you could integrate payment gateway or backend order creation
  };

  if (cart.length === 0) {
    return (
      <section className="py-20 pt-20 text-center">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Please add some items before checking out.</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-12 bg-white/5 backdrop-blur-sm min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-500 mb-12 text-center">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Cart Summary */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 mb-4 bg-white/10 p-3 rounded-2xl shadow-md"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-purple-500 font-semibold">{item.name}</h3>
                <p className="text-yellow-400 font-bold">
                  ₦{item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h3 className="text-2xl font-bold text-purple-600">
              Total: ₦{total.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
            Shipping Details
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            className="p-4 rounded-xl border-2 border-purple-600 bg-white/10 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 transition"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-4 bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-yellow-300 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
}
