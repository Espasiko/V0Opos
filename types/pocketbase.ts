// Tipos base de PocketBase
export interface BaseRecord {
  id: string
  created: string
  updated: string
}

// Usuario
export interface PBUser extends BaseRecord {
  email: string
  name: string
  username?: string
  avatar?: string
  ubicacion?: string
  verified: boolean
}

// Tema de estudio
export interface PBTema extends BaseRecord {
  titulo: string
  categoria: string
  contenido: string
  descripcion?: string
  orden?: number
  activo: boolean
}

// Test/Examen
export interface PBTest extends BaseRecord {
  titulo: string
  descripcion: string
  tema_id: string
  usuario: string
  preguntas: string[] // Array de IDs de preguntas
  dificultad: number // 1-5
  tiempo_limite?: number // en minutos
  generado_por_ia: boolean
  activo: boolean
}

// Pregunta
export interface PBPregunta extends BaseRecord {
  pregunta: string
  opciones: string[] // Array de opciones
  respuesta_correcta: number // Índice de la respuesta correcta
  explicacion: string
  tema_id: string
  dificultad: number
  tipo: "multiple" | "verdadero_falso" | "completar"
}

// Mapa Mental
export interface PBMapaMental extends BaseRecord {
  titulo: string
  contenido: object // JSON con la estructura del mapa
  tema_id: string
  usuario: string
  generado_por_ia: boolean
  publico: boolean
}

// Publicación del foro
export interface PBPublicacion extends BaseRecord {
  titulo: string
  contenido: string
  usuario: string
  categoria: string
  likes: number
  comentarios_count: number
  activo: boolean
}

// Comentario
export interface PBComentario extends BaseRecord {
  contenido: string
  usuario: string
  publicacion_id: string
  parent_id?: string // Para respuestas anidadas
  likes: number
}

// Respuesta de IA
export interface IAResponse {
  success: boolean
  data?: any
  error?: string
  model?: string
  tokens_used?: number
}

// Configuración de IA
export interface IAConfig {
  model: string
  temperature: number
  max_tokens: number
  provider: "cohere" | "huggingface" | "openai"
}
