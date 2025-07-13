import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(
  "sk_test_51QqZWHQ1sRbMxsExcaPmZnaOJO45rkel6GzRkuqHdeANx3WA6DYQJMXNqg1q9TN0TE0nxdKrB9Vs7DfXn8d7KyCP00TlYYV0EX",
  {
    apiVersion: "2023-10-16",
  },
)

export async function POST(request: Request) {
  try {
    // Leer el cuerpo de la solicitud una sola vez y guardarlo en una variable
    const body = await request.json()
    const { priceId, successUrl, cancelUrl, email, isWaitlist } = body

    // Crear una sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: isWaitlist ? "OposIA - Suscripción (Lista de espera)" : "OposIA - Suscripción",
              description: "Acceso completo a la plataforma OposIA para preparar oposiciones de Seguridad Social",
            },
            unit_amount: isWaitlist ? 2000 : 4000, // En céntimos (20€ o 40€)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/`,
      customer_email: email,
      metadata: {
        isWaitlist: isWaitlist ? "true" : "false",
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Error al crear sesión de checkout:", error)
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 })
  }
}
