import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware deshabilitado para desarrollo
export function middleware(request: NextRequest) {
  // Permitir acceso a todo sin restricciones
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
