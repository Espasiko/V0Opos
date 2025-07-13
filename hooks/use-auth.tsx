"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  nombre: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string, ubicacion?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
          // Usar una URL absoluta para evitar problemas de construcción de URL
          const apiUrl = window.location.origin + "/api/auth/me"
          console.log("Verificando autenticación en:", apiUrl)

          const response = await fetch(apiUrl, {
            credentials: "include",
            cache: "no-store",
          })

          if (!response.ok) {
            // Si la respuesta no es exitosa, no intentamos parsear JSON
            if (response.status === 401) {
              // Usuario no autenticado, esto es normal
              console.log("Usuario no autenticado (401)")
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
          console.log("Datos de usuario recibidos:", data)

          // Verificar si tenemos datos de usuario válidos
          if (data.user && data.user.id && data.user.email) {
            setUser(data.user)
            console.log("Usuario autenticado:", data.user)
          } else {
            console.error("Datos de usuario incompletos:", data)
            setUser(null)
          }
        } catch (fetchError) {
          console.error("Error al verificar autenticación:", fetchError)
          setUser(null)
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
      const apiUrl = window.location.origin + "/api/auth/login"
      console.log("Iniciando sesión en:", apiUrl)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al iniciar sesión")
      }

      const data = await response.json()
      console.log("Respuesta de login:", data)

      if (data.user) {
        setUser(data.user)
        router.push("/")
      } else {
        throw new Error("No se recibieron datos de usuario")
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
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
      const apiUrl = window.location.origin + "/api/auth/register"
      console.log("Registrando usuario en:", apiUrl)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre, ubicacion }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al registrar usuario")
      }

      const data = await response.json()
      console.log("Respuesta de registro:", data)

      if (data.user) {
        setUser(data.user)
        router.push("/")
      } else {
        throw new Error("No se recibieron datos de usuario")
      }
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario")
      console.error("Error en registro:", err)
    } finally {
      setLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true)

    try {
      const apiUrl = window.location.origin + "/api/auth/logout"
      console.log("Cerrando sesión en:", apiUrl)

      await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
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

