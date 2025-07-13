import { loadStripe } from "@stripe/stripe-js"

// Clave pública de prueba de Stripe
export const stripePromise = loadStripe(
  "pk_test_51QqZWHQ1sRbMxsExHZRZtnydnn6OP5mu2cXfHSPW7k0FGt2VJUmd8PppVEdfThg53Xpmfo1pWCU9V2B5Fmc1Dg2T00EFrRET5O",
)

