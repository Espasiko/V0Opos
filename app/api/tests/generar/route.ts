import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const test = await PocketBaseApi.generarTest(body)
    return NextResponse.json(test)
  } catch (error) {
    console.error("Error en API Route /api/tests/generar:", error)
    return NextResponse.json({ error: "Error al generar test" }, { status: 500 })
  }
}
