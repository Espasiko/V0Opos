import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { pb } from "@/lib/pocketbase"

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

const redisUrl = process.env.KV_URL
const redisToken = process.env.KV_REST_API_TOKEN

if (!redisUrl || !redisToken) {
  console.error("KV_URL and KV_REST_API_TOKEN environment variables must be defined")
}

const redis = new Redis({
  url: redisUrl || "",
  token: redisToken || "",
})

async function getSession(sessionId: string): Promise<any | null> {
  try {
    const sessionData = await redis.get(sessionId)
    return sessionData ? JSON.parse(sessionData as string) : null
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

async function setSession(sessionId: string, data: any): Promise<void> {
  try {
    await redis.set(sessionId, JSON.stringify(data))
  } catch (error) {
    console.error("Error setting session:", error)
  }
}

async function deleteSession(sessionId: string): Promise<void> {
  try {
    await redis.del(sessionId)
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

// Obtener la sesión del usuario desde las cookies y Redis
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

// Crear una sesión y guardarla en Redis
export async function createSession(user: UserSession): Promise<string> {
  const sessionId = crypto.randomUUID()
  await setSession(sessionId, user)
  return sessionId
}

// Eliminar una sesión de Redis
export async function deleteSessionFromRedis(sessionId: string): Promise<void> {
  await deleteSession(sessionId)
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

import { Client, Account, Databases, Storage } from "appwrite"

// Configuración de Appwrite
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67e11f880033f06544b0",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || "",
  // Colecciones relevantes para tu aplicación
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  temasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TEMAS_COLLECTION_ID || "",
  testsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TESTS_COLLECTION_ID || "",
  preguntasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PREGUNTAS_COLLECTION_ID || "",
  mapasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MAPAS_COLLECTION_ID || "",
  publicacionesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PUBLICACIONES_COLLECTION_ID || "",
  comentariosCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMENTARIOS_COLLECTION_ID || "",
}

// Cliente de Appwrite
export const createAppwriteClient = () => {
  const client = new Client()
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e11f880033f06544b0")
  return client
}

// Servicios de Appwrite
export const createAccount = (client: Client) => {
  return new Account(client)
}

export const createDatabases = (client: Client) => {
  return new Databases(client)
}

export const createStorage = (client: Client) => {
  return new Storage(client)
}

// Función para validar la configuración
export const validateAppwriteConfig = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID",
  ]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    console.warn(
      `Advertencia: Las siguientes variables de entorno no están definidas: ${missingEnvVars.join(
        ", ",
      )}. Se utilizarán valores predeterminados.`,
    )
  }

  return {
    valid: missingEnvVars.length === 0,
    message:
      missingEnvVars.length > 0 ? `Faltan las siguientes variables de entorno: ${missingEnvVars.join(", ")}` : "",
  }
}

import { ID } from "appwrite"
export { ID }

// Funciones para PocketBase
// Función para obtener la cuenta actual usando PocketBase
export async function getAccountFromPocketBase() {
  try {
    if (!pb.authStore.isValid) {
      return null
    }

    // Verificar que el usuario actual esté disponible
    const user = pb.authStore.model

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      ubicacion: user.ubicacion,
    }
  } catch (error) {
    console.error("Error al obtener cuenta:", error)
    return null
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated() {
  return pb.authStore.isValid
}

// Función para obtener el token actual
export function getToken() {
  return pb.authStore.token
}

// Función para limpiar la autenticación
export function clearAuth() {
  pb.authStore.clear()
}
