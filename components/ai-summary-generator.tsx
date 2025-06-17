"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { generateSummary } from "@/lib/ai-service"
import { Loader2, FileText } from "lucide-react"

export function AISummaryGenerator() {
  const [tema, setTema] = useState("")
  const [contenido, setContenido] = useState("")
  const [longitud, setLongitud] = useState<"corto" | "medio" | "largo">("medio")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!tema || !contenido) {
      setError("Por favor, completa todos los campos requeridos")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await generateSummary({
        tema,
        contenido,
        longitud,
      })

      setGeneratedSummary(response.text)
    } catch (err) {
      console.error("Error al generar el resumen:", err)
      setError("Ocurrió un error al generar el resumen. Por favor, inténtalo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generador de Resúmenes con IA
          </CardTitle>
          <CardDescription>Crea resúmenes concisos de tus temas de estudio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tema">Título del tema</Label>
            <Input
              id="tema"
              placeholder="Ej: La Constitución Española y la Seguridad Social"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contenido a resumir</Label>
            <Textarea
              id="contenido"
              placeholder="Pega aquí el contenido que quieres resumir..."
              className="min-h-[200px]"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Longitud del resumen</Label>
            <RadioGroup
              value={longitud}
              onValueChange={(value) => setLongitud(value as "corto" | "medio" | "largo")}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corto" id="longitud-corto" />
                <Label htmlFor="longitud-corto" className="cursor-pointer">
                  Corto
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medio" id="longitud-medio" />
                <Label htmlFor="longitud-medio" className="cursor-pointer">
                  Medio
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="largo" id="longitud-largo" />
                <Label htmlFor="longitud-largo" className="cursor-pointer">
                  Largo
                </Label>
              </div>
            </RadioGroup>
          </div>

          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando resumen...
              </>
            ) : (
              "Generar Resumen"
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedSummary && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen: {tema}</CardTitle>
            <CardDescription>Resumen generado por IA - Longitud: {longitud}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              {generatedSummary.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Copiar</Button>
            <Button>Guardar Resumen</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
