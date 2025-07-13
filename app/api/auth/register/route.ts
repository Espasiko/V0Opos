import { NextResponse } from "next/server"
import { AppwriteApi } from "@/lib/appwrite-api"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Email, contraseña y nombre son requeridos" }, { status: 400 })
    }

    // Crear usuario usando la API REST directamente
    const newUser = await AppwriteApi.createUser(email, password, name)

    // Crear sesión automáticamente
    const session = await AppwriteApi.createSession(email, password)

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.$id,
        email: newUser.email,
        name: newUser.name,
      },
      session: {
        id: session.$id,
      },
    })
  } catch (error: any) {
    console.error("Error en la API de registro:", error)

    // Manejar errores específicos
    if (error.message.includes("already exists")) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 })
    }

    return NextResponse.json({ message: error.message || "Error al registrar usuario" }, { status: 500 })
  }
}

