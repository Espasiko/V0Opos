import { NextResponse } from "next/server"

// Datos mock para desarrollo
const MOCK_TEMAS = [
  {
    id: "1",
    titulo: "Seguridad Social - Conceptos Básicos",
    descripcion: "Introducción a los conceptos fundamentales de la Seguridad Social",
    contenido: "Contenido del tema 1...",
    created: new Date().toISOString(),
  },
  {
    id: "2", 
    titulo: "Régimen General de la Seguridad Social",
    descripcion: "Estudio del régimen general y sus características",
    contenido: "Contenido del tema 2...",
    created: new Date().toISOString(),
  },
  {
    id: "3",
    titulo: "Prestaciones de la Seguridad Social",
    descripcion: "Análisis de las diferentes prestaciones disponibles",
    contenido: "Contenido del tema 3...",
    created: new Date().toISOString(),
  }
]

export async function GET() {
  return NextResponse.json(MOCK_TEMAS)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newTema = {
      id: Date.now().toString(),
      ...data,
      created: new Date().toISOString(),
    }
    
    return NextResponse.json(newTema)
  } catch (error) {
    return NextResponse.json({ error: "Error creando tema" }, { status: 500 })
  }
}
