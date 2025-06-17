export function validateAppwriteConfig() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID",
    "NEXT_PUBLIC_APPWRITE_STORAGE_ID",
    "NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_TEMAS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_TESTS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_PREGUNTAS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_MAPAS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_PUBLICACIONES_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_COMENTARIOS_COLLECTION_ID",
  ]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar] || process.env[envVar] === "")

  if (missingEnvVars.length > 0) {
    console.warn(
      `Advertencia: Las siguientes variables de entorno no están definidas o están vacías: ${missingEnvVars.join(
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

export function validateAIConfig() {
  const requiredEnvVars = ["COHERE_API_KEY", "HF_API_KEY"]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar] || process.env[envVar] === "")

  if (missingEnvVars.length > 0) {
    console.warn(
      `Advertencia: Las siguientes variables de entorno de IA no están definidas o están vacías: ${missingEnvVars.join(
        ", ",
      )}. Algunas funcionalidades de IA pueden no estar disponibles.`,
    )
  }

  return {
    valid: missingEnvVars.length === 0,
    message:
      missingEnvVars.length > 0 ? `Faltan las siguientes variables de entorno de IA: ${missingEnvVars.join(", ")}` : "",
  }
}

export function validateConfig() {
  // Validar la configuración de Appwrite
  const isAppwriteConfigValid = validateAppwriteConfig()

  if (!isAppwriteConfigValid) {
    console.warn("La configuración de Appwrite no es válida. Algunas funcionalidades pueden no estar disponibles.")
  }

  // Validar otras configuraciones si es necesario
  const hasCohere = !!process.env.COHERE_API_KEY
  const hasHF = !!process.env.HF_API_KEY

  if (!hasCohere) {
    console.warn(
      "La clave de API de Cohere no está definida. Las funcionalidades de IA relacionadas no estarán disponibles.",
    )
  }

  if (!hasHF) {
    console.warn(
      "La clave de API de Hugging Face no está definida. Las funcionalidades de IA relacionadas no estarán disponibles.",
    )
  }

  return {
    isAppwriteConfigValid,
    hasCohere,
    hasHF,
  }
}
