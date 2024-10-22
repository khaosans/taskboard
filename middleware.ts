import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default clerkMiddleware((req) => {
  // Your custom middleware logic here, if any
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
