import { DebugAppwrite } from "@/components/debug-appwrite"

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Página de depuración</h1>
      <DebugAppwrite />
    </div>
  )
}
