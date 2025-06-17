"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeDebug() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Estado del tema</CardTitle>
        <CardDescription>Información de depuración del tema actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Tema seleccionado:</span>
            <span className="font-medium">{theme || "No definido"}</span>
          </div>
          <div className="flex justify-between">
            <span>Tema resuelto:</span>
            <span className="font-medium">{resolvedTheme || "No definido"}</span>
          </div>
          <div className="flex justify-between">
            <span>Clase HTML:</span>
            <span className="font-medium">
              {document.documentElement.classList.contains("dark") ? "dark" : "light"}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTheme("light")}
              className={theme === "light" ? "bg-primary text-primary-foreground" : ""}
            >
              <Sun className="mr-2 h-4 w-4" />
              Claro
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "bg-primary text-primary-foreground" : ""}
            >
              <Moon className="mr-2 h-4 w-4" />
              Oscuro
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
