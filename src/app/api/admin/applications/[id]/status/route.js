import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request, { params }) {
  return proxyRequest(
    request,
    `/api/admin/applications/${params.id}/status`,
    "PUT"
  );
}