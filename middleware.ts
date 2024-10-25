import { authMiddleware } from '@clerk/nextjs/server'

// Use the correct environment variable for Clerk's publishable key
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined in the environment variables.');
}

console.log('Publishable Key:', publishableKey); // Debugging line

export default authMiddleware({
  publicRoutes: ['((?!^/admin).*)'],
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
