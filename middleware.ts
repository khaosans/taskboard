import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from "@clerk/nextjs/server";

export async function middleware(request: NextRequest) {
  return authMiddleware({
    publicRoutes: ["/", "/api/auth(.*)"],
  })(request);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
