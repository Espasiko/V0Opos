import { NextResponse } from "next/server"
import { generateQuestions } from "@/lib/ai-service"
import { AppError, ValidationError, logError } from "@/lib/error-handler"

export async function POST(request: Request) {
  try {
    // Validar que el cuerpo de la solicitud sea JSON
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new ValidationError("El cuerpo de la solicitud debe ser JSON")
    }

    // Obtener datos del cuerpo de la solicitud
    const { text, numQuestions } = await request.json()

    // Validar campos requeridos
    if (!text) {
      throw new ValidationError("El texto es requerido")
    }

    // Validar número de preguntas
    if (numQuestions && (isNaN(numQuestions) || numQuestions < 1 || numQuestions > 10)) {
      throw new ValidationError("El número de preguntas debe ser un número entre 1 y 10")
    }

    // Generar preguntas
    const questions = await generateQuestions(text, numQuestions || 5)

    // Devolver respuesta exitosa
    return NextResponse.json({ success: true, questions })
  } catch (error) {
    // Manejar errores específicos
    if (error instanceof AppError) {
      logError(error, { route: "/api/ai/questions" })
      return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: error.statusCode })
    }

    // Manejar errores generales
    logError(error, { route: "/api/ai/questions" })
    return NextResponse.json({ success: false, error: "Error al generar preguntas" }, { status: 500 })
  }
}

