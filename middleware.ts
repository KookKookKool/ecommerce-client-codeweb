import { authMiddleware } from "@clerk/nextjs/server";

const apiContactRoute = process.env.NEXT_PUBLIC_API_FORM_;

if (!apiContactRoute) {
  throw new Error('Environment variable NEXT_PUBLIC_API_FORM is not set');
}

export default authMiddleware({
  publicRoutes: ["/", "/about", "/service", "/service/:id", "/contact", "/blog", "/blog/:id", "/policies", apiContactRoute],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/cart', '/(api|trpc)(.*)'],
};
