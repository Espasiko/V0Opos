import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { endpoint, projectId } = await request.json()

    // Validar los parámetros
    if (!endpoint || !projectId) {
      return NextResponse.json({ success: false, message: "Endpoint y projectId son requeridos" }, { status: 400 })
    }

    // Función para validar la URL del endpoint
    const validateEndpoint = (url: string): string => {
      try {
        // Verificar si el endpoint es un valor extraño (token o hash)
        if (url && url.length > 100) {
          console.error("Endpoint parece ser un token o hash, usando valor predeterminado")
          return "https://cloud.appwrite.io/v1"
        }

        // Si el endpoint está vacío o no es una cadena, usar valor predeterminado
        if (!url || typeof url !== "string") {
          console.error("Endpoint vacío o no es una cadena, usando valor predeterminado")
          return "https://cloud.appwrite.io/v1"
        }

        // Intentar crear una URL para validar
        try {
          new URL(url)
        } catch (error) {
          console.error("URL del endpoint inválida, usando valor predeterminado")
          return "https://cloud.appwrite.io/v1"
        }

        // Asegurarse de que la URL termina con /v1
        if (!url.endsWith("/v1")) {
          // Si termina con /, añadir v1
          if (url.endsWith("/")) {
            return `${url}v1`
          }
          // Si no termina con /, añadir /v1
          return `${url}/v1`
        }

        return url
      } catch (error) {
        console.error("Error al validar endpoint:", error)
        // Devolver un endpoint por defecto
        return "https://cloud.appwrite.io/v1"
      }
    }

    // Validar el endpoint
    const validatedEndpoint = validateEndpoint(endpoint)
    console.log("Endpoint original:", endpoint)
    console.log("Endpoint validado:", validatedEndpoint)

    // Verificar la conexión con Appwrite
    try {
      const response = await fetch(`${validatedEndpoint}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
        },
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text()
          console.error("Respuesta no JSON:", text.substring(0, 100) + "...")
          return NextResponse.json({
            success: false,
            message: `Respuesta no válida del servidor: ${response.status} ${response.statusText}`,
            details: text.substring(0, 100) + "...",
          })
        }

        const error = await response.json()
        return NextResponse.json({
          success: false,
          message: error.message || "Error al verificar conexión",
          details: error,
        })
      }

      const data = await response.json()
      return NextResponse.json({
        success: true,
        message: "Conexión exitosa con Appwrite",
        details: data,
      })
    } catch (error: any) {
      console.error("Error al verificar conexión:", error)
      return NextResponse.json({
        success: false,
        message: error.message || "Error al verificar conexión",
        details: error,
      })
    }
  } catch (error: any) {
    console.error("Error en la ruta de verificación:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Error interno del servidor" },
      { status: 500 },
    )
  }
}

