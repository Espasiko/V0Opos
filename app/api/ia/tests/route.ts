import { NextResponse } from "next/server"
import { generateTest } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json()
    const { tema, contenido, numPreguntas, dificultad } = body

    // Validar parámetros
    if (!tema || !contenido) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    // Generar test con el servicio de IA simulado
    console.log("Generando test para:", tema)
    const response = await generateTest({
      tema,
      contenido,
      numPreguntas: numPreguntas || 5,
      dificultad: dificultad || 3,
    })

    // Parsear la respuesta
    let parsedData
    try {
      parsedData = JSON.parse(response.text)
    } catch (error) {
      console.error("Error al parsear la respuesta:", error)
      return NextResponse.json({ error: "Error al procesar la respuesta de IA" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      test: {
        titulo: `Test sobre ${tema}`,
        descripcion: `Test generado por IA sobre ${tema}. Dificultad: ${dificultad}/5`,
        fecha_creacion: new Date().toISOString(),
        dificultad: dificultad || 3,
        preguntas: parsedData.preguntas,
        modelo: response.model || "simulado",
      },
    })
  } catch (error: any) {
    console.error("Error en API Route /api/ia/tests:", error)
    return NextResponse.json(
      {
        error: error.message || "Error al generar test",
        success: false,
      },
      { status: 500 },
    )
  }
}
