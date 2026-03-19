import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request) {
  return proxyRequest(request, "/api/partners", "GET");
}

export async function POST(request) {
  return proxyRequest(request, "/api/partners", "POST");
}