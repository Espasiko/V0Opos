import { NextResponse } from "next/server"
import { Client } from "appwrite"

export async function GET() {
  try {
    // Configurar cliente de Appwrite
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "67e11f880033f06544b0")

    // Intentar una operación simple para verificar la conectividad
    const response = await fetch("https://cloud.appwrite.io/v1/health", {
      headers: {
        "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "67e11f880033f06544b0",
      },
    })

    if (!response.ok) {
      throw new Error(`Error al conectar con Appwrite: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: "Conexión con Appwrite establecida correctamente",
      data,
    })
  } catch (error: any) {
    console.error("Error al verificar la conectividad con Appwrite:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al verificar la conectividad con Appwrite",
      },
      { status: 500 },
    )
  }
}

