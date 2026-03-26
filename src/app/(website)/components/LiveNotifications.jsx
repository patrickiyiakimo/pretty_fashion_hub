// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   HiShoppingBag, 
//   HiTruck, 
//   HiGift, 
//   HiSparkles, 
//   HiClock,
//   HiCheckCircle,
//   HiFire,
//   HiStar
// } from "react-icons/hi";

// // Premium notification data with enhanced content
// const notifications = [
//   { id: 1, text: "Chika from Lagos just purchased a Luxury Handbag 👜", icon: HiShoppingBag, type: "purchase", location: "Lagos", time: "2 min ago" },
//   { id: 2, text: "Order successfully delivered to Abuja 🚚", icon: HiTruck, type: "delivery", location: "Abuja", time: "5 min ago" },
//   { id: 3, text: "Amaka from Enugu ordered Premium Heels 👠", icon: HiShoppingBag, type: "purchase", location: "Enugu", time: "8 min ago" },
//   { id: 4, text: "New Luxury Collection Just Dropped! ✨", icon: HiSparkles, type: "announcement", location: "Featured", time: "10 min ago" },
//   { id: 5, text: "Delivery completed in Port Harcourt 🎉", icon: HiCheckCircle, type: "delivery", location: "Port Harcourt", time: "12 min ago" },
//   { id: 6, text: "Tunde from Ibadan ordered Designer Sneakers 👟", icon: HiShoppingBag, type: "purchase", location: "Ibadan", time: "15 min ago" },
//   { id: 7, text: "Ada from Owerri purchased Silk Scarf Collection 🧣", icon: HiShoppingBag, type: "purchase", location: "Owerri", time: "18 min ago" },
//   { id: 8, text: "Customer in Benin City received premium package 📦", icon: HiTruck, type: "delivery", location: "Benin City", time: "20 min ago" },
//   { id: 9, text: "Limited Edition Dresses Now Available! 👗", icon: HiFire, type: "announcement", location: "Exclusive", time: "22 min ago" },
//   { id: 10, text: "Express delivery completed in Kano 🚛", icon: HiTruck, type: "delivery", location: "Kano", time: "25 min ago" },
//   { id: 11, text: "Ngozi from Asaba bought Designer Tote Bag 👜", icon: HiShoppingBag, type: "purchase", location: "Asaba", time: "28 min ago" },
//   { id: 12, text: "Premium Watch Collection Restocked ⌚", icon: HiSparkles, type: "restock", location: "Accessories", time: "30 min ago" },
//   { id: 13, text: "Efe from Warri received luxury shoe order 👠", icon: HiCheckCircle, type: "delivery", location: "Warri", time: "32 min ago" },
//   { id: 14, text: "Funmi from Lagos Island ordered Denim Jacket 🧥", icon: HiShoppingBag, type: "purchase", location: "Lagos Island", time: "35 min ago" },
//   { id: 15, text: "New Ankara Gown Collection Live! 💃", icon: HiFire, type: "announcement", location: "African Wear", time: "38 min ago" },
//   { id: 16, text: "Gift package delivered in Ilorin 🎁", icon: HiGift, type: "delivery", location: "Ilorin", time: "40 min ago" },
//   { id: 17, text: "Sarah from Calabar ordered Premium Heels 👠", icon: HiShoppingBag, type: "purchase", location: "Calabar", time: "42 min ago" },
//   { id: 18, text: "Order delivered successfully in Uyo 🚚", icon: HiTruck, type: "delivery", location: "Uyo", time: "45 min ago" },
//   { id: 19, text: "David from Jos purchased Luxury Polo Shirt 👕", icon: HiShoppingBag, type: "purchase", location: "Jos", time: "48 min ago" },
//   { id: 20, text: "Men's Premium Collection Just Launched 🧍‍♂️", icon: HiSparkles, type: "announcement", location: "Men's Wear", time: "50 min ago" },
// ];

// export default function LiveNotifications() {
//   const [activeNotification, setActiveNotification] = useState(null);
//   const [notificationQueue, setNotificationQueue] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (notificationQueue.length === 0) {
//         const shuffled = [...notifications].sort(() => 0.5 - Math.random());
//         setNotificationQueue(shuffled.slice(0, 3));
//       }
      
//       const nextNotification = notificationQueue[0];
//       if (nextNotification) {
//         setActiveNotification(nextNotification);
//         setNotificationQueue(prev => prev.slice(1));
        
//         // Auto-remove after display duration
//         setTimeout(() => {
//           setActiveNotification(null);
//         }, 4000);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [notificationQueue]);

