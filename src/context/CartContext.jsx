"use client";
import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);

  const addToCart = (product, imgRect) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Trigger flying animation
    setFlyingItem({ ...product, imgRect });
    setTimeout(() => setFlyingItem(null), 800);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
      {/* <AnimatePresence>
        {flyingItem && (
          <motion.div
            className="fixed w-20 h-20 z-50 rounded-xl overflow-hidden pointer-events-none"
            style={{
              top: flyingItem.imgRect.top,
              left: flyingItem.imgRect.left,
            }}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{
              x: window.innerWidth - flyingItem.imgRect.left - 80,
              y: -flyingItem.imgRect.top + 20,
              scale: 0.3,
              opacity: 0.8,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={flyingItem.image}
              alt={flyingItem.name}
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        )}
      </AnimatePresence> */}
      // Inside CartProvider
<AnimatePresence>
  {flyingItem && (
    <motion.div
      className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
      style={{
        top: flyingItem.imgRect.top,
        left: flyingItem.imgRect.left,
      }}
      initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      animate={{
        // Fly towards top-right corner (where cart icon usually is)
        x: window.innerWidth - flyingItem.imgRect.left - 60,
        y: -flyingItem.imgRect.top + 80, // smoother curve upwards
        scale: 0.4,
        opacity: 0.7,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: window.innerWidth < 768 ? 1 : 0.8, // slower on mobile
        ease: "easeInOut",
      }}
    >
      <img
        src={flyingItem.image}
        alt={flyingItem.name}
        className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
      />
    </motion.div>
  )}
</AnimatePresence>

    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
