import PocketBase from "pocketbase"

// Configuración de PocketBase
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"

// Cliente de PocketBase con configuración mejorada
export const pb = new PocketBase(POCKETBASE_URL)

// Configurar el cliente
pb.autoCancellation(false)

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

// Función mejorada para manejar errores de PocketBase
export const handlePBError = (error: any) => {
  console.error("PocketBase Error Details:", {
    error,
    message: error?.message,
    status: error?.status,
    response: error?.response,
    data: error?.response?.data,
    url: POCKETBASE_URL
  })

  // Si es un error de red/fetch
  if (error.name === 'TypeError' || error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
    return `Error de conexión: No se puede conectar a PocketBase en ${POCKETBASE_URL}. Verifica que el servidor esté ejecutándose.`
  }

  // Si es un error de conexión rechazada
  if (error.message?.includes('ECONNREFUSED') || error.code === 'ECONNREFUSED') {
    return `Conexión rechazada: PocketBase no está ejecutándose en ${POCKETBASE_URL}. Ejecuta: ./pocketbase serve`
  }

  // Si es un error de timeout
  if (error.message?.includes('timeout') || error.code === 'ETIMEDOUT') {
    return `Timeout: El servidor PocketBase no responde en ${POCKETBASE_URL}. Verifica la conexión.`
  }

  // Si es un error de PocketBase con respuesta
  if (error?.response?.data) {
    const errorData = error.response.data
    
    // Errores de validación
    if (errorData.data) {
      const fieldErrors = Object.entries(errorData.data).map(([field, error]: [string, any]) => {
        return `${field}: ${error.message || error}`
      }).join(', ')
      return `Error de validación: ${fieldErrors}`
    }
    
    // Mensaje de error general
    if (errorData.message) {
      return errorData.message
    }
  }

  // Si es un error con status HTTP
  if (error?.status) {
    switch (error.status) {
      case 400:
        return "Datos inválidos. Verifica la información ingresada."
      case 401:
        return "Credenciales incorrectas. Verifica tu email y contraseña."
      case 403:
        return "No tienes permisos para realizar esta acción."
      case 404:
        return "Usuario no encontrado o recurso no disponible."
      case 500:
        return "Error interno del servidor PocketBase. Intenta más tarde."
      default:
        return `Error del servidor (${error.status}): ${error.message || 'Error desconocido'}`
    }
  }

  // Error genérico con información de debugging
  const errorMessage = error.message || "Error desconocido"
  return `Error de PocketBase: ${errorMessage}. URL: ${POCKETBASE_URL}`
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

// Función para verificar la conexión con PocketBase
export const checkConnection = async () => {
  try {
    console.log("Verificando conexión con PocketBase en:", POCKETBASE_URL)
    
    // Intentar hacer una petición simple de health check
    const response = await fetch(`${POCKETBASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      console.log("Conexión exitosa con PocketBase")
      return { 
        success: true, 
        message: `Conexión exitosa con PocketBase en ${POCKETBASE_URL}`,
        url: POCKETBASE_URL
      }
    } else {
      console.error("Respuesta no exitosa:", response.status, response.statusText)
      return { 
        success: false, 
        message: `Error HTTP ${response.status}: ${response.statusText}`,
        url: POCKETBASE_URL
      }
    }
  } catch (error) {
    console.error("Error en checkConnection:", error)
    return { 
      success: false, 
      message: handlePBError(error),
      url: POCKETBASE_URL
    }
  }
}
