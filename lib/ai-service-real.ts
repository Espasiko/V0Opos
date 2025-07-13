import type { TestGenerationParams, MapaGenerationParams, ResumenGenerationParams } from "./ai-service"

// Función para generar un test con IA
export async function generateTestWithCohere(params: TestGenerationParams) {
  try {
    console.log("Generando test con IA:", params)

    // Simulamos una respuesta de la API de IA
    const mockQuestions = [
      {
        pregunta: "¿Cuál es el campo de aplicación del Régimen General de la Seguridad Social?",
        opciones: [
          "Trabajadores por cuenta ajena",
          "Funcionarios públicos",
          "Trabajadores autónomos",
          "Todos los ciudadanos",
        ],
        respuesta_correcta: 0,
        explicacion: "El Régimen General se aplica principalmente a trabajadores por cuenta ajena.",
      },
      {
        pregunta: "¿Qué es la base de cotización?",
        opciones: [
          "La remuneración total del trabajador",
          "La parte de la remuneración sujeta a cotización",
          "El importe de la prestación por desempleo",
          "El salario mínimo interprofesional",
        ],
        respuesta_correcta: 1,
        explicacion:
          "La base de cotización es la parte de la remuneración del trabajador que se utiliza para calcular las cotizaciones a la Seguridad Social.",
      },
      {
        pregunta: "¿Cuál de las siguientes prestaciones es contributiva?",
        opciones: [
          "Ingreso Mínimo Vital",
          "Pensión de jubilación",
          "Prestación por hijo a cargo",
          "Subsidio por desempleo",
        ],
        respuesta_correcta: 1,
        explicacion:
          "La pensión de jubilación es una prestación contributiva que requiere un período mínimo de cotización.",
      },
      {
        pregunta: "¿Qué organismo gestiona las prestaciones económicas del Régimen General?",
        opciones: [
          "Instituto Nacional de la Seguridad Social (INSS)",
          "Tesorería General de la Seguridad Social (TGSS)",
          "Servicio Público de Empleo Estatal (SEPE)",
          "Instituto de Mayores y Servicios Sociales (IMSERSO)",
        ],
        respuesta_correcta: 0,
        explicacion:
          "El Instituto Nacional de la Seguridad Social (INSS) es el organismo encargado de gestionar las prestaciones económicas del Régimen General.",
      },
      {
        pregunta: "¿Cuál es el plazo para solicitar la prestación por nacimiento y cuidado de menor?",
        opciones: [
          "15 días desde el nacimiento",
          "30 días desde el nacimiento",
          "90 días desde el nacimiento",
          "180 días desde el nacimiento",
        ],
        respuesta_correcta: 2,
        explicacion:
          "El plazo para solicitar la prestación por nacimiento y cuidado de menor es de 90 días desde el nacimiento.",
      },
    ]

    const mockResponse = {
      preguntas: mockQuestions.slice(0, params.numPreguntas),
    }

    return {
      text: JSON.stringify(mockResponse),
      model: "cohere-command-xl",
      tokensUsed: 500,
    }
  } catch (error) {
    console.error("Error generando test con IA:", error)
    throw new Error("No se pudo generar el test")
  }
}

// Función para generar un mapa mental con IA
export async function generateMindMapWithHF(params: MapaGenerationParams) {
  try {
    console.log("Generando mapa mental con IA:", params)

    // Simulamos una respuesta de la API de IA
    const mockMindMap = {
      nodo_central: {
        texto: params.tema,
        hijos: [
          {
            texto: "Concepto y características",
            hijos: [{ texto: "Definición" }, { texto: "Principios básicos" }, { texto: "Marco normativo" }],
          },
          {
            texto: "Elementos principales",
            hijos: [{ texto: "Sujetos implicados" }, { texto: "Procedimientos" }, { texto: "Requisitos" }],
          },
          {
            texto: "Aplicación práctica",
            hijos: [{ texto: "Casos comunes" }, { texto: "Excepciones" }, { texto: "Jurisprudencia" }],
          },
          {
            texto: "Relación con otros temas",
            hijos: [{ texto: "Conexiones temáticas" }, { texto: "Diferencias clave" }],
          },
        ],
      },
    }

    return {
      text: JSON.stringify(mockMindMap),
      model: "huggingface-mistral-7b",
      tokensUsed: 300,
    }
  } catch (error) {
    console.error("Error generando mapa mental con IA:", error)
    throw new Error("No se pudo generar el mapa mental")
  }
}

