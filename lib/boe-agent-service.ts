import type { BOEDocumento, BOEActualizacion } from "./boe-types"
import { obtenerSumarioBOE, procesarItemBOE, formatearFechaYYYYMMDD } from "./boe-utils"
import { generarResumenDocumento, analizarDocumento, generarInformeActualizaciones } from "./boe-ai-service"

/**
 * Servicio de agentes encadenados para el procesamiento del BOE
 */

// Agente de Planificación: Obtiene y filtra documentos del BOE
class PlanningAgent {
  async run(fecha?: string): Promise<BOEDocumento[]> {
    try {
      // Si no se proporciona fecha, usar la fecha actual
      const fechaConsulta = fecha || formatearFechaYYYYMMDD(new Date())

      console.log(`PlanningAgent: Obteniendo sumario del BOE para la fecha ${fechaConsulta}`)

      // Obtener sumario del BOE
      const sumario = await obtenerSumarioBOE(fechaConsulta)

      if (!sumario) {
        console.error("PlanningAgent: No se pudo obtener el sumario del BOE")
        return []
      }

      console.log(`PlanningAgent: Sumario obtenido correctamente. Procesando documentos...`)

      // Array para almacenar los documentos procesados
      const documentos: BOEDocumento[] = []

      // Procesar cada diario del sumario
      for (const diario of sumario.diario) {
        // Verificar si seccion existe y no es undefined
        if (!diario.seccion) {
          console.log("PlanningAgent: No hay secciones en este diario")
          continue
        }

        // Verificar si seccion es un array o un objeto único
        const secciones = Array.isArray(diario.seccion) ? diario.seccion : [diario.seccion]

        // Procesar cada sección del diario
        for (const seccion of secciones) {
          // Verificar si departamento existe y no es undefined
          if (!seccion.departamento) {
            console.log(`PlanningAgent: No hay departamentos en la sección ${seccion.codigo}`)
            continue
          }

          // Verificar si departamento es un array o un objeto único
          const departamentos = Array.isArray(seccion.departamento) ? seccion.departamento : [seccion.departamento]

          // Procesar cada departamento de la sección
          for (const departamento of departamentos) {
            // Procesar epígrafes si existen
            if (departamento.epigrafe) {
              // Verificar si epigrafe es un array o un objeto único
              const epigrafes = Array.isArray(departamento.epigrafe) ? departamento.epigrafe : [departamento.epigrafe]

              for (const epigrafe of epigrafes) {
                // Verificar si item existe y no es undefined
                if (!epigrafe.item) {
                  console.log(`PlanningAgent: No hay items en el epígrafe ${epigrafe.nombre}`)
                  continue
                }

                // Verificar si item es un array o un objeto único
                const items = Array.isArray(epigrafe.item) ? epigrafe.item : [epigrafe.item]

                // Procesar cada item del epígrafe
                for (const item of items) {
                  const documento = await procesarItemBOE(
                    item,
                    sumario.metadatos.fecha_publicacion,
                    seccion.nombre,
                    departamento.nombre,
                    departamento.codigo,
                    epigrafe.nombre,
                  )

                  if (documento) {
                    documentos.push(documento)
                  }
                }
              }
            }

            // Procesar items directos del departamento si existen
            if (departamento.item) {
              // Verificar si item es un array o un objeto único
              const items = Array.isArray(departamento.item) ? departamento.item : [departamento.item]

              for (const item of items) {
                const documento = await procesarItemBOE(
                  item,
                  sumario.metadatos.fecha_publicacion,
                  seccion.nombre,
                  departamento.nombre,
                  departamento.codigo,
                )

                if (documento) {
                  documentos.push(documento)
                }
              }
            }
          }
        }
      }

      console.log(`PlanningAgent: Se han procesado ${documentos.length} documentos`)

      // Si no hay documentos, crear al menos uno simulado para pruebas
      if (documentos.length === 0) {
        console.log("PlanningAgent: No se encontraron documentos. Creando documento simulado para pruebas.")

        const documentoSimulado: BOEDocumento = {
          id: `boe-simulado-${Date.now()}`,
          identificador: `BOE-A-${fechaConsulta}-1`,
          fecha_publicacion: fechaConsulta,
          titulo: "Documento simulado para pruebas - No se encontraron documentos reales",
          texto: "Este es un documento simulado creado porque no se pudieron obtener documentos reales del BOE.",
          url_pdf: `https://www.boe.es/boe/dias/${fechaConsulta.substring(0, 4)}/${fechaConsulta.substring(4, 6)}/${fechaConsulta.substring(6, 8)}/pdfs/BOE-S-${fechaConsulta}.pdf`,
          url_html: `https://www.boe.es/diario_boe/xml.php?id=BOE-S-${fechaConsulta}`,
          url_xml: `https://www.boe.es/diario_boe/xml.php?id=BOE-S-${fechaConsulta}`,
          seccion: "Sección simulada",
          departamento: "Departamento simulado",
          departamento_codigo: "00",
          palabras_clave: ["simulado", "prueba", "seguridad social"],
          relevancia_ss: 50,
        }

        documentos.push(documentoSimulado)
      }

      // Ordenar documentos por relevancia (de mayor a menor)
      return documentos.sort((a, b) => (b.relevancia_ss || 0) - (a.relevancia_ss || 0))
    } catch (error) {
      console.error("Error en PlanningAgent:", error)

      // Crear un documento simulado en caso de error
      const fechaConsulta = fecha || formatearFechaYYYYMMDD(new Date())
      const documentoError: BOEDocumento = {
        id: `boe-error-${Date.now()}`,
        identificador: `BOE-ERROR-${Date.now()}`,
        fecha_publicacion: fechaConsulta,
        titulo: "Error al procesar el BOE",
        texto: `Se produjo un error al procesar el BOE: ${error}`,
        url_pdf: "#",
        url_html: "#",
        url_xml: "#",
        seccion: "Error",
        departamento: "Error",
        departamento_codigo: "00",
        palabras_clave: ["error", "procesamiento"],
        relevancia_ss: 0,
      }

      return [documentoError]
    }
  }
}

