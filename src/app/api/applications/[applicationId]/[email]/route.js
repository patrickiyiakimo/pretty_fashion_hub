import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request, { params }) {
  const { applicationId, email } = params;

  return proxyRequest(
    request,
    `/api/applications/${applicationId}/${email}`,
    "GET"
  );
}