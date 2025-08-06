import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { pb } from "@/lib/pocketbase"
import { PocketBaseApi } from "./pocketbase-api"

// Tipos
export interface UserSession {
  id: string
  email: string
  nombre: string
  role: "user" | "admin"
}

// Clave secreta para firmar los tokens JWT
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

// Configuración opcional de Redis
const redisUrl = process.env.KV_URL
const redisToken = process.env.KV_REST_API_TOKEN
const isRedisAvailable = redisUrl && redisToken

let redis: any = null

// Solo inicializar Redis si las variables están disponibles
if (isRedisAvailable) {
  try {
    const { Redis } = require("@upstash/redis")
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    })
    console.log("✅ Redis configurado correctamente")
  } catch (error) {
    console.warn("⚠️ Error configurando Redis:", error)
    redis = null
  }
} else {
  console.log("ℹ️ Redis no configurado - usando almacenamiento en memoria")
}

// Almacenamiento en memoria como fallback
const memoryStore = new Map<string, any>()

async function getSession(sessionId: string): Promise<any | null> {
  try {
    if (redis) {
      const sessionData = await redis.get(sessionId)
      return sessionData ? JSON.parse(sessionData as string) : null
    } else {
      // Fallback a memoria
      const sessionData = memoryStore.get(sessionId)
      return sessionData || null
    }
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

async function setSession(sessionId: string, data: any): Promise<void> {
  try {
    if (redis) {
      await redis.set(sessionId, JSON.stringify(data))
    } else {
      // Fallback a memoria
      memoryStore.set(sessionId, data)
    }
  } catch (error) {
    console.error("Error setting session:", error)
  }
}

async function deleteSession(sessionId: string): Promise<void> {
  try {
    if (redis) {
      await redis.del(sessionId)
    } else {
      // Fallback a memoria
      memoryStore.delete(sessionId)
    }
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

// Obtener la sesión del usuario desde las cookies y almacenamiento
export async function getSessionFromRedis(): Promise<UserSession | null> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("session_token")?.value

  if (!sessionId) {
    return null
  }

  const sessionData = await getSession(sessionId)
  if (!sessionData) {
    return null
  }

  return sessionData as UserSession
}

// Crear una sesión y guardarla
export async function createSession(user: UserSession): Promise<string> {
  const sessionId = crypto.randomUUID()
  await setSession(sessionId, user)
  return sessionId
}

// Eliminar una sesión
export async function deleteSessionFromRedis(sessionId: string): Promise<void> {
  await deleteSession(sessionId)
}

// Middleware para proteger rutas API
export async function authMiddleware(request: NextRequest) {
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/")
  const isPublicRoute = ["/api/auth/login", "/api/auth/register"].includes(request.nextUrl.pathname)

  if (!isApiRoute || isPublicRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get("session_token")?.value

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const user = await verifyToken(token)

  if (!user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 })
  }

  return NextResponse.next()
}

// Simulación de base de datos de usuarios para desarrollo
export const mockUsers = [
  {
    id: "1",
    email: "usuario@ejemplo.com",
    password: "password123",
    nombre: "Usuario Ejemplo",
    role: "user" as const,
    ubicacion: "Madrid",
    fecha_registro: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    email: "admin@oposia.com",
    password: "admin123",
    nombre: "Administrador",
    role: "admin" as const,
    ubicacion: "Barcelona",
    fecha_registro: "2023-01-01T00:00:00.000Z",
  },
]

// Función para validar credenciales
export async function validateCredentials(email: string, password: string) {
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return null
  }

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Funciones para PocketBase
export async function getAccount() {
  try {
    if (!pb.authStore.isValid) {
      return null
    }
    return await PocketBaseApi.getCurrentUser()
  } catch (error) {
    console.error("Error obteniendo cuenta:", error)
    return null
  }
}

export function isAuthenticated() {
  return pb.authStore.isValid
}

export function getToken() {
  return pb.authStore.token
}

export function getCurrentUser() {
  return pb.authStore.model
}

export function clearAuth() {
  pb.authStore.clear()
}
