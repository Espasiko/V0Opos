import { AppwriteConnectionTest } from "@/components/debug/appwrite-connection-test"
import { EndpointValidator } from "@/components/debug/endpoint-validator"
import { EnvVariables } from "@/components/debug/env-variables"

export default function DiagnosticoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Página de diagnóstico</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Diagnóstico de conexión</h2>
          <AppwriteConnectionTest />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Solución de problemas comunes</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Error: API key configurada como endpoint</h3>
              <p className="text-gray-700 mt-2">
                Este error ocurre cuando la variable de entorno <code>NEXT_PUBLIC_APPWRITE_ENDPOINT</code> contiene una
                API key (que comienza con "standard_") en lugar de una URL.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-3">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      <strong>Solución:</strong> Configura la variable de entorno{" "}
                      <code>NEXT_PUBLIC_APPWRITE_ENDPOINT</code> con una URL válida como{" "}
                      <code>https://cloud.appwrite.io/v1</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Error: Endpoint demasiado largo, usando valor predeterminado</h3>
              <p className="text-gray-700 mt-2">
                Este error ocurre cuando la variable de entorno <code>NEXT_PUBLIC_APPWRITE_ENDPOINT</code> contiene un
                valor demasiado largo (más de 100 caracteres), lo que sugiere que podría ser un token o hash en lugar de
                una URL.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-3">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      <strong>Solución:</strong> Configura la variable de entorno{" "}
                      <code>NEXT_PUBLIC_APPWRITE_ENDPOINT</code> con una URL válida como{" "}
                      <code>https://cloud.appwrite.io/v1</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                Error: Appwrite: El método createEmailSession no está disponible en el objeto account
              </h3>
              <p className="text-gray-700">
                Este error indica un problema con la versión del SDK de Appwrite. Solución implementada:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Se ha creado un servicio de autenticación que no depende de la versión del SDK</li>
                <li>Este servicio utiliza el SDK si los métodos están disponibles, o la API REST si no lo están</li>
                <li>Se han implementado rutas de API para todas las operaciones de autenticación</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Error: Failed to fetch</h3>
              <p className="text-gray-700">
                Este error indica problemas de conectividad con la API de Appwrite. Posibles soluciones:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Verifica que la URL del endpoint de Appwrite es correcta</li>
                <li>Asegúrate de que el servidor de Appwrite está en funcionamiento</li>
                <li>Verifica la configuración de CORS en Appwrite</li>
                <li>Comprueba si hay problemas de red o firewall</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Información de Configuración</h2>
          <EnvVariables />
          <div className="mt-4">
            <EndpointValidator />
          </div>
        </section>
      </div>
    </div>
  )
}
