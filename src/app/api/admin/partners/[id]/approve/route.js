import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request, { params }) {
  return proxyRequest(
    request,
    `/api/admin/partners/${params.id}/approve`,
    "PUT"
  );
}