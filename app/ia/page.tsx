import { DashboardLayout } from "@/components/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AITestGenerator } from "@/components/ai-test-generator"
import { AISummaryGenerator } from "@/components/ai-summary-generator"
import { AIMindMapGenerator } from "@/components/ai-mindmap-generator"

export default function IAPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Herramientas de IA</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Utiliza la inteligencia artificial para mejorar tu preparación
          </p>
        </div>

        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="resumenes">Resúmenes</TabsTrigger>
            <TabsTrigger value="mapas">Mapas</TabsTrigger>
          </TabsList>
          <TabsContent value="tests" className="mt-6">
            <AITestGenerator />
          </TabsContent>
          <TabsContent value="resumenes" className="mt-6">
            <AISummaryGenerator />
          </TabsContent>
          <TabsContent value="mapas" className="mt-6">
            <AIMindMapGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
