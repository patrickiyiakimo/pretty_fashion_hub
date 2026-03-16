// // app/api/[...path]/route.js
// export async function GET(request, { params }) {
//   return proxyRequest(request, params);
// }

// export async function POST(request, { params }) {
//   return proxyRequest(request, params);
// }

// export async function PUT(request, { params }) {
//   return proxyRequest(request, params);
// }

// export async function DELETE(request, { params }) {
//   return proxyRequest(request, params);
// }

// export async function PATCH(request, { params }) {
//   return proxyRequest(request, params);
// }

// async function proxyRequest(request, { params }) {
//   try {
//     // Get backend URL from env
//     const BACKEND_URL = process.env.BACKEND_URL;
//     if (!BACKEND_URL) {
//       throw new Error('BACKEND_URL environment variable is not set');
//     }

//     // Build the path
//     const path = params.path.join('/');
    
//     // Get query string if any
//     const searchParams = request.nextUrl.search;
    
//     // Construct full URL
//     const url = `${BACKEND_URL}/api/${path}${searchParams}`;
    
//     console.log(`🔄 [${new Date().toISOString()}] Proxying ${request.method} request to: ${url}`);

//     // Get request headers (filter out ones we shouldn't forward)
//     const headers = {};
//     request.headers.forEach((value, key) => {
//       // Don't forward host header
//       if (key !== 'host') {
//         headers[key] = value;
//       }
//     });

//     // Get request body for non-GET requests
//     let body = null;
//     if (request.method !== 'GET' && request.method !== 'HEAD') {
//       body = await request.text();
//     }

//     // Forward the request to your backend
//     const response = await fetch(url, {
//       method: request.method,
//       headers: {
//         ...headers,
//         // Ensure content-type is preserved
//         'Content-Type': headers['content-type'] || 'application/json',
//       },
//       body: body,
//     });

//     // Get response data
//     const responseData = await response.text();

//     // Create response
//     const newResponse = new Response(responseData, {
//       status: response.status,
//       statusText: response.statusText,
//     });

//     // Forward cookies from backend to frontend (CRITICAL for auth!)
//     const setCookieHeader = response.headers.get('set-cookie');
//     if (setCookieHeader) {
//       console.log('✅ Forwarding cookies:', setCookieHeader);
//       newResponse.headers.set('set-cookie', setCookieHeader);
//     }

//     // Forward important headers
//     const contentType = response.headers.get('content-type');
//     if (contentType) {
//       newResponse.headers.set('content-type', contentType);
//     }

//     return newResponse;

//   } catch (error) {
//     console.error('❌ Proxy error:', error);
//     return new Response(JSON.stringify({ 
//       message: 'Proxy error', 
//       error: error.message,
//       timestamp: new Date().toISOString()
//     }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

// // Optional: Add config for larger payloads if needed
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb', // Adjust based on your needs
//     },
//   },
// };


// // app/api/[...path]/route.js
// export async function GET(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function POST(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function PUT(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function DELETE(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function PATCH(request, { params }) {
//   return handleRequest(request, params);
// }

// async function handleRequest(request, params) {
//   try {
//     // 🔍 Debug log
//     console.log('🔍 Params received:', params);
//     console.log('🔍 Request URL:', request.url);

//     // Check if params exists and has path
//     if (!params || !params.path) {
//       console.error('❌ Params or path is undefined:', params);
      
//       // Try to extract path from URL as fallback
//       const url = new URL(request.url);
//       const pathMatch = url.pathname.match(/\/api\/(.+)/);
//       const fallbackPath = pathMatch ? pathMatch[1] : '';
      
//       if (fallbackPath) {
//         console.log('✅ Using fallback path:', fallbackPath);
//         params = { path: fallbackPath.split('/') };
//       } else {
//         return new Response(JSON.stringify({ 
//           error: 'Invalid request',
//           message: 'Could not determine API path'
//         }), {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' }
//         });
//       }
//     }

//     const BACKEND_URL = process.env.BACKEND_URL;
    
//     if (!BACKEND_URL) {
//       console.error('❌ BACKEND_URL is not defined');
//       return new Response(JSON.stringify({ 
//         error: 'Configuration error',
//         message: 'BACKEND_URL environment variable is not set'
//       }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const path = params.path.join('/');
//     const searchParams = request.nextUrl.search;
//     const url = `${BACKEND_URL}/api/${path}${searchParams}`;
    
//     console.log(`🔄 Proxying ${request.method} request to: ${url}`);

//     // Prepare headers
//     const headers = {};
//     request.headers.forEach((value, key) => {
//       if (key !== 'host') {
//         headers[key] = value;
//       }
//     });

//     // Get request body
//     let body = null;
//     if (request.method !== 'GET' && request.method !== 'HEAD') {
//       body = await request.text();
//     }

