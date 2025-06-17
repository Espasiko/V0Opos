import { NextResponse } from "next/server"
import { createAppwriteClient, createAccount, validateAppwriteConfig } from "@/lib/appwrite-config"

export async function GET() {
  try {
    // Verificar la configuración
    const isConfigValid = validateAppwriteConfig()

    // Mostrar las variables de entorno (sin valores sensibles)
    const envInfo = {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ? "Configurado" : "No configurado",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "Configurado" : "No configurado",
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ? "Configurado" : "No configurado",
      configValid: isConfigValid,
    }

    // Intentar crear un cliente
    const client = createAppwriteClient()
    const account = createAccount(client)

    // Intentar una operación simple para verificar la conexión
    let connectionStatus = "No verificado"
    try {
      // Intentamos obtener la cuenta actual (fallará si no hay sesión, pero nos dirá si la conexión funciona)
      await account.get()
      connectionStatus = "Conexión exitosa"
    } catch (accountError: any) {
      // Si el error es 401, la conexión funciona pero no hay sesión
      if (accountError.code === 401) {
        connectionStatus = "Conexión exitosa (no autenticado)"
      } else {
        connectionStatus = `Error de conexión: ${accountError.message}`
      }
    }

    return NextResponse.json({
      success: true,
      message: "Diagnóstico de Appwrite",
      environment: envInfo,
      connection: connectionStatus,
    })
  } catch (error: any) {
    console.error("Error en diagnóstico de Appwrite:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error en diagnóstico de Appwrite",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
