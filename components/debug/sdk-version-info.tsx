"use client"

import { useState, useEffect } from "react"

export function SdkVersionInfo() {
  const [sdkInfo, setSdkInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSdkInfo = async () => {
      try {
        const response = await fetch("/api/appwrite/sdk-version")
        const data = await response.json()
        setSdkInfo(data)
      } catch (err: any) {
        console.error("Error al obtener información del SDK:", err)
        setError(err.message || "Error al obtener información del SDK")
      } finally {
        setLoading(false)
      }
    }

    fetchSdkInfo()
  }, [])

  if (loading) {
    return <div className="p-4 bg-gray-100 rounded">Cargando información del SDK...</div>
  }

  if (error) {
    return <div className="p-4 bg-red-100 rounded">Error: {error}</div>
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Información del SDK de Appwrite</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Versión del SDK</h3>
          <p>{sdkInfo?.version || "Desconocida"}</p>
        </div>

        <div>
          <h3 className="font-semibold">Métodos disponibles</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              createEmailSession: {sdkInfo?.methods?.account?.createEmailSession ? "Disponible" : "No disponible"}
            </li>
            <li>createSession: {sdkInfo?.methods?.account?.createSession ? "Disponible" : "No disponible"}</li>
            <li>create: {sdkInfo?.methods?.account?.create ? "Disponible" : "No disponible"}</li>
            <li>deleteSession: {sdkInfo?.methods?.account?.deleteSession ? "Disponible" : "No disponible"}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Configuración</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Endpoint: {sdkInfo?.config?.endpoint}</li>
            <li>Project ID: {sdkInfo?.config?.projectId}</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold">Solución implementada</h3>
        <p className="mt-2">
          Se ha implementado una capa de compatibilidad para proporcionar los métodos necesarios independientemente de
          la versión del SDK. Esto debería resolver los problemas con los métodos faltantes como createEmailSession.
        </p>
      </div>
    </div>
  )
}
