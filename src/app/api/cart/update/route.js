import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request) {
  return proxyRequest(request, "/api/cart/update", "PUT");
}