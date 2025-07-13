import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">¡Pago completado con éxito!</h1>
        <p className="mt-4 text-muted-foreground">
          Gracias por unirte a OposIA. Hemos enviado un correo electrónico con los detalles de tu suscripción.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Ir a la plataforma</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

