import type { BOEDocumento, BOEActualizacion } from "./boe-types"

/**
 * Servicio para el análisis de documentos del BOE utilizando IA
 */

// Interfaz para las respuestas de la IA
interface AIResponse {
  text: string
  model: string
}

/**
 * Genera un resumen de un documento del BOE utilizando IA
 * @param documento Documento del BOE
 * @returns Resumen generado
 */
export async function generarResumenDocumento(documento: BOEDocumento): Promise<string> {
  try {
    // En un entorno real, aquí se haría una llamada a la API de Mistral
    // Para este ejemplo, simulamos la respuesta

    const prompt = `
      Genera un resumen conciso del siguiente documento del BOE:
      
      Título: ${documento.titulo}
      Fecha: ${documento.fecha_publicacion}
      Sección: ${documento.seccion}
      Departamento: ${documento.departamento}
      
      Contenido:
      ${documento.texto.substring(0, 1500)}...
      
      El resumen debe ser breve (máximo 3 párrafos) y destacar los aspectos más relevantes para profesionales
      que preparan oposiciones de Seguridad Social.
    `

    // Simulación de respuesta de IA
    return `Este documento publicado el ${documento.fecha_publicacion} establece nuevas directrices sobre ${documento.titulo.toLowerCase().includes("seguridad social") ? "la Seguridad Social" : "normativa que podría afectar indirectamente al ámbito de la Seguridad Social"}.

Los aspectos más relevantes incluyen cambios en ${documento.palabras_clave.slice(0, 3).join(", ")} que podrían impactar en los procedimientos administrativos relacionados con la gestión de prestaciones.

Es importante tener en cuenta estas modificaciones para la preparación de oposiciones, especialmente en los temas relacionados con ${documento.departamento}.`
  } catch (error) {
    console.error("Error al generar resumen:", error)
    return "No se pudo generar un resumen para este documento."
  }
}

/**
 * Analiza un documento del BOE para determinar su relevancia e impacto
 * @param documento Documento del BOE
 * @returns Análisis generado
 */
export async function analizarDocumento(documento: BOEDocumento): Promise<string> {
  try {
    // En un entorno real, aquí se haría una llamada a la API de Mistral
    // Para este ejemplo, simulamos la respuesta

    const prompt = `
      Analiza el siguiente documento del BOE desde la perspectiva de su relevancia para las oposiciones de Seguridad Social:
      
      Título: ${documento.titulo}
      Fecha: ${documento.fecha_publicacion}
      Sección: ${documento.seccion}
      Departamento: ${documento.departamento}
      Palabras clave: ${documento.palabras_clave.join(", ")}
      
      Contenido:
      ${documento.texto.substring(0, 2000)}...
      
      Proporciona un análisis detallado que incluya:
      1. Relevancia para las oposiciones de Seguridad Social
      2. Principales cambios o novedades introducidas
      3. Temas del temario que podrían verse afectados
      4. Recomendaciones para los opositores
    `

    // Simulación de respuesta de IA
    return `## Análisis de relevancia para oposiciones de Seguridad Social

### Relevancia general
Este documento tiene una relevancia ${documento.relevancia_ss > 70 ? "ALTA" : documento.relevancia_ss > 40 ? "MEDIA" : "BAJA"} para las oposiciones de Seguridad Social. ${documento.relevancia_ss > 60 ? "Se recomienda su estudio detallado." : "Conviene conocer sus aspectos generales."}

### Principales cambios introducidos
- Modificación en aspectos relacionados con ${documento.palabras_clave.slice(0, 2).join(" y ")}
- Actualización de procedimientos administrativos
- Posible impacto en la gestión de expedientes

### Temas del temario afectados
- Tema ${Math.floor(Math.random() * 30) + 1}: Aspectos generales de la Seguridad Social
- Tema ${Math.floor(Math.random() * 30) + 1}: Procedimientos administrativos
${documento.relevancia_ss > 50 ? `- Tema ${Math.floor(Math.random() * 30) + 1}: Prestaciones contributivas` : ""}

### Recomendaciones para opositores
- Revisar la normativa anterior relacionada
- Actualizar los esquemas de estudio
- Prestar atención a los cambios en terminología y procedimientos`
  } catch (error) {
    console.error("Error al analizar documento:", error)
    return "No se pudo generar un análisis para este documento."
  }
}

/**
 * Genera un informe de actualizaciones del BOE
 * @param documentos Lista de documentos del BOE
 * @returns Actualización generada
 */
export async function generarInformeActualizaciones(documentos: BOEDocumento[]): Promise<BOEActualizacion> {
  try {
    // Filtrar documentos por relevancia
    const documentosRelevantes = documentos.filter((doc) => doc.relevancia_ss >= 30)

    // Calcular relevancia promedio
    const relevanciaPromedio =
      documentosRelevantes.length > 0
        ? Math.round(
            documentosRelevantes.reduce((sum, doc) => sum + doc.relevancia_ss, 0) / documentosRelevantes.length,
          )
        : 0

    // Obtener fecha del primer documento
    const fecha =
      documentosRelevantes.length > 0
        ? documentosRelevantes[0].fecha_publicacion
        : new Date().toISOString().split("T")[0]

    // Generar título
    const titulo = `Actualizaciones BOE - ${fecha}`

    // Generar descripción
    const descripcion = `Informe de actualizaciones del BOE con relevancia para oposiciones de Seguridad Social. Incluye ${documentosRelevantes.length} documentos con una relevancia media de ${relevanciaPromedio}/100.`

    // Crear actualización
    const actualizacion: BOEActualizacion = {
      id: `act-${fecha}-${Math.floor(Math.random() * 1000)}`,
      fecha,
      titulo,
      descripcion,
      documentos: documentosRelevantes,
      relevancia_ss: relevanciaPromedio,
    }

    return actualizacion
  } catch (error) {
    console.error("Error al generar informe de actualizaciones:", error)

    // Devolver una actualización vacía en caso de error
    return {
      id: `act-error-${Math.floor(Math.random() * 1000)}`,
      fecha: new Date().toISOString().split("T")[0],
      titulo: "Error al generar actualizaciones",
      descripcion: "No se pudo generar el informe de actualizaciones del BOE.",
      documentos: [],
      relevancia_ss: 0,
    }
  }
}

