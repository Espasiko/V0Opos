import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const mapa = await PocketBaseApi.generarMapaMental(body)
    return NextResponse.json(mapa)
  } catch (error) {
    console.error("Error en API Route /api/mapas/generar:", error)
    return NextResponse.json({ error: "Error al generar mapa mental" }, { status: 500 })
  }
}
