import { proxyRequest } from "@/lib/proxyRequest";

export async function POST(request) {
  return proxyRequest(request, "/api/consultations", "POST");
}

export async function GET(request) {
  return proxyRequest(request, "/api/consultations", "GET");
}

export async function UPDATE(request) {
  return proxyRequest(request, "/api/consultaions", "UPDATE")
}

export async function DELETE(request) {
  return proxyRequest(request, "/api/consultaions", "DELETE")
}