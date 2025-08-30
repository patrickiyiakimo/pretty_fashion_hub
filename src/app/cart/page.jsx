"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="py-32 text-center bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl mt-10 font-satisfy md:text-5xl font-extrabold text-purple-600 mb-6">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600  font-oswald text-2xl mb-8">
          Explore our collections and find your perfect style.
        </p>
        <Link
          href="/shop"
          className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-yellow-300 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white via-purple-50 to-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-satisfy pt-20 font-extrabold text-purple-700 mb-12 text-center">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6 bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative w-full md:w-32 h-32 md:h-36 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 12rem"
                className="object-cover"
              />
            </div>

            <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-oswald font-bold text-purple-600 mb-2">
                {item.name}
              </h2>
              <p className="text-yellow-400 font-extrabold text-xl md:text-2xl mb-4">
                ₦{item.price.toLocaleString()}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <div className="flex items-center border border-purple-300 rounded-lg shadow-inner overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg font-semibold text-purple-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-semibold hover:underline hover:text-red-600 transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="mt-12 md:mt-16 text-center md:text-right">
        <h3 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6">
          Total: ₦{total.toLocaleString()}
        </h3>
        <Link href="/checkout">
          <button className="bg-yellow-400 text-purple-900 px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-yellow-300 transition-all duration-300">
            Checkout
          </button>
        </Link>
      </div>
    </section>
  );
}
