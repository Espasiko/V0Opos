import { NextResponse } from "next/server"
import { account } from "@/lib/appwrite"

export async function GET() {
  try {
    // Intentar obtener la sesión actual
    try {
      const user = await account.get()
      return NextResponse.json({
        success: true,
        message: "Conexión con Appwrite establecida correctamente y sesión activa.",
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
        },
      })
    } catch (sessionError: any) {
      // Si el error es porque no hay sesión (401), la conexión sigue siendo exitosa
      if (sessionError.code === 401) {
        return NextResponse.json({
          success: true,
          message: "Conexión con Appwrite establecida correctamente, pero no hay sesión activa.",
        })
      }

      // Si es otro tipo de error, lo propagamos
      throw sessionError
    }
  } catch (error: any) {
    console.error("Error al conectar con Appwrite:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Error al conectar con Appwrite",
        error: error.message,
        details: {
          endpoint: "https://cloud.appwrite.io/v1",
          projectId: "67e11f880033f06544b0",
        },
      },
      { status: 500 },
    )
  }
}
