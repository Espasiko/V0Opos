import { NextResponse } from "next/server"
import { COLLECTIONS } from "@/lib/appwrite"

export async function GET() {
  try {
    // Recopilar información de configuración (sin exponer valores sensibles)
    const config = {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ? "✓ Configurado" : "✗ No configurado",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "✓ Configurado" : "✗ No configurado",
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ? "✓ Configurado" : "✗ No configurado",
      storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID ? "✓ Configurado" : "✗ No configurado",
      collections: {
        perfiles: COLLECTIONS.PERFILES ? "✓ Configurado" : "✗ No configurado",
        temas: COLLECTIONS.TEMAS ? "✓ Configurado" : "✗ No configurado",
        tests: COLLECTIONS.TESTS ? "✓ Configurado" : "✗ No configurado",
        preguntas: COLLECTIONS.PREGUNTAS ? "✓ Configurado" : "✗ No configurado",
        mapas_mentales: COLLECTIONS.MAPAS_MENTALES ? "✓ Configurado" : "✗ No configurado",
        publicaciones: COLLECTIONS.PUBLICACIONES ? "✓ Configurado" : "✗ No configurado",
        comentarios: COLLECTIONS.COMENTARIOS ? "✓ Configurado" : "✗ No configurado",
      },
    }

    return NextResponse.json({
      success: true,
      config,
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
