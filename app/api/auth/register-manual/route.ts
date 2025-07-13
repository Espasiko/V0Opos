import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { email, password, name, location } = await request.json()

    // Validar campos requeridos
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Email, contraseña y nombre son requeridos" },
        { status: 400 },
      )
    }

    // Intentar registrar al usuario directamente con la API de Appwrite
    const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
    const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""

    // Verificar que tenemos los datos necesarios
    if (!appwriteProjectId) {
      return NextResponse.json({ success: false, message: "Configuración de Appwrite incompleta" }, { status: 500 })
    }

    // Crear la solicitud a la API de Appwrite
    const response = await fetch(`${appwriteEndpoint}/account/v1/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": appwriteProjectId,
      },
      body: JSON.stringify({
        userId: "unique()",
        email,
        password,
        name,
      }),
    })

    // Verificar la respuesta
    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Error al registrar usuario en Appwrite",
          details: errorData,
        },
        { status: response.status },
      )
    }

    // Obtener los datos del usuario creado
    const userData = await response.json()

    // Devolver respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Usuario registrado correctamente",
      user: {
        id: userData.$id,
        email: userData.email,
        name: userData.name,
      },
    })
  } catch (error: any) {
    console.error("Error al registrar usuario manualmente:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error al registrar usuario",
        details: error,
      },
      { status: 500 },
    )
  }
}

