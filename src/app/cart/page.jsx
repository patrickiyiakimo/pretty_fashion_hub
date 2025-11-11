// "use client";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity } = useCart();

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <section className="py-32 text-center bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col justify-center items-center">
//         <h1 className="text-4xl mt-10 font-satisfy md:text-5xl font-extrabold text-purple-600 mb-6">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600  font-oswald text-2xl mb-8">
//           Explore our collections and find your perfect style.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-yellow-300 transition-all duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white via-purple-50 to-white min-h-screen">
//       <h1 className="text-4xl md:text-5xl font-satisfy pt-20 font-extrabold text-purple-700 mb-12 text-center">
//         Your Cart
//       </h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col md:flex-row items-center gap-6 bg-white/30 backdrop-blur-lg p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
//           >
//             <div className="relative w-full md:w-32 h-32 md:h-36 rounded-2xl overflow-hidden shadow-lg">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 12rem"
//                 className="object-cover"
//               />
//             </div>

//             <div className="flex-1 w-full text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-oswald font-bold text-purple-600 mb-2">
//                 {item.name}
//               </h2>
//               <p className="text-yellow-400 font-extrabold text-xl md:text-2xl mb-4">
//                 ₦{item.price.toLocaleString()}
//               </p>

//               {/* Quantity Controls */}
//               <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
//                 <div className="flex items-center border border-purple-300 shadow-inner overflow-hidden">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                     }
//                     className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2 text-lg font-semibold text-purple-700">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 font-semibold hover:underline hover:text-red-600 transition-all duration-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Total */}
//       <div className="mt-12 md:mt-16 text-center md:text-right">
//         <h3 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6">
//           Total: ₦{total.toLocaleString()}
//         </h3>
//         <Link href="/checkout">
//           <button className="bg-yellow-400 text-purple-900 px-10 py-4 font-bold shadow-xl hover:bg-yellow-300 transition-all duration-300">
//             Checkout
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }










"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="py-32 text-center bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl mt-10 font-satisfy md:text-5xl font-extrabold text-purple-600 mb-6">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 font-oswald text-2xl mb-8">
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
            key={item.productId}
            className="flex flex-col md:flex-row items-center gap-6 bg-white/30 backdrop-blur-lg p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
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
                      updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                    }
                    className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg font-semibold text-purple-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
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

        <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4">
          <button
            onClick={clearCart}
            className="bg-red-400 text-white px-8 py-3 font-bold shadow-lg hover:bg-red-400 transition-all duration-300"
          >
            Clear Cart
          </button>

          <Link href="/checkout">
            <button className="bg-yellow-400 w-full text-purple-900 px-10 py-4 font-bold shadow-xl hover:bg-yellow-300 transition-all duration-300">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}






// "use client";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <section className="py-32 text-center bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col justify-center items-center">
//         <h1 className="text-4xl mt-10 font-satisfy md:text-5xl font-extrabold text-purple-600 mb-6">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600 font-oswald text-2xl mb-8">
//           Explore our collections and find your perfect style.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-yellow-300 transition-all duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white via-purple-50 to-white min-h-screen">
//       <h1 className="text-4xl md:text-5xl font-satisfy pt-20 font-extrabold text-purple-700 mb-12 text-center">
//         Your Cart
//       </h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {cart.map((item) => (
//           <div
//             key={item._id} // Use backend _id as key
//             className="flex flex-col md:flex-row items-center gap-6 bg-white/30 backdrop-blur-lg p-3 shadow-xl hover:shadow-2xl transition-all duration-500"
//           >
//             <div className="relative w-full md:w-32 h-32 md:h-36 rounded-2xl overflow-hidden shadow-lg">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 12rem"
//                 className="object-cover"
//               />
//             </div>

//             <div className="flex-1 w-full text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-oswald font-bold text-purple-600 mb-2">
//                 {item.name}
//               </h2>
//               <p className="text-yellow-400 font-extrabold text-xl md:text-2xl mb-4">
//                 ₦{item.price.toLocaleString()}
//               </p>

