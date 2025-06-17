"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, Search, Plus, CheckCircle2, XCircle } from "lucide-react"

export function TestsContent() {
  const [activeTest, setActiveTest] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const mockTest = {
    title: "Test sobre Régimen General de la Seguridad Social",
    questions: [
      {
        question:
          "¿Cuál de las siguientes afirmaciones es correcta respecto a la inscripción de empresas en la Seguridad Social?",
        options: [
          "Es un acto administrativo por el que la Tesorería General de la Seguridad Social asigna al empresario un número para su identificación",
          "Debe realizarse con posterioridad al inicio de la actividad",
          "No es obligatoria para empresas con menos de 5 trabajadores",
          "Debe renovarse anualmente",
        ],
        correctAnswer: 0,
      },
      {
        question: "La afiliación a la Seguridad Social:",
        options: [
          "Es voluntaria para trabajadores autónomos",
          "Debe realizarse por cada nuevo contrato laboral",
          "Es única para toda la vida laboral del trabajador",
          "Solo es obligatoria para contratos superiores a 6 meses",
        ],
        correctAnswer: 2,
      },
      {
        question: "En relación con las altas de los trabajadores:",
        options: [
          "Deben comunicarse con una antelación máxima de 60 días",
          "Pueden realizarse exclusivamente de forma presencial",
          "Deben comunicarse con posterioridad al inicio de la prestación de servicios",
          "El plazo reglamentario es previo al inicio de la prestación de servicios o, en todo caso, antes de los 3 días naturales siguientes",
        ],
        correctAnswer: 3,
      },
      {
        question: "La responsabilidad empresarial por falta de afiliación o alta del trabajador:",
        options: [
          "No existe si el trabajador conocía su situación irregular",
          "Implica el pago de todas las prestaciones que pudieran corresponder al trabajador",
          "Se limita a una sanción administrativa",
          "Solo aplica en caso de accidente laboral",
        ],
        correctAnswer: 1,
      },
      {
        question: "Las bajas de los trabajadores deben comunicarse a la Seguridad Social:",
        options: [
          "En los 3 días naturales siguientes al cese",
          "En los 6 días naturales siguientes al cese",
          "En el mismo día del cese",
          "En los 10 días hábiles siguientes al cese",
        ],
        correctAnswer: 0,
      },
    ],
  }

  const startTest = (index: number) => {
    setActiveTest(index)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    Object.entries(selectedAnswers).forEach(([questionIndex, answerIndex]) => {
      if (mockTest.questions[Number.parseInt(questionIndex)].correctAnswer === answerIndex) {
        correct++
      }
    })
    return {
      correct,
      total: mockTest.questions.length,
      percentage: Math.round((correct / mockTest.questions.length) * 100),
    }
  }

  const resetTest = () => {
    setActiveTest(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tests</h1>
          <p className="text-sm text-muted-foreground">Practica con tests generados por IA y evalúa tu conocimiento</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar tests..." className="w-full pl-8" />
          </div>
          <Button className="whitespace-nowrap">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Nuevo</span>
          </Button>
        </div>
      </div>

      {activeTest === null ? (
        <Tabs defaultValue="recientes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recientes" className="text-xs sm:text-sm">
              Recientes
            </TabsTrigger>
            <TabsTrigger value="populares" className="text-xs sm:text-sm">
              Populares
            </TabsTrigger>
            <TabsTrigger value="mis-tests" className="text-xs sm:text-sm">
              Mis Tests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recientes" className="mt-4 sm:mt-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm sm:text-base">
                        {i === 0
                          ? "Régimen General de la Seguridad Social"
                          : i === 1
                            ? "Constitución y Seguridad Social"
                            : i === 2
                              ? "Procedimientos Administrativos"
                              : i === 3
                                ? "Cotización y Recaudación"
                                : i === 4
                                  ? "Prestaciones Contributivas"
                                  : "Inspección y Procedimiento Sancionador"}
                      </CardTitle>
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-xs">
                      {i === 0 ? "5 preguntas · Generado por IA" : `${5 + i} preguntas · Generado por IA`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <span>Dificultad:</span>
                      <div className="ml-2 flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 w-3 sm:w-4 rounded-full ${j < (i % 3) + 3 ? "bg-primary" : "bg-secondary"} ${j > 0 ? "ml-0.5" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 sm:pt-4">
                    <Button
                      className="w-full text-xs sm:text-sm"
                      onClick={() => startTest(i)}
                      variant={i === 0 ? "default" : "outline"}
                    >
                      {i === 0 ? "Continuar test" : "Iniciar test"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="populares" className="mt-4 sm:mt-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm sm:text-base">
                        {i === 0
                          ? "Test completo de la oposición"
                          : i === 1
                            ? "Preguntas frecuentes en exámenes"
                            : "Conceptos clave de Seguridad Social"}
                      </CardTitle>
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-xs">
                      {i === 0 ? "25 preguntas · Oficial" : `${15 + i} preguntas · Comunidad`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <span>Dificultad:</span>
                      <div className="ml-2 flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 w-3 sm:w-4 rounded-full ${j < 4 ? "bg-primary" : "bg-secondary"} ${j > 0 ? "ml-0.5" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 sm:pt-4">
                    <Button className="w-full text-xs sm:text-sm" onClick={() => startTest(i)} variant="outline">
                      Iniciar test
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="mis-tests" className="mt-4 sm:mt-6">
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
              <ClipboardList className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
              <h3 className="text-base sm:text-lg font-medium">No has creado ningún test</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6">
                Crea tests personalizados para practicar temas específicos
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear nuevo test
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {!showResults ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base sm:text-lg">{mockTest.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Pregunta {currentQuestion + 1} de {mockTest.questions.length}
                      </CardDescription>
                    </div>
                    <Progress
                      value={((currentQuestion + 1) / mockTest.questions.length) * 100}
                      className="w-full md:w-64 h-2 mt-2 md:mt-0"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="text-sm sm:text-lg font-medium">{mockTest.questions[currentQuestion].question}</div>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(currentQuestion, Number.parseInt(value))}
                  >
                    {mockTest.questions[currentQuestion].options.map((option, i) => (
                      <div key={i} className="flex items-start space-x-2 p-2 sm:p-3 rounded-md hover:bg-accent">
                        <RadioGroupItem value={i.toString()} id={`option-${i}`} />
                        <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer text-xs sm:text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    {currentQuestion < mockTest.questions.length - 1 ? "Siguiente" : "Ver resultados"}
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Resultados del test</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{mockTest.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col items-center justify-center py-4 sm:py-6">
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl sm:text-3xl font-bold">{calculateScore().percentage}%</span>
                    </div>
                    <svg className="h-24 w-24 sm:h-32 sm:w-32" viewBox="0 0 100 100">
                      <circle
                        className="text-secondary"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="10"
                        strokeDasharray={`${calculateScore().percentage * 2.51} 251.2`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-sm sm:text-lg font-medium">
                    Has acertado {calculateScore().correct} de {calculateScore().total} preguntas
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-medium">Revisión de respuestas</h3>
                  {mockTest.questions.map((question, i) => (
                    <div key={i} className="rounded-lg border p-3 sm:p-4">
                      <div className="flex items-start gap-2">
                        {selectedAnswers[i] === question.correctAnswer ? (
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5" />
                        )}
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm font-medium">{question.question}</p>
                          <div className="space-y-1 text-xs sm:text-sm">
                            {question.options.map((option, j) => (
                              <div
                                key={j}
                                className={`p-2 rounded ${
                                  j === question.correctAnswer
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : j === selectedAnswers[i] && j !== question.correctAnswer
                                      ? "bg-red-100 dark:bg-red-900/20"
                                      : ""
                                }`}
                              >
                                {option}
                                {j === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 dark:text-green-400">(Correcta)</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={resetTest} className="w-full text-xs sm:text-sm">
                  Volver a los tests
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
