import { proxyRequest } from "@/lib/proxyRequest";

export async function DELETE(request) {
  return proxyRequest(request, "/api/cart/remove", "DELETE");
}