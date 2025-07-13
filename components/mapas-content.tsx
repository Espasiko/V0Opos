import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Search, Plus, Edit, Share2, Trash2 } from "lucide-react"
import Link from "next/link"

export function MapasContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mapas Mentales</h1>
          <p className="text-sm text-muted-foreground">Organiza visualmente los conceptos clave del temario</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar mapas..." className="w-full pl-8" />
          </div>
          <Button className="whitespace-nowrap" asChild>
            <Link href="/editor-mapas">
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Nuevo</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mis-mapas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mis-mapas" className="text-xs sm:text-sm">
            Mis Mapas
          </TabsTrigger>
          <TabsTrigger value="compartidos" className="text-xs sm:text-sm">
            Compartidos
          </TabsTrigger>
          <TabsTrigger value="plantillas" className="text-xs sm:text-sm">
            Plantillas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mis-mapas" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">
                      {i === 0
                        ? "Estructura del Sistema de Seguridad Social"
                        : i === 1
                          ? "Prestaciones Contributivas y No Contributivas"
                          : "Procedimiento Administrativo"}
                    </CardTitle>
                    <Network className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs">
                    Actualizado {i === 0 ? "hoy" : i === 1 ? "hace 2 días" : "hace 1 semana"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="aspect-video bg-muted rounded-md flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                        Concepto Principal
                      </div>
                      {[0, 1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="absolute w-16 sm:w-24 h-6 sm:h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground text-[10px] sm:text-xs"
                          style={{
                            top: `${j % 2 === 0 ? -40 : 40}px`,
                            left: `${j < 2 ? -70 : 70}px`,
                          }}
                        >
                          Subconcepto {j + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <Link href="/editor-mapas">
                      <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Editar
                    </Link>
                  </Button>
                  <div className="flex gap-1 sm:gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="compartidos" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">
                      {i === 0 ? "Régimen General vs. Regímenes Especiales" : "Cotización y Bases Reguladoras"}
                    </CardTitle>
                    <Network className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs">
                    Compartido por {i === 0 ? "María G." : "Carlos L."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="aspect-video bg-muted rounded-md flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                        Concepto Principal
                      </div>
                      {[0, 1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="absolute w-16 sm:w-24 h-6 sm:h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground text-[10px] sm:text-xs"
                          style={{
                            top: `${j % 2 === 0 ? -40 : 40}px`,
                            left: `${j < 2 ? -70 : 70}px`,
                          }}
                        >
                          Subconcepto {j + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <Link href="/editor-mapas">
                      <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Ver
                    </Link>
                  </Button>
                  <Button size="sm" className="text-xs">
                    Guardar copia
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="plantillas" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">
                      {i === 0
                        ? "Mapa Jerárquico"
                        : i === 1
                          ? "Mapa Conceptual"
                          : i === 2
                            ? "Diagrama de Flujo"
                            : "Comparativa"}
                    </CardTitle>
                    <Network className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs">Plantilla oficial</CardDescription>
                </CardHeader>
                <CardContent className="aspect-video bg-muted rounded-md flex items-center justify-center p-2 sm:p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    {i === 0 && (
                      <div className="relative">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                          Nivel 1
                        </div>
                        {[0, 1].map((j) => (
                          <div
                            key={j}
                            className="absolute w-16 sm:w-24 h-6 sm:h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground text-[10px] sm:text-xs"
                            style={{
                              top: `30px`,
                              left: `${j === 0 ? -50 : 50}px`,
                            }}
                          >
                            Nivel 2
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="relative">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                          Concepto
                        </div>
                        {[0, 1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="absolute w-16 sm:w-24 h-6 sm:h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground text-[10px] sm:text-xs"
                            style={{
                              top: `${j % 2 === 0 ? -40 : 40}px`,
                              left: `${j < 2 ? -70 : 70}px`,
                            }}
                          >
                            Relación {j + 1}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 2 && (
                      <div className="relative">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                          Inicio
                        </div>
                        <div
                          className="absolute w-24 sm:w-32 h-8 sm:h-10 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-medium text-xs sm:text-sm"
                          style={{
                            top: `40px`,
                            left: `0px`,
                          }}
                        >
                          Proceso
                        </div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="relative">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-full h-full flex">
                          <div className="w-1/2 h-full flex items-center justify-center border-r border-border">
                            <div className="w-20 sm:w-32 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                              Opción A
                            </div>
                          </div>
                          <div className="w-1/2 h-full flex items-center justify-center">
                            <div className="w-20 sm:w-32 h-8 sm:h-10 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-medium text-xs sm:text-sm">
                              Opción B
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3">
                  <Button className="w-full text-xs sm:text-sm" asChild>
                    <Link href="/editor-mapas">Usar plantilla</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

