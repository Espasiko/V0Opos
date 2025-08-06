"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { PocketBaseApi } from "@/lib/pocketbase-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2, Settings } from 'lucide-react'
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<{
    checked: boolean
    success: boolean
    message: string
    url?: string
  }>({ checked: false, success: false, message: "" })
  const [isCreatingTestUser, setIsCreatingTestUser] = useState(false)
  
  const { login, loading, error, clearError, checkConnection } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!email || !password) {
      return
    }

    await login(email, password)
  }

  const handleCheckConnection = async () => {
    console.log("Verificando conexión desde el formulario...")
    const result = await checkConnection()
    console.log("Resultado de verificación:", result)
    setConnectionStatus({
      checked: true,
      success: result.success,
      message: result.message,
      url: result.url
    })
  }

  const handleCreateTestUser = async () => {
    setIsCreatingTestUser(true)
    try {
      const testUser = await PocketBaseApi.createTestUser()
      setEmail(testUser.email)
      setPassword(testUser.password)
      alert(`Usuario de prueba creado/encontrado:\nEmail: ${testUser.email}\nPassword: ${testUser.password}`)
    } catch (error) {
      alert(`Error creando usuario de prueba: ${error}`)
    } finally {
      setIsCreatingTestUser(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingresa con tu cuenta de OposIA</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Error de autenticación:</div>
                  <div className="text-sm">{error}</div>
                  {error.includes("conexión") && (
                    <div className="mt-3 space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCheckConnection}
                        className="w-full"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Diagnosticar Conexión
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {connectionStatus.checked && (
              <Alert variant={connectionStatus.success ? "default" : "destructive"}>
                {connectionStatus.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  <div className="font-medium mb-1">Estado de PocketBase:</div>
                  <div className="text-sm mb-2">{connectionStatus.message}</div>
                  {connectionStatus.url && (
                    <div className="text-xs text-muted-foreground mb-2">
                      URL: {connectionStatus.url}
                    </div>
                  )}
                  {!connectionStatus.success && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      <div className="font-medium mb-1">Pasos para solucionar:</div>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Descargar PocketBase desde: https://pocketbase.io/docs/</li>
                        <li>Ejecutar en terminal: <code className="bg-gray-200 px-1 rounded">./pocketbase serve</code></li>
                        <li>Verificar que esté en: <code className="bg-gray-200 px-1 rounded">{connectionStatus.url}</code></li>
                        <li>Crear las colecciones necesarias en el admin panel</li>
                      </ol>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes cuenta? </span>
            <Link href="/registro" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCheckConnection}
              className="w-full text-xs"
            >
              <Settings className="mr-2 h-3 w-3" />
              Verificar Estado de PocketBase
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCreateTestUser}
              disabled={isCreatingTestUser}
              className="w-full text-xs"
            >
              {isCreatingTestUser ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Creando usuario de prueba...
                </>
              ) : (
                "Crear Usuario de Prueba"
              )}
            </Button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs">
            <div className="font-medium text-blue-800 mb-1">💡 Información de desarrollo:</div>
            <div className="text-blue-700">
              Si es tu primera vez, usa "Crear Usuario de Prueba" para generar credenciales de prueba automáticamente.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
