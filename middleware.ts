import { authMiddleware } from "@clerk/nextjs";

const middleware = authMiddleware({
  publicRoutes: ["/", "/api/public"]
});

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
