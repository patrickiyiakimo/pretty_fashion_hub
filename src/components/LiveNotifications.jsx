"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiShoppingBag, 
  HiTruck, 
  HiGift, 
  HiSparkles, 
  HiClock,
  HiCheckCircle,
  HiFire,
  HiStar
} from "react-icons/hi";

// Premium notification data with enhanced content
const notifications = [
  { id: 1, text: "Chika from Lagos just purchased a Luxury Handbag 👜", icon: HiShoppingBag, type: "purchase", location: "Lagos", time: "2 min ago" },
  { id: 2, text: "Order successfully delivered to Abuja 🚚", icon: HiTruck, type: "delivery", location: "Abuja", time: "5 min ago" },
  { id: 3, text: "Amaka from Enugu ordered Premium Heels 👠", icon: HiShoppingBag, type: "purchase", location: "Enugu", time: "8 min ago" },
  { id: 4, text: "New Luxury Collection Just Dropped! ✨", icon: HiSparkles, type: "announcement", location: "Featured", time: "10 min ago" },
  { id: 5, text: "Delivery completed in Port Harcourt 🎉", icon: HiCheckCircle, type: "delivery", location: "Port Harcourt", time: "12 min ago" },
  { id: 6, text: "Tunde from Ibadan ordered Designer Sneakers 👟", icon: HiShoppingBag, type: "purchase", location: "Ibadan", time: "15 min ago" },
  { id: 7, text: "Ada from Owerri purchased Silk Scarf Collection 🧣", icon: HiShoppingBag, type: "purchase", location: "Owerri", time: "18 min ago" },
  { id: 8, text: "Customer in Benin City received premium package 📦", icon: HiTruck, type: "delivery", location: "Benin City", time: "20 min ago" },
  { id: 9, text: "Limited Edition Dresses Now Available! 👗", icon: HiFire, type: "announcement", location: "Exclusive", time: "22 min ago" },
  { id: 10, text: "Express delivery completed in Kano 🚛", icon: HiTruck, type: "delivery", location: "Kano", time: "25 min ago" },
  { id: 11, text: "Ngozi from Asaba bought Designer Tote Bag 👜", icon: HiShoppingBag, type: "purchase", location: "Asaba", time: "28 min ago" },
  { id: 12, text: "Premium Watch Collection Restocked ⌚", icon: HiSparkles, type: "restock", location: "Accessories", time: "30 min ago" },
  { id: 13, text: "Efe from Warri received luxury shoe order 👠", icon: HiCheckCircle, type: "delivery", location: "Warri", time: "32 min ago" },
  { id: 14, text: "Funmi from Lagos Island ordered Denim Jacket 🧥", icon: HiShoppingBag, type: "purchase", location: "Lagos Island", time: "35 min ago" },
  { id: 15, text: "New Ankara Gown Collection Live! 💃", icon: HiFire, type: "announcement", location: "African Wear", time: "38 min ago" },
  { id: 16, text: "Gift package delivered in Ilorin 🎁", icon: HiGift, type: "delivery", location: "Ilorin", time: "40 min ago" },
  { id: 17, text: "Sarah from Calabar ordered Premium Heels 👠", icon: HiShoppingBag, type: "purchase", location: "Calabar", time: "42 min ago" },
  { id: 18, text: "Order delivered successfully in Uyo 🚚", icon: HiTruck, type: "delivery", location: "Uyo", time: "45 min ago" },
  { id: 19, text: "David from Jos purchased Luxury Polo Shirt 👕", icon: HiShoppingBag, type: "purchase", location: "Jos", time: "48 min ago" },
  { id: 20, text: "Men's Premium Collection Just Launched 🧍‍♂️", icon: HiSparkles, type: "announcement", location: "Men's Wear", time: "50 min ago" },
];

export default function LiveNotifications() {
  const [activeNotification, setActiveNotification] = useState(null);
  const [notificationQueue, setNotificationQueue] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationQueue.length === 0) {
        const shuffled = [...notifications].sort(() => 0.5 - Math.random());
        setNotificationQueue(shuffled.slice(0, 5));
      }
      
      const nextNotification = notificationQueue[0];
      if (nextNotification) {
        setActiveNotification(nextNotification);
        setNotificationQueue(prev => prev.slice(1));
        
        // Auto-remove after display duration
        setTimeout(() => {
          setActiveNotification(null);
        }, 5000);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [notificationQueue]);

  const getNotificationStyle = (type) => {
    switch (type) {
      case "purchase":
        return { border: "border-l-blue-500", bg: "bg-blue-50", icon: "text-blue-600" };
      case "delivery":
        return { border: "border-l-green-500", bg: "bg-green-50", icon: "text-green-600" };
      case "announcement":
        return { border: "border-l-purple-500", bg: "bg-purple-50", icon: "text-purple-600" };
      case "restock":
        return { border: "border-l-orange-500", bg: "bg-orange-50", icon: "text-orange-600" };
      default:
        return { border: "border-l-gray-500", bg: "bg-gray-50", icon: "text-gray-600" };
    }
  };

  return (
    <div className="fixed top-24 right-6 z-50">
      <AnimatePresence mode="popLayout">
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
            className={`relative mb-4 w-80 rounded-xl shadow-2xl border-l-4 ${
              getNotificationStyle(activeNotification.type).border
            } ${
              getNotificationStyle(activeNotification.type).bg
            } backdrop-blur-sm bg-white/95 border border-gray-200/50 overflow-hidden`}
          >
            {/* Header with location and time */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${
                  getNotificationStyle(activeNotification.type).bg
                }`}>
                  <activeNotification.icon className={`w-4 h-4 ${
                    getNotificationStyle(activeNotification.type).icon
                  }`} />
                </div>
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  {activeNotification.location}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <HiClock className="w-3 h-3" />
                <span className="text-xs">{activeNotification.time}</span>
              </div>
            </div>

            {/* Notification content */}
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                {activeNotification.text}
              </p>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className={`h-1 ${
                getNotificationStyle(activeNotification.type).border.replace("border-l-", "bg-")
              } origin-left`}
            />

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification indicator when no active notification */}
      <AnimatePresence>
        {!activeNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50"
          >
            <div className="relative">
              <HiSparkles className="w-4 h-4 text-purple-600" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-purple-600/20 rounded-full"
              />
            </div>
            <span className="text-xs font-medium text-gray-700">Live Activity</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
