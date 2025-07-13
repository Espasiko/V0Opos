import { NextResponse } from "next/server"
import { AppwriteApi } from "@/lib/appwrite-api"

export async function POST() {
  try {
    // Eliminar sesión usando la API REST directamente
    await AppwriteApi.deleteSession()

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error("Error en la API de logout:", error)

    return NextResponse.json({ message: error.message || "Error al cerrar sesión" }, { status: 500 })
  }
}

