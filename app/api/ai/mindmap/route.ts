import { NextResponse } from "next/server"
import { generateMindMap } from "@/lib/ai-service"
import { AppError, ValidationError, logError } from "@/lib/error-handler"

export async function POST(request: Request) {
  try {
    // Validar que el cuerpo de la solicitud sea JSON
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new ValidationError("El cuerpo de la solicitud debe ser JSON")
    }

    // Obtener datos del cuerpo de la solicitud
    const { text } = await request.json()

    // Validar campos requeridos
    if (!text) {
      throw new ValidationError("El texto es requerido")
    }

    // Generar mapa mental
    const mindMap = await generateMindMap(text)

    // Devolver respuesta exitosa
    return NextResponse.json({ success: true, mindMap })
  } catch (error) {
    // Manejar errores específicos
    if (error instanceof AppError) {
      logError(error, { route: "/api/ai/mindmap" })
      return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: error.statusCode })
    }

    // Manejar errores generales
    logError(error, { route: "/api/ai/mindmap" })
    return NextResponse.json({ success: false, error: "Error al generar mapa mental" }, { status: 500 })
  }
}
