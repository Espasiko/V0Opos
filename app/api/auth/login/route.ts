import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Simular login exitoso siempre
    return NextResponse.json({
      success: true,
      user: {
        id: "dev-user-123",
        email: email || "dev@oposia.com",
        nombre: "Usuario Desarrollo",
      },
      token: "mock-token-123",
    })
  } catch (error: any) {
    return NextResponse.json({ message: "Error simulado" }, { status: 500 })
  }
}
