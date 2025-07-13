export interface TestGenerationParams {
  tema: string
  contenido: string
  numPreguntas: number
  dificultad: 1 | 2 | 3 | 4 | 5
}

export interface MapaGenerationParams {
  tema: string
  contenido: string
}

export interface ResumenGenerationParams {
  tema: string
  contenido: string
  longitud?: "corto" | "medio" | "largo"
}

/**
 * Servicio simulado para la generación de contenido con IA.
 * En un entorno real, estas funciones harían llamadas a APIs de IA como Cohere, OpenAI, etc.
 */

export async function generateTest(params: TestGenerationParams): Promise<{ text: string; model?: string }> {
  // Simulación de la respuesta de la API de IA para generar un test
  console.log("Generando test simulado con los parámetros:", params)

  // Generar preguntas basadas en el tema
  const mockQuestions = [
    {
      pregunta: `¿Cuál es el campo de aplicación del ${params.tema}?`,
      opciones: [
        "Trabajadores por cuenta ajena",
        "Funcionarios públicos",
        "Trabajadores autónomos",
        "Todos los ciudadanos",
      ],
      respuesta_correcta: 0,
      explicacion: `El ${params.tema} se aplica principalmente a trabajadores por cuenta ajena.`,
    },
    {
      pregunta: `¿Qué es la base de cotización en el contexto de ${params.tema}?`,
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
      pregunta: `Según ${params.tema}, ¿cuál es el plazo para comunicar las altas de los trabajadores?`,
      opciones: [
        "60 días antes del inicio de la actividad",
        "30 días después del inicio de la actividad",
        "Previo al inicio o en los 3 días naturales siguientes",
        "No existe un plazo establecido",
      ],
      respuesta_correcta: 2,
      explicacion:
        "El plazo reglamentario para comunicar las altas es previo al inicio de la prestación de servicios o, en todo caso, antes de los 3 días naturales siguientes.",
    },
    {
      pregunta: `¿Qué consecuencias tiene para el empresario la falta de afiliación o alta del trabajador según ${params.tema}?`,
      opciones: [
        "No existe responsabilidad si el trabajador conocía su situación",
        "Responsabilidad por todas las prestaciones que pudieran corresponder al trabajador",
        "Solo una sanción administrativa leve",
        "Únicamente aplica en caso de accidente laboral",
      ],
      respuesta_correcta: 1,
      explicacion:
        "La falta de afiliación o alta implica que el empresario será responsable de todas las prestaciones que pudieran corresponder al trabajador.",
    },
    {
      pregunta: `En relación con ${params.tema}, ¿cuándo deben comunicarse las bajas de los trabajadores?`,
      opciones: [
        "En los 3 días naturales siguientes al cese",
        "En los 6 días naturales siguientes al cese",
        "En el mismo día del cese",
        "En los 10 días hábiles siguientes al cese",
      ],
      respuesta_correcta: 0,
      explicacion: "Las bajas deben comunicarse en los 3 días naturales siguientes al cese en el trabajo.",
    },
  ]

  // Ajustar el número de preguntas según lo solicitado
  const adjustedQuestions = mockQuestions.slice(0, params.numPreguntas)

  // Ajustar la dificultad de las preguntas
  const adjustedQuestionsWithDifficulty = adjustedQuestions.map((q) => {
    // Para dificultades altas, hacemos las explicaciones más técnicas
    if (params.dificultad >= 4) {
      q.explicacion = `Según la normativa vigente de ${params.tema}, ${q.explicacion} Este es un concepto técnico importante para el examen.`
    }
    return q
  })

  const mockResponse = {
    preguntas: adjustedQuestionsWithDifficulty,
  }

  return {
    text: JSON.stringify(mockResponse),
    model: "simulado-v1",
  }
}

export async function generateMindMap(params: MapaGenerationParams): Promise<{ text: string; model?: string }> {
  // Simulación de la respuesta de la API de IA para generar un mapa mental
  console.log("Generando mapa mental simulado con los parámetros:", params)

  const mockMindMap = {
    nodo_central: {
      texto: params.tema,
      hijos: [
        {
          texto: "Conceptos Fundamentales",
          hijos: [{ texto: "Definición y ámbito" }, { texto: "Marco legal" }, { texto: "Principios básicos" }],
        },
        {
          texto: "Procedimientos",
          hijos: [{ texto: "Inscripción" }, { texto: "Afiliación" }, { texto: "Cotización" }],
        },
        {
          texto: "Prestaciones",
          hijos: [{ texto: "Tipos de prestaciones" }, { texto: "Requisitos" }, { texto: "Cálculo de cuantías" }],
        },
        {
          texto: "Gestión y Organización",
          hijos: [
            { texto: "Entidades gestoras" },
            { texto: "Servicios comunes" },
            { texto: "Colaboración en la gestión" },
          ],
        },
      ],
    },
  }

  // Personalizar el mapa según el contenido proporcionado
  if (params.contenido.toLowerCase().includes("cotización")) {
    mockMindMap.nodo_central.hijos.push({
      texto: "Sistema de Cotización",
      hijos: [
        { texto: "Bases de cotización" },
        { texto: "Tipos de cotización" },
        { texto: "Bonificaciones y reducciones" },
      ],
    })
  }

  if (params.contenido.toLowerCase().includes("jubilación")) {
    mockMindMap.nodo_central.hijos.push({
      texto: "Jubilación",
      hijos: [{ texto: "Modalidades" }, { texto: "Requisitos de acceso" }, { texto: "Cálculo de la pensión" }],
    })
  }

  return {
    text: JSON.stringify(mockMindMap),
    model: "simulado-v1",
  }
}

