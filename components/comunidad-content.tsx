"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Search,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  FileText,
  Upload,
  Download,
  X,
  File,
  Image,
  PlusCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ComunidadContent() {
  const [activeTab, setActiveTab] = useState("recientes")
  const [showAllFiles, setShowAllFiles] = useState(false)
  const [showMyPublications, setShowMyPublications] = useState(false)

  // Datos de ejemplo para archivos
  const archivosRecientes = [
    {
      nombre: "Esquema_Regimen_General_SS.pdf",
      autor: "Carlos López",
      fecha: "hace 1 día",
      tamaño: "2.4 MB",
      descargas: 28,
    },
    {
      nombre: "Resumen_Tema_15_Prestaciones.docx",
      autor: "Ana Sánchez",
      fecha: "hace 3 días",
      tamaño: "1.8 MB",
      descargas: 42,
    },
    {
      nombre: "Test_Procedimientos_Administrativos.pdf",
      autor: "Javier Rodríguez",
      fecha: "hace 1 semana",
      tamaño: "3.2 MB",
      descargas: 65,
    },
  ]

  const todosArchivos = [
    ...archivosRecientes,
    {
      nombre: "Mapa_Mental_Cotizacion.pdf",
      autor: "María García",
      fecha: "hace 2 semanas",
      tamaño: "1.5 MB",
      descargas: 37,
    },
    {
      nombre: "Resumen_Ley_General_SS.pdf",
      autor: "Pedro Martínez",
      fecha: "hace 3 semanas",
      tamaño: "4.2 MB",
      descargas: 89,
    },
    {
      nombre: "Esquema_Prestaciones_Contributivas.docx",
      autor: "Laura Fernández",
      fecha: "hace 1 mes",
      tamaño: "2.1 MB",
      descargas: 54,
    },
  ]

  // Datos de ejemplo para mis publicaciones
  const misPublicaciones = [
    {
      titulo: "Duda sobre cálculo de pensiones",
      fecha: "hace 2 semanas",
      contenido: "Tengo una duda sobre cómo se calcula la pensión de jubilación cuando hay lagunas de cotización...",
      likes: 8,
      comentarios: 3,
    },
    {
      titulo: "Resumen del tema 12",
      fecha: "hace 1 mes",
      contenido: "Comparto mi resumen del tema 12 sobre prestaciones contributivas...",
      likes: 15,
      comentarios: 7,
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Comunidad</h1>
          <p className="text-sm text-muted-foreground">Comparte dudas y recursos con otros opositores</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar en la comunidad..." className="w-full pl-8" />
          </div>
          <Button className="whitespace-nowrap">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Publicar</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recientes" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="recientes" className="text-xs sm:text-sm">
            Recientes
          </TabsTrigger>
          <TabsTrigger value="populares" className="text-xs sm:text-sm">
            Populares
          </TabsTrigger>
          <TabsTrigger value="recursos" className="text-xs sm:text-sm">
            Recursos
          </TabsTrigger>
          <TabsTrigger value="archivos" className="text-xs sm:text-sm">
            Archivos
          </TabsTrigger>
          <TabsTrigger value="mis-publicaciones" className="text-xs sm:text-sm">
            Mis Publicaciones
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recientes" className="mt-4 sm:mt-6">
          <div className="space-y-3 sm:space-y-4">
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario1" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm sm:text-base">María García</CardTitle>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">hace 2 horas</span>
                    </div>
                    <CardDescription className="text-[10px] sm:text-xs">Opositora desde 2022 · Madrid</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-medium">
                    Duda sobre cotización en contratos a tiempo parcial
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Hola a todos, estoy estudiando el tema de cotización y tengo dudas sobre cómo se calcula la base
                    reguladora en contratos a tiempo parcial. ¿Alguien podría explicarme si se tienen en cuenta las
                    horas trabajadas o solo los días cotizados? Gracias de antemano.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-2 sm:pt-3">
                <div className="flex w-full justify-between">
                  <div className="flex gap-2 sm:gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>12</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>5</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario2" />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm sm:text-base">Carlos López</CardTitle>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">hace 1 día</span>
                    </div>
                    <CardDescription className="text-[10px] sm:text-xs">
                      Opositor desde 2021 · Barcelona
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-medium">Recurso: Esquema completo del Régimen General</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Comparto con todos un esquema que he elaborado sobre el Régimen General de la Seguridad Social.
                    Incluye todos los aspectos clave: campo de aplicación, afiliación, cotización, acción protectora y
                    prestaciones. Espero que os sea útil.
                  </p>
                  <div className="mt-3 sm:mt-4 rounded-md border p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div className="bg-primary/10 p-1 sm:p-2 rounded-md">
                      <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium">Esquema_Regimen_General_SS.pdf</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">PDF · 2.4 MB</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-2 sm:pt-3">
                <div className="flex w-full justify-between">
                  <div className="flex gap-2 sm:gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>28</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>12</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario3" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm sm:text-base">Ana Sánchez</CardTitle>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">hace 3 días</span>
                    </div>
                    <CardDescription className="text-[10px] sm:text-xs">
                      Opositora desde 2023 · Valencia
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-medium">Experiencia en el último examen</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Quería compartir mi experiencia en el examen de la semana pasada. Las preguntas fueron bastante
                    similares a los tests que hemos estado practicando aquí. Hubo bastante énfasis en procedimientos
                    administrativos y menos en prestaciones de lo que esperaba. Si alguien tiene dudas sobre cómo fue,
                    estoy disponible para ayudar.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-2 sm:pt-3">
                <div className="flex w-full justify-between">
                  <div className="flex gap-2 sm:gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>45</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>23</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium">Comentarios recientes</h3>
              <Button variant="link" size="sm" className="text-xs sm:text-sm h-8">
                Ver todos
              </Button>
            </div>

            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="space-y-3 sm:space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b last:border-0 last:pb-0">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`@usuario${i + 4}`} />
                        <AvatarFallback>{["JR", "LM", "PT"][i]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium">
                            {["Javier Rodríguez", "Laura Martínez", "Pablo Torres"][i]}
                          </span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">hace {i + 1} horas</span>
                        </div>
                        <p className="text-xs sm:text-sm">
                          {i === 0
                            ? "Gracias por compartir tu experiencia, Ana. ¿Recuerdas si preguntaron algo sobre el cálculo de la base reguladora?"
                            : i === 1
                              ? "El esquema es muy completo, Carlos. Me ha ayudado mucho a organizar los conceptos."
                              : "María, en los contratos a tiempo parcial se tienen en cuenta tanto las horas como los días. Te recomiendo revisar el artículo 246 de la LGSS."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Añadir un comentario</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe tu comentario aquí..."
                  className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="text-xs sm:text-sm">Publicar comentario</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="populares" className="mt-4 sm:mt-6">
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium">Contenido popular</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6 max-w-md">
              Aquí se mostrarán las publicaciones más populares de la comunidad
            </p>
            <Button className="text-xs sm:text-sm">Explorar comunidad</Button>
          </div>
        </TabsContent>

        <TabsContent value="recursos" className="mt-4 sm:mt-6">
          {/* Contenido de recursos */}
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium">Recursos compartidos</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6 max-w-md">
              Aquí se mostrarán los recursos compartidos por la comunidad
            </p>

            {/* Dialog para subir recursos */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-xs sm:text-sm">Compartir un recurso</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Compartir recurso</DialogTitle>
                  <DialogDescription>
                    Comparte tus recursos con la comunidad para ayudar a otros opositores
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="titulo" className="text-right">
                      Título
                    </Label>
                    <Input id="titulo" placeholder="Título del recurso" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipo" className="text-right">
                      Tipo
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="esquema">Esquema</SelectItem>
                        <SelectItem value="resumen">Resumen</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="apuntes">Apuntes</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descripcion" className="text-right">
                      Descripción
                    </Label>
                    <Textarea id="descripcion" placeholder="Breve descripción del recurso" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Archivo</Label>
                    <div className="col-span-3">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="text-sm mt-2">Arrastra y suelta o</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Seleccionar archivo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Compartir recurso</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="archivos" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Archivos compartidos</CardTitle>
              <CardDescription>Sube y descarga archivos compartidos por la comunidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dialog para subir archivos */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Arrastra y suelta archivos</h3>
                      <p className="text-sm text-muted-foreground">o</p>
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Seleccionar archivos
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Máximo 10MB por archivo. Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Subir archivos</DialogTitle>
                    <DialogDescription>Comparte tus archivos con la comunidad</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-sm mt-2">Arrastra y suelta archivos aquí o</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Explorar archivos
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Archivos seleccionados</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border rounded-md p-2">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">documento.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between border rounded-md p-2">
                          <div className="flex items-center gap-2">
                            <Image className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">imagen.jpg</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción (opcional)</Label>
                      <Textarea id="descripcion" placeholder="Añade una descripción para tus archivos" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Subir archivos</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Archivos recientes</h3>
                  <Button variant="link" size="sm" onClick={() => setShowAllFiles(true)}>
                    Ver todos
                  </Button>
                </div>
                <div className="space-y-3">
                  {(showAllFiles ? todosArchivos : archivosRecientes.slice(0, 3)).map((archivo, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{archivo.nombre}</p>
                          <p className="text-xs text-muted-foreground">
                            Subido por {archivo.autor} · {archivo.fecha} · {archivo.tamaño} · {archivo.descargas}{" "}
                            descargas
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
                {showAllFiles && (
                  <Button variant="outline" className="w-full" onClick={() => setShowAllFiles(false)}>
                    Mostrar menos
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowAllFiles(!showAllFiles)}>
                {showAllFiles ? "Ocultar archivos" : "Ver todos los archivos"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Subir archivo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Subir archivos</DialogTitle>
                    <DialogDescription>Comparte tus archivos con la comunidad</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-sm mt-2">Arrastra y suelta archivos aquí o</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Explorar archivos
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Archivos seleccionados</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border rounded-md p-2">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">documento.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción (opcional)</Label>
                      <Textarea id="descripcion" placeholder="Añade una descripción para tus archivos" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Subir archivos</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mis-publicaciones" className="mt-4 sm:mt-6">
          {!showMyPublications ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
              <h3 className="text-base sm:text-lg font-medium">No tienes publicaciones</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6 max-w-md">
                Comparte tus dudas, experiencias o recursos con la comunidad
              </p>
              <Button className="text-xs sm:text-sm" onClick={() => setShowMyPublications(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Publicación
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Mis publicaciones</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nueva publicación
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Crear nueva publicación</DialogTitle>
                      <DialogDescription>
                        Comparte tus dudas, experiencias o recursos con la comunidad
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="titulo">Título</Label>
                        <Input id="titulo" placeholder="Título de tu publicación" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contenido">Contenido</Label>
                        <Textarea
                          id="contenido"
                          placeholder="Escribe el contenido de tu publicación"
                          className="min-h-[150px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Adjuntar archivos (opcional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Seleccionar archivos
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <Button type="submit">Publicar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {misPublicaciones.map((publicacion, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{publicacion.titulo}</CardTitle>
                      <CardDescription>{publicacion.fecha}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{publicacion.contenido}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{publicacion.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{publicacion.comentarios}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Eliminar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
