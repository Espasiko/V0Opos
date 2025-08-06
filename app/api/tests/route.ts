import { NextResponse } from "next/server"

// Datos mock para desarrollo
const MOCK_TESTS = [
  {
    id: "1",
    titulo: "Test de Conceptos Básicos",
    descripcion: "Evaluación de conocimientos básicos de Seguridad Social",
    preguntas: [
      {
        id: "1",
        pregunta: "¿Qué es la Seguridad Social?",
        opciones: [
          "Un sistema de protección social",
          "Un tipo de seguro privado", 
          "Una empresa pública",
          "Un ministerio"
        ],
        respuesta_correcta: 0
      },
      {
        id: "2",
        pregunta: "¿Cuál es el objetivo principal de la Seguridad Social?",
        opciones: [
          "Generar beneficios",
          "Proteger a los trabajadores",
          "Recaudar impuestos",
          "Crear empleo"
        ],
        respuesta_correcta: 1
      }
    ],
    created: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Test de Régimen General",
    descripcion: "Preguntas sobre el régimen general de la Seguridad Social",
    preguntas: [
      {
        id: "3",
        pregunta: "¿Quién está incluido en el Régimen General?",
        opciones: [
          "Solo funcionarios",
          "Trabajadores por cuenta ajena",
          "Solo autónomos",
          "Todos los ciudadanos"
        ],
        respuesta_correcta: 1
      }
    ],
    created: new Date().toISOString(),
  }
]

export async function GET() {
  return NextResponse.json(MOCK_TESTS)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newTest = {
      id: Date.now().toString(),
      ...data,
      created: new Date().toISOString(),
    }
    
    return NextResponse.json(newTest)
  } catch (error) {
    return NextResponse.json({ error: "Error creando test" }, { status: 500 })
  }
}
