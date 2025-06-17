"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plus,
  Save,
  Download,
  Share2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Move,
  Edit3,
  Circle,
  Square,
  Type,
  ArrowRight,
  Undo,
  Redo,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Tipos para el mapa mental
interface MindMapNode {
  id: string
  text: string
  type: "central" | "main" | "sub" | "leaf"
  color?: string
  x: number
  y: number
  width: number
  height: number
  parentId?: string
  childrenIds: string[]
}

interface MindMapConnection {
  id: string
  sourceId: string
  targetId: string
  type: "straight" | "curved" | "angled"
  color?: string
}

interface MindMap {
  id: string
  title: string
  nodes: MindMapNode[]
  connections: MindMapConnection[]
}

// Colores predefinidos para los nodos
const NODE_COLORS = [
  "bg-primary text-primary-foreground",
  "bg-blue-500 text-white",
  "bg-green-500 text-white",
  "bg-yellow-500 text-white",
  "bg-red-500 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",
  "bg-orange-500 text-white",
  "bg-teal-500 text-white",
]

// Mapa mental de ejemplo
const EXAMPLE_MIND_MAP: MindMap = {
  id: "1",
  title: "Seguridad Social",
  nodes: [
    {
      id: "node-1",
      text: "Seguridad Social",
      type: "central",
      color: NODE_COLORS[0],
      x: 500,
      y: 300,
      width: 150,
      height: 60,
      childrenIds: ["node-2", "node-3", "node-4", "node-5"],
    },
    {
      id: "node-2",
      text: "Régimen General",
      type: "main",
      color: NODE_COLORS[1],
      x: 300,
      y: 150,
      width: 130,
      height: 50,
      parentId: "node-1",
      childrenIds: ["node-6", "node-7"],
    },
    {
      id: "node-3",
      text: "Regímenes Especiales",
      type: "main",
      color: NODE_COLORS[2],
      x: 700,
      y: 150,
      width: 130,
      height: 50,
      parentId: "node-1",
      childrenIds: [],
    },
    {
      id: "node-4",
      text: "Prestaciones",
      type: "main",
      color: NODE_COLORS[3],
      x: 300,
      y: 450,
      width: 130,
      height: 50,
      parentId: "node-1",
      childrenIds: [],
    },
    {
      id: "node-5",
      text: "Cotización",
      type: "main",
      color: NODE_COLORS[4],
      x: 700,
      y: 450,
      width: 130,
      height: 50,
      parentId: "node-1",
      childrenIds: [],
    },
    {
      id: "node-6",
      text: "Campo de aplicación",
      type: "sub",
      color: NODE_COLORS[5],
      x: 150,
      y: 80,
      width: 120,
      height: 40,
      parentId: "node-2",
      childrenIds: [],
    },
    {
      id: "node-7",
      text: "Afiliación",
      type: "sub",
      color: NODE_COLORS[6],
      x: 150,
      y: 220,
      width: 120,
      height: 40,
      parentId: "node-2",
      childrenIds: [],
    },
  ],
  connections: [
    {
      id: "conn-1",
      sourceId: "node-1",
      targetId: "node-2",
      type: "straight",
      color: "stroke-gray-400",
    },
    {
      id: "conn-2",
      sourceId: "node-1",
      targetId: "node-3",
      type: "straight",
      color: "stroke-gray-400",
    },
    {
      id: "conn-3",
      sourceId: "node-1",
      targetId: "node-4",
      type: "straight",
      color: "stroke-gray-400",
    },
    {
      id: "conn-4",
      sourceId: "node-1",
      targetId: "node-5",
      type: "straight",
      color: "stroke-gray-400",
    },
    {
      id: "conn-5",
      sourceId: "node-2",
      targetId: "node-6",
      type: "curved",
      color: "stroke-gray-400",
    },
    {
      id: "conn-6",
      sourceId: "node-2",
      targetId: "node-7",
      type: "curved",
      color: "stroke-gray-400",
    },
  ],
}

