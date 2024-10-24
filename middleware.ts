import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default clerkMiddleware((request: NextRequest) => {
  const response = NextResponse.next();
  // Add any custom logic here
  return response;
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
