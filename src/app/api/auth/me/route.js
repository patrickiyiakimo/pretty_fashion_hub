// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const BACKEND_URL =
//       process.env.BACKEND_URL || "https://kingz-server.onrender.com";

//     const backendResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
//       method: "GET",
//       headers: {
//         Cookie: request.headers.get("cookie") || "",
//       },
//       credentials: "include",
//     });

//     const data = await backendResponse.json();

//     const response = NextResponse.json(data, {
//       status: backendResponse.status,
//     });

//     const cookies = backendResponse.headers.get("set-cookie");

//     if (cookies) {
//       response.headers.set("set-cookie", cookies);
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth me proxy error:", error);

//     return NextResponse.json(
//       { message: "Failed to fetch user" },
//       { status: 500 }
//     );
//   }
// }



import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request) {
  return proxyRequest(request, "/api/auth/me", "GET");
}