export function MindMapEditor() {
  const [mindMap, setMindMap] = useState<MindMap>(EXAMPLE_MIND_MAP)
  const [zoom, setZoom] = useState(1)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")
  const [tool, setTool] = useState<"select" | "add" | "connect" | "delete">("select")
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 })
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [undoStack, setUndoStack] = useState<MindMap[]>([])
  const [redoStack, setRedoStack] = useState<MindMap[]>([])

  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Guardar el estado actual para deshacer/rehacer
  const saveState = () => {
    setUndoStack([...undoStack, JSON.parse(JSON.stringify(mindMap))])
    setRedoStack([])
  }

  // Deshacer
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      const newUndoStack = undoStack.slice(0, -1)
      setRedoStack([JSON.parse(JSON.stringify(mindMap)), ...redoStack])
      setMindMap(previousState)
      setUndoStack(newUndoStack)
    }
  }

  // Rehacer
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0]
      const newRedoStack = redoStack.slice(1)
      setUndoStack([...undoStack, JSON.parse(JSON.stringify(mindMap))])
      setMindMap(nextState)
      setRedoStack(newRedoStack)
    }
  }

  // Obtener un nodo por su ID
  const getNodeById = (id: string) => {
    return mindMap.nodes.find((node) => node.id === id)
  }

  // Crear un nuevo nodo
  const createNode = (type: MindMapNode["type"], parentId?: string) => {
    saveState()

    const newNodeId = `node-${Date.now()}`
    const parent = parentId ? getNodeById(parentId) : null

    // Posición por defecto o relativa al padre
    let x = 500
    let y = 300

    if (parent) {
      // Posicionar el nuevo nodo en relación al padre
      const siblings = mindMap.nodes.filter((node) => node.parentId === parentId)
      const offset = siblings.length * 60 + 60

      if (siblings.length % 2 === 0) {
        x = parent.x + offset
      } else {
        x = parent.x - offset
      }

      y = parent.y + 100
    }

    const newNode: MindMapNode = {
      id: newNodeId,
      text: "Nuevo concepto",
      type,
      color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      x,
      y,
      width: 120,
      height: 40,
      parentId,
      childrenIds: [],
    }

    // Actualizar el padre si existe
    const updatedNodes = mindMap.nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          childrenIds: [...node.childrenIds, newNodeId],
        }
      }
      return node
    })

    // Crear conexión si hay un padre
    let updatedConnections = [...mindMap.connections]
    if (parentId) {
      const newConnection: MindMapConnection = {
        id: `conn-${Date.now()}`,
        sourceId: parentId,
        targetId: newNodeId,
        type: "straight",
        color: "stroke-gray-400",
      }
      updatedConnections = [...updatedConnections, newConnection]
    }

    setMindMap({
      ...mindMap,
      nodes: [...updatedNodes, newNode],
      connections: updatedConnections,
    })

    setSelectedNodeId(newNodeId)
    setEditingNodeId(newNodeId)
    setEditingText("Nuevo concepto")
  }

  // Eliminar un nodo y sus conexiones
  const deleteNode = (nodeId: string) => {
    saveState()

    const nodeToDelete = getNodeById(nodeId)
    if (!nodeToDelete) return

    // Eliminar recursivamente los nodos hijos
    const nodesToDelete = [nodeId]
    const getChildrenToDelete = (id: string) => {
      const node = getNodeById(id)
      if (node && node.childrenIds.length > 0) {
        node.childrenIds.forEach((childId) => {
          nodesToDelete.push(childId)
          getChildrenToDelete(childId)
        })
      }
    }

    getChildrenToDelete(nodeId)

    // Actualizar el padre si existe
    const updatedNodes = mindMap.nodes
      .filter((node) => !nodesToDelete.includes(node.id))
      .map((node) => {
        if (node.id === nodeToDelete.parentId) {
          return {
            ...node,
            childrenIds: node.childrenIds.filter((id) => id !== nodeId),
          }
        }
        return node
      })

    // Eliminar conexiones relacionadas
    const updatedConnections = mindMap.connections.filter(
      (conn) => !nodesToDelete.includes(conn.sourceId) && !nodesToDelete.includes(conn.targetId),
    )

    setMindMap({
      ...mindMap,
      nodes: updatedNodes,
      connections: updatedConnections,
    })

    setSelectedNodeId(null)
    setEditingNodeId(null)
  }

  // Crear una conexión entre dos nodos
  const createConnection = (sourceId: string, targetId: string) => {
    // Evitar conexiones a sí mismo o duplicadas
    if (sourceId === targetId) return

    const existingConnection = mindMap.connections.find(
      (conn) => conn.sourceId === sourceId && conn.targetId === targetId,
    )

    if (existingConnection) return

    saveState()

    const newConnection: MindMapConnection = {
      id: `conn-${Date.now()}`,
      sourceId,
      targetId,
      type: "straight",
      color: "stroke-gray-400",
    }

    // Actualizar las relaciones padre-hijo
    const updatedNodes = mindMap.nodes.map((node) => {
      if (node.id === sourceId && !node.childrenIds.includes(targetId)) {
        return {
          ...node,
          childrenIds: [...node.childrenIds, targetId],
        }
      }
      if (node.id === targetId) {
        return {
          ...node,
          parentId: sourceId,
        }
      }
      return node
    })

    setMindMap({
      ...mindMap,
      nodes: updatedNodes,
      connections: [...mindMap.connections, newConnection],
    })
  }

  // Actualizar el texto de un nodo
  const updateNodeText = (nodeId: string, text: string) => {
    saveState()

    const updatedNodes = mindMap.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, text }
      }
      return node
    })

    setMindMap({
      ...mindMap,
      nodes: updatedNodes,
    })

    setEditingNodeId(null)
  }

  // Cambiar el color de un nodo
  const updateNodeColor = (nodeId: string, color: string) => {
    saveState()

    const updatedNodes = mindMap.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, color }
      }
      return node
    })

    setMindMap({
      ...mindMap,
      nodes: updatedNodes,
    })
  }

  // Manejar el clic en el SVG
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (tool === "add" && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const x = (e.clientX - svgRect.left - viewportOffset.x) / zoom
      const y = (e.clientY - svgRect.top - viewportOffset.y) / zoom

      const newNodeId = `node-${Date.now()}`
      const newNode: MindMapNode = {
        id: newNodeId,
        text: "Nuevo concepto",
        type: "main",
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        x,
        y,
        width: 120,
        height: 40,
        childrenIds: [],
      }

      saveState()

      setMindMap({
        ...mindMap,
        nodes: [...mindMap.nodes, newNode],
      })

      setSelectedNodeId(newNodeId)
      setEditingNodeId(newNodeId)
      setEditingText("Nuevo concepto")
    } else {
      // Si no estamos añadiendo un nodo, deseleccionar
      setSelectedNodeId(null)
      setEditingNodeId(null)
      setConnectingFrom(null)
    }
  }

  // Manejar el clic en un nodo
  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()

    if (tool === "select") {
      setSelectedNodeId(nodeId)
    } else if (tool === "delete") {
      deleteNode(nodeId)
    } else if (tool === "connect") {
      if (connectingFrom === null) {
        setConnectingFrom(nodeId)
      } else {
        createConnection(connectingFrom, nodeId)
        setConnectingFrom(null)
      }
    } else if (tool === "add") {
      createNode("sub", nodeId)
    }
  }

  // Manejar el doble clic en un nodo para editar
  const handleNodeDoubleClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()

    const node = getNodeById(nodeId)
    if (node) {
      setEditingNodeId(nodeId)
      setEditingText(node.text)
    }
  }

  // Manejar el inicio del arrastre de un nodo
  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    if (tool !== "select") return

    e.stopPropagation()
    setIsDragging(true)

    const node = getNodeById(nodeId)
    if (node) {
      setDragStartPos({ x: e.clientX, y: e.clientY })
      setSelectedNodeId(nodeId)
    }
  }

  // Manejar el movimiento durante el arrastre
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedNodeId) {
      const dx = (e.clientX - dragStartPos.x) / zoom
      const dy = (e.clientY - dragStartPos.y) / zoom

      const updatedNodes = mindMap.nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            x: node.x + dx,
            y: node.y + dy,
          }
        }
        return node
      })

      setMindMap({
        ...mindMap,
        nodes: updatedNodes,
      })

      setDragStartPos({ x: e.clientX, y: e.clientY })
    }
  }

  // Manejar el fin del arrastre
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      saveState()
    }
  }

  // Manejar el zoom
  const handleZoom = (newZoom: number) => {
    setZoom(Math.max(0.1, Math.min(2, newZoom)))
  }

  // Generar el path para una conexión
  const getConnectionPath = (conn: MindMapConnection) => {
    const source = getNodeById(conn.sourceId)
    const target = getNodeById(conn.targetId)

    if (!source || !target) return ""

    // Puntos de inicio y fin
    const startX = source.x + source.width / 2
    const startY = source.y + source.height / 2
    const endX = target.x + target.width / 2
    const endY = target.y + target.height / 2

    if (conn.type === "straight") {
      return `M ${startX} ${startY} L ${endX} ${endY}`
    } else if (conn.type === "curved") {
      // Punto de control para la curva
      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2
      const cpX = midX
      const cpY = midY + 50

      return `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`
    } else {
      // Conexión en ángulo (dos líneas)
      return `M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`
    }
  }

  // Exportar el mapa mental como imagen
  const exportAsPNG = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Crear una imagen a partir del SVG
    const img = new Image()
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      canvas.width = svgRef.current!.clientWidth
      canvas.height = svgRef.current!.clientHeight

      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)

        const pngUrl = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        downloadLink.download = `${mindMap.title || "mind-map"}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }

      URL.revokeObjectURL(url)
    }

    img.crossOrigin = "anonymous"
    img.src = url
  }

  // Guardar el mapa mental
  const saveMindMap = () => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando mapa mental:", mindMap)
    // Simulación de guardado exitoso
    alert("Mapa mental guardado correctamente")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Input
            value={mindMap.title}
            onChange={(e) => setMindMap({ ...mindMap, title: e.target.value })}
            className="font-medium text-lg w-64"
            placeholder="Título del mapa mental"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleUndo} disabled={undoStack.length === 0} title="Deshacer">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleRedo} disabled={redoStack.length === 0} title="Rehacer">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleZoom(zoom + 0.1)} title="Acercar">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleZoom(zoom - 0.1)} title="Alejar">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={exportAsPNG} title="Exportar como PNG">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Compartir">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="default" onClick={saveMindMap} className="gap-1">
            <Save className="h-4 w-4" />
            <span>Guardar</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-4 h-full">
        <div className="w-48 flex-shrink-0">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Herramientas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={tool === "select" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTool("select")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <Move className="h-4 w-4" />
                      <span className="text-xs">Seleccionar</span>
                    </Button>
                    <Button
                      variant={tool === "add" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTool("add")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-xs">Añadir</span>
                    </Button>
                    <Button
                      variant={tool === "connect" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTool("connect")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-xs">Conectar</span>
                    </Button>
                    <Button
                      variant={tool === "delete" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTool("delete")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-xs">Eliminar</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Añadir nodo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => createNode("central")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <Circle className="h-4 w-4" />
                      <span className="text-xs">Central</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => createNode("main")}
                      className="flex flex-col h-16 gap-1"
                    >
                      <Square className="h-4 w-4" />
                      <span className="text-xs">Principal</span>
                    </Button>
                  </div>
                </div>

                {selectedNodeId && (
                  <div className="space-y-2">
                    <Label>Propiedades</Label>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (selectedNodeId) {
                            setEditingNodeId(selectedNodeId)
                            setEditingText(getNodeById(selectedNodeId)?.text || "")
                          }
                        }}
                        className="w-full justify-start gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span className="text-xs">Editar texto</span>
                      </Button>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                            <Type className="h-4 w-4" />
                            <span className="text-xs">Color</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <div className="grid grid-cols-3 gap-2">
                            {NODE_COLORS.map((color, index) => (
                              <div
                                key={index}
                                className={cn("h-8 rounded-md cursor-pointer", color)}
                                onClick={() => {
                                  if (selectedNodeId) {
                                    updateNodeColor(selectedNodeId, color)
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (selectedNodeId) {
                            deleteNode(selectedNodeId)
                          }
                        }}
                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs">Eliminar nodo</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 border rounded-lg overflow-hidden bg-white dark:bg-gray-950 relative" ref={containerRef}>
          <svg
            ref={svgRef}
            className="w-full h-full cursor-default"
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <g transform={`scale(${zoom}) translate(${viewportOffset.x / zoom}, ${viewportOffset.y / zoom})`}>
              {/* Conexiones */}
              {mindMap.connections.map((conn) => (
                <path
                  key={conn.id}
                  d={getConnectionPath(conn)}
                  fill="none"
                  className={cn("stroke-2", conn.color || "stroke-gray-400")}
                  markerEnd="url(#arrowhead)"
                />
              ))}

              {/* Nodos */}
              {mindMap.nodes.map((node) => (
                <g
                  key={node.id}
                  transform={`translate(${node.x - node.width / 2}, ${node.y - node.height / 2})`}
                  onClick={(e) => handleNodeClick(e, node.id)}
                  onDoubleClick={(e) => handleNodeDoubleClick(e, node.id)}
                  onMouseDown={(e) => handleNodeDragStart(e, node.id)}
                  className="cursor-pointer"
                >
                  <rect
                    width={node.width}
                    height={node.height}
                    rx={node.type === "central" ? 20 : 6}
                    className={cn(
                      node.color || "bg-primary text-primary-foreground",
                      selectedNodeId === node.id && "ring-2 ring-blue-500",
                    )}
                  />
                  {editingNodeId === node.id ? (
                    <foreignObject width={node.width} height={node.height}>
                      <div className="h-full flex items-center justify-center p-1">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateNodeText(node.id, editingText)
                            }
                          }}
                          onBlur={() => updateNodeText(node.id, editingText)}
                          className="w-full h-full text-center bg-transparent border-none focus:outline-none text-white"
                          autoFocus
                        />
                      </div>
                    </foreignObject>
                  ) : (
                    <text
                      x={node.width / 2}
                      y={node.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-current text-xs font-medium pointer-events-none"
                      style={{ userSelect: "none" }}
                    >
                      {node.text}
                    </text>
                  )}
                </g>
              ))}

              {/* Marcador de flecha para las conexiones */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-400" />
                </marker>
              </defs>
            </g>
          </svg>

          {/* Indicador de modo de conexión */}
          {connectingFrom && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
              Selecciona un nodo para conectar
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
