// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const BACKEND_URL =
//       process.env.BACKEND_URL || "https://kingz-server.onrender.com";

//     // Parse incoming request body
//     const body = await request.json();

//     // Send request to backend login endpoint
//     const backendResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//       credentials: "include",
//     });

//     // Get backend response data
//     const data = await backendResponse.json();

//     // Create response for frontend
//     const response = NextResponse.json(data, {
//       status: backendResponse.status,
//     });

//     // Forward cookies from backend
//     const setCookie = backendResponse.headers.get("set-cookie");

//     if (setCookie) {
//       response.headers.set("set-cookie", setCookie);
//     }

//     return response;
//   } catch (error) {
//     console.error("Login proxy error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Authentication failed",
//       },
//       { status: 500 }
//     );
//   }
// }



import { proxyRequest } from "@/lib/proxyRequest";

export async function POST(request) {
  return proxyRequest(request, "/api/auth/login", "POST");
}