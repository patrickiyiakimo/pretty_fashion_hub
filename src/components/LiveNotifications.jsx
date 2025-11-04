"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaBoxOpen, FaShoppingBag, FaTshirt, FaGift, FaTruck } from "react-icons/fa";

const Bell = FaBell;
const PackageCheck = FaBoxOpen;
const ShoppingBag = FaShoppingBag;

// ✅ 50 unique, professional, and localized notifications
const notifications = [
  { id: 1, text: "Chika from Lagos just bought a Luxury Handbag 👜", icon: ShoppingBag },
  { id: 2, text: "Order delivered to Abuja 🚚💨", icon: PackageCheck },
  { id: 3, text: "Amaka from Enugu just placed an order for Heels 👠", icon: ShoppingBag },
  { id: 4, text: "New arrivals just dropped! Don’t miss out 👗", icon: Bell },
  { id: 5, text: "Delivery completed in Port Harcourt 🎉", icon: PackageCheck },
  { id: 6, text: "Tunde from Ibadan ordered a pair of sneakers 👟", icon: ShoppingBag },
  { id: 7, text: "Ada from Owerri just purchased a Silk Scarf 🧣", icon: ShoppingBag },
  { id: 8, text: "Customer in Benin City received their order 📦", icon: PackageCheck },
  { id: 9, text: "New Limited Edition Dress now available 👗✨", icon: Bell },
  { id: 10, text: "Delivery completed in Kano State 🚛", icon: PackageCheck },
  { id: 11, text: "Ngozi from Asaba just bought a Tote Bag 👜", icon: ShoppingBag },
  { id: 12, text: "Premium wristwatches just restocked ⌚", icon: Bell },
  { id: 13, text: "Efe from Warri received her shoe order 👠", icon: PackageCheck },
  { id: 14, text: "Funmi from Lagos Island ordered a Denim Jacket 🧥", icon: ShoppingBag },
  { id: 15, text: "New collection alert! Ankara gowns live now 💃", icon: Bell },
  { id: 16, text: "Gift delivery completed in Ilorin 🎁", icon: PackageCheck },
  { id: 17, text: "Sarah from Calabar ordered a pair of heels 👠", icon: ShoppingBag },
  { id: 18, text: "Order delivered successfully in Uyo 🚚", icon: PackageCheck },
  { id: 19, text: "David from Jos just bought a Polo Shirt 👕", icon: FaTshirt },
  { id: 20, text: "Fresh arrivals for men just launched 🧍‍♂️", icon: Bell },
  { id: 21, text: "Kemi from Abeokuta purchased a Designer Bag 👜", icon: ShoppingBag },
  { id: 22, text: "Express delivery completed in Minna 🚛", icon: FaTruck },
  { id: 23, text: "Uche from Onitsha ordered Classic Loafers 👞", icon: ShoppingBag },
  { id: 24, text: "Vera from Owerri just received her Jewelry order 💍", icon: PackageCheck },
  { id: 25, text: "🔥 Trending: Summer Collection now in store!", icon: Bell },
  { id: 26, text: "New bag collection available in stock 👜", icon: ShoppingBag },
  { id: 27, text: "Order completed in Ado-Ekiti successfully ✅", icon: PackageCheck },
  { id: 28, text: "Blessing from Nsukka just ordered Sunglasses 🕶️", icon: ShoppingBag },
  { id: 29, text: "Caleb from Lagos just grabbed a Hoodie 🧥", icon: ShoppingBag },
  { id: 30, text: "Delivery confirmed in Yola 🚚💨", icon: PackageCheck },
  { id: 31, text: "Customer from Akure ordered a Leather Purse 👛", icon: ShoppingBag },
  { id: 32, text: "Fresh stock alert: African Prints now available 🪡", icon: Bell },
  { id: 33, text: "Order delivered in Bauchi successfully 🎉", icon: PackageCheck },
  { id: 34, text: "Lilian from Makurdi bought a Classic Wristwatch ⌚", icon: ShoppingBag },
  { id: 35, text: "Delivery truck just left our warehouse 🚚", icon: FaTruck },
  { id: 36, text: "Ope from Ibadan purchased a Handcrafted Shoe 👞", icon: ShoppingBag },
  { id: 37, text: "Ruth from Lagos received her weekend dress 👗", icon: PackageCheck },
  { id: 38, text: "Gift Box shipment arrived in Calabar 🎁", icon: FaGift },
  { id: 39, text: "Exclusive offer: Buy 2 Get 1 Free 👚👗", icon: Bell },
  { id: 40, text: "Femi from Abuja just bought a Smartwatch ⌚", icon: ShoppingBag },
  { id: 41, text: "Shipment to Kano successfully delivered 📦", icon: PackageCheck },
  { id: 42, text: "Patience from Enugu ordered a Leather Jacket 🧥", icon: ShoppingBag },
  { id: 43, text: "Fresh stock: Designer heels restocked 👠", icon: Bell },
  { id: 44, text: "Goods delivered to Owerri branch 🚛", icon: PackageCheck },
  { id: 45, text: "Peace from Aba purchased a Maxi Gown 💃", icon: ShoppingBag },
  { id: 46, text: "New bag design now trending across Nigeria 👜", icon: Bell },
  { id: 47, text: "Customer from Lokoja confirmed package delivery 🎉", icon: PackageCheck },
  { id: 48, text: "Moses from Benin City ordered a pair of slides 🩴", icon: ShoppingBag },
  { id: 49, text: "Latest collection for 2025 just arrived ✨", icon: Bell },
  { id: 50, text: "Order delivered to customer in Kaduna 🏆", icon: PackageCheck },
];

export default function LiveNotifications() {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = notifications[Math.floor(Math.random() * notifications.length)];
      setActiveNotification(random);

      // Hide after 4 seconds
      setTimeout(() => setActiveNotification(null), 4000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-4 sm:left-8 z-50">
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow-lg px-2 py-3 max-w-xs border border-gray-100 dark:border-gray-700"
          >
            <div className="p-2 bg-yellow-100 dark:bg-yellow-600 rounded-full">
              <activeNotification.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-200" />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-100 font-medium leading-tight">
              {activeNotification.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
