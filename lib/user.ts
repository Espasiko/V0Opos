import { PocketBaseApi } from "./pocketbase-api"

// Crear un nuevo usuario
export async function createUser(email: string, password: string, name: string, ubicacion?: string) {
  try {
    return await PocketBaseApi.signUp(email, password, name, ubicacion)
  } catch (error) {
    throw error
  }
}

// Obtener perfil de usuario
export async function getUserProfile(userId: string) {
  try {
    return await PocketBaseApi.getCurrentUser()
  } catch (error) {
    throw error
  }
}

// Actualizar perfil de usuario
export async function updateUserProfile(userId: string, data: any) {
  try {
    // Implementar cuando sea necesario
    throw new Error("Función no implementada aún")
  } catch (error) {
    throw error
  }
}
