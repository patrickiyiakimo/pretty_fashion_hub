"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  HiStar, 
  HiSearch, 
  HiLocationMarker,
  HiShoppingBag,
  HiTruck,
  HiShieldCheck
} from "react-icons/hi";
import Image from "next/image";
import toast from "react-hot-toast";

export default function VendorsPage() {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = ["all", "Fashion", "Electronics", "Home & Living", "Accessories", "Beauty"];
  const locations = ["all", "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"];

  // Fetch approved partners (vendors)
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/partners?status=approved", {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        toast.error("Please login to view vendors");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }

      const data = await response.json();
      
      // Handle different response formats
      let vendorsData = [];
      if (Array.isArray(data)) {
        vendorsData = data;
      } else if (data.success && Array.isArray(data.data)) {
        vendorsData = data.data;
      } else if (data.partners && Array.isArray(data.partners)) {
        vendorsData = data.partners;
      }
      
      setVendors(vendorsData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.businessType === selectedCategory;
    const matchesLocation = selectedLocation === "all" || vendor.address?.city === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 font-oswald">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Trusted Vendors
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover quality products from verified sellers across Nigeria
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vendors Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <HiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Vendor Image */}
                <div className="relative h-48 bg-orange-200">
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={vendor.businessName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {vendor.businessName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">4.8</span>
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                    <Link href={`/vendor/${vendor._id}`}>
                      {vendor.businessName}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {vendor.description || "Quality products from a trusted seller"}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <HiLocationMarker className="w-4 h-4" />
                    <span>{vendor.address?.city || "Nigeria"}</span>
                  </div>
                  
                  {/* Business Type Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      {vendor.businessType || "Vendor"}
                    </span>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <HiShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Verified</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiTruck className="w-4 h-4 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    href={`/vendor/${vendor._id}`}
                    className="block w-full text-center bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 transition-all duration-300"
                  >
                    View Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}