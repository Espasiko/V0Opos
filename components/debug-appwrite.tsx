"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DebugAppwrite() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [config, setConfig] = useState<Record<string, string>>({})

  useEffect(() => {
    checkAppwriteConfig()
  }, [])

  const checkAppwriteConfig = async () => {
    try {
      setStatus("loading")

      // Verificar la configuración de Appwrite
      const response = await fetch("/api/debug/appwrite")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage("Configuración de Appwrite correcta")
        setConfig(data.config)
      } else {
        setStatus("error")
        setMessage(data.message || "Error al verificar la configuración de Appwrite")
      }
    } catch (error: any) {
      setStatus("error")
      setMessage(error.message || "Error al verificar la configuración de Appwrite")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Depuración de Appwrite</CardTitle>
        <CardDescription>Verifica la configuración de Appwrite</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" && <p>Cargando...</p>}

        {status === "success" && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {Object.keys(config).length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Configuración:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">{JSON.stringify(config, null, 2)}</pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkAppwriteConfig} disabled={status === "loading"}>
          Verificar configuración
        </Button>
      </CardFooter>
    </Card>
  )
}
