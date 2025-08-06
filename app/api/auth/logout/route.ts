import { NextResponse } from "next/server"

export async function POST() {
  // Simular logout exitoso siempre
  return NextResponse.json({
    success: true,
  })
}
