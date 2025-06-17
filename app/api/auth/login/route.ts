import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    try {
      console.log("Intentando iniciar sesión con PocketBase:", email)
      const result = await PocketBaseApi.signIn(email, password)

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
      console.error("Error al iniciar sesión:", error)
      return NextResponse.json({ message: error.message || "Error al iniciar sesión" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Error en la API de login:", error)
    return NextResponse.json({ message: error.message || "Error al iniciar sesión" }, { status: 500 })
  }
}
