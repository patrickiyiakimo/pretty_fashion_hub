// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { 
//   HiBuildingStorefront, 
//   HiMail, 
//   HiPhone, 
//   HiLocationMarker,
//   HiGlobeAlt,
//   HiDocumentText,
//   HiShieldCheck,
//   HiStar,
//   HiShoppingBag,
//   HiArrowLeft
// } from "react-icons/hi";

// export default function VendorDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [partner, setPartner] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showCAC, setShowCAC] = useState(false);

//   useEffect(() => {
//     fetchPartnerBio();
//   }, [params.id]);

//   const fetchPartnerBio = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/partners/${params.id}/bio`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to fetch partner information");
//       }

//       const data = await response.json();
//       setPartner(data.data || data.partner);
      
//     } catch (error) {
//       console.error("Error fetching partner:", error);
//       toast.error(error.message || "Failed to load vendor information");
//       // Redirect back after 2 seconds
//       setTimeout(() => router.push('/vendors'), 2000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!partner) {
//     return (
//       <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
//           <p className="text-gray-600 mb-6">The vendor you're looking for doesn't exist or hasn't been approved yet.</p>
//           <Link
//             href="/vendors"
//             className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
//           >
//             <HiArrowLeft className="w-5 h-5" />
//             Back to Vendors
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
//       <div className="max-w-5xl mx-auto">
//         {/* Back Button */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link
//             href="/vendors"
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
//           >
//             <HiArrowLeft className="w-5 h-5" />
//             Back to Vendors
//           </Link>
//         </motion.div>

//         {/* Vendor Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
//         >
//           <div className="bg-gradient-to-r from-orange-600 to-blue-600 p-8 text-center">
//             {/* Logo */}
//             {partner.logo ? (
//               <div className="w-32 h-32 mx-auto bg-white rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white">
//                 <Image
//                   src={partner.logo}
//                   alt={partner.businessName}
//                   width={128}
//                   height={128}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ) : (
//               <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4 border-4 border-white">
//                 <HiBuildingStorefront className="w-16 h-16 text-orange-600" />
//               </div>
//             )}
            
//             <h1 className="text-3xl font-bold text-white mb-2">{partner.businessName}</h1>
//             <div className="flex items-center justify-center gap-2">
//               <HiShieldCheck className="w-5 h-5 text-green-300" />
//               <span className="text-white/90">Verified Seller</span>
//               <span className="mx-2">•</span>
//               <span className="text-white/90">{partner.businessType}</span>
//             </div>
//           </div>

//           {/* Quick Info Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
//                 <HiMail className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Email</p>
//                 <p className="text-sm font-medium text-gray-900">{partner.contactInfo?.email || partner.owner?.email || "N/A"}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <HiPhone className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Phone</p>
//                 <p className="text-sm font-medium text-gray-900">{partner.contactInfo?.phone || partner.owner?.phone || "N/A"}</p>
//               </div>
//             </div>
//             {partner.website && (
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                   <HiGlobeAlt className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Website</p>
//                   <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
//                     Visit Website
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Main Content */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Left Column - Description & Info */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1 }}
//             className="md:col-span-2 space-y-6"
//           >
//             {/* About Business */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <HiDocumentText className="w-5 h-5 text-orange-600" />
//                 About {partner.businessName}
//               </h2>
//               <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
//                 {partner.description || "No description provided."}
//               </p>
//             </div>

//             {/* Contact Information */}
//             {partner.contactInfo?.address && (
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <HiLocationMarker className="w-5 h-5 text-orange-600" />
//                   Location
//                 </h2>
//                 <p className="text-gray-600">
//                   {typeof partner.contactInfo.address === 'string' 
//                     ? partner.contactInfo.address 
//                     : `${partner.contactInfo.address?.street || ''}, ${partner.contactInfo.address?.city || ''}, ${partner.contactInfo.address?.state || ''}`}
//                 </p>
//               </div>
//             )}
//           </motion.div>

