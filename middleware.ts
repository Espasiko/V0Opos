import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedRoutes = ["/perfil", "/tests", "/mapas", "/editor-mapas", "/comunidad", "/ia"]

// Rutas de autenticación (redirigir si ya está autenticado)
const authRoutes = ["/login", "/registro", "/registro-simple", "/registro-manual", "/login-alternativo"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Obtener token de PocketBase de las cookies
  const pbAuthCookie = request.cookies.get("pb_auth")
  const isAuthenticated = pbAuthCookie && pbAuthCookie.value !== ""

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Verificar si es una ruta de autenticación
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirigir a login si no está autenticado y trata de acceder a ruta protegida
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirigir al dashboard si está autenticado y trata de acceder a rutas de auth
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
