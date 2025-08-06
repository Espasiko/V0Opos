"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Code } from 'lucide-react'
import Link from "next/link"

export function UserNav() {
  const { user, logout, loading } = useAuth()

  // En modo desarrollo, siempre mostrar usuario
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full text-xs text-yellow-800">
          <Code className="h-3 w-3" />
          Modo Dev
        </div>
      </div>
    )
  }

  // Obtener iniciales del nombre para el avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-2 py-1 bg-yellow-100 rounded-full text-xs text-yellow-800">
        <Code className="h-3 w-3" />
        Dev
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.nombre} />
              <AvatarFallback>{getInitials(user.nombre)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.nombre}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              {user.ubicacion && <p className="text-xs leading-none text-muted-foreground">📍 {user.ubicacion}</p>}
              <p className="text-xs leading-none text-yellow-600">🚧 Modo Desarrollo</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/perfil" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil (Mock)</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/perfil/configuracion" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración (Mock)</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer" disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{loading ? "Cerrando..." : "Cerrar sesión (Mock)"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
