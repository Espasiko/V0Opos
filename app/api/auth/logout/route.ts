import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function POST() {
  try {
    await PocketBaseApi.signOut()

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error("Error en la API de logout:", error)
    return NextResponse.json({ message: error.message || "Error al cerrar sesión" }, { status: 500 })
  }
}
