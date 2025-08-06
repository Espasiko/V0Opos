"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Brain, MessageCircle, ArrowRight, Code } from 'lucide-react'
import { BOEActualizaciones } from "./boe-actualizaciones"
import Link from "next/link"

interface DashboardStats {
  totalUsers: number
  totalTopics: number
  totalTests: number
  totalPosts: number
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 256,
    totalTopics: 32,
    totalTests: 128,
    totalPosts: 89,
  })

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    color,
  }: {
    title: string
    value: number
    description: string
    icon: any
    color: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido a OposIA</h1>
          <p className="text-muted-foreground">Tu plataforma de preparación para oposiciones con IA</p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Code className="mr-1 h-3 w-3" />
          Modo Desarrollo
        </Badge>
      </div>

      {/* Aviso de modo desarrollo */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <Code className="h-5 w-5" />
            🚧 Modo Desarrollo Activo
          </CardTitle>
          <CardDescription className="text-yellow-700">
            La autenticación está deshabilitada. Todos los datos son simulados para facilitar el desarrollo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm text-yellow-700">
            <p>✅ Sin login/registro requerido</p>
            <p>✅ Datos mock disponibles</p>
            <p>✅ APIs simuladas funcionando</p>
            <p>✅ Navegación libre</p>
            <p>✅ Sin errores de autenticación</p>
            <p>✅ Desarrollo sin interrupciones</p>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Usuarios Activos"
          value={stats.totalUsers}
          description="Total de usuarios registrados (mock)"
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Temas"
          value={stats.totalTopics}
          description="Temas de estudio disponibles (mock)"
          icon={BookOpen}
          color="text-green-500"
        />
        <StatCard
          title="Tests"
          value={stats.totalTests}
          description="Tests generados y completados (mock)"
          icon={Brain}
          color="text-purple-500"
        />
        <StatCard
          title="Publicaciones"
          value={stats.totalPosts}
          description="Posts en la comunidad (mock)"
          icon={MessageCircle}
          color="text-orange-500"
        />
      </div>

      {/* Contenido principal */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <BOEActualizaciones />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tu Progreso (Mock)</CardTitle>
            <CardDescription>Seguimiento simulado de tu preparación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Temario completado</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-[45%] bg-primary rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tests realizados</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-[32%] bg-primary rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mapas mentales</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-[18%] bg-primary rounded-full"></div>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href="/temario">
                Continuar estudiando
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información de desarrollo */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">💻 Información de Desarrollo</CardTitle>
          <CardDescription className="text-blue-700">
            Estado actual del proyecto y funcionalidades disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
            <p>✅ Dashboard funcionando</p>
            <p>✅ Navegación completa</p>
            <p>✅ APIs mock implementadas</p>
            <p>✅ Componentes UI listos</p>
            <p>✅ Rutas configuradas</p>
            <p>✅ Sin errores de autenticación</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
