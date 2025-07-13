import type { Models } from "appwrite"

// Tipo para el perfil de usuario
export interface Perfil {
  nombre: string
  email: string
  ubicacion?: string
  fecha_registro: string
  avatar_url?: string
}

// Tipo para el tema
export interface Tema {
  titulo: string
  categoria: string
  contenido: string
  fecha_actualizacion: string
  usuario_id?: string
}

// Tipo para el test
export interface Test {
  titulo: string
  descripcion: string
  fecha_creacion: string
  dificultad: number
  usuario_id?: string
}

// Tipo para la pregunta
export interface Pregunta {
  test_id: string
  pregunta: string
  opciones: string[]
  respuesta_correcta: number
  explicacion: string
}

// Tipo para el mapa mental
export interface MapaMental {
  titulo: string
  contenido: string // JSON como string
  fecha_creacion: string
  fecha_actualizacion: string
  usuario_id?: string
}

// Tipo para la publicación
export interface Publicacion {
  titulo: string
  contenido: string
  fecha_creacion: string
  usuario_id: string
  usuario_nombre: string
}

// Tipo para el comentario
export interface Comentario {
  publicacion_id: string
  contenido: string
  fecha_creacion: string
  usuario_id: string
  usuario_nombre: string
}

// Tipo para el archivo
export interface Archivo {
  nombre: string
  tipo: string
  url: string
  fecha_subida: string
  usuario_id: string
  tamaño: number
}

// Tipos con ID de Appwrite
export type PerfilWithId = Perfil & Models.Document
export type TemaWithId = Tema & Models.Document
export type TestWithId = Test & Models.Document
export type PreguntaWithId = Pregunta & Models.Document
export type MapaMentalWithId = MapaMental & Models.Document
export type PublicacionWithId = Publicacion & Models.Document
export type ComentarioWithId = Comentario & Models.Document
export type ArchivoWithId = Archivo & Models.Document

// Tipo para el usuario de la aplicación (lo que se devuelve al cliente)
export interface AppUser {
  id: string
  email: string
  nombre: string
  role: "user" | "admin"
}

// Tipo para el resultado de autenticación
export interface AuthResult {
  user: Models.User<Models.Preferences>
  profile: Models.Document | null
}

