import { NextResponse } from "next/server"

// URL base de la API de backend (en el servidor)
const API_BASE_URL = process.env.API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/temas`)

    if (!response.ok) {
      throw new Error("Error al obtener temas")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/temas:", error)
    return NextResponse.json({ error: "Error al obtener temas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/temas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al crear tema")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/temas (POST):", error)
    return NextResponse.json({ error: "Error al crear tema" }, { status: 500 })
  }
}

