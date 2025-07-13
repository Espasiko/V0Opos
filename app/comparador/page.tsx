import { DashboardLayout } from "@/components/dashboard-layout"
import { ComparadorLeyes } from "@/components/comparador-leyes"

export default function ComparadorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Comparador de Leyes</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Compara diferentes versiones de leyes y normativas para identificar cambios
          </p>
        </div>

        <ComparadorLeyes />
      </div>
    </DashboardLayout>
  )
}

