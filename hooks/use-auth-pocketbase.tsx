"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { PocketBaseApi } from "@/lib/pocketbase-api"
import { pb } from "@/lib/pocketbase"

// Tipos
interface User {
  id: string
  email: string
  nombre: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string, ubicacion?: string) => Promise<void>
  logout: () => Promise<void>
}

// Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Verificar si el usuario está autenticado al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)

        // Verificar si hay una sesión válida en PocketBase
        if (pb.authStore.isValid) {
          const currentUser = await PocketBaseApi.getCurrentUser()

          if (currentUser) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              nombre: currentUser.name,
              role: "user", // Por defecto, se puede expandir más tarde
            })
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Escuchar cambios en el authStore de PocketBase
    const unsubscribe = pb.authStore.onChange(() => {
      if (!pb.authStore.isValid) {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signIn(email, password)

      setUser({
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.name,
        role: "user",
      })

      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
      console.error("Error en login:", err)
    } finally {
      setLoading(false)
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (email: string, password: string, nombre: string, ubicacion?: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signUp(email, password, nombre, ubicacion)

      setUser({
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.name,
        role: "user",
      })

      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario")
      console.error("Error en registro:", err)
    } finally {
      setLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true)

    try {
      await PocketBaseApi.signOut()
      setUser(null)
      router.push("/login")
    } catch (err) {
      console.error("Error en logout:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }

  return context
}
