import { NextResponse } from "next/server"

// URL base de la API de backend (en el servidor)
const API_BASE_URL = process.env.API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/publicaciones`)

    if (!response.ok) {
      throw new Error("Error al obtener publicaciones")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/publicaciones:", error)
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/publicaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al crear publicación")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en API Route /api/publicaciones (POST):", error)
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 })
  }
}

