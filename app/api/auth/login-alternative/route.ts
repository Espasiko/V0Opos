import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validar los datos de entrada
    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Obtener la configuración de Appwrite
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

    if (!endpoint || !projectId) {
      return NextResponse.json({ message: "Configuración de Appwrite incompleta" }, { status: 500 })
    }

    // Crear la sesión utilizando la API REST de Appwrite
    const response = await fetch(`${endpoint}/account/sessions/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": projectId,
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Error al iniciar sesión" }, { status: response.status })
    }

    // Obtener los datos del usuario
    const userResponse = await fetch(`${endpoint}/account`, {
      headers: {
        "X-Appwrite-Project": projectId,
        Cookie: response.headers.get("set-cookie") || "",
      },
      credentials: "include",
    })

    const userData = await userResponse.json()

    if (!userResponse.ok) {
      return NextResponse.json({ message: "Error al obtener datos del usuario" }, { status: userResponse.status })
    }

    // Devolver los datos del usuario y la sesión
    return NextResponse.json({
      user: {
        id: userData.$id,
        email: userData.email,
        name: userData.name,
      },
      session: data,
    })
  } catch (error: any) {
    console.error("Error en login-alternative:", error)
    return NextResponse.json({ message: error.message || "Error interno del servidor" }, { status: 500 })
  }
}

