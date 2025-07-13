"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EnvVariables() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "No configurado"
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "No configurado"
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "No configurado"
  const storageId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || "No configurado"
  const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "No configurado"

  const isEndpointValid =
    endpoint !== "No configurado" &&
    endpoint.length <= 100 &&
    (endpoint.startsWith("https://") || endpoint.startsWith("http://localhost"))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Variables de Entorno</CardTitle>
        <CardDescription>Variables de entorno configuradas para Appwrite</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">NEXT_PUBLIC_APPWRITE_ENDPOINT</h3>
            <p className={`text-sm text-gray-500 break-all ${!isEndpointValid ? "text-red-500" : ""}`}>{endpoint}</p>
            {!isEndpointValid && (
              <p className="text-xs text-red-500">El endpoint no es válido. Asegúrate de que es una URL correcta.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium">NEXT_PUBLIC_APPWRITE_PROJECT_ID</h3>
            <p className="text-sm text-gray-500 break-all">{projectId}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium">NEXT_PUBLIC_APPWRITE_DATABASE_ID</h3>
            <p className="text-sm text-gray-500 break-all">{databaseId}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium">NEXT_PUBLIC_APPWRITE_STORAGE_ID</h3>
            <p className="text-sm text-gray-500 break-all">{storageId}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium">NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID</h3>
            <p className="text-sm text-gray-500 break-all">{userCollectionId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

