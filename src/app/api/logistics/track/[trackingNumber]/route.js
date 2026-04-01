import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request, { params }) {
  return proxyRequest(
    request,
    `/api/logistics/track/${params.trackingNumber}`,
    "GET"
  );
}