// Servicio de autenticación que utiliza exclusivamente las rutas de API

// Definir tipos para los usuarios
interface User {
  id: string
  email: string
  nombre: string
  role?: "user" | "admin"
}

// Servicio de autenticación
export const AuthService = {
  // Iniciar sesión
  async login(email: string, password: string): Promise<User> {
    try {
      console.log("AuthService: Intentando iniciar sesión con", email)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al iniciar sesión")
      }

      const data = await response.json()
      return data.user
    } catch (error: any) {
      console.error("AuthService: Error al iniciar sesión", error)
      throw error
    }
  },

  // Registrar usuario
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      console.log("AuthService: Intentando registrar usuario", email)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al registrar usuario")
      }

      const data = await response.json()
      return data.user
    } catch (error: any) {
      console.error("AuthService: Error al registrar usuario", error)
      throw error
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      console.log("AuthService: Intentando cerrar sesión")

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al cerrar sesión")
      }
    } catch (error: any) {
      console.error("AuthService: Error al cerrar sesión", error)
      throw error
    }
  },

  // Verificar autenticación
  async getCurrentUser(): Promise<User | null> {
    try {
      console.log("AuthService: Verificando autenticación")

      const response = await fetch("/api/auth/user", {
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          return null
        }
        throw new Error("Error al verificar autenticación")
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error("AuthService: Error al verificar autenticación", error)
      return null
    }
  },
}

