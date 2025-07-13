"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, ArrowRight, Save, Copy, Highlighter } from "lucide-react"

interface LeyVersion {
  id: string
  nombre: string
  fecha: string
  texto: string
}

interface Diferencia {
  tipo: "adicion" | "eliminacion" | "modificacion"
  textoAnterior?: string
  textoNuevo?: string
  articulo?: string
}

export function ComparadorLeyes() {
  const [busqueda, setBusqueda] = useState("")
  const [idLey, setIdLey] = useState("")
  const [loading, setLoading] = useState(false)
  const [versiones, setVersiones] = useState<LeyVersion[]>([])
  const [versionSeleccionada1, setVersionSeleccionada1] = useState<string>("")
  const [versionSeleccionada2, setVersionSeleccionada2] = useState<string>("")
  const [comparando, setComparando] = useState(false)
  const [diferencias, setDiferencias] = useState<Diferencia[]>([])
  const [textoComparacion, setTextoComparacion] = useState<string>("")
  const [seleccionados, setSeleccionados] = useState<string[]>([])

  // Función para buscar leyes
  const buscarLeyes = async () => {
    setLoading(true)
    try {
      // Simulación de búsqueda (en producción, esto sería una llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      const versionesEjemplo: LeyVersion[] = [
        {
          id: "ley-proteccion-menor-2015",
          nombre:
            "Ley Orgánica 8/2015, de 22 de julio, de modificación del sistema de protección a la infancia y a la adolescencia",
          fecha: "22/07/2015",
          texto:
            "Artículo 1. Modificación de la Ley Orgánica 1/1996, de 15 de enero, de Protección Jurídica del Menor.\n\nLa Ley Orgánica 1/1996, de 15 de enero, de Protección Jurídica del Menor, queda modificada en los siguientes términos:\n\nUno. Se modifica el artículo 2, que queda redactado como sigue:\n\n«Artículo 2. Interés superior del menor.\n\n1. Todo menor tiene derecho a que su interés superior sea valorado y considerado como primordial en todas las acciones y decisiones que le conciernan, tanto en el ámbito público como privado.",
        },
        {
          id: "ley-proteccion-menor-2021",
          nombre:
            "Ley Orgánica 8/2021, de 4 de junio, de protección integral a la infancia y la adolescencia frente a la violencia",
          fecha: "04/06/2021",
          texto:
            "Artículo 1. Modificación de la Ley Orgánica 1/1996, de 15 de enero, de Protección Jurídica del Menor.\n\nLa Ley Orgánica 1/1996, de 15 de enero, de Protección Jurídica del Menor, queda modificada en los siguientes términos:\n\nUno. Se modifica el artículo 2, que queda redactado como sigue:\n\n«Artículo 2. Interés superior del menor.\n\n1. Todo menor tiene derecho a que su interés superior sea valorado y considerado como primordial en todas las acciones y decisiones que le conciernan, tanto en el ámbito público como privado. En la aplicación de la presente ley y demás normas que le afecten, así como en las medidas concernientes a los menores que adopten las instituciones, públicas o privadas, los Tribunales, o los órganos legislativos primará el interés superior de los mismos sobre cualquier otro interés legítimo que pudiera concurrir.",
        },
      ]

      setVersiones(versionesEjemplo)
    } catch (error) {
      console.error("Error al buscar leyes:", error)
    } finally {
      setLoading(false)
    }
  }

  // Función para comparar versiones
  const compararVersiones = async () => {
    if (!versionSeleccionada1 || !versionSeleccionada2) {
      return
    }

    setComparando(true)
    try {
      // Simulación de comparación (en producción, esto sería una llamada a la API con Cohere o Mistral)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const version1 = versiones.find((v) => v.id === versionSeleccionada1)
      const version2 = versiones.find((v) => v.id === versionSeleccionada2)

      if (!version1 || !version2) {
        return
      }

      // Diferencias de ejemplo
      const diferenciasEjemplo: Diferencia[] = [
        {
          tipo: "modificacion",
          articulo: "Artículo 2.1",
          textoAnterior:
            "Todo menor tiene derecho a que su interés superior sea valorado y considerado como primordial en todas las acciones y decisiones que le conciernan, tanto en el ámbito público como privado.",
          textoNuevo:
            "Todo menor tiene derecho a que su interés superior sea valorado y considerado como primordial en todas las acciones y decisiones que le conciernan, tanto en el ámbito público como privado. En la aplicación de la presente ley y demás normas que le afecten, así como en las medidas concernientes a los menores que adopten las instituciones, públicas o privadas, los Tribunales, o los órganos legislativos primará el interés superior de los mismos sobre cualquier otro interés legítimo que pudiera concurrir.",
        },
      ]

      setDiferencias(diferenciasEjemplo)

      // Texto con diferencias resaltadas
      setTextoComparacion(`Artículo 2. Interés superior del menor.

1. Todo menor tiene derecho a que su interés superior sea valorado y considerado como primordial en todas las acciones y decisiones que le conciernan, tanto en el ámbito público como privado. <span class="bg-green-100 dark:bg-green-900/30 px-1">En la aplicación de la presente ley y demás normas que le afecten, así como en las medidas concernientes a los menores que adopten las instituciones, públicas o privadas, los Tribunales, o los órganos legislativos primará el interés superior de los mismos sobre cualquier otro interés legítimo que pudiera concurrir.</span>`)
    } catch (error) {
      console.error("Error al comparar versiones:", error)
    } finally {
      setComparando(false)
    }
  }

  // Función para seleccionar/deseleccionar texto
  const toggleSeleccion = (texto: string) => {
    if (seleccionados.includes(texto)) {
      setSeleccionados(seleccionados.filter((t) => t !== texto))
    } else {
      setSeleccionados([...seleccionados, texto])
    }
  }

  // Función para guardar selección
  const guardarSeleccion = () => {
    // En producción, esto guardaría la selección en la base de datos
    alert("Selección guardada correctamente")
  }

  // Función para copiar selección
  const copiarSeleccion = () => {
    navigator.clipboard.writeText(seleccionados.join("\n\n"))
    alert("Selección copiada al portapapeles")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buscar ley</CardTitle>
          <CardDescription>Introduce el ID de la ley o busca por nombre</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nombre" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nombre">Buscar por nombre</TabsTrigger>
              <TabsTrigger value="id">Buscar por ID</TabsTrigger>
            </TabsList>
            <TabsContent value="nombre" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="busqueda">Nombre de la ley</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="busqueda"
                      placeholder="Ej: Ley de protección del menor"
                      className="pl-8"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                  <Button onClick={buscarLeyes} disabled={loading || !busqueda}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    Buscar
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="id" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="idLey">ID de la ley</Label>
                <div className="flex gap-2">
                  <Input
                    id="idLey"
                    placeholder="Ej: BOE-A-2021-9347"
                    value={idLey}
                    onChange={(e) => setIdLey(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={buscarLeyes} disabled={loading || !idLey}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    Buscar
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {versiones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Versiones disponibles</CardTitle>
            <CardDescription>Selecciona dos versiones para comparar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="version1">Versión 1</Label>
                <Select value={versionSeleccionada1} onValueChange={setVersionSeleccionada1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una versión" />
                  </SelectTrigger>
                  <SelectContent>
                    {versiones.map((version) => (
                      <SelectItem key={version.id} value={version.id}>
                        {version.nombre} ({version.fecha})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="version2">Versión 2</Label>
                <Select value={versionSeleccionada2} onValueChange={setVersionSeleccionada2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una versión" />
                  </SelectTrigger>
                  <SelectContent>
                    {versiones.map((version) => (
                      <SelectItem key={version.id} value={version.id}>
                        {version.nombre} ({version.fecha})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={compararVersiones}
              disabled={
                !versionSeleccionada1 ||
                !versionSeleccionada2 ||
                versionSeleccionada1 === versionSeleccionada2 ||
                comparando
              }
            >
              {comparando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Comparando versiones...
                </>
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Comparar versiones
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {diferencias.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado de la comparación</CardTitle>
            <CardDescription>Diferencias encontradas entre las versiones seleccionadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Resumen de cambios</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copiarSeleccion} disabled={seleccionados.length === 0}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar selección
                  </Button>
                  <Button variant="outline" size="sm" onClick={guardarSeleccion} disabled={seleccionados.length === 0}>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar selección
                  </Button>
                </div>
              </div>

              {diferencias.map((diferencia, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{diferencia.articulo}</h4>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" onClick={() => toggleSeleccion(diferencia.textoNuevo || "")}>
                        <Highlighter className="mr-2 h-4 w-4" />
                        {seleccionados.includes(diferencia.textoNuevo || "") ? "Deseleccionar" : "Seleccionar"}
                      </Button>
                    </div>
                  </div>

                  {diferencia.tipo === "modificacion" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-sm">Versión anterior:</Label>
                        <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-900/20 text-sm">
                          {diferencia.textoAnterior}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm">Nueva versión:</Label>
                        <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded border border-green-100 dark:border-green-900/20 text-sm">
                          {diferencia.textoNuevo}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Texto completo con cambios</h3>
              <div
                className="p-4 border rounded-md text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: textoComparacion }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

