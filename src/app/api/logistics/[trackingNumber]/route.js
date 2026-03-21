import { proxyRequest } from "@/lib/proxyRequest";

export async function PUT(request, { params }) {
  return proxyRequest(
    request,
    `/api/logistics/${params.trackingNumber}`,
    "PUT"
  );
}

export async function DELETE(request, { params }) {
  return proxyRequest(
    request,
    `/api/logistics/${params.trackingNumber}`,
    "DELETE"
  );
}

export async function GET(request, { params }) {
  return proxyRequest(
    request,
    `/api/logistics/${params.trackingNumber}`,
    "GET"
  );
}