//               {/* Quantity Controls */}
//               <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
//                 <div className="flex items-center border border-purple-300 rounded-lg shadow-inner overflow-hidden">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item._id, Math.max(1, item.quantity - 1))
//                     }
//                     className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2 text-lg font-semibold text-purple-700">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     className="px-3 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 font-semibold hover:underline hover:text-red-600 transition-all duration-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Total */}
//       <div className="mt-12 md:mt-16 text-center md:text-right">
//         <h3 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6">
//           Total: ₦{total.toLocaleString()}
//         </h3>

//         <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4">
//           <button
//             onClick={clearCart}
//             className="bg-red-400 text-white px-8 py-3 font-bold shadow-lg hover:bg-red-400 transition-all duration-300"
//           >
//             Clear Cart
//           </button>

//           <Link href="/checkout">
//             <button className="bg-yellow-400 w-full text-purple-900 px-10 py-4 font-bold shadow-xl hover:bg-yellow-300 transition-all duration-300">
//               Checkout
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white py-32 px-6">
//         <h1 className="text-5xl font-satisfy font-extrabold text-purple-700 mb-6">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600 text-lg md:text-xl mb-8 font-oswald">
//           Browse our collection and find something you love.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-24 px-6 md:px-12">
//       <h1 className="text-center text-4xl md:text-5xl font-satisfy font-extrabold text-purple-700 mb-12">
//         Your Cart
//       </h1>

//       <div className="flex flex-col gap-8">
//         {cart.map((item) => (
//           <div
//             key={item._id}
//             className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
//           >
//             {/* Product Image */}
//             <div className="relative w-full md:w-48 h-64 md:h-48 flex-shrink-0">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 fill
//                 className="object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-transform duration-500 hover:scale-105"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
//               <div>
//                 <h2 className="text-2xl md:text-3xl font-oswald font-bold text-purple-700 mb-2">
//                   {item.name}
//                 </h2>
//                 <p className="text-yellow-500 font-extrabold text-xl md:text-2xl mb-4">
//                   ₦{item.price.toLocaleString()}
//                 </p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-4 mt-4">
//                   <div className="flex items-center border border-purple-300 rounded-full overflow-hidden">
//                     <button
//                       onClick={() =>
//                         updateQuantity(item._id, Math.max(1, item.quantity - 1))
//                       }
//                       className="px-4 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition-all duration-300"
//                     >
//                       -
//                     </button>
//                     <span className="px-6 py-2 text-lg font-semibold text-purple-700">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                       className="px-4 py-2 bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 transition-all duration-300"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-500 font-semibold hover:text-red-600 hover:underline transition-all duration-300"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Summary */}
//       <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-center bg-white rounded-3xl p-8 shadow-xl">
//         <h3 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6 md:mb-0">
//           Total: ₦{total.toLocaleString()}
//         </h3>

//         <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
//           <button
//             onClick={clearCart}
//             className="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-300 w-full md:w-auto"
//           >
//             Clear Cart
//           </button>

//           <Link href="/checkout" className="w-full md:w-auto">
//             <button className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-300 w-full md:w-auto">
//               Checkout
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }






