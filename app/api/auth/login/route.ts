import { NextResponse } from "next/server"
import { Client, Account } from "appwrite"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Configurar cliente de Appwrite
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

    const account = new Account(client)

    // Iniciar sesión
    try {
      const session = await account.createEmailSession(email, password)

      // Obtener datos del usuario
      const user = await account.get()

      // Configurar cookies para mantener la sesión
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.$id,
          email: user.email,
          nombre: user.name,
        },
        session: {
          id: session.$id,
        },
      })

      // Asegurar que las cookies de Appwrite se mantengan
      const appwriteCookies = request.headers.get("cookie")
      if (appwriteCookies) {
        response.headers.set("set-cookie", appwriteCookies)
      }

      return response
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error)

      if (error.code === 401) {
        return NextResponse.json({ message: "Credenciales incorrectas" }, { status: 401 })
      }

      return NextResponse.json({ message: error.message || "Error al iniciar sesión" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error en la API de login:", error)
    return NextResponse.json({ message: error.message || "Error al iniciar sesión" }, { status: 500 })
  }
}

