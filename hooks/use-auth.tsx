"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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

// Usuario mock para desarrollo
const MOCK_USER: User = {
  id: "dev-user-123",
  email: "dev@oposia.com",
  nombre: "Usuario Desarrollo",
  ubicacion: "Madrid",
  avatar: ""
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Siempre establecer el usuario mock
    setUser(MOCK_USER)
    setLoading(false)
  }, [])

  const clearError = () => setError(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    // Simular login exitoso
    setTimeout(() => {
      setUser(MOCK_USER)
      setLoading(false)
      router.push("/")
    }, 500)
  }

  const register = async (email: string, password: string, nombre: string, ubicacion?: string) => {
    setLoading(true)
    setError(null)
    
    // Simular registro exitoso
    setTimeout(() => {
      setUser({
        ...MOCK_USER,
        email,
        nombre,
        ubicacion
      })
      setLoading(false)
      router.push("/")
    }, 500)
  }

  const logout = async () => {
    setLoading(true)
    // No hacer logout real, mantener usuario
    setTimeout(() => {
      setLoading(false)
      router.push("/")
    }, 200)
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