// Función para generar un resumen con IA
export async function generateSummaryWithCohere(params: ResumenGenerationParams) {
  try {
    console.log("Generando resumen con IA:", params)

    const longitud = params.longitud || "medio"
    let resumenLength = 300

    if (longitud === "corto") resumenLength = 150
    if (longitud === "largo") resumenLength = 600

    // Simulamos una respuesta de la API de IA
    const temaLowerCase = params.tema.toLowerCase()
    let resumen = ""

    if (temaLowerCase.includes("seguridad social")) {
      resumen = `La Seguridad Social es un sistema público que garantiza la protección adecuada a los ciudadanos ante situaciones de necesidad. 
      
      El sistema español de Seguridad Social se estructura en un Régimen General y varios Regímenes Especiales. El Régimen General incluye a la mayoría de trabajadores por cuenta ajena, mientras que los Regímenes Especiales cubren a colectivos específicos como autónomos, trabajadores del mar, etc.
      
      Las prestaciones de la Seguridad Social se dividen en contributivas (requieren cotización previa) y no contributivas (destinadas a personas sin recursos suficientes). Entre las prestaciones más importantes destacan la jubilación, la incapacidad permanente, la viudedad, la orfandad, y las prestaciones por nacimiento y cuidado de menor.
      
      La gestión del sistema corresponde principalmente al Instituto Nacional de la Seguridad Social (INSS) para las prestaciones económicas, y a la Tesorería General de la Seguridad Social (TGSS) para la recaudación y gestión financiera.`
    } else if (temaLowerCase.includes("cotización")) {
      resumen = `La cotización a la Seguridad Social es el mecanismo que financia el sistema y determina el derecho a las prestaciones. 
      
      La obligación de cotizar nace desde el inicio de la actividad laboral y se mantiene durante todo el período de actividad. La base de cotización se calcula a partir de la remuneración total del trabajador, con ciertos límites mínimos y máximos establecidos anualmente.
      
      Existen diferentes tipos de cotización según la contingencia cubierta: contingencias comunes, contingencias profesionales, desempleo, FOGASA y formación profesional. Cada uno tiene un porcentaje específico que se aplica a la base de cotización.
      
      La responsabilidad del ingreso de las cuotas corresponde al empresario, que debe retener la parte correspondiente al trabajador en el momento de abonar las retribuciones.`
    } else {
      resumen = `El tema "${params.tema}" aborda aspectos fundamentales del sistema de Seguridad Social español. 
      
      Se analizan los conceptos básicos, el marco normativo aplicable y los procedimientos administrativos relacionados. Se estudian los requisitos necesarios para acceder a las diferentes prestaciones y servicios, así como los derechos y obligaciones de los ciudadanos.
      
      El contenido incluye referencias a la legislación vigente, jurisprudencia relevante y criterios administrativos de aplicación. Se destacan las recientes modificaciones normativas y su impacto en la gestión y reconocimiento de derechos.
      
      Este tema es esencial para comprender el funcionamiento del sistema de protección social y su aplicación práctica en diferentes situaciones.`
    }

    // Ajustar la longitud del resumen según el parámetro
    const parrafos = resumen.split("\n\n")
    if (longitud === "corto") {
      resumen = parrafos[0]
    } else if (longitud === "medio") {
      resumen = parrafos.slice(0, 2).join("\n\n")
    }

    return {
      text: resumen,
      model: "cohere-summarize-medium",
      tokensUsed: resumenLength,
    }
  } catch (error) {
    console.error("Error generando resumen con IA:", error)
    throw new Error("No se pudo generar el resumen")
  }
}

// Función para analizar documentos del BOE con IA
export async function analyzeBOEDocumentWithCohere(url: string, content: string) {
  try {
    console.log("Analizando documento del BOE con IA:", url)

    // Simulamos una respuesta de la API de IA
    const analisis = `## Análisis de relevancia para oposiciones de Seguridad Social

### Relevancia general
Este documento tiene una relevancia ALTA para las oposiciones de Seguridad Social. Se recomienda su estudio detallado.

### Principales cambios introducidos
- Modificación en aspectos relacionados con cotización y prestaciones
- Actualización de procedimientos administrativos
- Impacto significativo en la gestión de expedientes

### Temas del temario afectados
- Tema 12: Aspectos generales de la Seguridad Social
- Tema 18: Procedimientos administrativos
- Tema 24: Prestaciones contributivas

### Recomendaciones para opositores
- Revisar la normativa anterior relacionada
- Actualizar los esquemas de estudio
- Prestar especial atención a los cambios en terminología y procedimientos`

    return {
      text: analisis,
      model: "cohere-command-xl",
      tokensUsed: 400,
    }
  } catch (error) {
    console.error("Error analizando documento del BOE:", error)
    throw new Error("No se pudo analizar el documento")
  }
}
