import { proxyRequest } from "@/lib/proxyRequest";

export async function PATCH(request, { params }) {
  const { id } = params;

  // Forward request to your backend
  return proxyRequest(
    request,
    `/api/partners/${id}/status`,
    "PATCH"
  );
}