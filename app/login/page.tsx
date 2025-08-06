"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from 'lucide-react'
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("dev@oposia.com")
  const [password, setPassword] = useState("123456")
  const { login, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">OposIA - Desarrollo</CardTitle>
          <CardDescription>
            Modo desarrollo - Login automático habilitado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (mock)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña (mock)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar (Mock)"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link href="/registro" className="text-primary hover:underline">
              ¿Registro? (También mock)
            </Link>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-xs">
            <div className="font-medium text-yellow-800 mb-1">🚧 Modo Desarrollo</div>
            <div className="text-yellow-700">
              La autenticación está deshabilitada. Cualquier credencial funcionará.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
