import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function POST(request: Request) {
  try {
    const { email, password, nombre, ubicacion } = await request.json()

    if (!email || !password || !nombre) {
      return NextResponse.json({ message: "Email, contraseña y nombre son requeridos" }, { status: 400 })
    }

    try {
      console.log("Intentando registrar usuario con PocketBase:", email)
      const result = await PocketBaseApi.signUp(email, password, nombre, ubicacion)

      return NextResponse.json({
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          nombre: result.user.name,
        },
        token: result.token,
      })
    } catch (error: any) {
      console.error("Error al registrar usuario:", error)

      if (error.message.includes("already exists")) {
        return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 })
      }

      return NextResponse.json({ message: error.message || "Error al registrar usuario" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error en la API de registro:", error)
    return NextResponse.json({ message: error.message || "Error al registrar usuario" }, { status: 500 })
  }
}
