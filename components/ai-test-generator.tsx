"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { generateTest } from "@/lib/ai-service"
import { Loader2, BrainCircuit } from "lucide-react"
import type { Test, Pregunta } from "@/lib/api"

export function AITestGenerator() {
  const [tema, setTema] = useState("")
  const [contenido, setContenido] = useState("")
  const [numPreguntas, setNumPreguntas] = useState(5)
  const [dificultad, setDificultad] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTest, setGeneratedTest] = useState<Test | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!tema || !contenido) {
      setError("Por favor, completa todos los campos requeridos")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await generateTest({
        tema,
        contenido,
        numPreguntas,
        dificultad,
      })

      // Parsear la respuesta
      const parsedData = JSON.parse(response.text)

      // Crear un objeto Test con los datos generados
      const test: Test = {
        id: Date.now(), // ID temporal
        titulo: `Test sobre ${tema}`,
        descripcion: `Test generado por IA sobre ${tema}. Dificultad: ${dificultad}/5`,
        fecha_creacion: new Date().toISOString(),
        dificultad: dificultad,
        preguntas: parsedData.preguntas as Pregunta[],
      }

      setGeneratedTest(test)
    } catch (err) {
      console.error("Error al generar el test:", err)
      setError("Ocurrió un error al generar el test. Por favor, inténtalo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            Generador de Tests con IA
          </CardTitle>
          <CardDescription>Crea tests personalizados utilizando inteligencia artificial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tema">Tema del test</Label>
            <Input
              id="tema"
              placeholder="Ej: Régimen General de la Seguridad Social"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contenido de referencia</Label>
            <Textarea
              id="contenido"
              placeholder="Pega aquí el contenido del tema o los conceptos que quieres incluir en el test..."
              className="min-h-[150px]"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="numPreguntas">Número de preguntas: {numPreguntas}</Label>
            </div>
            <Slider
              id="numPreguntas"
              min={3}
              max={20}
              step={1}
              value={[numPreguntas]}
              onValueChange={(value) => setNumPreguntas(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="dificultad">Dificultad: {dificultad}/5</Label>
            </div>
            <Slider
              id="dificultad"
              min={1}
              max={5}
              step={1}
              value={[dificultad]}
              onValueChange={(value) => setDificultad(value[0] as 1 | 2 | 3 | 4 | 5)}
            />
          </div>

          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando test...
              </>
            ) : (
              "Generar Test"
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedTest && (
        <Card>
          <CardHeader>
            <CardTitle>{generatedTest.titulo}</CardTitle>
            <CardDescription>{generatedTest.descripcion}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {generatedTest.preguntas.map((pregunta, index) => (
              <div key={index} className="space-y-3 border-b pb-4 last:border-0">
                <h3 className="font-medium">
                  {index + 1}. {pregunta.pregunta}
                </h3>
                <div className="space-y-2 ml-6">
                  {pregunta.opciones.map((opcion, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded-md ${
                        optIndex === pregunta.respuesta_correcta ? "bg-green-100 dark:bg-green-900/20" : "bg-secondary"
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                      {opcion}
                      {optIndex === pregunta.respuesta_correcta && (
                        <span className="ml-2 text-green-600 dark:text-green-400">(Correcta)</span>
                      )}
                    </div>
                  ))}
                </div>
                {pregunta.explicacion && (
                  <div className="text-sm text-muted-foreground mt-2 ml-6">
                    <span className="font-medium">Explicación:</span> {pregunta.explicacion}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Guardar Test</Button>
            <Button>Comenzar Test</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
