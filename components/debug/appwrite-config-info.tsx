"use client"

import { useState } from "react"
import { hasCreateEmailSession, hasCreate, hasDeleteSession } from "@/lib/appwrite-client-v2"

export function AppwriteConfigInfo() {
  const [sdkInfo, setSdkInfo] = useState({
    hasCreateEmailSession,
    hasCreate,
    hasDeleteSession,
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "No definido",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "[DEFINIDO]" : "No definido",
  })

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Configuración de Appwrite</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Métodos disponibles en el SDK</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>createEmailSession: {sdkInfo.hasCreateEmailSession ? "Disponible" : "No disponible"}</li>
            <li>create: {sdkInfo.hasCreate ? "Disponible" : "No disponible"}</li>
            <li>deleteSession: {sdkInfo.hasDeleteSession ? "Disponible" : "No disponible"}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Configuración</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Endpoint: {sdkInfo.endpoint}</li>
            <li>Project ID: {sdkInfo.projectId}</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-4 bg-green-50 rounded">
        <h3 className="font-semibold">Solución implementada</h3>
        <p className="mt-2">
          Se ha implementado un servicio de autenticación que funciona independientemente de la versión del SDK. Este
          servicio utiliza el SDK si los métodos están disponibles, o la API REST si no lo están.
        </p>
      </div>
    </div>
  )
}

