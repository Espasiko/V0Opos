// Utilidades para interactuar directamente con la API REST de Appwrite
// sin depender del SDK

// Configuración de Appwrite
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "67e11f880033f06544b0"

// Función para validar y normalizar el endpoint
const validateEndpoint = (endpoint: string): string => {
  try {
    // Si el endpoint está vacío, usar el valor predeterminado
    if (!endpoint) {
      console.warn("Endpoint vacío, usando valor predeterminado")
      return "https://cloud.appwrite.io/v1"
    }

    // Si el endpoint es demasiado largo (probablemente un token), usar el valor predeterminado
    if (endpoint.length > 100) {
      console.warn("Endpoint demasiado largo, usando valor predeterminado")
      return "https://cloud.appwrite.io/v1"
    }

    // Verificar si el endpoint comienza con http:// o https://
    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
      console.warn("Endpoint sin protocolo, añadiendo https://")
      return `https://${endpoint}`
    }

    // Intentar crear una URL para validar
    try {
      new URL(endpoint)
    } catch (error) {
      console.error("URL del endpoint inválida, usando valor predeterminado")
      return "https://cloud.appwrite.io/v1"
    }

    return endpoint
  } catch (error) {
    console.error("Error al validar endpoint:", error)
    // Devolver un endpoint por defecto
    return "https://cloud.appwrite.io/v1"
  }
}

// Validar el endpoint
console.log("Endpoint original:", APPWRITE_ENDPOINT)
const validatedEndpoint = validateEndpoint(APPWRITE_ENDPOINT)
console.log("Endpoint validado:", validatedEndpoint)

// Función para obtener los headers básicos
const getHeaders = (session?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Appwrite-Project": APPWRITE_PROJECT_ID,
  }

  if (session) {
    headers["X-Appwrite-Session"] = session
  }

  return headers
}

// Función para manejar respuestas
const handleResponse = async (response: Response) => {
  // Verificar si la respuesta es JSON
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    // Si no es JSON, obtener el texto y lanzar un error
    const text = await response.text()
    console.error("Respuesta no JSON:", text.substring(0, 100) + "...")
    throw new Error(`Respuesta no válida del servidor: ${response.status} ${response.statusText}`)
  }

  // Si es JSON, parsearlo
  return await response.json()
}

// API de Appwrite
export const AppwriteApi = {
  // Crear una sesión (login)
  async createSession(email: string, password: string) {
    try {
      console.log("AppwriteApi: Creando sesión para", email)
      console.log("Usando endpoint:", validatedEndpoint)

      const response = await fetch(`${validatedEndpoint}/account/sessions/email`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al iniciar sesión")
      }

      return await handleResponse(response)
    } catch (error: any) {
      console.error("AppwriteApi: Error al crear sesión", error)
      throw error
    }
  },

  // Obtener la cuenta actual
  async getAccount() {
    try {
      console.log("AppwriteApi: Obteniendo cuenta actual")
      console.log("Usando endpoint:", validatedEndpoint)

      const response = await fetch(`${validatedEndpoint}/account`, {
        method: "GET",
        headers: getHeaders(),
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          return null
        }

        const errorData = await response.json()
        throw new Error(errorData.message || "Error al obtener cuenta")
      }

      return await handleResponse(response)
    } catch (error) {
      console.error("AppwriteApi: Error al obtener cuenta", error)
      return null
    }
  },

  // Eliminar la sesión actual (logout)
  async deleteSession() {
    try {
      console.log("AppwriteApi: Eliminando sesión actual")
      console.log("Usando endpoint:", validatedEndpoint)

      const response = await fetch(`${validatedEndpoint}/account/sessions/current`, {
        method: "DELETE",
        headers: getHeaders(),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al cerrar sesión")
      }

      return true
    } catch (error) {
      console.error("AppwriteApi: Error al eliminar sesión", error)
      throw error
    }
  },

  // Crear un usuario (registro)
  async createUser(email: string, password: string, name: string) {
    try {
      console.log("AppwriteApi: Creando usuario", email)
      console.log("Usando endpoint:", validatedEndpoint)

      const userId = "unique()" // Appwrite generará un ID único

      const response = await fetch(`${validatedEndpoint}/account`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ userId, email, password, name }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("AppwriteApi: Error al crear usuario - Appwrite response:", errorData) // Log the Appwrite error
        throw new Error(errorData.message || "Error al registrar usuario")
      }

      const data = await response.json()
      console.log("AppwriteApi: Usuario creado con éxito", data)
      return data
    } catch (error: any) {
      console.error("AppwriteApi: Error al crear usuario", error)
      throw error
    }
  },

  // Verificar la conexión con Appwrite
  async verifyConnection() {
    try {
      console.log("AppwriteApi: Verificando conexión con Appwrite")
      console.log("Usando endpoint:", validatedEndpoint)

      // Intentar obtener la información del proyecto
      const response = await fetch(`${validatedEndpoint}/`, {
        method: "GET",
        headers: getHeaders(),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text()
          console.error("Respuesta no JSON:", text.substring(0, 100) + "...")
          return {
            success: false,
            message: `Respuesta no válida del servidor: ${response.status} ${response.statusText}`,
            details: text.substring(0, 100) + "...",
          }
        }

        const error = await response.json()
        return {
          success: false,
          message: error.message || "Error al verificar conexión",
          details: error,
        }
      }

      return {
        success: true,
        message: "Conexión exitosa con Appwrite",
        details: await handleResponse(response),
      }
    } catch (error: any) {
      console.error("AppwriteApi: Error al verificar conexión", error)
      return {
        success: false,
        message: error.message || "Error al verificar conexión",
        details: error,
      }
    }
  },
}
