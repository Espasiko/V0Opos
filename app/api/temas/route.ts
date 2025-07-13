import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const temas = await PocketBaseApi.getTemas()
    return NextResponse.json(temas)
  } catch (error: any) {
    console.error("Error en API Route /api/temas:", error)
    return NextResponse.json({ error: "Error al obtener temas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tema = await PocketBaseApi.crearTema(body)
    return NextResponse.json(tema)
  } catch (error: any) {
    console.error("Error en API Route /api/temas (POST):", error)
    return NextResponse.json({ error: "Error al crear tema" }, { status: 500 })
  }
}
