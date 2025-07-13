import PocketBase from "pocketbase"

// Configuración de PocketBase
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"

// Cliente de PocketBase
export const pb = new PocketBase(POCKETBASE_URL)

// Colecciones
export const COLLECTIONS = {
  USERS: "users",
  TEMAS: "temas",
  TESTS: "tests",
  PREGUNTAS: "preguntas",
  MAPAS_MENTALES: "mapas_mentales",
  PUBLICACIONES: "publicaciones",
  COMENTARIOS: "comentarios",
}

// Tipos de datos para PocketBase
export interface PBUser {
  id: string
  email: string
  name: string
  username?: string
  avatar?: string
  ubicacion?: string
  created: string
  updated: string
}

export interface PBTema {
  id: string
  titulo: string
  categoria: string
  contenido: string
  created: string
  updated: string
}

export interface PBTest {
  id: string
  titulo: string
  descripcion: string
  dificultad: number
  preguntas: string[] // IDs de preguntas
  usuario: string // ID del usuario
  created: string
  updated: string
}

export interface PBPregunta {
  id: string
  pregunta: string
  opciones: string[]
  respuesta_correcta: number
  explicacion: string
  tema: string // ID del tema
  created: string
  updated: string
}

export interface PBMapaMental {
  id: string
  titulo: string
  contenido: string // JSON con la estructura del mapa
  usuario: string // ID del usuario
  created: string
  updated: string
}

export interface PBPublicacion {
  id: string
  titulo: string
  contenido: string
  usuario: string // ID del usuario
  likes: number
  comentarios: number
  created: string
  updated: string
}

// Función para obtener la fecha actual
export const getCurrentDate = () => {
  return new Date().toISOString()
}

// Función para manejar errores de PocketBase
export const handlePBError = (error: any) => {
  console.error("PocketBase Error:", error)

  if (error?.response?.data) {
    return error.response.data.message || "Error desconocido"
  }

  return error.message || "Error de conexión"
}

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return pb.authStore.isValid
}

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return pb.authStore.model as PBUser | null
}

// Función para limpiar la autenticación
export const clearAuth = () => {
  pb.authStore.clear()
}
