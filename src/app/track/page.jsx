// "use client";

// import { useState } from "react";

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// export default function TrackPage() {
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [shipment, setShipment] = useState(null);
//   const [error, setError] = useState("");

//   const handleTrack = async (e) => {
//     e.preventDefault();
//     setError("");
//     setShipment(null);

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/logistics/track/${trackingNumber}`);
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Tracking failed");
//       setShipment(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
//         📦 Track Your Shipment
//       </h1>

//       <form onSubmit={handleTrack} className="max-w-md mx-auto flex gap-2 mb-8">
//         <input
//           type="text"
//           placeholder="Enter Tracking ID"
//           value={trackingNumber}
//           onChange={(e) => setTrackingNumber(e.target.value)}
//           className="flex-1 p-2 border rounded-lg"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
//         >
//           Track
//         </button>
//       </form>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {shipment && (
//         <div className="max-w-lg mx-auto bg-white rounded-xl p-6 shadow-md">
//           <h2 className="text-2xl font-bold text-blue-600 mb-2">
//             {shipment.trackingId}
//           </h2>
//           <p className="text-gray-700">{shipment.clientName}</p>
//           <p className="text-sm text-gray-600 mb-2">
//             {shipment.origin} → {shipment.destination}
//           </p>

//           <h3 className="text-lg font-semibold text-blue-700 mb-3">
//             Current Status: {shipment.currentStatus}
//           </h3>

//           <ul className="space-y-2">
//             {shipment.history.map((h, i) => (
//               <li key={i} className="border-l-4 border-blue-500 pl-3">
//                 <p className="font-medium text-gray-800">{h.status}</p>
//                 <p className="text-sm text-gray-600">{h.location}</p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(h.updatedAt).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }











"use client";

import { useState } from "react";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setShipment(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_ENDPOINT}/api/logistics/track/${trackingNumber}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Tracking failed");
      setShipment(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        📦 Track Your Shipment
      </h1>

      <form onSubmit={handleTrack} className="max-w-md mx-auto flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading || !trackingNumber}
          className={`px-4 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {shipment && (
        <div className="max-w-lg mx-auto bg-white rounded-xl p-6 shadow-md transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            {shipment.trackingId}
          </h2>

          <p className="text-gray-700 font-medium">
            Client: {shipment.clientName || "Unknown"}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            {shipment.origin || "Unknown Origin"} → {shipment.destination || "Unknown Destination"}
          </p>

          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Current Status: {shipment.currentStatus || shipment.currentLocation || "In Transit"}
          </h3>

          {/* ✅ Safely handle if shipment.history is missing or empty */}
          {shipment.history && shipment.history.length > 0 ? (
            <ul className="space-y-2">
              {shipment.history.map((h, i) => (
                <li key={i} className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-gray-800">{h.status}</p>
                  <p className="text-sm text-gray-600">{h.location}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(h.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center italic">
              No tracking history available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

