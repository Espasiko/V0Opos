import { createAccount, createDatabases, COLLECTIONS, getCurrentDate } from "./appwrite"
import { ID, Query } from "appwrite"
import type { Perfil } from "@/types/appwrite"

export async function signUp(email: string, password: string, nombre: string, ubicacion?: string) {
  try {
    const account = createAccount()
    const databases = createDatabases()

    // Registrar usuario en Appwrite Auth
    const user = await account.create(ID.unique(), email, password, nombre)

    if (user) {
      // Crear perfil en la colección perfiles
      const perfil: Perfil = {
        nombre,
        email,
        ubicacion: ubicacion || "",
        fecha_registro: getCurrentDate(),
      }

      const createdProfile = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        COLLECTIONS.PERFILES,
        user.$id,
        perfil,
      )

      return {
        user,
        profile: createdProfile,
      }
    }

    return null
  } catch (error) {
    console.error("Error en signUp:", error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const account = createAccount()
    const databases = createDatabases()

    // Iniciar sesión en Appwrite Auth
    const session = await account.createEmailSession(email, password)

    // Obtener usuario actual
    const user = await account.get()

    // Obtener datos del perfil
    const profile = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTIONS.PERFILES, [
      Query.equal("$id", user.$id),
    ])

    if (profile.documents.length > 0) {
      return {
        user,
        profile: profile.documents[0],
      }
    }

    return { user, profile: null }
  } catch (error) {
    console.error("Error en signIn:", error)
    throw error
  }
}

export async function signOut() {
  try {
    const account = createAccount()

    // Cerrar todas las sesiones
    await account.deleteSessions()

    return true
  } catch (error) {
    console.error("Error en signOut:", error)
    throw error
  }
}

export async function getSession() {
  try {
    const account = createAccount()

    // Obtener sesión actual
    const session = await account.getSession("current")

    return session
  } catch (error) {
    console.error("Error en getSession:", error)
    return null
  }
}

export async function getCurrentUser() {
  try {
    const account = createAccount()
    const databases = createDatabases()

    // Obtener usuario actual
    const user = await account.get()

    if (!user || !user.$id) {
      return null
    }

    try {
      // Obtener datos del perfil
      const profile = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        COLLECTIONS.PERFILES,
        [Query.equal("$id", user.$id)],
      )

      if (profile.documents.length > 0) {
        return {
          user,
          profile: profile.documents[0],
        }
      }

      return { user, profile: null }
    } catch (profileError) {
      console.error("Error al obtener perfil:", profileError)
      // Si hay un error al obtener el perfil, devolvemos solo el usuario
      return { user, profile: null }
    }
  } catch (error) {
    console.error("Error en getCurrentUser:", error)
    return null
  }
}
