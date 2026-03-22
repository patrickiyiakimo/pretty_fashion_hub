import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request) {
  return proxyRequest(
    request,
    "/api/logistics/admin/applications",
    "GET"
  );
}

export async function POST(request) {
  return proxyRequest(
    request,
    "/api/logistics/applications",
    "POST"
  );
}