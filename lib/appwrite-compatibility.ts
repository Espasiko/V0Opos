import { account as originalAccount, ID } from "./appwrite-client"

// Crear un proxy para el objeto account que proporcione métodos de compatibilidad
const account = new Proxy(originalAccount, {
  get(target, prop) {
    // Si el método existe en el objeto original, devolverlo
    if (prop in target) {
      return target[prop as keyof typeof target]
    }

    // Implementar métodos de compatibilidad para versiones anteriores del SDK
    if (prop === "createEmailSession") {
      return async (email: string, password: string) => {
        console.log("Usando método de compatibilidad para createEmailSession")

        try {
          // Intentar usar el método de la versión actual si existe
          if (typeof target.createSession === "function") {
            return await target.createSession("email", email, password)
          }

          // Implementación alternativa usando la API REST
          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

          if (!endpoint || !projectId) {
            throw new Error("Configuración de Appwrite incompleta")
          }

          const response = await fetch(`${endpoint}/account/sessions/email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": projectId,
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Error al iniciar sesión")
          }

          return await response.json()
        } catch (error) {
          console.error("Error en createEmailSession:", error)
          throw error
        }
      }
    }

    if (prop === "create") {
      return async (id: string, email: string, password: string, name: string) => {
        console.log("Usando método de compatibilidad para create")

        try {
          // Intentar usar el método de la versión actual si existe
          if (typeof target.create === "function") {
            return await target.create(id, email, password, name)
          }

          // Implementación alternativa usando la API REST
          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

          if (!endpoint || !projectId) {
            throw new Error("Configuración de Appwrite incompleta")
          }

          const response = await fetch(`${endpoint}/account`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": projectId,
            },
            body: JSON.stringify({ userId: id, email, password, name }),
            credentials: "include",
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Error al crear usuario")
          }

          return await response.json()
        } catch (error) {
          console.error("Error en create:", error)
          throw error
        }
      }
    }

    if (prop === "deleteSession") {
      return async (sessionId: string) => {
        console.log("Usando método de compatibilidad para deleteSession")

        try {
          // Intentar usar el método de la versión actual si existe
          if (typeof target.deleteSession === "function") {
            return await target.deleteSession(sessionId)
          }

          // Implementación alternativa usando la API REST
          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

          if (!endpoint || !projectId) {
            throw new Error("Configuración de Appwrite incompleta")
          }

          const response = await fetch(`${endpoint}/account/sessions/${sessionId}`, {
            method: "DELETE",
            headers: {
              "X-Appwrite-Project": projectId,
            },
            credentials: "include",
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Error al cerrar sesión")
          }

          return true
        } catch (error) {
          console.error("Error en deleteSession:", error)
          throw error
        }
      }
    }

    // Si no se encuentra el método, devolver una función que lance un error
    return () => {
      throw new Error(`El método ${String(prop)} no está disponible en el objeto account`)
    }
  },
})

export { account, ID }

