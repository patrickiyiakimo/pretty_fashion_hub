import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request, { params }) {
  const { id } = await params;
  return proxyRequest(request, `/api/auth/admin/users/${id}/suspend`, "PUT");
}