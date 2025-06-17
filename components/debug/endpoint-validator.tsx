"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export function EndpointValidator() {
  const [endpoint, setEndpoint] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const storedEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""
    setEndpoint(storedEndpoint)
    validateEndpoint(storedEndpoint)
  }, [])

  const validateEndpoint = (url: string) => {
    try {
      if (!url) {
        setIsValid(false)
        setMessage("El endpoint no está configurado")
        return
      }

      if (url.length > 100) {
        setIsValid(false)
        setMessage("El endpoint parece ser un token o hash, no una URL")
        return
      }

      new URL(url)
      setIsValid(true)
      setMessage("El endpoint tiene un formato válido")
    } catch (error) {
      setIsValid(false)
      setMessage("El endpoint no es una URL válida")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Validador de Endpoint</CardTitle>
        <CardDescription>Verifica si el endpoint de Appwrite es una URL válida</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Endpoint:</strong> {endpoint}
          </p>
          {isValid ? (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
