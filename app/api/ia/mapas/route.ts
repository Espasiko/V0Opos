import { NextResponse } from "next/server"
import { generateMindMap } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json()
    const { tema, contenido } = body

    // Validar parámetros
    if (!tema || !contenido) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    // Generar mapa mental con el servicio de IA simulado
    console.log("Generando mapa mental para:", tema)
    const response = await generateMindMap({
      tema,
      contenido,
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
      mapa: {
        titulo: tema,
        contenido: parsedData,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString(),
        modelo: response.model || "simulado",
      },
    })
  } catch (error: any) {
    console.error("Error en API Route /api/ia/mapas:", error)
    return NextResponse.json(
      {
        error: error.message || "Error al generar mapa mental",
        success: false,
      },
      { status: 500 },
    )
  }
}
