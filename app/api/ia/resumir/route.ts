import { NextResponse } from "next/server"
import { generateSummary } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json()
    const { tema, contenido, longitud } = body

    // Validar parámetros
    if (!tema || !contenido) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    // Generar resumen con el servicio de IA simulado
    console.log("Generando resumen para:", tema)
    const response = await generateSummary({
      tema,
      contenido,
      longitud,
    })

    return NextResponse.json({
      success: true,
      resumen: response.text,
      modelo: response.model || "simulado",
    })
  } catch (error: any) {
    console.error("Error en API Route /api/ia/resumir:", error)
    return NextResponse.json(
      {
        error: error.message || "Error al generar resumen",
        success: false,
      },
      { status: 500 },
    )
  }
}

