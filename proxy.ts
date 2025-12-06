import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// https://nextjs.org/docs/messages/middleware-to-proxy
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
