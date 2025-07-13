import { RegisterFormManual } from "@/components/auth/register-form-manual"

export default function RegistroManualPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Registro Manual</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Esta página utiliza un enfoque alternativo para el registro que no depende del SDK de Appwrite. Si estás
        experimentando problemas con el registro normal, prueba este método.
      </p>
      <RegisterFormManual />
    </div>
  )
}

