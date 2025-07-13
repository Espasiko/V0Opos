import { Client, Account, Databases, Storage, Teams } from "appwrite"

// Inicializar el cliente de Appwrite
const client = new Client()

// Configurar el cliente con el endpoint y el ID del proyecto
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""

client.setEndpoint(endpoint).setProject(projectId)

// Inicializar los servicios de Appwrite
const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)
const teams = new Teams(client)

// Crear un objeto ID simulado
const ID = {
  unique: () => {
    return "id_" + Math.random().toString(36).substr(2, 9)
  },
}

// Verificar que los métodos necesarios estén disponibles
const hasCreateEmailSession = typeof account.createEmailSession === "function"
const hasCreate = typeof account.create === "function"
const hasDeleteSession = typeof account.deleteSession === "function"

console.log("Appwrite SDK check:", {
  hasCreateEmailSession,
  hasCreate,
  hasDeleteSession,
  endpoint,
  projectId: projectId ? "[DEFINED]" : "[NOT DEFINED]",
})

// Exportar los servicios
export { client, account, databases, storage, teams, ID, hasCreateEmailSession, hasCreate, hasDeleteSession }