//           {/* Right Column - CAC Document */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="space-y-6"
//           >
//             {/* CAC Certificate */}
//             {partner.cacImage && (
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <HiShieldCheck className="w-5 h-5 text-orange-600" />
//                   CAC Certificate
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="bg-gray-100 rounded-lg p-4 text-center">
//                     {showCAC ? (
//                       <div className="relative w-full h-64">
//                         <Image
//                           src={partner.cacImage}
//                           alt="CAC Certificate"
//                           fill
//                           className="object-contain"
//                         />
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center py-8">
//                         <HiShieldCheck className="w-16 h-16 text-gray-400 mb-3" />
//                         <p className="text-gray-500 text-sm mb-3">CAC document is available for verification</p>
//                         <button
//                           onClick={() => setShowCAC(true)}
//                           className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
//                         >
//                           View CAC Document
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-500 text-center">
//                     This seller is a registered business with the Corporate Affairs Commission (CAC)
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Trust Badges */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Trust & Verification</h2>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <HiShieldCheck className="w-5 h-5 text-green-600" />
//                   <span className="text-sm text-gray-700">Verified Business</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <HiStar className="w-5 h-5 text-yellow-500" />
//                   <span className="text-sm text-gray-700">Top Rated Seller</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <HiShoppingBag className="w-5 h-5 text-blue-600" />
//                   <span className="text-sm text-gray-700">100+ Products Sold</span>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-2xl p-6 text-center text-white">
//               <h3 className="text-xl font-bold mb-2">Shop with Confidence</h3>
//               <p className="text-white/90 text-sm mb-4">
//                 Browse products from this verified seller
//               </p>
//               <Link
//                 href={`/shop?vendor=${partner.id}`}
//                 className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
//               >
//                 <HiShoppingBag className="w-5 h-5" />
//                 Shop Now
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  HiBuildingStorefront, 
  HiMail, 
  HiPhone, 
  HiLocationMarker,
  HiGlobeAlt,
  HiDocumentText,
  HiShieldCheck,
  HiStar,
  HiShoppingBag,
  HiArrowLeft,
  HiClock,
  HiCamera,
  HiShare,
  HiInstagram,
  HiFacebook,
  HiWhatsApp,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiTruck,
  HiCurrencyDollar,
  HiBadgeCheck
} from "react-icons/hi";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiMiniBuildingStorefront, HiMiniStar } from "react-icons/hi2";

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCAC, setShowCAC] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    fetchPartnerBio();
  }, [params.id]);

  const fetchPartnerBio = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/partners/${params.id}/bio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch partner information");
      }

      const data = await response.json();
      setPartner(data.data || data.partner);
      
    } catch (error) {
      console.error("Error fetching partner:", error);
      toast.error(error.message || "Failed to load vendor information");
      setTimeout(() => router.push('/vendor'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const nextGalleryImage = () => {
    if (partner?.galleryImages && partner.galleryImages.length > 0) {
      setCurrentGalleryIndex((prev) => (prev + 1) % partner.galleryImages.length);
    }
  };

  const prevGalleryImage = () => {
    if (partner?.galleryImages && partner.galleryImages.length > 0) {
      setCurrentGalleryIndex((prev) => (prev - 1 + partner.galleryImages.length) % partner.galleryImages.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
          <p className="text-gray-600 mb-6">The vendor you're looking for doesn't exist or hasn't been approved yet.</p>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Vendors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-oswald pt-32 pb-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Vendors
          </Link>
        </motion.div>

        {/* Vendor Header with Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          {/* Cover Image */}
          {partner.coverImage && (
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
              <Image
                src={partner.coverImage}
                alt={`${partner.businessName} cover`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}
          
          {/* Logo and Business Info */}
          <div className={`${partner.coverImage ? 'relative -mt-16 px-6 pb-6' : 'bg-orange-500 p-8 text-center'}`}>
            <div className="flex flex-col items-center">
              {/* Logo */}
              {partner.logo ? (
                <div className={`w-32 h-32 bg-white rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white ${partner.coverImage ? '' : 'mx-auto'}`}>
                  <Image
                    src={partner.logo}
                    alt={partner.businessName}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4 border-4 border-white ${partner.coverImage ? '' : 'mx-auto'}`}>
                  <HiMiniBuildingStorefront className="w-16 h-16 text-white" />
                </div>
              )}
              
              <h1 className={`text-3xl font-bold ${partner.coverImage ? 'text-gray-900' : 'text-white'} mb-2 text-center`}>
                {partner.businessName}
              </h1>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <HiMiniStar className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className={`font-semibold ${partner.coverImage ? 'text-gray-900' : 'text-white'}`}>
                    {partner.rating || 4.5}
                  </span>
                  <span className={partner.coverImage ? 'text-gray-500' : 'text-white/80'}>
                    ({partner.reviewCount || 0} reviews)
                  </span>
                </div>
                <span className={partner.coverImage ? 'text-gray-400' : 'text-white/60'}>•</span>
                <div className="flex items-center gap-1">
                  <HiShieldCheck className="w-5 h-5 text-green-400" />
                  <span className={partner.coverImage ? 'text-gray-700' : 'text-white/90'}>Verified Seller</span>
                </div>
                <span className={partner.coverImage ? 'text-gray-400' : 'text-white/60'}>•</span>
                <span className={partner.coverImage ? 'text-gray-700' : 'text-white/90'}>{partner.businessType}</span>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <HiMail className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {partner.contactInfo?.email || partner.owner?.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HiPhone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900">
                  {partner.contactInfo?.phone || partner.owner?.phone || "N/A"}
                </p>
              </div>
            </div>
            {partner.website && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <HiGlobeAlt className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Website</p>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline truncate block">
                    Visit
                  </a>
                </div>
              </div>
            )}
            {partner.contactInfo?.address && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <HiLocationMarker className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {typeof partner.contactInfo.address === 'string' 
                      ? partner.contactInfo.address 
                      : partner.contactInfo.address?.city || "Nigeria"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Description & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* About Business */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiDocumentText className="w-5 h-5 text-orange-600" />
                About {partner.businessName}
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {partner.description || "No description provided."}
              </p>
            </div>

            {/* Gallery Section */}
            {partner.galleryImages && partner.galleryImages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HiCamera className="w-5 h-5 text-orange-600" />
                  Store Gallery
                </h2>
                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {partner.galleryImages.slice(0, 6).map((image, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`${partner.businessName} gallery ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                  {partner.galleryImages.length > 6 && (
                    <button className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View all {partner.galleryImages.length} photos
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Business Hours */}
            {partner.businessHours && Object.values(partner.businessHours).some(h => h.open && h.close) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HiClock className="w-5 h-5 text-orange-600" />
                  Business Hours
                </h2>
                <div className="space-y-2">
                  {Object.entries(partner.businessHours).map(([day, hours]) => (
                    hours.open && hours.close && (
                      <div key={day} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="capitalize font-medium text-gray-700">{day}</span>
                        <span className="text-gray-600">{hours.open} - {hours.close}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* CAC Certificate */}
            {partner.cacImage && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HiShieldCheck className="w-5 h-5 text-orange-600" />
                  CAC Certificate
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    {showCAC ? (
                      <div className="relative w-full h-64">
                        <Image
                          src={partner.cacImage}
                          alt="CAC Certificate"
                          fill
                          className="object-contain"
                        />
                        <button
                          onClick={() => setShowCAC(false)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <HiShieldCheck className="w-16 h-16 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-sm mb-3">CAC document available for verification</p>
                        <button
                          onClick={() => setShowCAC(true)}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                        >
                          View CAC Document
                        </button>
                      </div>
                    )}
                  </div>
                  {partner.registrationNumber && (
                    <p className="text-xs text-gray-500 text-center">
                      RC Number: {partner.registrationNumber}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Trust & Verification */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trust & Verification</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <HiBadgeCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Verified Business</span>
                </div>
                {partner.verificationStatus === "verified" && (
                  <div className="flex items-center gap-3">
                    <HiShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Identity Verified</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <HiTruck className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiCurrencyDollar className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {partner.contactInfo?.socialMedia && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HiShare className="w-5 h-5 text-orange-600" />
                  Connect With Us
                </h2>
                <div className="flex gap-3">
                  {partner.contactInfo.socialMedia.instagram && (
                    <a href={partner.contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <HiInstagram className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {partner.contactInfo.socialMedia.facebook && (
                    <a href={partner.contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <HiFacebook className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {partner.contactInfo.socialMedia.twitter && (
                    <a href={partner.contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <FaTwitter className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {partner.contactInfo.socialMedia.whatsapp && (
                    <a href={`https://wa.me/${partner.contactInfo.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <HiWhatsApp className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="bg-orange-600 rounded-2xl p-6 text-center text-white">
              <h3 className="text-xl font-bold mb-2">Shop with Confidence</h3>
              <p className="text-white/90 text-sm mb-4">
                Browse products from this verified seller
              </p>
              <Link
                href={`/shop?vendor=${partner.id}`}
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <HiShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedImage}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <HiX className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}