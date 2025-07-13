// Este archivo existe solo para compatibilidad con código antiguo
// Todas las funciones redirigen a la implementación de Appwrite

import { signUp, signIn, signOut, getCurrentUser, getSession } from "./auth-appwrite"

// Exportamos las mismas funciones pero con nombres compatibles con la implementación anterior
export { signUp as createUser, signIn as signInWithEmail, signOut, getCurrentUser, getSession }

// Advertencia en consola
console.warn(
  "DEPRECATED: Usando auth-supabase.ts que ahora redirige a auth-appwrite.ts. Por favor, actualiza tus importaciones.",
)

