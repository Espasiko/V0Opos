import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const result = await PocketBaseApi.verifyConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "✅ PocketBase conectado correctamente",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "❌ Error de conexión con PocketBase",
          error: result.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "❌ Error al verificar PocketBase",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
