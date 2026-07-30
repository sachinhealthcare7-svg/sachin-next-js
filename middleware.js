import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const isAdminPage = pathname.startsWith("/admin/dashboard");

  // Blogs/products can be READ (GET) publicly, but creating/deleting
  // requires an admin session — that's checked here at the edge.
  const isProtectedWrite =
    (pathname.startsWith("/api/blogs") ||
      pathname.startsWith("/api/products") ||
      pathname.startsWith("/api/upload")) &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isAdminPage || isProtectedWrite) {
    const token = request.cookies.get("admin_token")?.value;
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      if (isAdminPage) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/blogs/:path*",
    "/api/products/:path*",
    "/api/upload/:path*",
  ],
};