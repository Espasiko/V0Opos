import { Client, Account, Databases, Storage, ID, Query } from "node-appwrite"
import { validateAppwriteConfig } from "./validate-config"

// Validar configuración
const configValidation = validateAppwriteConfig()
if (!configValidation.valid) {
  console.error(`Error de configuración de Appwrite: ${configValidation.message}`)
}

// Configuración de Appwrite
const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""
const appwriteDatabaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""

// Colecciones
export const COLLECTIONS = {
  PERFILES: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  TEMAS: process.env.NEXT_PUBLIC_APPWRITE_TEMAS_COLLECTION_ID || "",
  TESTS: process.env.NEXT_PUBLIC_APPWRITE_TESTS_COLLECTION_ID || "",
  PREGUNTAS: process.env.NEXT_PUBLIC_APPWRITE_PREGUNTAS_COLLECTION_ID || "",
  MAPAS_MENTALES: process.env.NEXT_PUBLIC_APPWRITE_MAPAS_COLLECTION_ID || "",
  PUBLICACIONES: process.env.NEXT_PUBLIC_APPWRITE_PUBLICACIONES_COLLECTION_ID || "",
  COMENTARIOS: process.env.NEXT_PUBLIC_APPWRITE_COMENTARIOS_COLLECTION_ID || "",
}

// Inicializar el cliente de Appwrite
const client = new Client().setEndpoint(appwriteEndpoint).setProject(appwriteProjectId)

// Crear instancias de los servicios
const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)

// Exportar todo lo necesario
export { client, account, databases, storage, ID, Query }

// Función para obtener el ID de Appwrite
export const createId = () => {
  return ID.unique()
}

// Función para obtener la fecha actual en formato ISO
export const getCurrentDate = () => {
  return new Date().toISOString()
}

// Funciones de compatibilidad para código existente
export function createAccount() {
  return account
}

export function createDatabases() {
  return databases
}

export function createStorage() {
  return storage
}