//   const getNotificationStyle = (type) => {
//     switch (type) {
//       case "purchase":
//         return { border: "border-l-blue-500", bg: "bg-blue-50", icon: "text-blue-600" };
//       case "delivery":
//         return { border: "border-l-green-500", bg: "bg-green-50", icon: "text-green-600" };
//       case "announcement":
//         return { border: "border-l-purple-500", bg: "bg-purple-50", icon: "text-purple-600" };
//       case "restock":
//         return { border: "border-l-orange-500", bg: "bg-orange-50", icon: "text-orange-600" };
//       default:
//         return { border: "border-l-gray-500", bg: "bg-gray-50", icon: "text-gray-600" };
//     }
//   };

//   return (
//     <div className="fixed bottom-6 left-6 z-50">
//       <AnimatePresence mode="popLayout">
//         {activeNotification && (
//           <motion.div
//             key={activeNotification.id}
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 400, 
//               damping: 25 
//             }}
//             className={`relative mb-2 w-72 rounded-lg shadow-lg border-l-2 ${
//               getNotificationStyle(activeNotification.type).border
//             } ${
//               getNotificationStyle(activeNotification.type).bg
//             } backdrop-blur-sm bg-white/95 border border-gray-200/50 overflow-hidden`}
//           >
//             {/* Compact header */}
//             <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
//               <div className="flex items-center gap-2">
//                 <div className={`p-1 rounded-md ${
//                   getNotificationStyle(activeNotification.type).bg
//                 }`}>
//                   <activeNotification.icon className={`w-3.5 h-3.5 ${
//                     getNotificationStyle(activeNotification.type).icon
//                   }`} />
//                 </div>
//                 <span className="text-xs font-semibold text-gray-700">
//                   {activeNotification.location}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 text-gray-500">
//                 <HiClock className="w-2.5 h-2.5" />
//                 <span className="text-xs">{activeNotification.time}</span>
//               </div>
//             </div>

//             {/* Compact notification content */}
//             <div className="px-3 pb-2.5">
//               <p className="text-sm text-gray-800 leading-tight font-medium">
//                 {activeNotification.text}
//               </p>
//             </div>

//             {/* Thin progress bar */}
//             <motion.div
//               initial={{ scaleX: 1 }}
//               animate={{ scaleX: 0 }}
//               transition={{ duration: 4, ease: "linear" }}
//               className={`h-0.5 ${
//                 getNotificationStyle(activeNotification.type).border.replace("border-l-", "bg-")
//               } origin-left`}
//             />

//             {/* Smaller decorative corner */}
//             <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Simplified indicator when no active notification */}
//       <AnimatePresence>
//         {!activeNotification && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0 }}
//             className="flex items-center gap-2 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50"
//           >
//             <div className="relative">
//               <HiSparkles className="w-3.5 h-3.5 text-purple-600" />
//               <motion.div
//                 animate={{ scale: [1, 1.15, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="absolute inset-0 bg-purple-600/20 rounded-full"
//               />
//             </div>
//             <span className="text-xs font-medium text-gray-700">Live Updates</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   HiShoppingBag, 
//   HiTruck, 
//   HiGift, 
//   HiSparkles, 
//   HiClock,
//   HiCheckCircle,
//   HiFire,
//   HiStar,
//   HiX,
//   HiUserGroup,
//   HiShieldCheck
// } from "react-icons/hi";

