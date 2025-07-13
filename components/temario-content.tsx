import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, FileText, Download } from "lucide-react"

export function TemarioContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Temario</h1>
          <p className="text-sm text-muted-foreground">Explora y estudia el temario oficial de las oposiciones</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar en el temario..." className="w-full pl-8" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos" className="text-xs sm:text-sm">
            Todos
          </TabsTrigger>
          <TabsTrigger value="general" className="text-xs sm:text-sm">
            General
          </TabsTrigger>
          <TabsTrigger value="especifico" className="text-xs sm:text-sm">
            Específico
          </TabsTrigger>
          <TabsTrigger value="guardados" className="text-xs sm:text-sm">
            Guardados
          </TabsTrigger>
        </TabsList>
        <TabsContent value="todos" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">Tema {i + 1}</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    {i < 3
                      ? "La Constitución Española y la Seguridad Social"
                      : i < 6
                        ? "Régimen General de la Seguridad Social"
                        : "Procedimientos administrativos en materia de Seguridad Social"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm">
                  <p className="line-clamp-3">
                    {i < 3
                      ? "Principios rectores de la política social y económica. El modelo de Estado Social. La Seguridad Social en la Constitución Española de 1978."
                      : i < 6
                        ? "Campo de aplicación. Inscripción de empresas. Afiliación de trabajadores. Altas y bajas. Responsabilidad empresarial."
                        : "La gestión recaudatoria. Procedimientos de recaudación. Período voluntario. Recaudación en vía ejecutiva."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Resumen
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Descargar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="general" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">Tema {i + 1}</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    La Constitución Española y la Seguridad Social
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm">
                  <p className="line-clamp-3">
                    Principios rectores de la política social y económica. El modelo de Estado Social. La Seguridad
                    Social en la Constitución Española de 1978.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Resumen
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Descargar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="especifico" className="mt-4 sm:mt-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base">Tema {i + 4}</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    {i < 3
                      ? "Régimen General de la Seguridad Social"
                      : "Procedimientos administrativos en materia de Seguridad Social"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm">
                  <p className="line-clamp-3">
                    {i < 3
                      ? "Campo de aplicación. Inscripción de empresas. Afiliación de trabajadores. Altas y bajas. Responsabilidad empresarial."
                      : "La gestión recaudatoria. Procedimientos de recaudación. Período voluntario. Recaudación en vía ejecutiva."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 sm:pt-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Resumen
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Descargar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="guardados" className="mt-4 sm:mt-6">
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium">No tienes temas guardados</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6">
              Guarda tus temas favoritos para acceder a ellos rápidamente
            </p>
            <Button>Explorar temario</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

