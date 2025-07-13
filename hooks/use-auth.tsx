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
  ubicacion?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string, ubicacion?: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pb.authStore.isValid) {
          const currentUser = await PocketBaseApi.getCurrentUser()
          if (currentUser) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              nombre: currentUser.name,
              ubicacion: currentUser.ubicacion,
              avatar: currentUser.avatar,
            })
          }
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const unsubscribe = pb.authStore.onChange(() => {
      if (!pb.authStore.isValid) {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  const clearError = () => setError(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signIn(email, password)
      setUser({
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.name,
        ubicacion: result.user.ubicacion,
        avatar: result.user.avatar,
      })
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, nombre: string, ubicacion?: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signUp(email, password, nombre, ubicacion)
      setUser({
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.name,
        ubicacion: result.user.ubicacion,
        avatar: result.user.avatar,
      })
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

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
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
