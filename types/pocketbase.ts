export interface PBUser {
  id: string
  email: string
  name: string
  ubicacion?: string
  avatar?: string
  created: string
  updated: string
}

export interface PBTema {
  id: string
  titulo: string
  descripcion: string
  contenido: string
  categoria: string
  nivel: "basico" | "intermedio" | "avanzado"
  tags: string[]
  created: string
  updated: string
}

export interface PBTest {
  id: string
  titulo: string
  descripcion: string
  tema_id: string
  preguntas: PBPregunta[]
  usuario: string
  generado_por_ia: boolean
  puntuacion_maxima: number
  tiempo_limite?: number
  created: string
  updated: string
  expand?: {
    usuario: PBUser
    preguntas: PBPregunta[]
  }
}

export interface PBPregunta {
  id: string
  test_id: string
  pregunta: string
  opciones: string[]
  respuesta_correcta: number
  explicacion?: string
  puntos: number
  created: string
  updated: string
}

export interface PBMapaMental {
  id: string
  titulo: string
  descripcion?: string
  contenido: any // JSON con la estructura del mapa
  tema_id: string
  usuario: string
  generado_por_ia: boolean
  publico: boolean
  created: string
  updated: string
  expand?: {
    usuario: PBUser
  }
}

export interface PBPublicacion {
  id: string
  titulo: string
  contenido: string
  tipo: "pregunta" | "discusion" | "recurso" | "noticia"
  tags: string[]
  usuario: string
  likes: number
  comentarios_count: number
  created: string
  updated: string
  expand?: {
    usuario: PBUser
  }
}

export interface PBComentario {
  id: string
  publicacion_id: string
  usuario: string
  contenido: string
  likes: number
  created: string
  updated: string
  expand?: {
    usuario: PBUser
  }
}
