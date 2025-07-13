import { DashboardLayout } from "@/components/dashboard-layout"
import { MindMapEditor } from "@/components/mind-map-editor"

export default function EditorMapasPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Editor de Mapas Mentales</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Crea y edita mapas mentales para organizar visualmente los conceptos
          </p>
        </div>

        <div className="h-[calc(100vh-220px)]">
          <MindMapEditor />
        </div>
      </div>
    </DashboardLayout>
  )
}
