"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { stripePromise } from "@/lib/stripe"
import { useToast } from "@/components/ui/use-toast"

interface CheckoutButtonProps {
  isWaitlist?: boolean
  email?: string
  className?: string
  children: React.ReactNode
}

export function CheckoutButton({ isWaitlist = false, email, className, children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe no se ha cargado correctamente")
      }

      // Crear el objeto de datos una vez y usarlo para la solicitud
      const checkoutData = {
        isWaitlist,
        email,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/`,
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error en la respuesta del servidor")
      }

      const data = await response.json()

      // Redirigir a la página de checkout de Stripe
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No se recibió URL de checkout")
      }
    } catch (error) {
      console.error("Error al iniciar checkout:", error)
      toast({
        title: "Error al procesar el pago",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Procesando...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
