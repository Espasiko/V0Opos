import { NextResponse } from "next/server"
import { databases } from "@/lib/appwrite"
import { ID } from "appwrite" // Importamos ID directamente desde appwrite

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { userId, email, name, location } = await request.json()

    // Validar campos requeridos
    if (!userId || !email || !name) {
      return NextResponse.json({ success: false, message: "userId, email y name son requeridos" }, { status: 400 })
    }

    // Verificar si tenemos configurada una colección de usuarios
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
    const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID

    if (!databaseId || !userCollectionId) {
      return NextResponse.json(
        { success: false, message: "Configuración de base de datos incompleta" },
        { status: 500 },
      )
    }

    // Crear perfil de usuario
    await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
      userId,
      email,
      name,
      location: location || "",
      createdAt: new Date().toISOString(),
    })

    // Devolver respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Perfil de usuario creado correctamente",
    })
  } catch (error: any) {
    console.error("Error al crear perfil de usuario:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Error al crear perfil de usuario" },
      { status: 500 },
    )
  }
}

