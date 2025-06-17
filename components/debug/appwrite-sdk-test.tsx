"use client"

import { useState, useEffect } from "react"
import { client, account, databases, storage, teams } from "@/lib/appwrite-client"

export function AppwriteSdkTest() {
  const [sdkStatus, setSdkStatus] = useState<{
    client: boolean
    account: boolean
    databases: boolean
    storage: boolean
    teams: boolean
    accountMethods: string[]
  }>({
    client: false,
    account: false,
    databases: false,
    storage: false,
    teams: false,
    accountMethods: [],
  })

  useEffect(() => {
    // Verificar la inicialización del SDK
    const checkSdk = () => {
      const clientInitialized = !!client && typeof client.setEndpoint === "function"
      const accountInitialized = !!account && typeof account.get === "function"
      const databasesInitialized = !!databases && typeof databases.listDocuments === "function"
      const storageInitialized = !!storage && typeof storage.listFiles === "function"
      const teamsInitialized = !!teams && typeof teams.list === "function"

      // Obtener los métodos disponibles en el objeto account
      const accountMethods = accountInitialized
        ? Object.getOwnPropertyNames(Object.getPrototypeOf(account)).filter(
            (method) => typeof (account as any)[method] === "function" && method !== "constructor",
          )
        : []

      setSdkStatus({
        client: clientInitialized,
        account: accountInitialized,
        databases: databasesInitialized,
        storage: storageInitialized,
        teams: teamsInitialized,
        accountMethods,
      })
    }

    checkSdk()
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Estado del SDK de Appwrite</h2>

      <div className="space-y-2">
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${sdkStatus.client ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>Cliente: {sdkStatus.client ? "Inicializado" : "No inicializado"}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${sdkStatus.account ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>Account: {sdkStatus.account ? "Inicializado" : "No inicializado"}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${sdkStatus.databases ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>Databases: {sdkStatus.databases ? "Inicializado" : "No inicializado"}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${sdkStatus.storage ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>Storage: {sdkStatus.storage ? "Inicializado" : "No inicializado"}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${sdkStatus.teams ? "bg-green-500" : "bg-red-500"}`}></span>
          <span>Teams: {sdkStatus.teams ? "Inicializado" : "No inicializado"}</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Métodos disponibles en el objeto account:</h3>
        {sdkStatus.accountMethods.length > 0 ? (
          <ul className="list-disc pl-5 text-sm">
            {sdkStatus.accountMethods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">No se encontraron métodos en el objeto account</p>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
        <p className="font-semibold">Información de depuración:</p>
        <p>Endpoint: {process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "No definido"}</p>
        <p>Project ID: {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "********" : "No definido"}</p>
      </div>
    </div>
  )
}
