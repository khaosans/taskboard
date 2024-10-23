import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async function () {
  const response = NextResponse.next();

  // You can now safely use headers here if needed
  // For example:
  // const someHeader = req.headers.get('some-header');
  return await response;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};