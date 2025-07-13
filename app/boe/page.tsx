import { DashboardLayout } from "@/components/dashboard-layout"
import { BOEViewer } from "@/components/boe-viewer"

export default function BOEPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Actualizaciones del BOE</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Consulta las últimas actualizaciones normativas relevantes para oposiciones de Seguridad Social
          </p>
        </div>

        <BOEViewer />
      </div>
    </DashboardLayout>
  )
}

