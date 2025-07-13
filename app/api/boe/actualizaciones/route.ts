import { NextResponse } from "next/server"
import { formatearFechaYYYYMMDD } from "@/lib/boe-utils"
import type { BOEActualizacion } from "@/lib/boe-types"

/**
 * API Route para obtener actualizaciones del BOE
 * GET /api/boe/actualizaciones?fecha=YYYYMMDD
 */
export async function GET(request: Request) {
  try {
    // Obtener parámetros de la URL
    const { searchParams } = new URL(request.url)
    const fecha = searchParams.get("fecha")

    // Si no se proporciona fecha, usar la fecha actual
    const fechaConsulta = fecha || formatearFechaYYYYMMDD(new Date())

    // Validar formato de fecha (YYYYMMDD)
    if (!/^\d{8}$/.test(fechaConsulta)) {
      return NextResponse.json({ error: "Formato de fecha inválido. Debe ser YYYYMMDD" }, { status: 400 })
    }

    console.log("Generando actualizaciones del BOE para la fecha:", fechaConsulta)

    // Crear datos simulados para la demostración
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]

    const actualizacion: BOEActualizacion = {
      id: `act-${fechaConsulta}`,
      fecha: formattedDate,
      titulo: `Actualizaciones BOE - ${formattedDate}`,
      descripcion: "Actualizaciones relevantes para oposiciones de Seguridad Social",
      documentos: [
        {
          id: `doc-${Date.now()}-1`,
          identificador: `BOE-A-${fechaConsulta}-1`,
          fecha_publicacion: formattedDate,
          titulo: "Real Decreto sobre modificaciones en el Régimen General de la Seguridad Social",
          texto: "Este Real Decreto introduce cambios significativos en el Régimen General de la Seguridad Social...",
          url_pdf: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-1.pdf`,
          url_html: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-1.html`,
          url_xml: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-1.xml`,
          seccion: "Disposiciones Generales",
          departamento: "Ministerio de Inclusión, Seguridad Social y Migraciones",
          departamento_codigo: "1",
          palabras_clave: ["seguridad social", "régimen general", "cotización"],
          relevancia_ss: 85,
          resumen:
            "Este Real Decreto introduce modificaciones importantes en el Régimen General de la Seguridad Social, afectando principalmente a los procedimientos de cotización y recaudación.",
        },
        {
          id: `doc-${Date.now()}-2`,
          identificador: `BOE-A-${fechaConsulta}-2`,
          fecha_publicacion: formattedDate,
          titulo: "Orden sobre prestaciones por nacimiento y cuidado de menor",
          texto:
            "Esta Orden actualiza los criterios para el reconocimiento de prestaciones por nacimiento y cuidado de menor...",
          url_pdf: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-2.pdf`,
          url_html: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-2.html`,
          url_xml: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-2.xml`,
          seccion: "Disposiciones Generales",
          departamento: "Ministerio de Inclusión, Seguridad Social y Migraciones",
          departamento_codigo: "1",
          palabras_clave: ["prestaciones", "nacimiento", "cuidado de menor"],
          relevancia_ss: 75,
          resumen:
            "Esta Orden actualiza los criterios para el reconocimiento de prestaciones por nacimiento y cuidado de menor, simplificando los trámites administrativos y ampliando algunos supuestos de protección.",
        },
        {
          id: `doc-${Date.now()}-3`,
          identificador: `BOE-A-${fechaConsulta}-3`,
          fecha_publicacion: formattedDate,
          titulo: "Resolución sobre bases de cotización para 2025",
          texto: "Esta Resolución establece las nuevas bases de cotización aplicables a partir de enero de 2025...",
          url_pdf: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-3.pdf`,
          url_html: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-3.html`,
          url_xml: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-A-${fechaConsulta}-3.xml`,
          seccion: "Disposiciones Generales",
          departamento: "Ministerio de Inclusión, Seguridad Social y Migraciones",
          departamento_codigo: "1",
          palabras_clave: ["cotización", "bases", "seguridad social"],
          relevancia_ss: 90,
          resumen:
            "Esta Resolución establece las nuevas bases de cotización aplicables a partir de enero de 2025, con un incremento medio del 3% respecto a las actuales.",
        },
      ],
      relevancia_ss: 85,
    }

    return NextResponse.json({ actualizacion })
  } catch (error) {
    console.error("Error en API Route /api/boe/actualizaciones:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

