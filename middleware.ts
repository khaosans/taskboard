import { clerkMiddleware, NextRequestWithAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((request: NextRequestWithAuth) => {
  return NextResponse.next();
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
