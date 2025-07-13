import { NextResponse } from "next/server"

// URL base de la API de backend (en el servidor)
const API_BASE_URL = process.env.API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/mapas`)

    if (!response.ok) {
      throw new Error("Error al obtener mapas mentales")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/mapas:", error)
    return NextResponse.json({ error: "Error al obtener mapas mentales" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/mapas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al crear mapa mental")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/mapas (POST):", error)
    return NextResponse.json({ error: "Error al crear mapa mental" }, { status: 500 })
  }
}

