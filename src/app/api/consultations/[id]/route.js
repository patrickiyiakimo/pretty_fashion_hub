import { proxyRequest } from "@/lib/proxyRequest";

export async function GET(request, { params }) {
  return proxyRequest(request, `/api/consultations/${params.id}`, "GET");
}

export async function PUT(request, { params }) {
  return proxyRequest(request, `/api/consultations/${params.id}`, "PUT");
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, `/api/consultations/${params.id}`, "PATCH");
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, `/api/consultations/${params.id}`, "DELETE");
}