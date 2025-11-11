// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";


//   // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


// export default function LogisticsPage() {
//   const [shipments, setShipments] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadShipments();
//   }, []);

//   async function loadShipments() {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_ENDPOINT}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setShipments(data);
//     setLoading(false);
//   }

//   async function trackShipment(e) {
//     e.preventDefault();
//     setLoading(true);
//     const res = await fetch(`${API_ENDPOINT}/track/${trackingNumber}`);
//     const data = await res.json();
//     setSelected(data);
//     setLoading(false);
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
//         🚚 Logistics Tracking Dashboard
//       </h1>

//       <div className="max-w-lg mx-auto bg-white p-4 rounded-2xl shadow-md mb-8">
//         <form onSubmit={trackShipment} className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Enter Tracking Number"
//             value={trackingNumber}
//             onChange={(e) => setTrackingNumber(e.target.value)}
//             className="flex-1 p-2 border rounded-lg"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
//           >
//             Track
//           </button>
//         </form>
//       </div>

//       {loading && <p className="text-center text-gray-600">Loading...</p>}

//       {!selected && (
//         <div className="grid md:grid-cols-3 gap-4">
//           {shipments.map((ship) => (
//             <motion.div
//               key={ship._id}
//               whileHover={{ scale: 1.02 }}
//               onClick={() => setSelected(ship)}
//               className="bg-white rounded-xl shadow-lg p-4 cursor-pointer"
//             >
//               <h3 className="text-xl font-semibold text-blue-600">
//                 {ship.trackingNumber}
//               </h3>
//               <p className="text-gray-700 mt-2">{ship.clientName}</p>
//               <p className="text-sm text-gray-500">
//                 {ship.currentStatus} — {ship.currentLocation}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {selected && (
//         <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-lg">
//           <button
//             onClick={() => setSelected(null)}
//             className="text-sm text-blue-600 mb-2 hover:underline"
//           >
//             ← Back to list
//           </button>

//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             {selected.trackingNumber}
//           </h2>
//           <p className="text-gray-700">
//             {selected.clientName} ({selected.clientEmail})
//           </p>
//           <p className="text-gray-600 mb-4">
//             {selected.origin} → {selected.destination}
//           </p>

//           <h3 className="text-lg font-semibold text-blue-700 mb-2">
//             Tracking History
//           </h3>
//           <ul className="space-y-3">
//             {selected.history.map((h, i) => (
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













// "use client";

// import { useState, useEffect } from "react";

// export default function LogisticsPage() {
//   const [shipments, setShipments] = useState([]);
//   const [trackingId, setTrackingId] = useState("");
//   const [status, setStatus] = useState("");

//     // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


//   // Fetch all shipments
//   useEffect(() => {
//     fetch(`${API_ENDPOINT}/api/logistics`)
//       .then((res) => res.json())
//       .then((data) => setShipments(data))
//       .catch((err) => console.error("Error fetching shipments:", err));
//   }, []);

//   // Generate a new shipment (for admin)
//   const createShipment = async () => {
//     const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({
//         clientName: "John Doe",
//         item: "Men's Wear Order",
//         currentLocation: "Lagos Warehouse",
//         destination: "Abuja",
//       }),
//     });
//     const data = await res.json();
//     alert(`Shipment created! Tracking ID: ${data.trackingId}`);
//   };

//   // Update a shipment status
//   const updateShipment = async () => {
//     const res = await fetch(`${API_ENDPOINT}/api/logistics/${trackingId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ currentLocation: status }),
//     });
//     const data = await res.json();
//     alert(`Updated: ${data.currentLocation}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <h1 className="text-3xl font-bold text-center mb-6">📦 Logistics Tracker</h1>

//       <div className="flex justify-center gap-4 mb-8">
//         <button
//           onClick={createShipment}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Generate New Logistics Code
//         </button>
//       </div>

