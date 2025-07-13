import { NextResponse } from "next/server"
import { PocketBaseApi } from "@/lib/pocketbase-api"

export async function GET() {
  try {
    const result = await PocketBaseApi.verifyConnection()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error de conexión con PocketBase" }, { status: 500 })
  }
}