export async function generateSummary(params: ResumenGenerationParams): Promise<{ text: string; model?: string }> {
  // Simulación de la respuesta de la API de IA para generar un resumen
  console.log("Generando resumen simulado para:", params)

  const longitud = params.longitud || "medio"

  let resumen = ""

  if (longitud === "corto") {
    resumen = `Resumen breve sobre ${params.tema}:\n\n${params.tema} es un componente fundamental del sistema de Seguridad Social que establece los mecanismos de protección social para los trabajadores. Incluye aspectos clave como la afiliación, cotización y prestaciones, garantizando la cobertura ante diversas contingencias.`
  } else if (longitud === "medio") {
    resumen = `Resumen sobre ${params.tema}:\n\n${params.tema} constituye un pilar esencial del sistema de Seguridad Social, estableciendo un marco normativo para la protección de los trabajadores. Regula aspectos fundamentales como la afiliación, altas y bajas, cotización y el acceso a prestaciones.\n\nEntre sus características principales destacan la obligatoriedad de inscripción para empresarios, la afiliación única para toda la vida laboral del trabajador, y un sistema de cotización basado en bases y tipos que determinan la cuantía de las prestaciones. Las prestaciones cubren diversas contingencias como incapacidad temporal, maternidad, jubilación, entre otras.`
  } else {
    resumen = `Resumen detallado sobre ${params.tema}:\n\n${params.tema} constituye un elemento central del sistema de Seguridad Social español, estableciendo un marco normativo completo para la protección social de los trabajadores. Este régimen regula de manera exhaustiva los procedimientos de inscripción de empresas, afiliación de trabajadores, cotización y acceso a prestaciones.\n\nEn cuanto a la inscripción y afiliación, establece la obligatoriedad para los empresarios de inscribirse y afiliar a sus trabajadores, siendo la afiliación única para toda la vida laboral. Las altas deben comunicarse con carácter previo al inicio de la actividad o en los tres días naturales siguientes, mientras que las bajas deben notificarse en los tres días posteriores al cese.\n\nEl sistema de cotización se estructura en bases y tipos, donde la base de cotización se calcula a partir de la remuneración total del trabajador con ciertos límites máximos y mínimos. Los tipos varían según las contingencias cubiertas, distinguiendo entre comunes y profesionales.\n\nEn materia de prestaciones, el régimen contempla una amplia gama que incluye incapacidad temporal, maternidad, paternidad, riesgo durante el embarazo, incapacidad permanente, jubilación, muerte y supervivencia, entre otras. Cada prestación tiene sus propios requisitos de acceso, periodos de carencia y fórmulas de cálculo.\n\nLa gestión del régimen corresponde principalmente al Instituto Nacional de la Seguridad Social (INSS) para las prestaciones económicas, al Instituto Nacional de Gestión Sanitaria (INGESA) para las sanitarias, y a la Tesorería General de la Seguridad Social (TGSS) para la recaudación y gestión financiera.`
  }

  return {
    text: resumen,
    model: "simulado-v1",
  }
}

export async function classifyText(text: string): Promise<string> {
  // Simulación de la respuesta de la API de IA para clasificar texto
  console.log("Clasificando texto simulado:", text)

  if (text.toLowerCase().includes("régimen general")) {
    return "Seguridad Social - Régimen General"
  } else if (text.toLowerCase().includes("autónomo")) {
    return "Seguridad Social - Régimen Especial de Trabajadores Autónomos"
  } else if (text.toLowerCase().includes("cotización")) {
    return "Seguridad Social - Cotización"
  } else if (text.toLowerCase().includes("prestación") || text.toLowerCase().includes("pensión")) {
    return "Seguridad Social - Prestaciones"
  } else {
    return "Seguridad Social - General"
  }
}

export async function generateQuestions(text: string, numQuestions = 5): Promise<string[]> {
  // Simulación de la respuesta de la API de IA para generar preguntas
  console.log("Generando preguntas simuladas para el texto:", text, "Número de preguntas:", numQuestions)

  const baseQuestions = [
    "¿Cuáles son los principales conceptos abordados en este texto?",
    "¿Qué normativa regula los aspectos mencionados en el contenido?",
    "¿Cuáles son las implicaciones prácticas de lo expuesto en el texto?",
    "¿Cómo se relaciona este contenido con otros aspectos de la Seguridad Social?",
    "¿Qué procedimientos administrativos se mencionan en el texto?",
    "¿Cuáles son los plazos establecidos para los trámites descritos?",
    "¿Qué requisitos se establecen para acceder a las prestaciones mencionadas?",
    "¿Cómo ha evolucionado históricamente la normativa sobre este tema?",
    "¿Qué jurisprudencia relevante existe sobre los aspectos tratados?",
    "¿Qué diferencias existen entre el régimen general y los regímenes especiales en este ámbito?",
  ]

  // Personalizar algunas preguntas según el contenido
  const customQuestions = []

  if (text.toLowerCase().includes("cotización")) {
    customQuestions.push("¿Cómo se calculan las bases de cotización según el texto?")
    customQuestions.push("¿Qué tipos de cotización se aplican en los casos mencionados?")
  }

  if (text.toLowerCase().includes("prestación") || text.toLowerCase().includes("pensión")) {
    customQuestions.push("¿Cuáles son los requisitos para acceder a las prestaciones mencionadas?")
    customQuestions.push("¿Cómo se calcula la cuantía de las prestaciones según lo explicado?")
  }

  if (text.toLowerCase().includes("procedimiento")) {
    customQuestions.push("¿Qué procedimientos administrativos se describen en el texto?")
    customQuestions.push("¿Cuáles son los plazos establecidos para los trámites mencionados?")
  }

  // Combinar preguntas base y personalizadas, y limitar al número solicitado
  const allQuestions = [...customQuestions, ...baseQuestions]
  return allQuestions.slice(0, numQuestions)
}

