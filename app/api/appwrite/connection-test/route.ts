import { NextResponse } from "next/server"
import { testAppwriteConnection, getAppwriteEndpoint, isValidAppwriteEndpoint } from "@/lib/appwrite-connection"

export async function GET() {
  try {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

    // Verificar la configuración básica
    const configStatus = {
      endpoint: {
        value: endpoint,
        isValid: isValidAppwriteEndpoint(endpoint),
        normalized: getAppwriteEndpoint(),
      },
      projectId: {
        value: projectId,
        isValid: !!projectId,
      },
    }

    // Probar la conexión
    const connectionTest = await testAppwriteConnection()

    return NextResponse.json({
      success: connectionTest.success,
      message: connectionTest.message,
      config: configStatus,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error en la prueba de conexión de Appwrite:", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al probar la conexión con Appwrite",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
