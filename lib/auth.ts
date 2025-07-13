import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Tipos
export interface UserSession {
  id: string
  email: string
  nombre: string
  role: "user" | "admin"
}

// Clave secreta para firmar los tokens JWT (en producción, usar una variable de entorno)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "oposia_secret_key_change_in_production")

// Opciones para el token
const TOKEN_OPTIONS = {
  expiresIn: "7d", // El token expira en 7 días
}

// Crear un token JWT para un usuario
export async function createToken(user: UserSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_OPTIONS.expiresIn)
    .sign(JWT_SECRET)
}

// Verificar un token JWT
export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as UserSession
  } catch (error) {
    console.error("Error verificando token:", error)
    return null
  }
}

// Obtener la sesión del usuario desde las cookies
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) {
    return null
  }

  return verifyToken(token)
}

// Middleware para proteger rutas API
export async function authMiddleware(request: NextRequest) {
  // Verificar si la ruta requiere autenticación
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/")
  const isPublicRoute = ["/api/auth/login", "/api/auth/register"].includes(request.nextUrl.pathname)

  // Si es una ruta pública o no es una ruta API, permitir el acceso
  if (!isApiRoute || isPublicRoute) {
    return NextResponse.next()
  }

  // Verificar el token de autenticación
  const token = request.cookies.get("session_token")?.value

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const user = await verifyToken(token)

  if (!user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 })
  }

  // Continuar con la solicitud
  return NextResponse.next()
}

// Simulación de base de datos de usuarios para desarrollo
// En producción, esto se conectaría a Supabase o similar
export const mockUsers = [
  {
    id: "1",
    email: "usuario@ejemplo.com",
    password: "password123", // En producción, usar hash
    nombre: "Usuario Ejemplo",
    role: "user" as const,
    ubicacion: "Madrid",
    fecha_registro: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    email: "admin@oposia.com",
    password: "admin123", // En producción, usar hash
    nombre: "Administrador",
    role: "admin" as const,
    ubicacion: "Barcelona",
    fecha_registro: "2023-01-01T00:00:00.000Z",
  },
]

// Función para validar credenciales (simulada)
export async function validateCredentials(email: string, password: string) {
  // En producción, verificar contra la base de datos y usar hash para las contraseñas
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return null
  }

  // No devolver la contraseña
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

