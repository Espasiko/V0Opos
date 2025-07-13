import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const publicaciones = await PocketBaseApi.getPublicaciones()
    return NextResponse.json(publicaciones)
  } catch (error) {
    console.error("Error en API Route /api/publicaciones:", error)
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const publicacion = await PocketBaseApi.crearPublicacion(body)
    return NextResponse.json(publicacion)
  } catch (error) {
    console.error("Error en API Route /api/publicaciones (POST):", error)
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 })
  }
}
