"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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

        try {
          const response = await fetch("/api/auth/me")

          if (!response.ok) {
            // Si la respuesta no es exitosa, no intentamos parsear JSON
            if (response.status === 401) {
              // Usuario no autenticado, esto es normal
              setUser(null)
              return
            }

            // Para otros errores, registramos el problema
            console.error("Error de autenticación:", response.status, response.statusText)
            setUser(null)
            return
          }

          // Solo intentamos parsear JSON si la respuesta es exitosa
          const data = await response.json()
          setUser(data.user)
        } catch (fetchError) {
          console.error("Error al verificar autenticación:", fetchError)
          setUser(null)
          // No establecemos error aquí para no mostrar mensajes de error al usuario
          // durante la carga inicial
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al iniciar sesión")
      }

      const data = await response.json()
      setUser(data.user)
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre, ubicacion }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al registrar usuario")
      }

      const data = await response.json()
      setUser(data.user)
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
      await fetch("/api/auth/logout", {
        method: "POST",
      })

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