// // Marketplace-focused notification data
// const notifications = [
//   { 
//     id: 1, 
//     text: "Chika's Store just made a sale of ₦45,000", 
//     icon: HiShoppingBag, 
//     type: "sale", 
//     vendor: "Chika's Store",
//     rating: 4.8,
//     time: "2 min ago" 
//   },
//   { 
//     id: 2, 
//     text: "New vendor verified: Lagos Premium Collection", 
//     icon: HiShieldCheck, 
//     type: "vendor", 
//     vendor: "Lagos Premium Collection",
//     rating: 5.0,
//     time: "5 min ago" 
//   },
//   { 
//     id: 3, 
//     text: "Amaka's Fashion Hub received a 5-star review", 
//     icon: HiStar, 
//     type: "review", 
//     vendor: "Amaka's Fashion Hub",
//     rating: 5.0,
//     time: "8 min ago" 
//   },
//   { 
//     id: 4, 
//     text: "New vendor joined: Abuja Luxury Boutique", 
//     icon: HiUserGroup, 
//     type: "vendor", 
//     vendor: "Abuja Luxury Boutique",
//     rating: 4.9,
//     time: "12 min ago" 
//   },
//   { 
//     id: 5, 
//     text: "Order protected by Buyer Protection: ₦32,000", 
//     icon: HiShieldCheck, 
//     type: "protection", 
//     vendor: "Secure Transaction",
//     rating: 100,
//     time: "15 min ago" 
//   },
//   { 
//     id: 6, 
//     text: "Tunde's Designs achieved Top Rated Seller badge", 
//     icon: HiStar, 
//     type: "achievement", 
//     vendor: "Tunde's Designs",
//     rating: 4.9,
//     time: "18 min ago" 
//   },
//   { 
//     id: 7, 
//     text: "Ada's African Collection sold 50 items this week", 
//     icon: HiFire, 
//     type: "milestone", 
//     vendor: "Ada's African Collection",
//     rating: 4.7,
//     time: "22 min ago" 
//   },
//   { 
//     id: 8, 
//     text: "Product authenticity verified: Luxury Handbags", 
//     icon: HiShieldCheck, 
//     type: "verification", 
//     vendor: "Premium Vendors",
//     rating: 4.9,
//     time: "25 min ago" 
//   },
//   { 
//     id: 9, 
//     text: "Ngozi's Store completed 100 successful deliveries", 
//     icon: HiTruck, 
//     type: "milestone", 
//     vendor: "Ngozi's Store",
//     rating: 4.8,
//     time: "28 min ago" 
//   },
//   { 
//     id: 10, 
//     text: "New vendor verified: Enugu Authentic Wear", 
//     icon: HiShieldCheck, 
//     type: "vendor", 
//     vendor: "Enugu Authentic Wear",
//     rating: 5.0,
//     time: "32 min ago" 
//   },
//   { 
//     id: 11, 
//     text: "Efe's Luxury Store received buyer protection claim resolved", 
//     icon: HiCheckCircle, 
//     type: "resolution", 
//     vendor: "Efe's Luxury Store",
//     rating: 4.6,
//     time: "35 min ago" 
//   },
//   { 
//     id: 12, 
//     text: "Funmi's Fashion Hub now verified premium vendor", 
//     icon: HiStar, 
//     type: "achievement", 
//     vendor: "Funmi's Fashion Hub",
//     rating: 4.9,
//     time: "38 min ago" 
//   },
//   { 
//     id: 13, 
//     text: "New vendor joined: Ibadan Traditional Designs", 
//     icon: HiUserGroup, 
//     type: "vendor", 
//     vendor: "Ibadan Traditional Designs",
//     rating: 4.8,
//     time: "42 min ago" 
//   },
//   { 
//     id: 14, 
//     text: "Sarah's Boutique achieved 4.9 average rating", 
//     icon: HiStar, 
//     type: "rating", 
//     vendor: "Sarah's Boutique",
//     rating: 4.9,
//     time: "45 min ago" 
//   },
//   { 
//     id: 15, 
//     text: "Authenticity guarantee applied: Premium Watches", 
//     icon: HiShieldCheck, 
//     type: "verification", 
//     vendor: "Watch Collection",
//     rating: 4.8,
//     time: "48 min ago" 
//   },
// ];

// export default function LiveNotifications() {
//   const [activeNotification, setActiveNotification] = useState(null);
//   const [notificationQueue, setNotificationQueue] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);
//   const [dismissed, setDismissed] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isHovered && !dismissed) {
//         if (notificationQueue.length === 0) {
//           const shuffled = [...notifications].sort(() => 0.5 - Math.random());
//           setNotificationQueue(shuffled.slice(0, 5));
//         }
        
//         const nextNotification = notificationQueue[0];
//         if (nextNotification) {
//           setActiveNotification(nextNotification);
//           setNotificationQueue(prev => prev.slice(1));
          
//           // Auto-remove after display duration
//           setTimeout(() => {
//             setActiveNotification(null);
//           }, 5000);
//         }
//       }
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [notificationQueue, isHovered, dismissed]);

