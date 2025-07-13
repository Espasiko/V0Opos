import { NextResponse } from "next/server"
import { obtenerSumarioBOE } from "@/lib/boe-utils"

/**
 * API Route para obtener el sumario del BOE
 * GET /api/boe/sumario/[fecha]
 */
export async function GET(request: Request, { params }: { params: { fecha: string } }) {
  try {
    const { fecha } = params

    // Validar formato de fecha (YYYYMMDD)
    if (!/^\d{8}$/.test(fecha)) {
      return NextResponse.json({ error: "Formato de fecha inválido. Debe ser YYYYMMDD" }, { status: 400 })
    }

    // Obtener sumario del BOE
    const sumario = await obtenerSumarioBOE(fecha)

    if (!sumario) {
      return NextResponse.json(
        { error: "No se pudo obtener el sumario del BOE para la fecha especificada" },
        { status: 404 },
      )
    }

    return NextResponse.json({ sumario })
  } catch (error) {
    console.error("Error en API Route /api/boe/sumario/[fecha]:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
