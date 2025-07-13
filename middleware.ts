import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/perfil", "/tests", "/mapas", "/editor-mapas", "/comunidad", "/ia"]
const authRoutes = ["/login", "/registro"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Obtener token de PocketBase
  const pbAuthCookie = request.cookies.get("pb_auth")
  const isAuthenticated = pbAuthCookie && pbAuthCookie.value !== ""

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
