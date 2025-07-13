import { Client, Databases, ID } from "appwrite"

// Configuración de Appwrite
const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""
const appwriteDatabaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""

// Colecciones
const COLLECTIONS = {
  PERFILES: "perfiles",
  TEMAS: "temas",
  TESTS: "tests",
  PREGUNTAS: "preguntas",
  MAPAS_MENTALES: "mapas_mentales",
  PUBLICACIONES: "publicaciones",
  COMENTARIOS: "comentarios",
  ARCHIVOS: "archivos",
}

async function setupAppwrite() {
  try {
    // Inicializar cliente
    const client = new Client()
    client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId)

    // Inicializar servicio de bases de datos
    const databases = new Databases(client)

    // Crear colecciones
    console.log("Configurando colecciones en Appwrite...")

    // 1. Colección de perfiles
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.PERFILES, [
        { name: "nombre", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "ubicacion", type: "string", required: false },
        { name: "fecha_registro", type: "string", required: true },
        { name: "avatar_url", type: "string", required: false },
      ])
      console.log("✅ Colección de perfiles creada")
    } catch (error) {
      console.error("❌ Error al crear colección de perfiles:", error)
    }

    // 2. Colección de temas
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.TEMAS, [
        { name: "titulo", type: "string", required: true },
        { name: "categoria", type: "string", required: true },
        { name: "contenido", type: "string", required: true },
        { name: "fecha_actualizacion", type: "string", required: true },
        { name: "usuario_id", type: "string", required: false },
      ])
      console.log("✅ Colección de temas creada")
    } catch (error) {
      console.error("❌ Error al crear colección de temas:", error)
    }

    // 3. Colección de tests
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.TESTS, [
        { name: "titulo", type: "string", required: true },
        { name: "descripcion", type: "string", required: true },
        { name: "fecha_creacion", type: "string", required: true },
        { name: "dificultad", type: "integer", required: true },
        { name: "usuario_id", type: "string", required: false },
      ])
      console.log("✅ Colección de tests creada")
    } catch (error) {
      console.error("❌ Error al crear colección de tests:", error)
    }

    // 4. Colección de preguntas
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.PREGUNTAS, [
        { name: "test_id", type: "string", required: true },
        { name: "pregunta", type: "string", required: true },
        { name: "opciones", type: "string[]", required: true },
        { name: "respuesta_correcta", type: "integer", required: true },
        { name: "explicacion", type: "string", required: true },
      ])
      console.log("✅ Colección de preguntas creada")
    } catch (error) {
      console.error("❌ Error al crear colección de preguntas:", error)
    }

    // 5. Colección de mapas mentales
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.MAPAS_MENTALES, [
        { name: "titulo", type: "string", required: true },
        { name: "contenido", type: "string", required: true }, // JSON como string
        { name: "fecha_creacion", type: "string", required: true },
        { name: "fecha_actualizacion", type: "string", required: true },
        { name: "usuario_id", type: "string", required: false },
      ])
      console.log("✅ Colección de mapas mentales creada")
    } catch (error) {
      console.error("❌ Error al crear colección de mapas mentales:", error)
    }

    // 6. Colección de publicaciones
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.PUBLICACIONES, [
        { name: "titulo", type: "string", required: true },
        { name: "contenido", type: "string", required: true },
        { name: "fecha_creacion", type: "string", required: true },
        { name: "usuario_id", type: "string", required: true },
        { name: "usuario_nombre", type: "string", required: true },
      ])
      console.log("✅ Colección de publicaciones creada")
    } catch (error) {
      console.error("❌ Error al crear colección de publicaciones:", error)
    }

    // 7. Colección de comentarios
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.COMENTARIOS, [
        { name: "publicacion_id", type: "string", required: true },
        { name: "contenido", type: "string", required: true },
        { name: "fecha_creacion", type: "string", required: true },
        { name: "usuario_id", type: "string", required: true },
        { name: "usuario_nombre", type: "string", required: true },
      ])
      console.log("✅ Colección de comentarios creada")
    } catch (error) {
      console.error("❌ Error al crear colección de comentarios:", error)
    }

    // 8. Colección de archivos
    try {
      await databases.createCollection(appwriteDatabaseId, ID.unique(), COLLECTIONS.ARCHIVOS, [
        { name: "nombre", type: "string", required: true },
        { name: "tipo", type: "string", required: true },
        { name: "url", type: "string", required: true },
        { name: "fecha_subida", type: "string", required: true },
        { name: "usuario_id", type: "string", required: true },
        { name: "tamaño", type: "integer", required: true },
      ])
      console.log("✅ Colección de archivos creada")
    } catch (error) {
      console.error("❌ Error al crear colección de archivos:", error)
    }

    console.log("✅ Configuración de Appwrite completada")
  } catch (error) {
    console.error("❌ Error general al configurar Appwrite:", error)
  }
}

// Ejecutar script
setupAppwrite()

