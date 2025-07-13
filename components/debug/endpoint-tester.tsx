"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function EndpointTester() {
  const [endpoint, setEndpoint] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testEndpoint = async () => {
    setLoading(true)
    setStatus(null)
    setError(null)

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      setStatus(`Conexión exitosa: ${response.status} ${response.statusText}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Probar Endpoint</CardTitle>
        <CardDescription>Introduce una URL para verificar su estado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint">URL</Label>
          <Input
            id="endpoint"
            type="url"
            placeholder="https://ejemplo.com/api"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </div>

        {status && (
          <Alert variant="default">
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testEndpoint} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Probando...
            </>
          ) : (
            "Probar Endpoint"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
