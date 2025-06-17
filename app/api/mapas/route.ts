import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const mapas = await PocketBaseApi.getMapasMentales()
    return NextResponse.json(mapas)
  } catch (error) {
    console.error("Error en API Route /api/mapas:", error)
    return NextResponse.json({ error: "Error al obtener mapas mentales" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const mapa = await PocketBaseApi.crearMapaMental(body)
    return NextResponse.json(mapa)
  } catch (error) {
    console.error("Error en API Route /api/mapas (POST):", error)
    return NextResponse.json({ error: "Error al crear mapa mental" }, { status: 500 })
  }
}
