"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateMindMap } from "@/lib/ai-service"
import { Loader2, Network } from "lucide-react"

interface MindMapNode {
  texto: string
  hijos?: MindMapNode[]
}

interface MindMapData {
  nodo_central: MindMapNode
}

export function AIMindMapGenerator() {
  const [tema, setTema] = useState("")
  const [contenido, setContenido] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMap, setGeneratedMap] = useState<MindMapData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!tema || !contenido) {
      setError("Por favor, completa todos los campos requeridos")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await generateMindMap({
        tema,
        contenido,
      })

      // Parsear la respuesta
      const parsedData = JSON.parse(response.text) as MindMapData
      setGeneratedMap(parsedData)
    } catch (err) {
      console.error("Error al generar el mapa mental:", err)
      setError("Ocurrió un error al generar el mapa mental. Por favor, inténtalo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Componente para renderizar un nodo del mapa mental
  const renderMindMapNode = (node: MindMapNode, level = 0) => {
    const paddingLeft = level * 20

    return (
      <div key={node.texto} style={{ paddingLeft: `${paddingLeft}px` }} className="mb-2">
        <div className={`p-2 rounded-md ${level === 0 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
          {node.texto}
        </div>
        {node.hijos && node.hijos.length > 0 && (
          <div className="mt-2 border-l-2 border-muted-foreground/30 pl-4">
            {node.hijos.map((child) => renderMindMapNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Generador de Mapas Mentales con IA
          </CardTitle>
          <CardDescription>Crea mapas mentales para organizar visualmente los conceptos clave</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tema">Tema del mapa mental</Label>
            <Input
              id="tema"
              placeholder="Ej: Procedimiento Administrativo en la Seguridad Social"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contenido de referencia</Label>
            <Textarea
              id="contenido"
              placeholder="Pega aquí el contenido del tema o los conceptos que quieres incluir en el mapa mental..."
              className="min-h-[150px]"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>

          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando mapa mental...
              </>
            ) : (
              "Generar Mapa Mental"
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedMap && (
        <Card>
          <CardHeader>
            <CardTitle>Mapa Mental: {tema}</CardTitle>
            <CardDescription>Mapa mental generado por IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">{renderMindMapNode(generatedMap.nodo_central)}</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Editar</Button>
            <Button>Guardar Mapa</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

