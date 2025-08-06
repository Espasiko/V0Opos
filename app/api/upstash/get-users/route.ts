import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulamos datos de usuarios activos sin depender de Upstash
    const activeUsers = Math.floor(Math.random() * 100) + 200

    return NextResponse.json({
      success: true,
      count: activeUsers,
      timestamp: new Date().toISOString(),
      source: "simulated", // Indicamos que es simulado
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener usuarios activos",
      },
      { status: 500 },
    )
  }
}
