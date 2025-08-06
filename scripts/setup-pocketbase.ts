// Script para configurar las colecciones de PocketBase
// Ejecutar después de iniciar PocketBase por primera vez

const POCKETBASE_URL = "http://127.0.0.1:8090"

interface Collection {
  name: string
  type: "base" | "auth"
  schema: Array<{
    name: string
    type: string
    required?: boolean
    options?: any
  }>
}

const collections: Collection[] = [
  {
    name: "users",
    type: "auth",
    schema: [
      { name: "name", type: "text", required: true },
      { name: "ubicacion", type: "text" },
      { name: "avatar", type: "file" },
    ],
  },
  {
    name: "temas",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "categoria", type: "text", required: true },
      { name: "contenido", type: "editor", required: true },
      { name: "descripcion", type: "text" },
      { name: "orden", type: "number" },
      { name: "activo", type: "bool", required: true },
    ],
  },
  {
    name: "tests",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "descripcion", type: "text" },
      { name: "tema_id", type: "relation", options: { collectionId: "temas" } },
      { name: "usuario", type: "relation", options: { collectionId: "users" } },
      { name: "preguntas", type: "json" },
      { name: "dificultad", type: "number", required: true },
      { name: "tiempo_limite", type: "number" },
      { name: "generado_por_ia", type: "bool" },
      { name: "activo", type: "bool", required: true },
    ],
  },
  {
    name: "preguntas",
    type: "base",
    schema: [
      { name: "pregunta", type: "text", required: true },
      { name: "opciones", type: "json", required: true },
      { name: "respuesta_correcta", type: "number", required: true },
      { name: "explicacion", type: "text" },
      { name: "tema_id", type: "relation", options: { collectionId: "temas" } },
      { name: "dificultad", type: "number", required: true },
      { name: "tipo", type: "select", options: { values: ["multiple", "verdadero_falso", "completar"] } },
    ],
  },
  {
    name: "mapas_mentales",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "contenido", type: "json", required: true },
      { name: "tema_id", type: "relation", options: { collectionId: "temas" } },
      { name: "usuario", type: "relation", options: { collectionId: "users" } },
      { name: "generado_por_ia", type: "bool" },
      { name: "publico", type: "bool", required: true },
    ],
  },
  {
    name: "publicaciones",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "contenido", type: "editor", required: true },
      { name: "usuario", type: "relation", options: { collectionId: "users" } },
      { name: "categoria", type: "text", required: true },
      { name: "likes", type: "number" },
      { name: "comentarios_count", type: "number" },
      { name: "activo", type: "bool", required: true },
    ],
  },
  {
    name: "comentarios",
    type: "base",
    schema: [
      { name: "contenido", type: "text", required: true },
      { name: "usuario", type: "relation", options: { collectionId: "users" } },
      { name: "publicacion_id", type: "relation", options: { collectionId: "publicaciones" } },
      { name: "parent_id", type: "relation", options: { collectionId: "comentarios" } },
      { name: "likes", type: "number" },
    ],
  },
]

async function setupCollections() {
  console.log("🚀 Configurando colecciones de PocketBase...")

  for (const collection of collections) {
    console.log(`📁 Creando colección: ${collection.name}`)
    // Aquí iría la lógica para crear las colecciones
    // Por ahora, solo mostramos la estructura
    console.log(`   Tipo: ${collection.type}`)
    console.log(`   Campos: ${collection.schema.length}`)
  }

  console.log("✅ Configuración completada!")
  console.log("\n📋 Pasos manuales:")
  console.log("1. Ir a http://127.0.0.1:8090/_/")
  console.log("2. Crear cuenta de administrador")
  console.log("3. Crear las colecciones manualmente usando la estructura de arriba")
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  setupCollections()
}

export { collections, setupCollections }
