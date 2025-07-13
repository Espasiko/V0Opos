import { NextResponse } from "next/server"
import { Client, Account } from "appwrite"

export async function GET() {
  try {
    // Obtener información sobre el SDK de Appwrite
    const sdkInfo = {
      // Intentar obtener la versión del SDK
      version: (Client as any).VERSION || "Desconocida",
      // Verificar si los métodos necesarios están disponibles
      methods: {
        account: {
          createEmailSession: typeof Account.prototype.createEmailSession === "function",
          createSession: typeof Account.prototype.createSession === "function",
          create: typeof Account.prototype.create === "function",
          deleteSession: typeof Account.prototype.deleteSession === "function",
        },
      },
      // Información de configuración
      config: {
        endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "No definido",
        projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "[DEFINIDO]" : "[NO DEFINIDO]",
      },
    }

    return NextResponse.json(sdkInfo)
  } catch (error: any) {
    console.error("Error al obtener información del SDK:", error)
    return NextResponse.json({ message: error.message || "Error al obtener información del SDK" }, { status: 500 })
  }
}
