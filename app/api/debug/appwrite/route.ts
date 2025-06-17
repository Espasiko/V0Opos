import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar la configuración de Appwrite
    const config = {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "No configurado",
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "No configurado",
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "No configurado",
      storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || "No configurado",
      userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "No configurado",
      temasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TEMAS_COLLECTION_ID || "No configurado",
      testsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TESTS_COLLECTION_ID || "No configurado",
      preguntasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PREGUNTAS_COLLECTION_ID || "No configurado",
      mapasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MAPAS_COLLECTION_ID || "No configurado",
      publicacionesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PUBLICACIONES_COLLECTION_ID || "No configurado",
      comentariosCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMENTARIOS_COLLECTION_ID || "No configurado",
    }

    // Verificar si hay alguna configuración faltante
    const missingConfig = Object.entries(config)
      .filter(([_, value]) => value === "No configurado")
      .map(([key]) => key)

    if (missingConfig.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Configuración incompleta. Falta: ${missingConfig.join(", ")}`,
        config,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Configuración de Appwrite correcta",
      config,
    })
  } catch (error: any) {
    console.error("Error al verificar la configuración de Appwrite:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al verificar la configuración de Appwrite",
      },
      { status: 500 },
    )
  }
}
