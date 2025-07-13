import { LoginFormAlternative } from "@/components/login-form-alternative"

export default function LoginAlternativoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión (Método Alternativo)</h1>
      <LoginFormAlternative />
    </div>
  )
}
