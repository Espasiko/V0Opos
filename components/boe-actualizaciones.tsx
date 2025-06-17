"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, AlertTriangle, Loader2 } from "lucide-react"
import type { BOEActualizacion, BOEDocumento } from "@/lib/boe-types"
import Link from "next/link"

// Datos simulados para cuando la API falla
const mockBOEData: BOEActualizacion = {
  id: "mock-act-1",
  fecha: new Date().toISOString().split("T")[0],
  titulo: "Actualizaciones BOE (Simulado)",
  descripcion: "Datos simulados para demostración",
  documentos: [
    {
      id: "mock-doc-1",
      identificador: "BOE-A-2023-12345",
      fecha_publicacion: new Date().toISOString().split("T")[0],
      titulo: "Real Decreto sobre prestaciones de Seguridad Social",
      texto:
        "Este es un documento simulado para demostración. En un entorno real, contendría el texto completo del BOE.",
      url_pdf: "https://www.boe.es/boe/dias/2023/05/01/pdfs/BOE-A-2023-12345.pdf",
      url_html: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12345",
      url_xml: "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-12345",
      seccion: "I. Disposiciones generales",
      departamento: "Ministerio de Inclusión, Seguridad Social y Migraciones",
      departamento_codigo: "27",
      palabras_clave: ["seguridad social", "prestaciones", "cotización"],
      resumen:
        "Este Real Decreto establece modificaciones en las prestaciones de la Seguridad Social, afectando principalmente a las bases de cotización y los requisitos para acceder a determinadas prestaciones contributivas.",
      relevancia_ss: 85,
    },
    {
      id: "mock-doc-2",
      identificador: "BOE-A-2023-12346",
      fecha_publicacion: new Date().toISOString().split("T")[0],
      titulo: "Orden sobre procedimientos administrativos en la Seguridad Social",
      texto:
        "Este es un documento simulado para demostración. En un entorno real, contendría el texto completo del BOE.",
      url_pdf: "https://www.boe.es/boe/dias/2023/05/01/pdfs/BOE-A-2023-12346.pdf",
      url_html: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12346",
      url_xml: "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-12346",
      seccion: "III. Otras disposiciones",
      departamento: "Ministerio de Inclusión, Seguridad Social y Migraciones",
      departamento_codigo: "27",
      palabras_clave: ["procedimiento administrativo", "seguridad social", "gestión"],
      resumen:
        "Esta Orden establece nuevos procedimientos administrativos para la gestión de trámites relacionados con la Seguridad Social, simplificando algunos procesos y estableciendo plazos más cortos para la resolución de expedientes.",
      relevancia_ss: 70,
    },
    {
      id: "mock-doc-3",
      identificador: "BOE-A-2023-12347",
      fecha_publicacion: new Date().toISOString().split("T")[0],
      titulo: "Resolución sobre convenios colectivos y su impacto en la Seguridad Social",
      texto:
        "Este es un documento simulado para demostración. En un entorno real, contendría el texto completo del BOE.",
      url_pdf: "https://www.boe.es/boe/dias/2023/05/01/pdfs/BOE-A-2023-12347.pdf",
      url_html: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12347",
      url_xml: "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-12347",
      seccion: "III. Otras disposiciones",
      departamento: "Ministerio de Trabajo y Economía Social",
      departamento_codigo: "25",
      palabras_clave: ["convenio colectivo", "seguridad social", "cotización"],
      resumen:
        "Esta Resolución aclara cómo los convenios colectivos pueden afectar a las obligaciones de cotización a la Seguridad Social, especialmente en lo relativo a complementos salariales y beneficios sociales.",
      relevancia_ss: 60,
    },
  ],
  relevancia_ss: 75,
}

export function BOEActualizaciones() {
  const [actualizacion, setActualizacion] = useState<BOEActualizacion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedMockData, setUsedMockData] = useState(false)

  useEffect(() => {
    const fetchActualizaciones = async () => {
      try {
        setLoading(true)
        setError(null)
        setUsedMockData(false)

        // Obtener fecha actual en formato YYYYMMDD
        const today = new Date()
        const fechaStr =
          today.getFullYear().toString() +
          (today.getMonth() + 1).toString().padStart(2, "0") +
          today.getDate().toString().padStart(2, "0")

        console.log("Obteniendo actualizaciones del BOE para la fecha:", fechaStr)

        try {
          const apiUrl = window.location.origin + `/api/boe/actualizaciones?fecha=${fechaStr}`
          console.log("URL de la API:", apiUrl)

          const response = await fetch(apiUrl, {
            cache: "no-store",
          })

          if (!response.ok) {
            console.warn(`Error al obtener actualizaciones: ${response.status}. Usando datos simulados.`)
            setActualizacion(mockBOEData)
            setUsedMockData(true)
            return
          }

          const data = await response.json()

          if (data.actualizacion && data.actualizacion.documentos && data.actualizacion.documentos.length > 0) {
            console.log("Actualizaciones del BOE recibidas:", data.actualizacion)
            setActualizacion(data.actualizacion)
          } else {
            console.warn("No se encontraron actualizaciones del BOE. Usando datos simulados.")
            setActualizacion(mockBOEData)
            setUsedMockData(true)
          }
        } catch (err) {
          console.error("Error al obtener actualizaciones del BOE:", err)
          console.log("Usando datos simulados debido al error.")
          setActualizacion(mockBOEData)
          setUsedMockData(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchActualizaciones()
  }, [])

  // Renderizar estado de carga
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">BOE actualizado</CardTitle>
          <CardDescription>Cargando actualizaciones recientes...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  // Renderizar estado de error
  if (error && !actualizacion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">BOE actualizado</CardTitle>
          <CardDescription>Cambios recientes en la normativa de Seguridad Social</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-base font-medium">No se pudieron cargar las actualizaciones</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              {error || "Hubo un problema al obtener las actualizaciones del BOE"}
            </p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar actualizaciones
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">BOE actualizado</CardTitle>
        <CardDescription>
          Cambios recientes en la normativa de Seguridad Social
          {usedMockData && " (Datos simulados)"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {actualizacion && actualizacion.documentos.length > 0 ? (
            <>
              {actualizacion.documentos.slice(0, 3).map((documento: BOEDocumento, index: number) => (
                <div key={documento.id} className="flex items-start gap-3 sm:gap-4 rounded-lg border p-2 sm:p-3">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium leading-none">{documento.titulo}</p>
                    <p className="text-xs text-muted-foreground">
                      {documento.resumen ? documento.resumen.split("\n")[0] : "Sin resumen disponible"}
                    </p>
                    {documento.relevancia_ss >= 70 && (
                      <div className="mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                        Alta relevancia
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/boe">
                  Ver más actualizaciones
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-base font-medium">No hay actualizaciones recientes</h3>
              <p className="text-sm text-muted-foreground mt-2">
                No se encontraron actualizaciones relevantes en el BOE para la fecha actual
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