//   const getNotificationStyle = (type) => {
//     switch (type) {
//       case "sale":
//         return { 
//           border: "border-l-4 border-l-emerald-500", 
//           bg: "bg-white", 
//           icon: "text-emerald-600",
//           badge: "bg-emerald-100 text-emerald-700"
//         };
//       case "vendor":
//         return { 
//           border: "border-l-4 border-l-blue-500", 
//           bg: "bg-white", 
//           icon: "text-blue-600",
//           badge: "bg-blue-100 text-blue-700"
//         };
//       case "review":
//       case "rating":
//       case "achievement":
//         return { 
//           border: "border-l-4 border-l-amber-500", 
//           bg: "bg-white", 
//           icon: "text-amber-600",
//           badge: "bg-amber-100 text-amber-700"
//         };
//       case "protection":
//       case "verification":
//       case "resolution":
//         return { 
//           border: "border-l-4 border-l-purple-500", 
//           bg: "bg-white", 
//           icon: "text-purple-600",
//           badge: "bg-purple-100 text-purple-700"
//         };
//       case "milestone":
//         return { 
//           border: "border-l-4 border-l-orange-500", 
//           bg: "bg-white", 
//           icon: "text-orange-600",
//           badge: "bg-orange-100 text-orange-700"
//         };
//       default:
//         return { 
//           border: "border-l-4 border-l-gray-500", 
//           bg: "bg-white", 
//           icon: "text-gray-600",
//           badge: "bg-gray-100 text-gray-700"
//         };
//     }
//   };

//   const getTypeLabel = (type) => {
//     switch (type) {
//       case "sale": return "Recent Sale";
//       case "vendor": return "New Vendor";
//       case "review": return "New Review";
//       case "rating": return "Rating Update";
//       case "achievement": return "Achievement";
//       case "protection": return "Buyer Protection";
//       case "verification": return "Verified";
//       case "resolution": return "Resolution";
//       case "milestone": return "Milestone";
//       default: return "Update";
//     }
//   };

//   const dismissNotification = () => {
//     setDismissed(true);
//     setActiveNotification(null);
//     setTimeout(() => setDismissed(false), 3000);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <AnimatePresence mode="popLayout">
//         {activeNotification && (
//           <motion.div
//             key={activeNotification.id}
//             initial={{ opacity: 0, x: 100, scale: 0.95 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             exit={{ opacity: 0, x: 100, scale: 0.95 }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 400, 
//               damping: 30 
//             }}
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//             className={`relative w-80 rounded-xl shadow-xl ${getNotificationStyle(activeNotification.type).border} ${getNotificationStyle(activeNotification.type).bg} border border-gray-200 overflow-hidden`}
//           >
//             {/* Header with type badge and dismiss button */}
//             <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
//               <div className="flex items-center gap-2">
//                 <div className={`p-1.5 rounded-lg ${getNotificationStyle(activeNotification.type).badge}`}>
//                   <activeNotification.icon className={`w-3.5 h-3.5 ${getNotificationStyle(activeNotification.type).icon}`} />
//                 </div>
//                 <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getNotificationStyle(activeNotification.type).badge}`}>
//                   {getTypeLabel(activeNotification.type)}
//                 </span>
//               </div>
//               <button
//                 onClick={dismissNotification}
//                 className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
//                 aria-label="Dismiss notification"
//               >
//                 <HiX className="w-3.5 h-3.5 text-gray-400" />
//               </button>
//             </div>

//             {/* Notification content */}
//             <div className="px-4 py-3">
//               <p className="text-sm text-gray-800 leading-relaxed">
//                 {activeNotification.text}
//               </p>
              
//               {/* Vendor rating if available */}
//               {activeNotification.rating && (
//                 <div className="flex items-center gap-1">
//                   {/* <div className="flex items-center gap-0.5">
//                     {[...Array(5)].map((_, i) => (
//                       <HiStar 
//                         key={i} 
//                         className={`w-3 h-3 ${i < Math.floor(activeNotification.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
//                       />
//                     ))}
//                   </div> */}
//                   {/* <span className="text-xs text-gray-500 ml-1">
//                     {activeNotification.rating}/5
//                   </span> */}
//                 </div>
//               )}
//             </div>

//             {/* Footer with timestamp */}
//             <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
//               <div className="flex items-center gap-1 text-gray-500">
//                 <HiClock className="w-3 h-3" />
//                 <span className="text-xs">{activeNotification.time}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//                 <span className="text-xs text-gray-500">Live</span>
//               </div>
//             </div>

//             {/* Subtle hover effect */}
//             <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Docked indicator when no notification */}
//       <AnimatePresence>
//         {!activeNotification && !dismissed && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
//             onClick={() => {
//               const shuffled = [...notifications].sort(() => 0.5 - Math.random());
//               setNotificationQueue(shuffled.slice(0, 3));
//             }}
//           >
//             <div className="relative">
//               <HiSparkles className="w-4 h-4 text-purple-600" />
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="absolute inset-0 bg-purple-600/20 rounded-full blur-sm"
//               />
//             </div>
//             <span className="text-xs font-medium text-gray-700">Live marketplace updates</span>
//             <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiShoppingBag, 
  HiSparkles, 
  HiClock,
  HiX,
  HiUserGroup,
  HiShieldCheck,
  HiStar
} from "react-icons/hi";

