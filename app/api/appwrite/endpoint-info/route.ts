import { NextResponse } from "next/server"

export async function GET() {
  try {
    const originalEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""

    // Update the validateEndpoint function to always return the correct endpoint
    const validateEndpoint = (endpoint: string): string => {
      // Always return the hardcoded correct endpoint
      return "https://cloud.appwrite.io/v1"
    }

    const validatedEndpoint = validateEndpoint(originalEndpoint)

    return NextResponse.json({
      originalEndpoint,
      validatedEndpoint,
      isValid: originalEndpoint === validatedEndpoint,
      endpointLength: originalEndpoint ? originalEndpoint.length : 0,
      endpointType: typeof originalEndpoint,
    })
  } catch (error: any) {
    console.error("Error al obtener información del endpoint:", error)
    return NextResponse.json({ error: error.message || "Error al obtener información del endpoint" }, { status: 500 })
  }
}

