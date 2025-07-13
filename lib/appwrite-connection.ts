import { Client } from "appwrite"

/**
 * Verifica si la URL del endpoint de Appwrite es válida
 */
export function isValidAppwriteEndpoint(endpoint: string | undefined): boolean {
  if (!endpoint) return false

  try {
    // Verificar si es una URL válida
    new URL(endpoint)

    // Verificar si es una URL de Appwrite válida (debe ser HTTPS o localhost)
    return endpoint.startsWith("https://") || endpoint.includes("localhost")
  } catch (error) {
    return false
  }
}

/**
 * Obtiene la URL del endpoint de Appwrite con un valor predeterminado
 */
export function getAppwriteEndpoint(): string {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT

  if (isValidAppwriteEndpoint(endpoint)) {
    return endpoint as string
  }

  // Valor predeterminado si no hay un endpoint válido
  return "https://cloud.appwrite.io/v1"
}

/**
 * Verifica la conexión con Appwrite
 */
export async function testAppwriteConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const endpoint = getAppwriteEndpoint()
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

    if (!projectId) {
      return {
        success: false,
        message: "ID del proyecto de Appwrite no configurado",
      }
    }

    // Crear un cliente de Appwrite para pruebas
    const client = new Client()
    client.setEndpoint(endpoint).setProject(projectId)

    // Intentar hacer una solicitud simple para verificar la conexión
    const response = await fetch(`${endpoint}/health/status`, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": projectId,
      },
    })

    if (!response.ok) {
      throw new Error(`Error al conectar con Appwrite: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      success: true,
      message: "Conexión con Appwrite establecida correctamente",
    }
  } catch (error: any) {
    console.error("Error al probar la conexión con Appwrite:", error)

    return {
      success: false,
      message: error.message || "Error al conectar con Appwrite",
    }
  }
}
