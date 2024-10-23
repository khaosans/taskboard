import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Add any configuration options here if needed
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