// Agente de Análisis: Analiza documentos del BOE
class AnalysisAgent {
  async run(documentos: BOEDocumento[]): Promise<BOEDocumento[]> {
    try {
      console.log(`AnalysisAgent: Analizando ${documentos.length} documentos...`)

      // Filtrar documentos con relevancia suficiente
      const documentosRelevantes = documentos.filter((doc) => doc.relevancia_ss >= 30)

      console.log(`AnalysisAgent: ${documentosRelevantes.length} documentos con relevancia suficiente`)

      // Procesar cada documento relevante
      for (let i = 0; i < documentosRelevantes.length; i++) {
        const documento = documentosRelevantes[i]

        console.log(
          `AnalysisAgent: Procesando documento ${i + 1}/${documentosRelevantes.length}: ${documento.identificador}`,
        )

        // Generar resumen
        documento.resumen = await generarResumenDocumento(documento)

        // Generar análisis para documentos de alta relevancia
        if (documento.relevancia_ss >= 50) {
          documento.analisis = await analizarDocumento(documento)
        }
      }

      console.log(`AnalysisAgent: Análisis completado`)

      return documentosRelevantes
    } catch (error) {
      console.error("Error en AnalysisAgent:", error)
      return documentos
    }
  }
}

// Agente de Resumen: Genera informes de actualizaciones
class SummaryAgent {
  async run(documentos: BOEDocumento[]): Promise<BOEActualizacion> {
    try {
      console.log(`SummaryAgent: Generando informe de actualizaciones...`)

      // Generar informe de actualizaciones
      const actualizacion = await generarInformeActualizaciones(documentos)

      console.log(`SummaryAgent: Informe generado correctamente`)

      return actualizacion
    } catch (error) {
      console.error("Error en SummaryAgent:", error)

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
}

// Flujo de trabajo de agentes encadenados
export class BOEAgentWorkflow {
  private planningAgent: PlanningAgent
  private analysisAgent: AnalysisAgent
  private summaryAgent: SummaryAgent

  constructor() {
    this.planningAgent = new PlanningAgent()
    this.analysisAgent = new AnalysisAgent()
    this.summaryAgent = new SummaryAgent()
  }

  /**
   * Ejecuta el flujo de trabajo completo
   * @param fecha Fecha opcional en formato YYYYMMDD
   * @returns Actualización generada
   */
  async run(fecha?: string): Promise<BOEActualizacion> {
    try {
      console.log("BOEAgentWorkflow: Iniciando flujo de trabajo...")

      // Paso 1: Obtener y filtrar documentos del BOE
      const documentos = await this.planningAgent.run(fecha)

      if (documentos.length === 0) {
        console.log("BOEAgentWorkflow: No se encontraron documentos")
        return {
          id: `act-empty-${Math.floor(Math.random() * 1000)}`,
          fecha: fecha || formatearFechaYYYYMMDD(new Date()),
          titulo: "Sin actualizaciones relevantes",
          descripcion: "No se encontraron actualizaciones relevantes en el BOE para esta fecha.",
          documentos: [],
          relevancia_ss: 0,
        }
      }

      // Paso 2: Analizar documentos
      const documentosAnalizados = await this.analysisAgent.run(documentos)

      // Paso 3: Generar informe de actualizaciones
      const actualizacion = await this.summaryAgent.run(documentosAnalizados)

      console.log("BOEAgentWorkflow: Flujo de trabajo completado")

      return actualizacion
    } catch (error) {
      console.error("Error en BOEAgentWorkflow:", error)

      // Devolver una actualización vacía en caso de error
      return {
        id: `act-error-${Math.floor(Math.random() * 1000)}`,
        fecha: fecha || formatearFechaYYYYMMDD(new Date()),
        titulo: "Error en el procesamiento",
        descripcion: "Se produjo un error durante el procesamiento de actualizaciones del BOE.",
        documentos: [],
        relevancia_ss: 0,
      }
    }
  }
}

// Exportar una instancia del flujo de trabajo
export const boeAgentWorkflow = new BOEAgentWorkflow()
