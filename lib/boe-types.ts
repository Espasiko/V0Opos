/**
 * Tipos de datos para la API del BOE
 */

// Estructura básica de un sumario del BOE
export interface BOESumario {
  metadatos: {
    publicacion: string
    fecha_publicacion: string
  }
  diario: BOEDiario[]
}

export interface BOEDiario {
  numero: string
  sumario_diario: {
    identificador: string
    url_pdf: string
    szBytes?: string
    szKBytes?: string
  }
  seccion: BOESeccion[] | BOESeccion
}

export interface BOESeccion {
  codigo: string
  nombre: string
  departamento: BOEDepartamento[] | BOEDepartamento
}

export interface BOEDepartamento {
  codigo: string
  nombre: string
  epigrafe?: BOEEpigrafe[] | BOEEpigrafe
  item?: BOEItem | BOEItem[] // Puede ser un objeto único o un array
}

export interface BOEEpigrafe {
  nombre: string
  item: BOEItem | BOEItem[] // Puede ser un objeto único o un array
}

export interface BOEItem {
  identificador: string
  control?: string
  titulo: string
  url_pdf: string
  url_html: string
  url_xml: string
  szBytes?: string
  szKBytes?: string
  pagina_inicial?: string
  pagina_final?: string
}

// Estructura para documentos procesados del BOE
export interface BOEDocumento {
  id: string
  identificador: string
  fecha_publicacion: string
  titulo: string
  texto: string
  url_pdf: string
  url_html: string
  url_xml: string
  seccion: string
  departamento: string
  departamento_codigo: string
  epigrafe?: string
  palabras_clave: string[]
  resumen?: string
  analisis?: string
  relevancia_ss?: number // Relevancia para Seguridad Social (0-100)
}

// Estructura para actualizaciones del BOE
export interface BOEActualizacion {
  id: string
  fecha: string
  titulo: string
  descripcion: string
  documentos: BOEDocumento[]
  relevancia_ss: number // Relevancia para Seguridad Social (0-100)
}

// Estructura para búsquedas en el BOE
export interface BOEBusquedaParams {
  texto?: string
  fecha_desde?: string
  fecha_hasta?: string
  departamento?: string
  seccion?: string
  relevancia_minima?: number
  limite?: number
}
