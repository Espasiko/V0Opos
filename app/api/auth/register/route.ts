import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, nombre, ubicacion } = await request.json()

    // Simular registro exitoso siempre
    return NextResponse.json({
      success: true,
      user: {
        id: "dev-user-" + Date.now(),
        email: email || "dev@oposia.com",
        nombre: nombre || "Usuario Desarrollo",
      },
      token: "mock-token-" + Date.now(),
    })
  } catch (error: any) {
    return NextResponse.json({ message: "Error simulado" }, { status: 500 })
  }
}
