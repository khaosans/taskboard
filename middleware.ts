import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware(async (request: NextRequest) => {
  const response = NextResponse.next();
  
  // Ensure headers are accessed asynchronously
  const headers = await request.headers;
  
  // You can now safely use headers here if needed
  // For example:
  // const someHeader = headers.get('some-header');
  
  return response;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
