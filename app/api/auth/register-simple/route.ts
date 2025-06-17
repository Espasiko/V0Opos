import { NextResponse } from "next/server"
import { Client, Account, ID } from "appwrite"

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { name, email, password } = await request.json()

    // Validar campos requeridos
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Nombre, email y contraseña son requeridos" },
        { status: 400 },
      )
    }

    // Configurar cliente de Appwrite
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

    const account = new Account(client)

    // Crear usuario
    try {
      await account.create(ID.unique(), email, password, name)

      // Devolver respuesta exitosa
      return NextResponse.json({
        success: true,
        message: "Usuario registrado correctamente",
      })
    } catch (appwriteError: any) {
      console.error("Error de Appwrite al registrar usuario:", appwriteError)

      // Manejar errores específicos de Appwrite
      if (appwriteError.code === 409) {
        return NextResponse.json({ success: false, message: "El email ya está registrado" }, { status: 409 })
      } else if (appwriteError.code === 400) {
        return NextResponse.json({ success: false, message: "Datos de registro inválidos" }, { status: 400 })
      } else {
        return NextResponse.json(
          { success: false, message: appwriteError.message || "Error al registrar usuario" },
          { status: 500 },
        )
      }
    }
  } catch (error: any) {
    console.error("Error al procesar la solicitud de registro:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Error al procesar la solicitud" },
      { status: 500 },
    )
  }
}
