"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Brain, MessageCircle } from "lucide-react"
import { PocketBaseStatus } from "./pocketbase-status"

interface DashboardStats {
  totalUsers: number
  totalTopics: number
  totalTests: number
  totalPosts: number
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTopics: 0,
    totalTests: 0,
    totalPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Simular datos por ahora
        setTimeout(() => {
          setStats({
            totalUsers: 145,
            totalTopics: 28,
            totalTests: 84,
            totalPosts: 156,
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
        <div className="text-2xl font-bold">{loading ? "..." : value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Badge variant="outline">Usando PocketBase 🚀</Badge>
      </div>

      {/* Estado de PocketBase */}
      <div className="flex justify-center">
        <PocketBaseStatus />
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Usuarios Activos"
          value={stats.totalUsers}
          description="Total de usuarios registrados"
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Temas"
          value={stats.totalTopics}
          description="Temas de estudio disponibles"
          icon={BookOpen}
          color="text-green-500"
        />
        <StatCard
          title="Tests"
          value={stats.totalTests}
          description="Tests generados y completados"
          icon={Brain}
          color="text-purple-500"
        />
        <StatCard
          title="Publicaciones"
          value={stats.totalPosts}
          description="Posts en la comunidad"
          icon={MessageCircle}
          color="text-orange-500"
        />
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>🎉 Migración Completada</CardTitle>
          <CardDescription>El proyecto ha sido migrado exitosamente de Appwrite a PocketBase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">✅ Autenticación con PocketBase</p>
            <p className="text-sm">✅ API REST simplificada</p>
            <p className="text-sm">✅ Base de datos SQLite integrada</p>
            <p className="text-sm">✅ Admin UI incluida</p>
            <p className="text-sm">✅ Mejor rendimiento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
