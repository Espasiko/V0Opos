"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface ConnectionStatus {
  success: boolean
  message: string
  config?: {
    endpoint: {
      value: string | null
      isValid: boolean
      normalized: string
    }
    projectId: {
      value: string | null
      isValid: boolean
    }
  }
  timestamp: string
}

export function AppwriteConnectionTest() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [endpointInfo, setEndpointInfo] = useState<{
    original: string
    validated: string
    length: number
  } | null>(null)

  const testConnection = async () => {
    try {
      setLoading(true)
      setError(null)

      // Primero obtener información del endpoint
      try {
        const endpointResponse = await fetch("/api/appwrite/endpoint-info")
        if (endpointResponse.ok) {
          const endpointData = await endpointResponse.json()
          setEndpointInfo({
            original: endpointData.originalEndpoint || "No configurado",
            validated: endpointData.validatedEndpoint || "No validado",
            length: endpointData.endpointLength || 0,
          })
        }
      } catch (err) {
        console.error("Error al obtener información del endpoint:", err)
      }

      // Luego probar la conexión
      const response = await fetch("/api/appwrite/connection-test")
      const data = await response.json()

      setStatus(data)
    } catch (err: any) {
      console.error("Error al probar la conexión:", err)
      setError(err.message || "Error al probar la conexión con Appwrite")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Diagnóstico de conexión con Appwrite</CardTitle>
        <CardDescription>Verifica la configuración y la conexión con Appwrite</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {endpointInfo && (
          <Alert variant={endpointInfo.original !== endpointInfo.validated ? "warning" : "default"}>
            <AlertTitle>Información del Endpoint</AlertTitle>
            <AlertDescription>
              <div className="space-y-2 mt-2">
                <p>
                  <strong>Endpoint original:</strong> {endpointInfo.original}
                </p>
                <p>
                  <strong>Longitud:</strong> {endpointInfo.length} caracteres
                </p>
                <p>
                  <strong>Endpoint validado:</strong> {endpointInfo.validated}
                </p>

                {endpointInfo.original && endpointInfo.original.startsWith("standard_") && (
                  <div className="text-red-600 dark:text-red-400 mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                    <p>
                      <strong>⚠️ Error:</strong> Has configurado una API key como endpoint en lugar de una URL.
                    </p>
                    <p className="mt-1">
                      Solución: Configura la variable de entorno NEXT_PUBLIC_APPWRITE_ENDPOINT con una URL válida como
                      "https://cloud.appwrite.io/v1"
                    </p>
                  </div>
                )}

                {endpointInfo.length > 100 && !endpointInfo.original.startsWith("standard_") && (
                  <div className="text-amber-600 dark:text-amber-400 mt-2">
                    <p>
                      ⚠️ El endpoint es demasiado largo (más de 100 caracteres). Se está utilizando el valor
                      predeterminado.
                    </p>
                    <p className="mt-1">
                      Solución: Configura la variable de entorno NEXT_PUBLIC_APPWRITE_ENDPOINT con una URL válida como
                      "https://cloud.appwrite.io/v1"
                    </p>
                  </div>
                )}

                {endpointInfo.original !== endpointInfo.validated &&
                  endpointInfo.length <= 100 &&
                  !endpointInfo.original.startsWith("standard_") && (
                    <div className="text-amber-600 dark:text-amber-400 mt-2">
                      <p>⚠️ El endpoint original ha sido modificado durante la validación.</p>
                    </div>
                  )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {status && (
          <>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                {status.success ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Estado de la conexión</h3>
                <p className={status.success ? "text-green-600" : "text-red-600"}>{status.message}</p>
              </div>
            </div>

            {status.config && (
              <div className="space-y-3 mt-4">
                <h3 className="font-medium">Configuración</h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      {status.config.endpoint.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Endpoint de Appwrite</h4>
                      <p className="text-sm text-gray-600">Valor: {status.config.endpoint.value || "No configurado"}</p>
                      {!status.config.endpoint.isValid && (
                        <p className="text-sm text-amber-600">
                          El endpoint no es válido. Usando valor predeterminado: {status.config.endpoint.normalized}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      {status.config.projectId.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">ID del proyecto</h4>
                      <p className="text-sm text-gray-600">
                        Valor: {status.config.projectId.value || "No configurado"}
                      </p>
                      {!status.config.projectId.isValid && (
                        <p className="text-sm text-red-600">El ID del proyecto no está configurado</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500 mt-2">
              Última actualización: {new Date(status.timestamp).toLocaleString()}
            </div>
          </>
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testConnection} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Probando conexión...
            </>
          ) : (
            "Probar conexión de nuevo"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
