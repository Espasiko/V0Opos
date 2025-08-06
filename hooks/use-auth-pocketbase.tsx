"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { PocketBaseApi } from "@/lib/pocketbase-api"
import { pb } from "@/lib/pocketbase"

interface User {
  id: string
  email: string
  name: string
  ubicacion?: string
  avatar?: string
  created: string
  updated: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, ubicacion?: string) => Promise<void>
  signOut: () => Promise<void>
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
            setUser(currentUser)
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

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signIn(email, password)
      setUser(result.user)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string, ubicacion?: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await PocketBaseApi.signUp(email, password, name, ubicacion)
      setUser(result.user)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
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
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthPocketBase() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthPocketBase debe ser usado dentro de un AuthProvider")
  }
  return context
}