//       <div className="flex justify-center gap-2 mb-8">
//         <input
//           type="text"
//           placeholder="Enter Tracking ID"
//           value={trackingId}
//           onChange={(e) => setTrackingId(e.target.value)}
//           className="border px-3 py-2 rounded w-72"
//         />
//         <input
//           type="text"
//           placeholder="Update Location"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border px-3 py-2 rounded w-72"
//         />
//         <button
//           onClick={updateShipment}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Update
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {shipments.map((s) => (
//           <div key={s._id} className="p-4 bg-white rounded-xl shadow-md">
//             <h2 className="font-bold text-lg">{s.item}</h2>
//             <p className="text-sm text-gray-600">Client: {s.clientName}</p>
//             <p className="text-sm text-gray-600">Destination: {s.destination}</p>
//             <p className="mt-2">
//               <span className="font-semibold">Current Location:</span> {s.currentLocation}
//             </p>
//             <p className="mt-2 text-blue-600 font-mono">
//               Tracking ID: {s.trackingId}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";

// /**
//  * LogisticsPage (complete, safe version)
//  *
//  * - Handles different backend response shapes:
//  *   - an array ([...] )
//  *   - an object like { shipments: [...] }
//  *   - a single shipment object { ... }
//  * - Normalizes shipment objects to the fields the UI expects:
//  *   { _id, trackingId, item, clientName, destination, currentLocation, history }
//  * - Prevents "shipments.map is not a function" errors by always keeping shipments as an array
//  * - Updates the UI after creating/updating a shipment
//  *
//  * Environment:
//  * - Expects NEXT_PUBLIC_API_ENDPOINT e.g. http://localhost:4000
//  *
//  * Notes:
//  * - This is defensive and works with a range of backend payloads.
//  * - If your backend uses different field names, normalization maps common ones automatically.
//  */

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

// function normalizeShipment(raw = {}) {
//   // Map common possible backend fields to our UI fields
//   const _id = raw._id || raw.id || raw._Id || raw._ID || null;
//   const trackingId =
//     raw.trackingId ||
//     raw.trackingNumber ||
//     raw.tracking ||
//     raw.tracking_code ||
//     raw.code ||
//     raw.tracking_id ||
//     null;
//   const item = raw.item || raw.description || raw.product || raw.title || "";
//   const clientName = raw.clientName || raw.client || raw.customerName || raw.customer || "";
//   const destination = raw.destination || raw.to || raw.dst || "";
//   const currentLocation =
//     raw.currentLocation || raw.current_location || raw.current || raw.location || "";
//   const history = Array.isArray(raw.history) ? raw.history : raw.history ? [raw.history] : [];

//   return {
//     _id,
//     trackingId,
//     item,
//     clientName,
//     destination,
//     currentLocation,
//     history,
//     raw, // keep original in case you need it
//   };
// }

// export default function LogisticsPage() {
//   const [shipments, setShipments] = useState([]); // always an array
//   const [trackingId, setTrackingId] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Load shipments on mount
//   useEffect(() => {
//     loadShipments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function loadShipments() {
//     setLoading(true);
//     setErrorMsg("");
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/logistics`);
//       // If server returns non-JSON root HTML (like a landing page) json() will throw.
//       // Guard with content-type check:
//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         const text = await res.text();
//         console.warn("Expected JSON but got:", text.slice(0, 200));
//         throw new Error("Server did not return JSON. Check API endpoint.");
//       }

//       const data = await res.json();

//       // Normalize different payload shapes
//       let arr = [];
//       if (Array.isArray(data)) {
//         arr = data;
//       } else if (data && Array.isArray(data.shipments)) {
//         arr = data.shipments;
//       } else if (data && data.shipment && Array.isArray(data.shipment)) {
//         arr = data.shipment;
//       } else if (data && typeof data === "object") {
//         // maybe a single object or object with list inside different key
//         // try to find an array property
//         const maybeArrayProp = Object.values(data).find((v) => Array.isArray(v));
//         if (maybeArrayProp) arr = maybeArrayProp;
//         else arr = [data]; // single shipment object -> put into array
//       } else {
//         arr = [];
//       }

//       // Normalize each shipment to expected UI shape
//       const normalized = arr.map((s) => normalizeShipment(s));
//       setShipments(normalized);
//     } catch (err) {
//       console.error("Error fetching shipments:", err);
//       setErrorMsg(err.message || "Failed to load shipments");
//       setShipments([]); // ensure it's always an array
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Create a new shipment (admin)
//   async function createShipment() {
//     setLoading(true);
//     setErrorMsg("");
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({
//           clientName: "John Doe",
//           item: "Men's Wear Order",
//           currentLocation: "Lagos Warehouse",
//           destination: "Abuja",
//         }),
//       });

//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         const text = await res.text();
//         console.warn("Create returned non-JSON:", text.slice(0, 240));
//         throw new Error("Create did not return JSON. Check server.");
//       }

//       const data = await res.json();
//       // If backend returns wrapper like { shipment: {...} } or { data: {...} }, find it
//       const created =
//         data.shipment || data.data || (Array.isArray(data) ? data[0] : data) || data;

//       const normalized = normalizeShipment(created);
//       // Prepend to shipments list so admin sees it immediately
//       setShipments((prev) => [normalized, ...prev]);
//       alert(`Shipment created! Tracking ID: ${normalized.trackingId || "N/A"}`);
//     } catch (err) {
//       console.error("Error creating shipment:", err);
//       setErrorMsg(err.message || "Failed to create shipment");
//       alert("Failed to create shipment: " + (err.message || ""));
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Update a shipment by its trackingId
//   async function updateShipment() {
//     if (!trackingId) return alert("Enter a tracking ID to update");
//     if (!status) return alert("Enter new location/status to update");

//     setLoading(true);
//     setErrorMsg("");
//     try {
//       const token = localStorage.getItem("token");
//       // We send by trackingId; backend route expects /api/logistics/:trackingNumber
//       const res = await fetch(`${API_ENDPOINT}/api/logistics/${encodeURIComponent(trackingId)}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({
//           location: status, // depending on your backend, you might use { currentLocation: status, status: 'In Transit' }
//           status: status,
//           notes: `Updated via frontend at ${new Date().toISOString()}`,
//         }),
//       });

//       const contentType = res.headers.get("content-type") || "";
//       if (!contentType.includes("application/json")) {
//         const text = await res.text();
//         console.warn("Update returned non-JSON:", text.slice(0, 240));
//         throw new Error("Update did not return JSON. Check server.");
//       }

//       const data = await res.json();
//       const updated = data.shipment || data.data || data || null;

//       if (!updated) throw new Error("No updated shipment returned from server");

//       const normalized = normalizeShipment(updated);

//       // Replace/merge in current list
//       setShipments((prev) => {
//         const exists = prev.some((p) => p._id === normalized._id || p.trackingId === normalized.trackingId);
//         if (!exists) return [normalized, ...prev];
//         return prev.map((p) => (p._id === normalized._id || p.trackingId === normalized.trackingId ? normalized : p));
//       });

//       alert(`Updated: ${normalized.currentLocation || status}`);
//     } catch (err) {
//       console.error("Error updating shipment:", err);
//       setErrorMsg(err.message || "Failed to update shipment");
//       alert("Failed to update shipment: " + (err.message || ""));
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">📦 Logistics Tracker</h1>

//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6 gap-4">
//           <div className="flex gap-3 items-center">
//             <button
//               onClick={createShipment}
//               disabled={loading}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
//             >
//               {loading ? "Working..." : "Generate New Logistics Code"}
//             </button>

//             <button
//               onClick={loadShipments}
//               disabled={loading}
//               className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 disabled:opacity-60"
//             >
//               Refresh
//             </button>
//           </div>

//           <div className="flex gap-2 items-center">
//             <input
//               type="text"
//               placeholder="Enter Tracking ID"
//               value={trackingId}
//               onChange={(e) => setTrackingId(e.target.value)}
//               className="border px-3 py-2 rounded w-64"
//             />
//             <input
//               type="text"
//               placeholder="Update Location / Status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="border px-3 py-2 rounded w-64"
//             />
//             <button
//               onClick={updateShipment}
//               disabled={loading}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
//             >
//               Update
//             </button>
//           </div>
//         </div>

//         {errorMsg && (
//           <div className="mb-4 text-red-600">
//             <strong>Error:</strong> {errorMsg}
//           </div>
//         )}

//         {loading && <div className="mb-4 text-gray-600">Loading...</div>}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(shipments) && shipments.length > 0 ? (
//             shipments.map((s) => (
//               <div key={s._id || s.trackingId || Math.random()} className="p-4 bg-white rounded-xl shadow-md">
//                 <h2 className="font-bold text-lg">{s.item || "Shipment"}</h2>
//                 <p className="text-sm text-gray-600">Client: {s.clientName || "—"}</p>
//                 <p className="text-sm text-gray-600">Destination: {s.destination || "—"}</p>
//                 <p className="mt-2">
//                   <span className="font-semibold">Current Location:</span> {s.currentLocation || "—"}
//                 </p>
//                 <p className="mt-2 text-blue-600 font-mono">
//                   Tracking ID: {s.trackingId || "—"}
//                 </p>

//                 {/* small history preview */}
//                 {Array.isArray(s.history) && s.history.length > 0 && (
//                   <div className="mt-3 text-sm text-gray-700">
//                     <div className="font-semibold">Last update:</div>
//                     <div>
//                       {s.history[s.history.length - 1].status || s.history[s.history.length - 1].notes || ""}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {new Date(s.history[s.history.length - 1].updatedAt || Date.now()).toLocaleString()}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-600">No shipments available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import { useEffect, useState } from "react";

/**
 * app/logistics/page.jsx
 * Next.js client component for Logistics admin view.
 *
 * Expects backend at NEXT_PUBLIC_API_ENDPOINT (e.g. http://localhost:4000)
 * Endpoints used:
 * - POST   /api/logistics            (protected) returns { success: true, shipment }
 * - GET    /api/logistics            (protected) returns { success: true, shipments }
 * - PUT    /api/logistics/:trackingNumber (protected) returns { success: true, shipment }
 * - GET    /api/logistics/track/:trackingNumber (public) returns { success: true, shipment }
 */

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

function ensureArrayFromResponse(data) {
  // Accept { success: true, shipments: [...] } OR [...] OR { shipment: {...} }
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.shipments && Array.isArray(data.shipments)) return data.shipments;
  // else if single shipment object provided
  if (data.shipment && !Array.isArray(data.shipment)) return [data.shipment];
  // If wrapped as { success: true, data: ... }
  if (data.data && Array.isArray(data.data)) return data.data;
  return [];
}

export default function LogisticsPage() {
  const [shipments, setShipments] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [locationUpdate, setLocationUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    loadShipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadShipments() {
    setLoading(true);
    setErr("");
    try {
      // Admin endpoint — requires JWT in Authorization header
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server did not return JSON: " + (text && text.slice ? text.slice(0, 200) : text));
      }

      const data = await res.json();
      const arr = ensureArrayFromResponse(data);
      setShipments(arr);
    } catch (e) {
      console.error("Load shipments failed:", e);
      setErr(e.message || "Failed to load shipments");
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }

  async function createShipment() {
    setLoading(true);
    setErr("");
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        body: JSON.stringify({
          clientName: "John Doe",
          clientEmail: "john@example.com",
          item: "Men's Wear Order",
          origin: "Lagos Warehouse",
          destination: "Abuja",
          currentLocation: "Lagos Warehouse",
        }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server did not return JSON: " + (text && text.slice ? text.slice(0, 200) : text));
      }

      const data = await res.json();

      if (!res.ok) {
        // show validation errors if present
        const msg = (data && data.error) || "Failed to create shipment";
        console.error("Create error payload:", data);
        setErr(msg);
        setLoading(false);
        return;
      }

      const created = data.shipment || data;
      // Update UI
      setShipments((prev) => [created, ...prev]);
      alert(`Shipment created! Tracking Number: ${created.trackingNumber}`);
    } catch (e) {
      console.error("Create shipment failed:", e);
      setErr(e.message || "Create failed");
      alert("Create failed: " + (e.message || ""));
    } finally {
      setLoading(false);
    }
  }

  async function updateShipment() {
    if (!trackingNumber) return alert("Enter tracking number to update");
    if (!locationUpdate) return alert("Enter location/status to update");

    setLoading(true);
    setErr("");
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics/${encodeURIComponent(trackingNumber)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        body: JSON.stringify({
          location: locationUpdate,
          status: "In Transit", // example; you may collect status separately
          notes: `Updated via admin UI`,
        }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server did not return JSON: " + (text && text.slice ? text.slice(0, 200) : text));
      }

      const data = await res.json();
      if (!res.ok) {
        const msg = (data && data.error) || "Update failed";
        setErr(msg);
        setLoading(false);
        return;
      }

      const updated = data.shipment || data;
      // replace in list
      setShipments((prev) => prev.map((p) => (p.trackingNumber === updated.trackingNumber ? updated : p)));
      alert(`Updated shipment ${updated.trackingNumber}`);
    } catch (e) {
      console.error("Update failed:", e);
      setErr(e.message || "Update failed");
      alert("Update failed: " + (e.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">📦 Logistics (Admin)</h1>

      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-2">
            <button onClick={createShipment} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
              {loading ? "Working..." : "Generate Shipment"}
            </button>
            <button onClick={loadShipments} disabled={loading} className="bg-gray-200 px-3 py-2 rounded">
              Refresh
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Tracking Number" className="px-3 py-2 border rounded w-64" />
            <input value={locationUpdate} onChange={(e) => setLocationUpdate(e.target.value)} placeholder="New location/status" className="px-3 py-2 border rounded w-64" />
            <button onClick={updateShipment} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </div>

        {err && <div className="text-red-600 mt-3">{err}</div>}
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">No shipments yet</div>
        ) : (
          shipments.map((s) => (
            <div key={s._id || s.trackingNumber} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{s.item || "Shipment"}</h3>
                  <p className="text-sm text-gray-600">Client: {s.clientName || "—"}</p>
                  <p className="text-sm text-gray-600">Destination: {s.destination || "—"}</p>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  <div>{new Date(s.createdAt || Date.now()).toLocaleString()}</div>
                  <div className="font-mono text-blue-600">{s.trackingNumber}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-sm"><strong>Current:</strong> {s.currentStatus || "—"} @ {s.currentLocation || "—"}</div>

                {Array.isArray(s.history) && s.history.length > 0 && (
                  <div className="mt-2 text-sm text-gray-700">
                    <div className="font-semibold">Recent history</div>
                    <div className="mt-1">
                      {s.history.slice(-3).reverse().map((h, i) => (
                        <div key={i} className="border-l-2 pl-2 mb-1">
                          <div>{h.status} — {h.location}</div>
                          {h.notes && <div className="text-xs text-gray-500">{h.notes}</div>}
                          <div className="text-xs text-gray-400">{new Date(h.updatedAt || Date.now()).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
