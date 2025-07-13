import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ClipboardList, Network, Users, ArrowRight } from "lucide-react"
import { BOEActualizaciones } from "@/components/boe-actualizaciones"
import Link from "next/link"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Bienvenido a OposIA</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Tu plataforma de preparación para oposiciones de Seguridad Social con IA
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Temario</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Temas disponibles</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Tests</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Preguntas generadas</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Mapas Mentales</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Mapas creados</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Comunidad</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground">Miembros activos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <BOEActualizaciones />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Tu progreso</CardTitle>
            <CardDescription>Seguimiento de tu preparación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full mb-4" asChild>
                <Link href="/comparador">
                  Comparar versiones
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Temario completado</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[45%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Tests realizados</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[32%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Mapas mentales</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[18%] rounded-full bg-primary"></div>
                </div>
              </div>
              <Button className="w-full text-sm">Continuar estudiando</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

