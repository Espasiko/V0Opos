import { NextResponse } from "next/server"

// URL base de la API de backend (en el servidor)
const API_BASE_URL = process.env.API_URL || "http://localhost:8000"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const response = await fetch(`${API_BASE_URL}/temas/${id}`)

    if (!response.ok) {
      throw new Error(`Error al obtener tema ${id}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error en API Route /api/temas/${params.id}:`, error)
    return NextResponse.json({ error: `Error al obtener tema ${params.id}` }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/temas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Error al actualizar tema ${id}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error en API Route /api/temas/${params.id} (PUT):`, error)
    return NextResponse.json({ error: `Error al actualizar tema ${params.id}` }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const response = await fetch(`${API_BASE_URL}/temas/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar tema ${id}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error en API Route /api/temas/${params.id} (DELETE):`, error)
    return NextResponse.json({ error: `Error al eliminar tema ${params.id}` }, { status: 500 })
  }
}

