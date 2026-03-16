// app/api/[...path]/route.js
export async function GET(request, { params }) {
  return proxyRequest(request, params);
}

export async function POST(request, { params }) {
  return proxyRequest(request, params);
}

export async function PUT(request, { params }) {
  return proxyRequest(request, params);
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, params);
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, params);
}

async function proxyRequest(request, { params }) {
  try {
    // Get backend URL from env
    const BACKEND_URL = process.env.BACKEND_URL;
    if (!BACKEND_URL) {
      throw new Error('BACKEND_URL environment variable is not set');
    }

    // Build the path
    const path = params.path.join('/');
    
    // Get query string if any
    const searchParams = request.nextUrl.search;
    
    // Construct full URL
    const url = `${BACKEND_URL}/api/${path}${searchParams}`;
    
    console.log(`🔄 [${new Date().toISOString()}] Proxying ${request.method} request to: ${url}`);

    // Get request headers (filter out ones we shouldn't forward)
    const headers = {};
    request.headers.forEach((value, key) => {
      // Don't forward host header
      if (key !== 'host') {
        headers[key] = value;
      }
    });

    // Get request body for non-GET requests
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.text();
    }

    // Forward the request to your backend
    const response = await fetch(url, {
      method: request.method,
      headers: {
        ...headers,
        // Ensure content-type is preserved
        'Content-Type': headers['content-type'] || 'application/json',
      },
      body: body,
    });

    // Get response data
    const responseData = await response.text();

    // Create response
    const newResponse = new Response(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward cookies from backend to frontend (CRITICAL for auth!)
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      console.log('✅ Forwarding cookies:', setCookieHeader);
      newResponse.headers.set('set-cookie', setCookieHeader);
    }

    // Forward important headers
    const contentType = response.headers.get('content-type');
    if (contentType) {
      newResponse.headers.set('content-type', contentType);
    }

    return newResponse;

  } catch (error) {
    console.error('❌ Proxy error:', error);
    return new Response(JSON.stringify({ 
      message: 'Proxy error', 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Optional: Add config for larger payloads if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust based on your needs
    },
  },
};