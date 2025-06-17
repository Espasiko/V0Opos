"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function PocketBaseStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState("")

  const checkConnection = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/pocketbase/verify")
      const data = await response.json()

      if (data.success) {
        setStatus("connected")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Error de conexión con PocketBase")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Estado de PocketBase
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "connected" && <CheckCircle className="h-4 w-4 text-green-500" />}
          {status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
        </CardTitle>
        <CardDescription>Verificación de conexión con la base de datos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Badge variant={status === "connected" ? "default" : status === "error" ? "destructive" : "secondary"}>
            {status === "loading" && "Verificando..."}
            {status === "connected" && "Conectado"}
            {status === "error" && "Error"}
          </Badge>
        </div>

        <p className="text-sm text-center text-muted-foreground">{message}</p>

        <Button onClick={checkConnection} className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Verificando..." : "Verificar Conexión"}
        </Button>
      </CardContent>
    </Card>
  )
}
