"use client"

import { useState } from "react"
import { PocketBaseApi } from "@/lib/pocketbase-api"
import { pb } from "@/lib/pocketbase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react'

interface DiagnosticResult {
  name: string
  status: 'success' | 'error' | 'pending'
  message: string
  details?: any
}

export default function DiagnosticoPocketBase() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const diagnostics: DiagnosticResult[] = []

    // 1. Verificar variables de entorno
    diagnostics.push({
      name: "Variables de Entorno",
      status: process.env.NEXT_PUBLIC_POCKETBASE_URL ? 'success' : 'error',
      message: process.env.NEXT_PUBLIC_POCKETBASE_URL 
        ? `URL configurada: ${process.env.NEXT_PUBLIC_POCKETBASE_URL}`
        : "NEXT_PUBLIC_POCKETBASE_URL no está configurada",
      details: {
        url: process.env.NEXT_PUBLIC_POCKETBASE_URL || "No configurada"
      }
    })

    setResults([...diagnostics])

    // 2. Verificar conexión básica
    try {
      const connectionResult = await PocketBaseApi.verifyConnection()
      diagnostics.push({
        name: "Conexión con PocketBase",
        status: connectionResult.success ? 'success' : 'error',
        message: connectionResult.message,
        details: connectionResult
      })
    } catch (error) {
      diagnostics.push({
        name: "Conexión con PocketBase",
        status: 'error',
        message: `Error: ${error}`,
        details: error
      })
    }

    setResults([...diagnostics])

    // 3. Verificar colecciones
    try {
      const collections = await pb.collections.getFullList()
      const requiredCollections = ['users', 'temas', 'tests', 'preguntas', 'mapas_mentales', 'publicaciones', 'comentarios']
      const existingCollections = collections.map(c => c.name)
      const missingCollections = requiredCollections.filter(c => !existingCollections.includes(c))

      diagnostics.push({
        name: "Colecciones de Base de Datos",
        status: missingCollections.length === 0 ? 'success' : 'error',
        message: missingCollections.length === 0 
          ? "Todas las colecciones necesarias están presentes"
          : `Faltan colecciones: ${missingCollections.join(', ')}`,
        details: {
          existing: existingCollections,
          missing: missingCollections,
          required: requiredCollections
        }
      })
    } catch (error) {
      diagnostics.push({
        name: "Colecciones de Base de Datos",
        status: 'error',
        message: `Error verificando colecciones: ${error}`,
        details: error
      })
    }

    setResults([...diagnostics])

    // 4. Verificar autenticación
    try {
      const authStatus = pb.authStore.isValid
      diagnostics.push({
        name: "Estado de Autenticación",
        status: 'success',
        message: authStatus ? "Usuario autenticado" : "No hay usuario autenticado",
        details: {
          isValid: authStatus,
          user: pb.authStore.model,
          token: !!pb.authStore.token
        }
      })
    } catch (error) {
      diagnostics.push({
        name: "Estado de Autenticación",
        status: 'error',
        message: `Error verificando autenticación: ${error}`,
        details: error
      })
    }

    setResults([...diagnostics])

    // 5. Intentar crear usuario de prueba
    try {
      const testUser = await PocketBaseApi.createTestUser()
      diagnostics.push({
        name: "Creación de Usuario de Prueba",
        status: 'success',
        message: "Usuario de prueba creado/verificado exitosamente",
        details: testUser
      })
    } catch (error) {
      diagnostics.push({
        name: "Creación de Usuario de Prueba",
        status: 'error',
        message: `Error creando usuario de prueba: ${error}`,
        details: error
      })
    }

    setResults([...diagnostics])
    setIsRunning(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Diagnóstico de PocketBase
          </CardTitle>
          <CardDescription>
            Verifica el estado de la conexión y configuración de PocketBase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ejecutando diagnóstico...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Ejecutar Diagnóstico
                </>
              )}
            </Button>

            {results.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Resultados del Diagnóstico:</h3>
                {results.map((result, index) => (
                  <Alert key={index} variant={result.status === 'error' ? 'destructive' : 'default'}>
                    <div className="flex items-start gap-3">
                      {result.status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : result.status === 'error' ? (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{result.name}</span>
                          <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                            {result.status}
                          </Badge>
                        </div>
                        <AlertDescription>
                          {result.message}
                          {result.details && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-sm text-muted-foreground">
                                Ver detalles
                              </summary>
                              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                {JSON.stringify(result.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Instrucciones de configuración:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                <li>Descargar PocketBase desde: https://pocketbase.io/docs/</li>
                <li>Ejecutar: <code className="bg-blue-100 px-1 rounded">./pocketbase serve</code></li>
                <li>Ir a: http://127.0.0.1:8090/_/ para configurar</li>
                <li>Crear las colecciones necesarias usando el script de setup</li>
                <li>Configurar CORS para permitir localhost:3000</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
