import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://kingz-server.onrender.com";

export async function proxyRequest(request, endpoint, method = "GET") {
  try {
    const body =
      method === "GET" || method === "DELETE"
        ? null
        : await request.text();

    const { search } = new URL(request.url);

    const backendResponse = await fetch(`${BACKEND_URL}${endpoint}${search}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body,
      credentials: "include",
    });

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
      { message: "Proxy request failed" },
      { status: 500 }
    );
  }
}