import { NextResponse } from "next/server"
import { Client, Account } from "appwrite"

export async function GET(request: Request) {
  try {
    // Configurar cliente de Appwrite
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

    const account = new Account(client)

    // Obtener usuario actual
    try {
      const user = await account.get()

      return NextResponse.json({
        success: true,
        user: {
          id: user.$id,
          email: user.email,
          nombre: user.name,
        },
      })
    } catch (error: any) {
      if (error.code === 401) {
        return NextResponse.json(
          {
            success: false,
            user: null,
            message: "No autenticado",
          },
          { status: 401 },
        )
      }

      throw error
    }
  } catch (error: any) {
    console.error("Error en la API de usuario:", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al obtener usuario",
        details: error,
      },
      { status: 500 },
    )
  }
}

