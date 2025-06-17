import { NextResponse } from "next/server"
import { generateSummary } from "@/lib/ai-service"
import { AppError, ValidationError, logError } from "@/lib/error-handler"

export async function POST(request: Request) {
  try {
    // Validar que el cuerpo de la solicitud sea JSON
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new ValidationError("El cuerpo de la solicitud debe ser JSON")
    }

    // Obtener datos del cuerpo de la solicitud
    const { text, length } = await request.json()

    // Validar campos requeridos
    if (!text) {
      throw new ValidationError("El texto es requerido")
    }

    // Validar longitud
    const validLengths = ["short", "medium", "long"]
    if (length && !validLengths.includes(length)) {
      throw new ValidationError(`La longitud debe ser una de: ${validLengths.join(", ")}`)
    }

    // Generar resumen
    const summary = await generateSummary(text, length as "short" | "medium" | "long")

    // Devolver respuesta exitosa
    return NextResponse.json({ success: true, summary })
  } catch (error) {
    // Manejar errores específicos
    if (error instanceof AppError) {
      logError(error, { route: "/api/ai/summarize" })
      return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: error.statusCode })
    }

    // Manejar errores generales
    logError(error, { route: "/api/ai/summarize" })
    return NextResponse.json({ success: false, error: "Error al generar resumen" }, { status: 500 })
  }
}
