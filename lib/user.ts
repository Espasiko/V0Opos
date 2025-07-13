import { account, ID } from "@/lib/auth"

export async function createUser(email: string, password: string, nombre: string, ubicacion?: string) {
  try {
    return await account.create(ID.unique(), email, password, nombre)
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}
