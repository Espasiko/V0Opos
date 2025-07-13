import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const tests = await PocketBaseApi.getTests()
    return NextResponse.json(tests)
  } catch (error) {
    console.error("Error en API Route /api/tests:", error)
    return NextResponse.json({ error: "Error al obtener tests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const test = await PocketBaseApi.crearTest(body)
    return NextResponse.json(test)
  } catch (error) {
    console.error("Error en API Route /api/tests (POST):", error)
    return NextResponse.json({ error: "Error al crear test" }, { status: 500 })
  }
}