// Clean marketplace notification data
const notifications = [
  { 
    id: 1, 
    text: "Chika's Store just made a sale of ₦45,000", 
    icon: HiShoppingBag, 
    type: "sale",
    time: "2 min ago" 
  },
  { 
    id: 2, 
    text: "New vendor verified: Lagos Premium Collection", 
    icon: HiShieldCheck, 
    type: "vendor",
    time: "5 min ago" 
  },
  { 
    id: 3, 
    text: "Amaka's Fashion Hub received a 5-star review", 
    icon: HiStar, 
    type: "review",
    time: "8 min ago" 
  },
  { 
    id: 4, 
    text: "New vendor joined: Abuja Luxury Boutique", 
    icon: HiUserGroup, 
    type: "vendor",
    time: "12 min ago" 
  },
  { 
    id: 5, 
    text: "Order protected by Buyer Protection: ₦32,000", 
    icon: HiShieldCheck, 
    type: "protection",
    time: "15 min ago" 
  },
  { 
    id: 6, 
    text: "Tunde's Designs achieved Top Rated Seller badge", 
    icon: HiStar, 
    type: "achievement",
    time: "18 min ago" 
  },
  { 
    id: 7, 
    text: "Ada's African Collection sold 50 items this week", 
    icon: HiShoppingBag, 
    type: "milestone",
    time: "22 min ago" 
  },
  { 
    id: 8, 
    text: "Product authenticity verified: Luxury Handbags", 
    icon: HiShieldCheck, 
    type: "verification",
    time: "25 min ago" 
  },
  { 
    id: 9, 
    text: "Ngozi's Store completed 100 successful deliveries", 
    icon: HiShoppingBag, 
    type: "milestone",
    time: "28 min ago" 
  },
  { 
    id: 10, 
    text: "New vendor verified: Enugu Authentic Wear", 
    icon: HiShieldCheck, 
    type: "vendor",
    time: "32 min ago" 
  },
];

export default function LiveNotifications() {
  const [activeNotification, setActiveNotification] = useState(null);
  const [notificationQueue, setNotificationQueue] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        if (notificationQueue.length === 0) {
          const shuffled = [...notifications].sort(() => 0.5 - Math.random());
          setNotificationQueue(shuffled.slice(0, 5));
        }
        
        const nextNotification = notificationQueue[0];
        if (nextNotification) {
          setActiveNotification(nextNotification);
          setNotificationQueue(prev => prev.slice(1));
          
          setTimeout(() => {
            setActiveNotification(null);
          }, 8500);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [notificationQueue, isHovered]);

  const getIconColor = (type) => {
    switch (type) {
      case "sale":
      case "milestone":
        return "text-emerald-500";
      case "vendor":
        return "text-blue-500";
      case "review":
      case "achievement":
        return "text-amber-500";
      case "protection":
      case "verification":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="popLayout">
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ opacity: 0, x: 100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/80 overflow-hidden"
          >
            {/* Minimal content */}
            <div className="flex items-start gap-3 p-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <activeNotification.icon className={`w-4 h-4 ${getIconColor(activeNotification.type)}`} />
              </div>
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {activeNotification.text}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <HiClock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{activeNotification.time}</span>
                </div>
              </div>
              
              {/* Dismiss button - appears on hover */}
              <button
                onClick={() => setActiveNotification(null)}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded-full"
                aria-label="Dismiss"
              >
                <HiX className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            {/* Clean border accent */}
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${getIconColor(activeNotification.type).replace('text', 'bg')}`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal docked indicator */}
      <AnimatePresence>
        {!activeNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/80 cursor-pointer hover:shadow-md transition-all duration-200"
            onClick={() => {
              const shuffled = [...notifications].sort(() => 0.5 - Math.random());
              setNotificationQueue(shuffled.slice(0, 3));
            }}
          >
            <div className="relative">
              <HiSparkles className="w-3.5 h-3.5 text-purple-500" />
              <span className="absolute inset-0 animate-ping opacity-75">
                <HiSparkles className="w-3.5 h-3.5 text-purple-400" />
              </span>
            </div>
            <span className="text-xs font-medium text-gray-600">Live updates</span>
            <div className="w-1 h-1 bg-green-500 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}