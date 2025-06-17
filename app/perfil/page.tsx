"use client"

import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, Network, Settings, User } from "lucide-react"

export default function PerfilPage() {
  const { user, loading } = useAuth()

  // Obtener iniciales del nombre para el avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando perfil...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <p className="text-lg font-medium">Debes iniciar sesión para ver tu perfil</p>
            <Button className="mt-4" asChild>
              <a href="/login">Iniciar sesión</a>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gestiona tu información personal y revisa tu progreso
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.nombre} />
                  <AvatarFallback className="text-2xl">{getInitials(user.nombre)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-semibold">{user.nombre}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/perfil/configuracion">
                    <Settings className="mr-2 h-4 w-4" />
                    Editar perfil
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue="progreso">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="progreso">
                  <User className="mr-2 h-4 w-4" />
                  Progreso
                </TabsTrigger>
                <TabsTrigger value="tests">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Mis Tests
                </TabsTrigger>
                <TabsTrigger value="mapas">
                  <Network className="mr-2 h-4 w-4" />
                  Mis Mapas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="progreso" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de progreso</CardTitle>
                    <CardDescription>Tu avance en la preparación de oposiciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Temario completado</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[45%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Tests realizados</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[32%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Mapas mentales</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[18%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                    <CardDescription>Datos sobre tu actividad en la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Días de estudio</p>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tests completados</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Temas estudiados</p>
                        <p className="text-2xl font-bold">18</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Puntuación media</p>
                        <p className="text-2xl font-bold">76%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tests" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Tests</CardTitle>
                    <CardDescription>Tests que has realizado o guardado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">Test sobre Régimen General ({i})</p>
                            <p className="text-sm text-muted-foreground">
                              Completado el {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{70 + i}%</p>
                            <p className="text-sm text-muted-foreground">Puntuación</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mapas" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Mapas Mentales</CardTitle>
                    <CardDescription>Mapas mentales que has creado o guardado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">
                              {i === 1 ? "Estructura del Sistema de Seguridad Social" : "Prestaciones Contributivas"}
                            </p>
                            <p className="text-sm text-muted-foreground">Creado el {new Date().toLocaleDateString()}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver mapa
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
