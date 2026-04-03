// import { NextResponse } from "next/server";

// const BACKEND_URL =
//   process.env.BACKEND_URL || "https://kingz-server.onrender.com";

// export async function proxyRequest(request, endpoint, method = "GET") {
//   try {
//     const body =
//       method === "GET" || method === "DELETE"
//         ? null
//         : await request.text();

//     const { search } = new URL(request.url);

//     const backendResponse = await fetch(`${BACKEND_URL}${endpoint}${search}`, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: request.headers.get("cookie") || "",
//       },
//       body,
//       credentials: "include",
//     });

//     const data = await backendResponse.text();

//     const response = new NextResponse(data, {
//       status: backendResponse.status,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const cookies = backendResponse.headers.get("set-cookie");

//     if (cookies) {
//       response.headers.set("set-cookie", cookies);
//     }

//     return response;
//   } catch (error) {
//     console.error("Proxy error:", error);

//     return NextResponse.json(
//       { message: "Proxy request failed" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://kingz-server.onrender.com";

export async function proxyRequest(request, endpoint, method = "GET") {
  try {
    // ✅ FIXED: Only GET and HEAD should have no body
    // DELETE, POST, PUT, PATCH can all have bodies
    const body =
      method === "GET" || method === "HEAD"
        ? null
        : await request.text();

    const { search } = new URL(request.url);

    console.log(`🔄 Proxying ${method} request to: ${BACKEND_URL}${endpoint}${search}`);
    
    if (body) {
      console.log(`📦 Request body:`, body);
    }

    const backendResponse = await fetch(`${BACKEND_URL}${endpoint}${search}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body,
      credentials: "include",
    });

    console.log(`📡 Backend response status: ${backendResponse.status}`);

    const data = await backendResponse.text();

    const response = new NextResponse(data, {
      status: backendResponse.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const cookies = backendResponse.headers.get("set-cookie");

    if (cookies) {
      response.headers.set("set-cookie", cookies);
    }

    return response;
  } catch (error) {
    console.error("Proxy error:", error);

    return NextResponse.json(
      { message: "Proxy request failed", error: error.message },
      { status: 500 }
    );
  }
}