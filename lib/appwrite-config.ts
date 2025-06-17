import { Client, Account, Databases, Storage } from "appwrite"

// Configuración de Appwrite
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67e11f880033f06544b0",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || "",
  // Colecciones relevantes para tu aplicación
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  temasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TEMAS_COLLECTION_ID || "",
  testsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TESTS_COLLECTION_ID || "",
  preguntasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PREGUNTAS_COLLECTION_ID || "",
  mapasCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MAPAS_COLLECTION_ID || "",
  publicacionesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PUBLICACIONES_COLLECTION_ID || "",
  comentariosCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMENTARIOS_COLLECTION_ID || "",
}

// Cliente de Appwrite
export const createAppwriteClient = () => {
  const client = new Client()
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e11f880033f06544b0")
  return client
}

// Servicios de Appwrite
export const createAccount = (client: Client) => {
  return new Account(client)
}

export const createDatabases = (client: Client) => {
  return new Databases(client)
}

export const createStorage = (client: Client) => {
  return new Storage(client)
}

// Función para validar la configuración
export const validateAppwriteConfig = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID",
  ]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    console.warn(
      `Advertencia: Las siguientes variables de entorno no están definidas: ${missingEnvVars.join(
        ", ",
      )}. Se utilizarán valores predeterminados.`,
    )
  }

  return {
    valid: missingEnvVars.length === 0,
    message:
      missingEnvVars.length > 0 ? `Faltan las siguientes variables de entorno: ${missingEnvVars.join(", ")}` : "",
  }
}
