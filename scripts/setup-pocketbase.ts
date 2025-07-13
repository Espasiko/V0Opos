// 🚀 Ejecutando configuración de PocketBase...

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"

const collections = [
  {
    name: "users",
    type: "auth",
    schema: [
      { name: "name", type: "text", required: true },
      { name: "ubicacion", type: "text", required: false },
      { name: "avatar", type: "file", required: false, options: { maxSelect: 1, maxSize: 5242880 } },
    ],
  },
  {
    name: "temas",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "descripcion", type: "text", required: false },
      { name: "contenido", type: "editor", required: true },
      { name: "categoria", type: "text", required: true },
      { name: "nivel", type: "select", required: true, options: { values: ["basico", "intermedio", "avanzado"] } },
      { name: "tags", type: "json", required: false },
    ],
  },
  {
    name: "tests",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "descripcion", type: "text", required: false },
      { name: "tema_id", type: "relation", required: false, options: { collectionId: "temas", cascadeDelete: false } },
      { name: "preguntas", type: "json", required: true },
      { name: "usuario", type: "relation", required: true, options: { collectionId: "users", cascadeDelete: true } },
      { name: "generado_por_ia", type: "bool", required: false },
      { name: "puntuacion_maxima", type: "number", required: false },
      { name: "tiempo_limite", type: "number", required: false },
    ],
  },
  {
    name: "preguntas",
    type: "base",
    schema: [
      { name: "test_id", type: "relation", required: true, options: { collectionId: "tests", cascadeDelete: true } },
      { name: "pregunta", type: "text", required: true },
      { name: "opciones", type: "json", required: true },
      { name: "respuesta_correcta", type: "number", required: true },
      { name: "explicacion", type: "text", required: false },
      { name: "puntos", type: "number", required: false },
    ],
  },
  {
    name: "mapas_mentales",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "descripcion", type: "text", required: false },
      { name: "contenido", type: "json", required: true },
      { name: "tema_id", type: "relation", required: false, options: { collectionId: "temas", cascadeDelete: false } },
      { name: "usuario", type: "relation", required: true, options: { collectionId: "users", cascadeDelete: true } },
      { name: "generado_por_ia", type: "bool", required: false },
      { name: "publico", type: "bool", required: false },
    ],
  },
  {
    name: "publicaciones",
    type: "base",
    schema: [
      { name: "titulo", type: "text", required: true },
      { name: "contenido", type: "editor", required: true },
      {
        name: "tipo",
        type: "select",
        required: true,
        options: { values: ["pregunta", "discusion", "recurso", "noticia"] },
      },
      { name: "tags", type: "json", required: false },
      { name: "usuario", type: "relation", required: true, options: { collectionId: "users", cascadeDelete: true } },
      { name: "likes", type: "number", required: false },
      { name: "comentarios_count", type: "number", required: false },
    ],
  },
  {
    name: "comentarios",
    type: "base",
    schema: [
      {
        name: "publicacion_id",
        type: "relation",
        required: true,
        options: { collectionId: "publicaciones", cascadeDelete: true },
      },
      { name: "usuario", type: "relation", required: true, options: { collectionId: "users", cascadeDelete: true } },
      { name: "contenido", type: "text", required: true },
      { name: "likes", type: "number", required: false },
    ],
  },
]

console.log("✅ Script ejecutado correctamente!")
console.log("📋 Colecciones configuradas:", collections.length)
console.log("🎯 Siguiente paso: Crear manualmente las colecciones en PocketBase Admin UI")
