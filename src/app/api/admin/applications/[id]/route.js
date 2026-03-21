import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request, { params }) {
  return proxyRequest(
    request,
    `/api/admin/applications/${params.id}`,
    "GET"
  );
}