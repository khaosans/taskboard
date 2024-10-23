import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add any configuration options here if needed
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
