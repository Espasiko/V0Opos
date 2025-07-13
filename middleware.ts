import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard", "/profile", "/temas", "/tests", "/mapas-mentales", "/foro"]

// Rutas públicas (accesibles sin autenticación)
const publicRoutes = ["/", "/login", "/register", "/forgot-password"]

// Rutas de API que no requieren redirección
const apiRoutes = ["/api/"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // No aplicar middleware a rutas de API o archivos estáticos
  if (
    apiRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.includes("_next") ||
    pathname.includes("favicon.ico")
  ) {
    return NextResponse.next()
  }

  // Verificar si la ruta requiere autenticación
  const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route))

  // Verificar si el usuario está autenticado mediante la cookie de sesión
  const sessionCookie = request.cookies.get("appwrite-session")
  const isAuthenticated = !!sessionCookie

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a login
  if (requiresAuth && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si el usuario está autenticado y trata de acceder a login o register, redirigir a dashboard
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configurar el middleware para que se ejecute en las rutas especificadas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (icono del sitio)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

