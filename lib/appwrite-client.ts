import { Client, Account, Databases, Storage, Teams } from "appwrite"

// Inicializar el cliente de Appwrite con una configuración más robusta
const getClient = () => {
  const client = new Client()

  try {
    // Use hardcoded values instead of environment variables
    client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e11f880033f06544b0")
    return client
  } catch (error) {
    console.error("Error initializing Appwrite client:", error)
    // Return a client with default values to avoid initialization errors
    return client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e11f880033f06544b0")
  }
}

// Crear una instancia del cliente
const client = getClient()

// Inicializar los servicios de Appwrite con manejo de errores
let account: Account
let databases: Databases
let storage: Storage
let teams: Teams

try {
  account = new Account(client)
  databases = new Databases(client)
  storage = new Storage(client)
  teams = new Teams(client)

  // Verificar que los objetos tengan los métodos esperados
  if (!account || typeof account.createEmailSession !== "function") {
    console.error("Appwrite: El método createEmailSession no está disponible en el objeto account")
  }

  console.log("Appwrite: Servicios inicializados correctamente")
} catch (error) {
  console.error("Error al inicializar los servicios de Appwrite:", error)

  // Crear instancias vacías para evitar errores de null/undefined
  account = new Account(client)
  databases = new Databases(client)
  storage = new Storage(client)
  teams = new Teams(client)
}

// Exportar un objeto ID simulado si es necesario
const ID = {
  unique: () => {
    return "id_" + Math.random().toString(36).substr(2, 9)
  },
}

export { client, account, databases, storage, teams, ID }
