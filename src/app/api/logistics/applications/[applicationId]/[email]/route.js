// import { proxyRequest } from "@/lib/proxyRequest";

// export async function GET(request, { params }) {
//   const { applicationId, email } = params;

//   return proxyRequest(
//     request,
//     `/api/logistics/applications/${applicationId}/${email}`,
//     "GET"
//   );
// }



// import { NextResponse } from "next/server";
import { proxyRequest } from "@/lib/proxyRequest";

// For Next.js App Router, params are passed as a Promise in the second argument
export async function GET(request, { params }) {
  try {
    // In Next.js 15+, params might be a Promise, so we need to await it
    const { applicationId, email } = await params;
    
    console.log(`🔍 Checking application status for ID: ${applicationId}, Email: ${email}`);
    
    // Forward the request to the backend
    const response = await proxyRequest(
      request,
      `/api/logistics/applications/${applicationId}/${email}`,
      "GET"
    );
    
    return response;
    
  } catch (error) {
    console.error("❌ Error in application status route:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to fetch application status" 
      },
      { status: 500 }
    );
  }
}