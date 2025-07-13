"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function EndpointInfo() {
  const [endpoint, setEndpoint] = useState("")
  const [validatedEndpoint, setValidatedEndpoint] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEndpointInfo = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/appwrite/endpoint-info")

        if (!response.ok) {
          throw new Error(`Error al obtener información del endpoint: ${response.status}`)
        }

        const data = await response.json()
        setEndpoint(data.originalEndpoint || "No configurado")
        setValidatedEndpoint(data.validatedEndpoint || "No validado")
      } catch (err: any) {
        console.error("Error al obtener información del endpoint:", err)
        setError(err.message || "Error al obtener información del endpoint")
      } finally {
        setLoading(false)
      }
    }

    fetchEndpointInfo()
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Información del Endpoint</CardTitle>
          <CardDescription>Cargando información...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Información del Endpoint</CardTitle>
        <CardDescription>Detalles sobre la configuración del endpoint de Appwrite</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Endpoint Original</h3>
          <p className="text-sm text-gray-500 break-all">{endpoint}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Endpoint Validado</h3>
          <p className="text-sm text-gray-500 break-all">{validatedEndpoint}</p>
          {endpoint !== validatedEndpoint && (
            <Alert>
              <AlertDescription>
                El endpoint original ha sido modificado durante la validación. Se está utilizando el endpoint validado
                para las conexiones con Appwrite.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRefresh}>Actualizar información</Button>
      </CardFooter>
    </Card>
  )
}
