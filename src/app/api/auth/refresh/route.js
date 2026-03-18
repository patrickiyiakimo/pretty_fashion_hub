import { proxyRequest } from "@/lib/proxyRequest";

export async function POST(request) {
  return proxyRequest(request, "/api/auth/refresh", "POST");
}