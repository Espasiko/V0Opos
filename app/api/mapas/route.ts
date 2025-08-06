import { NextResponse } from "next/server"

// Datos mock para desarrollo
const MOCK_MAPAS = [
  {
    id: "1",
    titulo: "Mapa Mental - Seguridad Social",
    contenido: {
      nodo_central: "Seguridad Social",
      nodos: [
        {
          id: "1",
          texto: "Conceptos Básicos",
          hijos: ["Definición", "Objetivos", "Principios"]
        },
        {
          id: "2", 
          texto: "Regímenes",
          hijos: ["General", "Especiales", "Autónomos"]
        },
        {
          id: "3",
          texto: "Prestaciones",
          hijos: ["Contributivas", "No contributivas", "Asistenciales"]
        }
      ]
    },
    created: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Mapa Mental - Prestaciones",
    contenido: {
      nodo_central: "Prestaciones SS",
      nodos: [
        {
          id: "1",
          texto: "Por Jubilación",
          hijos: ["Ordinaria", "Anticipada", "Parcial"]
        },
        {
          id: "2",
          texto: "Por Incapacidad", 
          hijos: ["Temporal", "Permanente", "Gran Invalidez"]
        }
      ]
    },
    created: new Date().toISOString(),
  }
]

export async function GET() {
  return NextResponse.json(MOCK_MAPAS)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newMapa = {
      id: Date.now().toString(),
      ...data,
      created: new Date().toISOString(),
    }
    
    return NextResponse.json(newMapa)
  } catch (error) {
    return NextResponse.json({ error: "Error creando mapa mental" }, { status: 500 })
  }
}