//     // Forward the request to backend
//     const response = await fetch(url, {
//       method: request.method,
//       headers: {
//         ...headers,
//         'Content-Type': headers['content-type'] || 'application/json',
//       },
//       body: body,
//     });

//     console.log(`✅ Backend responded with status: ${response.status}`);

//     // Get response data
//     const responseData = await response.text();

//     // Create new response
//     const newResponse = new Response(responseData, {
//       status: response.status,
//       statusText: response.statusText,
//     });

//     // Forward cookies
//     const setCookieHeader = response.headers.get('set-cookie');
//     if (setCookieHeader) {
//       newResponse.headers.set('set-cookie', setCookieHeader);
//     }

//     // Forward content type
//     const contentType = response.headers.get('content-type');
//     if (contentType) {
//       newResponse.headers.set('content-type', contentType);
//     }

//     return newResponse;

//   } catch (error) {
//     console.error('❌ Proxy error:', error);
    
//     return new Response(JSON.stringify({ 
//       error: 'Proxy error',
//       message: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }




// // app/api/[...path]/route.js
// export async function GET(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function POST(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function PUT(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function DELETE(request, { params }) {
//   return handleRequest(request, params);
// }

// export async function PATCH(request, { params }) {
//   return handleRequest(request, params);
// }

// async function handleRequest(request, params) {
//   try {
//     const BACKEND_URL = process.env.BACKEND_URL;
    
//     if (!BACKEND_URL) {
//       return new Response(JSON.stringify({ error: 'BACKEND_URL not set' }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     // Build the URL
//     const path = params?.path?.join('/') || '';
//     const searchParams = request.nextUrl.search;
//     const url = `${BACKEND_URL}/api/${path}${searchParams}`;
    
//     console.log(`🔄 ${request.method} to: ${url}`);

//     // ✅ CRITICAL: Get the request body as raw text
//     const body = await request.text();
//     console.log('📦 Request body length:', body?.length || 0);

//     // Prepare headers
//     const headers = {};
//     request.headers.forEach((value, key) => {
//       if (key !== 'host') {
//         headers[key] = value;
//       }
//     });

//     // Forward the request with the body
//     const response = await fetch(url, {
//       method: request.method,
//       headers: {
//         ...headers,
//         'Content-Type': headers['content-type'] || 'application/json',
//         'Content-Length': body ? Buffer.byteLength(body).toString() : undefined,
//       },
//       body: body || undefined, // ✅ Send the body!
//     });

//     // Get response data
//     const responseData = await response.text();

//     // Create response
//     const newResponse = new Response(responseData, {
//       status: response.status,
//       statusText: response.statusText,
//     });

//     // Forward cookies
//     const setCookieHeader = response.headers.get('set-cookie');
//     if (setCookieHeader) {
//       newResponse.headers.set('set-cookie', setCookieHeader);
//     }

//     // Forward content type
//     const contentType = response.headers.get('content-type');
//     if (contentType) {
//       newResponse.headers.set('content-type', contentType);
//     }

//     return newResponse;

//   } catch (error) {
//     console.error('❌ Proxy error:', error);
//     return new Response(JSON.stringify({ 
//       error: 'Proxy error', 
//       message: error.message 
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }





// app/api/[...path]/route.js
export async function GET(request, { params }) {
  return handleRequest(request, params);
}

export async function POST(request, { params }) {
  return handleRequest(request, params);
}

export async function PUT(request, { params }) {
  return handleRequest(request, params);
}

export async function DELETE(request, { params }) {
  return handleRequest(request, params);
}

export async function PATCH(request, { params }) {
  return handleRequest(request, params);
}

async function handleRequest(request, { params }) {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    
    if (!BACKEND_URL) {
      return new Response(JSON.stringify({ error: 'BACKEND_URL not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build the URL
    const path = params?.join('/') || '';
    const searchParams = request.nextUrl.search;
    const url = `${BACKEND_URL}/api/${path}${searchParams}`;
    
    console.log(`🔄 ${request.method} to: ${url}`);

    // ✅ FIX: Get the request body properly
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      // Clone the request to read the body
      const clonedRequest = request.clone();
      body = await clonedRequest.text();
      console.log('📦 Request body:', body);
    }

    // Prepare headers
    const headers = {};
    request.headers.forEach((value, key) => {
      if (!['host', 'content-length'].includes(key)) {
        headers[key] = value;
      }
    });

    // Forward the request
    const response = await fetch(url, {
      method: request.method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: body || undefined,
    });

    // Get response data
    const responseData = await response.text();

    // Create new response
    const newResponse = new Response(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward cookies
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      newResponse.headers.set('set-cookie', setCookieHeader);
    }

    // Forward content type
    const contentType = response.headers.get('content-type');
    if (contentType) {
      newResponse.headers.set('content-type', contentType);
    }

    return newResponse;

  } catch (error) {
    console.error('❌ Proxy error:', error);
    return new Response(JSON.stringify({ 
      error: 'Proxy error', 
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}