import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "it"],
  defaultLocale: "en",
});

export default withAuth(
  function middleware(req) {
    if (!req.nextUrl.pathname.startsWith("/admin")) {
      return intlMiddleware(req);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (path === "/admin/login") {
          return true;
        }

        if (path.startsWith("/admin")) {
          return !!token?.role || !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
