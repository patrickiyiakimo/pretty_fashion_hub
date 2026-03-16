// app/api/cart/[...path]/route.js
export async function GET(request, { params }) {
  return handleCartRequest(request, params);
}

export async function POST(request, { params }) {
  return handleCartRequest(request, params);
}

export async function PUT(request, { params }) {
  return handleCartRequest(request, params);
}

export async function DELETE(request, { params }) {
  return handleCartRequest(request, params);
}

async function handleCartRequest(request, { params }) {
  try {
    const BACKEND_URL = process.env.BACKEND_URL || 'https://kingz-server.onrender.com';
    const path = params?.path?.join('/') || '';
    const url = `${BACKEND_URL}/api/cart/${path}${request.nextUrl.search}`;
    
    console.log(`🔄 Cart proxy to: ${url}`);

    let body = null;
    if (request.method !== 'GET') {
      body = await request.text();
    }

    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body: body,
    });

    const data = await response.text();
    const newResponse = new Response(data, {
      status: response.status,
      statusText: response.statusText,
    });

    const cookies = response.headers.get('set-cookie');
    if (cookies) {
      newResponse.headers.set('set-cookie', cookies);
    }

    return newResponse;

  } catch (error) {
    console.error('Cart proxy error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}