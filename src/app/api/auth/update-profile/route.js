import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request) {
  return proxyRequest(request, "/api/auth/update-profile", "PUT");
}