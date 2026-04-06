import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request, { params }) {
  const { id } = await params;
  return proxyRequest(request, `/api/partners/${id}/bio`, "GET");
}