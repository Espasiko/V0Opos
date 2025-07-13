"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Search, FileText, AlertTriangle, Loader2, Download, ExternalLink } from "lucide-react"
import type { BOEActualizacion, BOEDocumento, BOEBusquedaParams } from "@/lib/boe-types"

export function BOEViewer() {
  // Estado para las actualizaciones
  const [actualizacion, setActualizacion] = useState<BOEActualizacion | null>(null)
  const [documentos, setDocumentos] = useState<BOEDocumento[]>([])
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<BOEDocumento | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState<BOEBusquedaParams>({
    texto: "",
    relevancia_minima: 30,
    limite: 50,
  })
  const [fecha, setFecha] = useState<Date | undefined>(new Date())

  // Cargar actualizaciones al montar el componente o cambiar la fecha
  useEffect(() => {
    const fetchActualizaciones = async () => {
      try {
        setLoading(true)
        setError(null)

        // Formatear fecha para la API
        const fechaStr = fecha
          ? fecha.getFullYear().toString() +
            (fecha.getMonth() + 1).toString().padStart(2, "0") +
            fecha.getDate().toString().padStart(2, "0")
          : undefined

        const response = await fetch(`/api/boe/actualizaciones${fechaStr ? `?fecha=${fechaStr}` : ""}`)

        if (!response.ok) {
          throw new Error(`Error al obtener actualizaciones: ${response.status}`)
        }

        const data = await response.json()
        setActualizacion(data.actualizacion)
        setDocumentos(data.actualizacion.documentos || [])
      } catch (err) {
        console.error("Error al obtener actualizaciones del BOE:", err)
        setError("No se pudieron cargar las actualizaciones del BOE")
      } finally {
        setLoading(false)
      }
    }

    fetchActualizaciones()
  }, [fecha])

  // Función para buscar documentos
  const buscarDocumentos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Construir URL de búsqueda
      let url = "/api/boe/buscar?"

      if (busqueda.texto) {
        url += `texto=${encodeURIComponent(busqueda.texto)}&`
      }

      if (fecha) {
        const fechaStr =
          fecha.getFullYear().toString() +
          (fecha.getMonth() + 1).toString().padStart(2, "0") +
          fecha.getDate().toString().padStart(2, "0")
        url += `fecha_hasta=${fechaStr}&`
      }

      if (busqueda.departamento) {
        url += `departamento=${encodeURIComponent(busqueda.departamento)}&`
      }

      if (busqueda.seccion) {
        url += `seccion=${encodeURIComponent(busqueda.seccion)}&`
      }

      if (busqueda.relevancia_minima !== undefined) {
        url += `relevancia_minima=${busqueda.relevancia_minima}&`
      }

      if (busqueda.limite !== undefined) {
        url += `limite=${busqueda.limite}&`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error al buscar documentos: ${response.status}`)
      }

      const data = await response.json()
      setDocumentos(data.documentos || [])
    } catch (err) {
      console.error("Error al buscar documentos del BOE:", err)
      setError("No se pudieron buscar documentos del BOE")
    } finally {
      setLoading(false)
    }
  }

  // Función para mostrar detalles de un documento
  const mostrarDetalles = (documento: BOEDocumento) => {
    setDocumentoSeleccionado(documento)
  }

  // Renderizar estado de carga
  if (loading && !documentos.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando actualizaciones</CardTitle>
          <CardDescription>Obteniendo datos del BOE...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  // Renderizar estado de error
  if (error && !documentos.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>No se pudieron cargar las actualizaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-lg font-medium">No se pudieron cargar las actualizaciones</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-md">{error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar actualizaciones</CardTitle>
          <CardDescription>Filtra las actualizaciones del BOE según tus criterios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="texto">Texto</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="texto"
                  type="search"
                  placeholder="Buscar..."
                  className="pl-8"
                  value={busqueda.texto || ""}
                  onChange={(e) => setBusqueda({ ...busqueda, texto: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fecha ? format(fecha, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relevancia">Relevancia mínima: {busqueda.relevancia_minima}%</Label>
              <Slider
                id="relevancia"
                min={0}
                max={100}
                step={5}
                value={[busqueda.relevancia_minima || 30]}
                onValueChange={(value) => setBusqueda({ ...busqueda, relevancia_minima: value[0] })}
              />
            </div>

            <div className="flex items-end">
              <Button className="w-full" onClick={buscarDocumentos}>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        {/* Lista de documentos */}
        <Card className="md:order-1">
          <CardHeader>
            <CardTitle>Documentos ({documentos.length})</CardTitle>
            <CardDescription>
              {actualizacion ? `Actualizaciones del ${actualizacion.fecha}` : "Resultados de la búsqueda"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {documentos.length > 0 ? (
                documentos.map((documento) => (
                  <div
                    key={documento.id}
                    className={`flex flex-col gap-2 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                      documentoSeleccionado?.id === documento.id ? "bg-accent" : ""
                    }`}
                    onClick={() => mostrarDetalles(documento)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium line-clamp-2">{documento.titulo}</h3>
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full w-8 h-8 bg-primary/10 text-primary text-xs font-bold">
                        {documento.relevancia_ss}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {documento.resumen ? documento.resumen.split("\n")[0] : "Sin resumen disponible"}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{documento.departamento}</span>
                      <span className="text-muted-foreground">{documento.fecha_publicacion}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-base font-medium">No se encontraron documentos</h3>
                  <p className="text-sm text-muted-foreground mt-2">Prueba a cambiar los criterios de búsqueda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detalles del documento */}
        <Card className="md:order-2">
          <CardHeader>
            <CardTitle>Detalles del documento</CardTitle>
            <CardDescription>
              {documentoSeleccionado
                ? "Información detallada del documento seleccionado"
                : "Selecciona un documento para ver sus detalles"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documentoSeleccionado ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">{documentoSeleccionado.titulo}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {documentoSeleccionado.fecha_publicacion}
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {documentoSeleccionado.seccion}
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {documentoSeleccionado.departamento}
                    </div>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        documentoSeleccionado.relevancia_ss >= 70
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          : documentoSeleccionado.relevancia_ss >= 40
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      Relevancia: {documentoSeleccionado.relevancia_ss}%
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="resumen">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="resumen">Resumen</TabsTrigger>
                    <TabsTrigger value="analisis">Análisis</TabsTrigger>
                    <TabsTrigger value="texto">Texto completo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="resumen" className="mt-4 space-y-4">
                    {documentoSeleccionado.resumen ? (
                      <div className="prose dark:prose-invert max-w-none">
                        {documentoSeleccionado.resumen.split("\n").map((parrafo, index) => (
                          <p key={index}>{parrafo}</p>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay resumen disponible para este documento</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="analisis" className="mt-4 space-y-4">
                    {documentoSeleccionado.analisis ? (
                      <div className="prose dark:prose-invert max-w-none">
                        {documentoSeleccionado.analisis.split("\n").map((parrafo, index) =>
                          parrafo.startsWith("#") ? (
                            <h3 key={index}>{parrafo.replace(/^#+\s/, "")}</h3>
                          ) : parrafo.startsWith("-") ? (
                            <ul key={index}>
                              <li>{parrafo.replace(/^-\s/, "")}</li>
                            </ul>
                          ) : parrafo.startsWith("###") ? (
                            <h4 key={index}>{parrafo.replace(/^###\s/, "")}</h4>
                          ) : (
                            <p key={index}>{parrafo}</p>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay análisis disponible para este documento</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="texto" className="mt-4 space-y-4">
                    {documentoSeleccionado.texto ? (
                      <div className="prose dark:prose-invert max-w-none max-h-[400px] overflow-y-auto">
                        <p>{documentoSeleccionado.texto}</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay texto completo disponible para este documento</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap gap-2">
                  {documentoSeleccionado.palabras_clave.map((palabra, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {palabra}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-6" />
                <h3 className="text-lg font-medium">Ningún documento seleccionado</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-md">
                  Selecciona un documento de la lista para ver sus detalles
                </p>
              </div>
            )}
          </CardContent>
          {documentoSeleccionado && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <a href={documentoSeleccionado.url_pdf} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={documentoSeleccionado.url_html} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver en BOE
                </a>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