// "use client";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-32 px-6">
//         <h1 className="text-5xl font-satisfy font-extrabold text-purple-700 mb-6">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600 text-lg md:text-xl mb-8 font-oswald">
//           Browse our collection and find something you love.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-100 py-40 px-6 md:px-12">
//       <h1 className="text-4xl md:text-5xl font-satisfy font-extrabold text-purple-700 mb-12 text-center">
//         Shopping Cart
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Column: Products */}
//         <div className="flex-1 flex flex-col gap-6">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
//             >
//               <div className="relative w-200 h-200 md:w-48 h-48 md:h-40 flex-shrink-0">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//                 />
//               </div>
//               <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
//                 <div>
//                   <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-2">
//                     {item.name}
//                   </h2>
//                   <p className="text-yellow-500 font-extrabold text-lg md:text-xl mb-4">
//                     ₦{item.price.toLocaleString()}
//                   </p>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center gap-4 mt-4">
//                     <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
//                       <button
//                         onClick={() =>
//                           updateQuantity(item._id, Math.max(1, item.quantity - 1))
//                         }
//                         className="px-4 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all duration-300"
//                       >
//                         -
//                       </button>
//                       <span className="px-6 py-2 text-lg font-semibold text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                         className="px-4 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all duration-300"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 font-semibold hover:text-red-600 hover:underline transition-all duration-300"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Column: Summary */}
//         <div className="lg:w-96 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 sticky top-6 h-fit">
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">Order Summary</h2>
//           <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
//             {cart.map((item) => (
//               <div key={item._id} className="flex justify-between items-center">
//                 <span className="text-gray-700">{item.name} x {item.quantity}</span>
//                 <span className="font-bold text-yellow-500">₦{(item.price * item.quantity).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between items-center border-t border-gray-300 pt-4">
//             <span className="font-semibold text-lg text-purple-700">Total:</span>
//             <span className="text-xl font-extrabold text-yellow-500">₦{total.toLocaleString()}</span>
//           </div>

//           <button
//             className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-6 py-4 font-bold shadow-lg hover:scale-105 transform transition-all duration-300 w-full"
//           >
//             Proceed to Checkout
//           </button>
//           <button
//             onClick={clearCart}
//             className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-4 font-bold shadow-lg hover:scale-105 transform transition-all duration-300 w-full"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-32 px-6">
//         <h1 className="text-5xl font-satisfy font-extrabold text-purple-700 mb-6">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600 text-lg md:text-xl mb-8 font-oswald">
//           Browse our collection and find something you love.
//         </p>
//         <Link
//           href="/shop"
//           className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-100 py-24 px-4 md:px-12">
//       <h1 className="text-4xl md:text-5xl font-satisfy font-extrabold text-purple-700 mb-12 text-center">
//         Shopping Cart
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Column: Products */}
//         <div className="flex-1 flex flex-col gap-4">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-3xl mx-auto"
//             >
//               {/* Product Image */}
//               <div className="relative w-[300px] h-[300px] flex-shrink-0">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
//                 <div>
//                   <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-2">
//                     {item.name}
//                   </h2>
//                   <p className="text-yellow-500 font-extrabold text-lg md:text-xl mb-4">
//                     ₦{item.price.toLocaleString()}
//                   </p>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center gap-4 mt-4">
//                     <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
//                       <button
//                         onClick={() =>
//                           updateQuantity(item._id, Math.max(1, item.quantity - 1))
//                         }
//                         className="px-4 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all duration-300"
//                       >
//                         -
//                       </button>
//                       <span className="px-6 py-2 text-lg font-semibold text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                         className="px-4 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all duration-300"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 font-semibold hover:text-red-600 hover:underline transition-all duration-300"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Column: Summary */}
//         <div className="lg:w-96 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 sticky top-6 h-fit max-w-full mx-auto">
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">Order Summary</h2>
//           <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
//             {cart.map((item) => (
//               <div key={item._id} className="flex justify-between items-center">
//                 <span className="text-gray-700">{item.name} x {item.quantity}</span>
//                 <span className="font-bold text-yellow-500">
//                   ₦{(item.price * item.quantity).toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between items-center border-t border-gray-300 pt-4">
//             <span className="font-semibold text-lg text-purple-700">Total:</span>
//             <span className="text-xl font-extrabold text-yellow-500">
//               ₦{total.toLocaleString()}
//             </span>
//           </div>

//           <button
//             className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-6 py-4 font-bold shadow-lg hover:scale-105 transform transition-all duration-300 w-full"
//           >
//             Proceed to Checkout
//           </button>
//           <button
//             onClick={clearCart}
//             className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 font-bold shadow-lg hover:scale-105 transform transition-all duration-300 w-full"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
