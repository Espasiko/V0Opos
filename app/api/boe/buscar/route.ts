import { NextResponse } from "next/server"
import { boeAgentWorkflow } from "@/lib/boe-agent-service"
import { filtrarDocumentosBOE, formatearFechaYYYYMMDD } from "@/lib/boe-utils"
import type { BOEBusquedaParams } from "@/lib/boe-types"

/**
 * API Route para buscar documentos del BOE
 * GET /api/boe/buscar?texto=&fecha_desde=&fecha_hasta=&departamento=&seccion=&relevancia_minima=&limite=
 */
export async function GET(request: Request) {
  try {
    // Obtener parámetros de la URL
    const { searchParams } = new URL(request.url)

    // Construir parámetros de búsqueda
    const params: BOEBusquedaParams = {
      texto: searchParams.get("texto") || undefined,
      fecha_desde: searchParams.get("fecha_desde") || undefined,
      fecha_hasta: searchParams.get("fecha_hasta") || undefined,
      departamento: searchParams.get("departamento") || undefined,
      seccion: searchParams.get("seccion") || undefined,
      relevancia_minima: searchParams.get("relevancia_minima")
        ? Number.parseInt(searchParams.get("relevancia_minima")!)
        : undefined,
      limite: searchParams.get("limite") ? Number.parseInt(searchParams.get("limite")!) : undefined,
    }

    // Si no se proporciona fecha, usar la fecha actual
    const fechaConsulta = params.fecha_hasta || formatearFechaYYYYMMDD(new Date())

    // Ejecutar flujo de trabajo de agentes para obtener documentos
    const actualizacion = await boeAgentWorkflow.run(fechaConsulta)

    // Filtrar documentos según los parámetros
    const documentosFiltrados = filtrarDocumentosBOE(actualizacion.documentos, params)

    return NextResponse.json({
      total: documentosFiltrados.length,
      documentos: documentosFiltrados,
    })
  } catch (error) {
    console.error("Error en API Route /api/boe/buscar:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

