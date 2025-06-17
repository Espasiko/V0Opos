/**
 * Cliente API para comunicarse con el backend a través de las API Routes de Next.js
 */

// Tipos de datos
export interface Tema {
  id: number
  titulo: string
  categoria: string
  contenido: string
  fecha_actualizacion: string
}

export interface Pregunta {
  id: number
  pregunta: string
  opciones: string[]
  respuesta_correcta: number
  explicacion: string
  tema_id: number
}

export interface Test {
  id: number
  titulo: string
  descripcion: string
  fecha_creacion: string
  dificultad: 1 | 2 | 3 | 4 | 5
  preguntas: Pregunta[]
  usuario_id?: string
}

export interface MapaMental {
  id: number
  titulo: string
  fecha_creacion: string
  fecha_actualizacion: string
  contenido: string // JSON con la estructura del mapa
  usuario_id?: string
}

export interface Publicacion {
  id: number
  titulo: string
  contenido: string
  fecha_creacion: string
  usuario_id: string
  usuario_nombre: string
  likes: number
  comentarios: number
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  ubicacion?: string
  fecha_registro: string
  avatar_url?: string
}

export interface ActualizacionBOE {
  id: number
  titulo: string
  descripcion: string
  fecha_publicacion: string
  url: string
}

// Funciones de API

// Temas
export async function getTemas(): Promise<Tema[]> {
  try {
    const response = await fetch("/api/temas")
    if (!response.ok) throw new Error("Error al obtener temas")
    return await response.json()
  } catch (error) {
    console.error("Error en getTemas:", error)
    return []
  }
}

export async function getTema(id: number): Promise<Tema | null> {
  try {
    const response = await fetch(`/api/temas/${id}`)
    if (!response.ok) throw new Error(`Error al obtener tema ${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Error en getTema(${id}):`, error)
    return null
  }
}

export async function crearTema(tema: Omit<Tema, "id">): Promise<Tema | null> {
  try {
    const response = await fetch("/api/temas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tema),
    })

    if (!response.ok) throw new Error("Error al crear tema")
    return await response.json()
  } catch (error) {
    console.error("Error en crearTema:", error)
    return null
  }
}

export async function actualizarTema(id: number, tema: Partial<Tema>): Promise<Tema | null> {
  try {
    const response = await fetch(`/api/temas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tema),
    })

    if (!response.ok) throw new Error(`Error al actualizar tema ${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Error en actualizarTema(${id}):`, error)
    return null
  }
}

export async function eliminarTema(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/temas/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error(`Error al eliminar tema ${id}`)
    return true
  } catch (error) {
    console.error(`Error en eliminarTema(${id}):`, error)
    return false
  }
}

// Tests
export async function getTests(): Promise<Test[]> {
  try {
    const response = await fetch("/api/tests")
    if (!response.ok) throw new Error("Error al obtener tests")
    return await response.json()
  } catch (error) {
    console.error("Error en getTests:", error)
    return []
  }
}

export async function getTest(id: number): Promise<Test | null> {
  try {
    const response = await fetch(`/api/tests/${id}`)
    if (!response.ok) throw new Error(`Error al obtener test ${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Error en getTest(${id}):`, error)
    return null
  }
}

export async function generarTest(temaId: number, numPreguntas = 5): Promise<Test | null> {
  try {
    const response = await fetch("/api/tests/generar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tema_id: temaId,
        num_preguntas: numPreguntas,
      }),
    })

    if (!response.ok) throw new Error("Error al generar test")
    return await response.json()
  } catch (error) {
    console.error("Error en generarTest:", error)
    return null
  }
}

// Mapas Mentales
export async function getMapasMentales(): Promise<MapaMental[]> {
  try {
    const response = await fetch("/api/mapas")
    if (!response.ok) throw new Error("Error al obtener mapas mentales")
    return await response.json()
  } catch (error) {
    console.error("Error en getMapasMentales:", error)
    return []
  }
}

export async function getMapaMental(id: number): Promise<MapaMental | null> {
  try {
    const response = await fetch(`/api/mapas/${id}`)
    if (!response.ok) throw new Error(`Error al obtener mapa mental ${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Error en getMapaMental(${id}):`, error)
    return null
  }
}

export async function generarMapaMental(temaId: number): Promise<MapaMental | null> {
  try {
    const response = await fetch("/api/mapas/generar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tema_id: temaId,
      }),
    })

    if (!response.ok) throw new Error("Error al generar mapa mental")
    return await response.json()
  } catch (error) {
    console.error("Error en generarMapaMental:", error)
    return null
  }
}

// Comunidad
export async function getPublicaciones(): Promise<Publicacion[]> {
  try {
    const response = await fetch("/api/publicaciones")
    if (!response.ok) throw new Error("Error al obtener publicaciones")
    return await response.json()
  } catch (error) {
    console.error("Error en getPublicaciones:", error)
    return []
  }
}

// Actualizaciones BOE
export async function getActualizacionesBOE(): Promise<ActualizacionBOE[]> {
  try {
    const response = await fetch("/api/boe/actualizaciones")
    if (!response.ok) throw new Error("Error al obtener actualizaciones del BOE")
    return await response.json()
  } catch (error) {
    console.error("Error en getActualizacionesBOE:", error)
    return []
  }
}

// Resúmenes IA
export async function generarResumen(temaId: number): Promise<string | null> {
  try {
    const response = await fetch("/api/ia/resumir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tema_id: temaId,
      }),
    })

    if (!response.ok) throw new Error("Error al generar resumen")
    const data = await response.json()
    return data.resumen
  } catch (error) {
    console.error("Error en generarResumen:", error)
    return null
  }
}
