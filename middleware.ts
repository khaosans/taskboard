import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Add any configuration options here if needed
<<<<<<< HEAD
  
=======
>>>>>>> ccd4115 (Feature/sol (#56))
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
