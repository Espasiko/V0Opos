import { LoginForm } from "@/components/login-form"
import { Brain } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      <div className="mb-8 flex items-center gap-2">
        <Brain className="h-8 w-8" />
        <Link href="/" className="text-2xl font-bold">
          OposIA
        </Link>
      </div>
      <LoginForm />
    </div>
  )
}

