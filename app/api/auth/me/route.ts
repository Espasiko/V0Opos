import { NextResponse } from "next/server"
import { AppwriteApi } from "@/lib/appwrite-api"

export async function GET() {
  try {
    console.log("Verificando autenticación...")

    // Verificar si hay una sesión activa
    try {
      const user = await AppwriteApi.getAccount()

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            user: null,
            message: "No autenticado",
          },
          { status: 401 },
        )
      }

      console.log("Usuario autenticado:", user.$id)

      return NextResponse.json({
        success: true,
        user: {
          id: user.$id,
          email: user.email,
          nombre: user.name || user.email.split("@")[0], // Fallback to username from email if name is not available
        },
      })
    } catch (error: any) {
      console.error("Error específico al obtener cuenta:", error)

      // Si el error es que no hay sesión, devolver un 401
      if (error.code === 401) {
        return NextResponse.json(
          {
            success: false,
            message: "No autenticado",
            user: null,
          },
          { status: 401 },
        )
      }

      throw error // Re-throw para que lo maneje el catch exterior
    }
  } catch (error: any) {
    console.error("Error general al verificar autenticación:", error)

    // Para otros errores, devolver un 500
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al verificar autenticación",
        error: typeof error === "object" ? JSON.stringify(error) : String(error),
      },
      { status: 500 },
    )
  }
}

