import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request) {
  return proxyRequest(request, "/api/logistics", "GET");
}
