import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Recopilar información de configuración (sin exponer valores sensibles)
    const config = {
      appwriteEndpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
        ? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT.startsWith("standard_")
          ? "⚠️ Valor inválido (comienza con 'standard_')"
          : "✓ Configurado"
        : "✗ No configurado",
      appwriteProjectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "✓ Configurado" : "✗ No configurado",
      appwriteDatabaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ? "✓ Configurado" : "✗ No configurado",
      // Otras variables de entorno
      nodeEnv: process.env.NODE_ENV || "no definido",
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "no definido",
    }

    return NextResponse.json({
      success: true,
      config,
      message:
        "Si el endpoint de Appwrite comienza con 'standard_', es un valor inválido y se usará el valor por defecto.",
    })
  } catch (error: any) {
    console.error("Error al verificar la configuración:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al verificar la configuración",
      },
      { status: 500 },
    )
  }
}

