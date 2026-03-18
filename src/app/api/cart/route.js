import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://kingz-server.onrender.com";

async function proxyRequest(request, method) {
  try {
    const body =
      method === "GET" || method === "DELETE"
        ? null
        : await request.text();

    const backendResponse = await fetch(`${BACKEND_URL}/api/cart`, {
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

    // Forward cookies if backend sends any
    const cookies = backendResponse.headers.get("set-cookie");

    if (cookies) {
      response.headers.set("set-cookie", cookies);
    }

    return response;
  } catch (error) {
    console.error("Cart proxy error:", error);

    return NextResponse.json(
      { message: "Cart request failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return proxyRequest(request, "GET");
}

export async function POST(request) {
  return proxyRequest(request, "POST");
}

export async function PUT(request) {
  return proxyRequest(request, "PUT");
}

export async function DELETE(request) {
  return proxyRequest(request, "DELETE");
}