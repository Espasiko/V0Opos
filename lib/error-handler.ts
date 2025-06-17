/**
 * Clase personalizada para errores de la aplicación
 */
export class AppError extends Error {
  statusCode: number
  code?: string

  constructor(message: string, statusCode = 500, code?: string) {
    super(message)
    this.name = "AppError"
    this.statusCode = statusCode
    this.code = code
  }
}

/**
 * Errores específicos de autenticación
 */
export class AuthError extends AppError {
  constructor(message: string, code?: string) {
    super(message, 401, code)
    this.name = "AuthError"
  }
}

/**
 * Errores de validación
 */
export class ValidationError extends AppError {
  errors?: Record<string, string>

  constructor(message: string, errors?: Record<string, string>) {
    super(message, 400, "VALIDATION_ERROR")
    this.name = "ValidationError"
    this.errors = errors
  }
}

/**
 * Función para manejar errores de Appwrite y convertirlos en errores de la aplicación
 */
export function handleAppwriteError(error: any): AppError {
  console.error("Error de Appwrite:", error)

  // Errores de autenticación
  if (error?.code === 401 || error?.code === 403) {
    return new AuthError(error.message || "No tienes permiso para realizar esta acción", error.code?.toString())
  }

  // Errores de validación
  if (error?.code === 400) {
    return new ValidationError(error.message || "Datos de entrada inválidos")
  }

  // Error general
  return new AppError(error.message || "Ha ocurrido un error inesperado", error.code || 500)
}

/**
 * Función para registrar errores en la consola con información adicional
 */
export function logError(error: any, context?: Record<string, any>) {
  console.error("Error:", {
    message: error.message,
    name: error.name,
    stack: error.stack,
    code: error.code,
    statusCode: error.statusCode,
    context,
  })
}
