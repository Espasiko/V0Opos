"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function ConfigChecker() {
  const [endpoint, setEndpoint] = useState("")
  const [projectId, setProjectId] = useState("")
  const [isValidEndpoint, setIsValidEndpoint] = useState(false)
  const [isValidProjectId, setIsValidProjectId] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Obtener los valores actuales
    setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    setProjectId(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  }, [])

  useEffect(() => {
    // Validar endpoint
    try {
      if (endpoint) {
        new URL(endpoint)
        setIsValidEndpoint(true)
      } else {
        setIsValidEndpoint(false)
      }
    } catch (error) {
      setIsValidEndpoint(false)
    }

    // Validar projectId
    setIsValidProjectId(!!projectId && projectId.length > 5)
  }, [endpoint, projectId])

  const validateEndpoint = (url: string): string => {
    try {
      // Verificar si el endpoint es un valor extraño (token o hash)
      if (url && url.length > 100) {
        return "https://cloud.appwrite.io/v1"
      }

      // Si el endpoint está vacío o no es una cadena, usar valor predeterminado
      if (!url || typeof url !== "string") {
        return "https://cloud.appwrite.io/v1"
      }

      // Intentar crear una URL para validar
      try {
        new URL(url)
      } catch (error) {
        return "https://cloud.appwrite.io/v1"
      }

      // Asegurarse de que la URL termina con /v1
      if (!url.endsWith("/v1")) {
        // Si termina con /, añadir v1
        if (url.endsWith("/")) {
          return `${url}v1`
        }
        // Si no termina con /, añadir /v1
        return `${url}/v1`
      }

      return url
    } catch (error) {
      // Devolver un endpoint por defecto
      return "https://cloud.appwrite.io/v1"
    }
  }

  const handleVerify = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const validatedEndpoint = validateEndpoint(endpoint)

      // Verificar la conexión con Appwrite
      const response = await fetch("/api/appwrite/verify-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: validatedEndpoint,
          projectId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Conexión exitosa con Appwrite")
      } else {
        setMessage(`Error: ${data.message}`)
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verificador de Configuración de Appwrite</CardTitle>
        <CardDescription>Verifica y corrige la configuración de Appwrite</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint">Endpoint de Appwrite</Label>
          <Input
            id="endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://cloud.appwrite.io/v1"
            className={isValidEndpoint ? "border-green-500" : "border-red-500"}
          />
          {!isValidEndpoint && <p className="text-sm text-red-500">El endpoint debe ser una URL válida</p>}
          <p className="text-xs text-gray-500">Ejemplo: https://cloud.appwrite.io/v1</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectId">ID del Proyecto de Appwrite</Label>
          <Input
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="ID del Proyecto"
            className={isValidProjectId ? "border-green-500" : "border-red-500"}
          />
          {!isValidProjectId && (
            <p className="text-sm text-red-500">El ID del proyecto debe tener al menos 5 caracteres</p>
          )}
        </div>

        {message && (
          <Alert variant={message.includes("Error") ? "destructive" : "default"}>
            {message.includes("Error") ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <AlertTitle>{message.includes("Error") ? "Error" : "Éxito"}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleVerify} disabled={!isValidEndpoint || !isValidProjectId || isLoading}>
          {isLoading ? "Verificando..." : "Verificar Configuración"}
        </Button>
      </CardFooter>
    </Card>
  )
}
